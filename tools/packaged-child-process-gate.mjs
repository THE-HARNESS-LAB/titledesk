/**
 * Packaged child-process gate — proves, against a real installed/packaged .app,
 * that the two spawned children the customer depends on actually run:
 *   - the OCR extract worker (forked with the app's Electron as Node), and
 *   - the MCP server (spawned the same way),
 * both from app.asar.unpacked, exactly as documentExtractor.ts and
 * specialRequest.ts launch them. These are the processes that historically
 * passed every unit test yet never ran in a packaged build, so this gate is
 * committed here and meant to run against each shipped build.
 *
 * Runs on macOS, Windows and Linux against that platform's packaged layout.
 * One script rather than one per platform: a spawned-process bug is subtle
 * enough that two copies of the fix is how one of them stays broken.
 *
 * Usage: node scripts/packaged-child-process-gate.mjs [app] [outDir]
 *   app      the packaged app: `TitleDesk Agent.app` on macOS, the unpacked
 *            directory (`win-unpacked`, `linux-unpacked`) elsewhere.
 *            default: /Applications/TitleDesk Agent.app
 *   outDir   default: repair-evidence/production-readiness/packaged-gate
 * Exit 0 = pass. It generates its own OCR test page (no committed binary).
 */
import { fork, spawn, execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';

const repo = path.resolve(import.meta.dirname, '..');
// The OCR worker uses V8 "advanced" IPC serialization, whose wire version must
// match between parent and child. The child is the app's Electron run as Node,
// so the gate must run under that same Electron -- not system Node -- or the
// parent cannot deserialize the worker's reply. Re-exec once under it.
// Where each platform's packaged build puts the pieces.
const layout = (app) => process.platform === 'darwin'
  ? { exec: path.join(app, 'Contents/MacOS/TitleDesk Agent'), resources: path.join(app, 'Contents/Resources') }
  : { exec: path.join(app, process.platform === 'win32' ? 'TitleDesk Agent.exe' : 'titledesk-agent'),
      resources: path.join(app, 'resources') };

if (!process.env.TD_GATE_REEXEC) {
  const appArg = path.resolve(process.argv[2] ?? '/Applications/TitleDesk Agent.app');
  const electron = layout(appArg).exec;
  if (!fs.existsSync(electron)) { console.error('MISSING', electron); process.exit(2); }
  const { spawnSync } = await import('node:child_process');
  const r = spawnSync(electron, [import.meta.filename, ...process.argv.slice(2)], {
    stdio: 'inherit', env: { ...process.env, ELECTRON_RUN_AS_NODE: '1', TD_GATE_REEXEC: '1' },
  });
  process.exit(r.status ?? 1);
}
const appPath = path.resolve(process.argv[2] ?? '/Applications/TitleDesk Agent.app');
const outDir = path.resolve(process.argv[3] ?? path.join(repo, 'repair-evidence/production-readiness/packaged-gate'));
fs.mkdirSync(outDir, { recursive: true });
const { exec: execPath, resources } = layout(appPath);
const appAsar = path.join(resources, 'app.asar');
const unpackedRoot = path.join(resources, 'app.asar.unpacked');
const unpacked = path.join(unpackedRoot, 'out/main');
const workerPath = path.join(unpacked, 'extract-worker.js');
const mcpPath = path.join(unpacked, 'mcp-server.js');
const logPath = path.join(outDir, 'gate.log');
const log = (...p) => { const l = `[${new Date().toISOString()}] ${p.join(' ')}`; console.log(l); fs.appendFileSync(logPath, l + '\n'); };

for (const p of [execPath, appAsar, workerPath, mcpPath]) {
  if (!fs.existsSync(p)) { log('MISSING', p); process.exit(2); }
}
// Electron's asar-fs wrapper treats a read of the .asar path as a read INSIDE
// the archive; noAsar makes fs read the archive file as ordinary bytes for hashing.
const sha256 = (f) => createHash('sha256').update(fs.readFileSync(f)).digest('hex');
/**
 * The binary's own magic number, read here rather than shelled out to `file`,
 * which does not exist on Windows. This is the check that catches a native
 * module built for the wrong platform or architecture being packaged.
 */
const binaryFormat = (f) => {
  // Eight bytes, not four: ELF keeps its 32/64-bit class in byte 4, and a
  // four-byte read reported every Linux binary as "ELF 32-bit" (2026-09-22).
  const head = Buffer.alloc(8);
  const fd = fs.openSync(f, 'r');
  try { fs.readSync(fd, head, 0, 8, 0); } finally { fs.closeSync(fd); }
  const be = head.readUInt32BE(0);
  if (head[0] === 0x4d && head[1] === 0x5a) return 'PE (Windows)';
  if (head.subarray(0, 4).toString('latin1') === '\x7fELF') return `ELF ${head[4] === 2 ? '64-bit' : '32-bit'}`;
  if ([0xfeedface, 0xfeedfacf, 0xcefaedfe, 0xcffaedfe].includes(be)) return 'Mach-O 64-bit';
  if ([0xcafebabe, 0xbebafeca].includes(be)) return 'Mach-O universal';
  return `unknown (${head.toString('hex')})`;
};
const EXPECTED_FORMAT = { darwin: /^Mach-O/, win32: /^PE /, linux: /^ELF 64-bit/ }[process.platform] ?? /.^/;
const inspect = (f) => ({ path: f, bytes: fs.statSync(f).size, sha256: sha256(f), format: binaryFormat(f) });
// Read before `noAsar`: Electron's asar-fs resolves a path inside the archive,
// which is the packaged app's own package.json and so the exact version the
// MCP server compiles in. Info.plist would give the same number on macOS only.
const packageVersion = JSON.parse(fs.readFileSync(path.join(appAsar, 'package.json'), 'utf8')).version;
process.noAsar = true;
const arch = process.arch === 'arm64' ? 'arm64' : 'x64';
/**
 * This platform's `.node` inside a native package.
 *
 * better-sqlite3 ships every platform's prebuild in one directory, so taking
 * the first file found returns `darwin-arm64.node` on a Windows build and the
 * format check then fails against a package that is perfectly fine. Select by
 * `<platform>-<arch>`, which is how both this and @napi-rs/canvas name theirs.
 */
const nativeIn = (...segments) => {
  const dir = path.join(unpackedRoot, 'node_modules', ...segments);
  const found = [];
  const stack = [dir];
  while (stack.length) {
    const here = stack.pop();
    if (!fs.existsSync(here)) continue;
    for (const entry of fs.readdirSync(here, { withFileTypes: true })) {
      const full = path.join(here, entry.name);
      if (entry.isDirectory()) stack.push(full);
      else if (entry.name.endsWith('.node')) found.push(full);
    }
  }
  const mine = found.filter((file) => path.basename(file).includes(`${process.platform}-${arch}`));
  return mine[0] ?? (found.length === 1 ? found[0] : null);
};

// Generate the OCR test page from THIS repo's canvas (no committed binary).
const pagePath = path.join(outDir, 'synthetic-page.png');
{
  const require = createRequire(path.join(unpackedRoot, "native-gate.cjs"));
  const { createCanvas } = require('@napi-rs/canvas');
  const c = createCanvas(1600, 700); const ctx = c.getContext('2d');
  ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, 1600, 700); ctx.fillStyle = '#000';
  // Arial first: Windows has no Helvetica, and a missing font silently renders
  // nothing, which would read as an OCR failure rather than a font problem.
  ctx.font = 'bold 72px Arial, Helvetica, sans-serif'; ctx.fillText('WARRANTY DEED', 90, 160); ctx.fillText('VOLUME 244 PAGE 240', 90, 300);
  ctx.font = '56px Arial, Helvetica, sans-serif'; ctx.fillText('DIMMIT COUNTY TEXAS 1992', 90, 440); ctx.fillText('AUDIT GATE 7341', 90, 560);
  fs.writeFileSync(pagePath, c.toBuffer('image/png'));
}
const EXPECTED_OCR = ['WARRANTY', 'DEED', '244', '240', 'DIMMIT', '7341'];
// Stable core the MCP server must expose; new tools may be added over time, so
// require this subset rather than an exact count.
const REQUIRED_TOOLS = ['read_document_pages', 'save_extracted_instrument', 'get_title_chain', 'calculate_ownership', 'generate_report_draft', 'search_approved_files'];

function ocrGate() {
  return new Promise((resolve) => {
    const started = Date.now(); let stderr = ''; let settled = false;
    const finish = (v) => { if (settled) return; settled = true; clearTimeout(timer); resolve(v); };
    const child = fork(workerPath, [], { execPath, execArgv: [], env: { ...process.env, ELECTRON_RUN_AS_NODE: '1', TITLEDESK_OCR_CHILD: '1' }, serialization: 'advanced', stdio: ['ignore', 'ignore', 'pipe', 'ipc'] });
    const timer = setTimeout(() => { child.kill('SIGKILL'); finish({ status: 'TIMEOUT', seconds: 180, stderr: stderr.slice(-2000) }); }, 180_000);
    child.stderr.on('data', (c) => { stderr += c; });
    child.on('exit', (code, signal) => finish({ status: 'EXITED_EARLY', code, signal, stderr: stderr.slice(-2000) }));
    child.on('message', (m) => {
      if (!m || typeof m !== 'object') return;
      const seconds = (Date.now() - started) / 1000;
      if (m.type === 'result') {
        const text = (m.result.pages || []).join('\n');
        finish({ status: 'RESULT', seconds, method: m.result.method, ocrPages: m.result.ocrPages, reviewPages: m.result.reviewPages,
          pageCount: (m.result.pages || []).length, hits: EXPECTED_OCR.filter((w) => text.toUpperCase().includes(w)),
          expected: EXPECTED_OCR, textSample: text.replace(/\s+/g, ' ').slice(0, 240), stderr: stderr.slice(-1000) });
      } else if (m.type === 'error') finish({ status: 'WORKER_ERROR', seconds, error: m.error, stderr: stderr.slice(-2000) });
      try { child.send({ type: 'close' }); } catch {}
      setTimeout(() => child.kill(), 5000).unref();
    });
    child.send({ type: 'extract', id: 1, absPath: pagePath });
  });
}
function mcpGate() {
  return new Promise((resolve) => {
    const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'td-mcp-gate-')); const started = Date.now();
    let stdout = ''; let stderr = ''; let settled = false; let initialized = null;
    const finish = (v) => { if (settled) return; settled = true; clearTimeout(timer); child.kill(); resolve(v); };
    const child = spawn(execPath, [mcpPath], { env: { ...process.env, ELECTRON_RUN_AS_NODE: '1', TITLEDESK_MCP: '1', TITLEDESK_DATA_DIR: dataDir, TITLEDESK_TOOL_BRIDGE: 'http://127.0.0.1:9/unreachable', TITLEDESK_TOOL_TOKEN: 'audit-gate-token' }, stdio: ['pipe', 'pipe', 'pipe'] });
    const timer = setTimeout(() => finish({ status: 'TIMEOUT', seconds: 60, stderr: stderr.slice(-1500) }), 60_000);
    const write = (m) => child.stdin.write(JSON.stringify(m) + '\n');
    child.stderr.on('data', (c) => { stderr += c; });
    child.on('exit', (code, signal) => finish({ status: 'EXITED_EARLY', code, signal, stderr: stderr.slice(-1500) }));
    child.stdout.on('data', (c) => {
      stdout += c;
      for (const line of stdout.split('\n')) {
        if (!line.trim()) continue; let m; try { m = JSON.parse(line); } catch { continue; }
        if (m.id === 1 && m.result && !initialized) { initialized = m.result; write({ jsonrpc: '2.0', method: 'notifications/initialized' }); write({ jsonrpc: '2.0', id: 2, method: 'tools/list' }); }
        if (m.id === 2 && (m.result || m.error)) finish({ status: 'RESULT', seconds: (Date.now() - started) / 1000, serverInfo: initialized?.serverInfo, protocolVersion: initialized?.protocolVersion, tools: m.result ? m.result.tools.map((t) => t.name) : null, toolsError: m.error ?? null, stderr: stderr.slice(-800) });
      }
    });
    write({ jsonrpc: '2.0', id: 1, method: 'initialize', params: { protocolVersion: '2025-06-18', capabilities: {}, clientInfo: { name: 'titledesk-packaged-gate', version: '0' } } });
  });
}

const canvasNative = nativeIn('@napi-rs', `canvas-${{ darwin: 'darwin', win32: 'win32', linux: 'linux' }[process.platform] ?? process.platform}-${arch}${process.platform === 'win32' ? '-msvc' : process.platform === 'linux' ? '-gnu' : ''}`);
const sqliteNative = nativeIn('better-sqlite3', 'prebuilds');
for (const [name, found] of [['@napi-rs/canvas', canvasNative], ['better-sqlite3', sqliteNative]]) {
  if (!found) { log('MISSING native module for', name, 'under', unpackedRoot); process.exit(2); }
}
const result = { checkedAt: new Date().toISOString(), platform: process.platform, package: { version: packageVersion, app: appPath, executable: inspect(execPath), appAsar: inspect(appAsar), nativeModules: [inspect(canvasNative), inspect(sqliteNative)] }, workerPath, mcpPath, page: pagePath };
log('OCR gate: forking', workerPath); result.ocr = await ocrGate(); log('OCR', JSON.stringify(result.ocr));
log('MCP gate: spawning', mcpPath); result.mcp = await mcpGate(); log('MCP', JSON.stringify(result.mcp));
const missingTools = result.mcp.tools ? REQUIRED_TOOLS.filter((t) => !result.mcp.tools.includes(t)) : REQUIRED_TOOLS;
result.passed =
  result.package.nativeModules.every((i) => EXPECTED_FORMAT.test(i.format)) &&
  result.ocr.status === 'RESULT' && result.ocr.method === 'ocr' && EXPECTED_OCR.every((w) => result.ocr.hits.includes(w)) &&
  result.mcp.status === 'RESULT' && missingTools.length === 0 && result.mcp.serverInfo?.version === packageVersion;
result.missingTools = missingTools;
fs.writeFileSync(path.join(outDir, 'gate-result.json'), JSON.stringify(result, null, 2) + '\n');
log(result.passed ? 'PASS' : 'FAIL', 'tools=' + (result.mcp.tools?.length ?? 0), 'missing=' + missingTools.join(','));
process.exitCode = result.passed ? 0 : 1;

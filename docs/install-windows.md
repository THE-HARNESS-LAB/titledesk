# Install TitleDesk on Windows

**Requires:** Windows 10 or 11, 64-bit. About 700 MB free.

> **Current status:** Windows customer downloads are paused. Public v0.1.3 is an
> unsigned engineering-evaluation archive with no current native Windows install,
> SmartScreen, or end-to-end workflow qualification. Do not deploy it for customer work.

## 1. Obtain a qualified build

Use only a build supplied with a release-specific qualification record. The
[v0.1.3 release page](https://github.com/THE-HARNESS-LAB/titledesk/releases/tag/v0.1.3)
is retained as an archive, not as the current customer download.

## 2. Verify what you downloaded

Each release publishes a `SHA256SUMS` file. In PowerShell:

```powershell
Get-FileHash .\TitleDesk-Agent-<version>-win-x64-Setup.exe -Algorithm SHA256
```

Compare it with the entry in `SHA256SUMS`. The comparison is
**case-insensitive** — PowerShell prints uppercase, the checksum file is
lowercase. Same value either way.

If they do not match, stop and email
[sales@theharnesslab.com](mailto:sales@theharnesslab.com).

## 3. Install

Run the installer and follow the prompts. It installs per-user by default and
does not require administrator rights.

## 4. Activate

On first launch TitleDesk asks for an activation code. Use the one-time link in
your activation email, or paste the code.

Activation emails come from **`licenses@theharnesslab.com`**.

## About SmartScreen

An unsigned installer may cause Windows to show *"Windows protected your PC."*

Do not use **More info → Run anyway** as a substitute for current native qualification
or an organizational approval. A checksum verifies file identity, not release readiness.

If you are deploying across a company and would rather not have your landmen see
that prompt at all, contact
[sales@theharnesslab.com](mailto:sales@theharnesslab.com) to confirm the current
code-signing status and managed-deployment options before rollout.

## If it will not install

**Blocked by company policy** — many land departments restrict unsigned or
unknown installers. Send your IT administrator this page and the SHA256; they
can allow the specific hash.

**Installer starts then disappears** — this is usually an antivirus quarantine.
Check its quarantine log before re-running.

Anything else: email
[sales@theharnesslab.com](mailto:sales@theharnesslab.com) with the installer
version and what Windows displayed.

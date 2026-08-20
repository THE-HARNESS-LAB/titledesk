# Install TitleDesk on Windows

**Requires:** Windows 10 or 11, 64-bit. About 700 MB free.

## 1. Download

Get `TitleDesk-Agent-<version>-win-x64-Setup.exe` from the
[Releases page](../../releases).

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

The current public installer is not code-signed. Windows may show *"Windows
protected your PC."*

If you have verified the SHA256 above and the file came from this Releases page:
click **More info → Run anyway**.

If you are deploying across a company and would rather not have your landmen see
that prompt at all, contact
[sales@theharnesslab.com](mailto:sales@theharnesslab.com) — we can supply builds
suited to managed deployment.

## If it will not install

**Blocked by company policy** — many land departments restrict unsigned or
unknown installers. Send your IT administrator this page and the SHA256; they
can allow the specific hash.

**Installer starts then disappears** — this is usually an antivirus quarantine.
Check its quarantine log before re-running.

Anything else: email
[sales@theharnesslab.com](mailto:sales@theharnesslab.com) with the installer
version and what Windows displayed.

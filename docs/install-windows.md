# Install TitleDesk on Windows

**Requires:** Windows 10 or 11, 64-bit. About 700 MB free.

> **Current release:** TitleDesk Agent v0.2.13 — `TitleDesk-Agent-0.2.13-Windows-Setup.exe`,
> Authenticode-signed (publisher **Spencer Teague**) with an RFC 3161 timestamp.

## 1. Obtain the current build

Download through [title-desk.com/download](https://title-desk.com/download/), or take
the same installer from the [v0.2.13 release page](https://github.com/THE-HARNESS-LAB/titledesk/releases/tag/v0.2.13).

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

The installer is signed, but a newly signed publisher builds reputation with
SmartScreen over time, so Windows may still show *"Windows protected your PC."*
Click **More info**: it must name the publisher **Spencer Teague**. If it does,
**Run anyway** is safe; if it shows *Unknown publisher*, stop, verify the SHA-256 of a
fresh download, and contact support.

If you are deploying across a company and would rather not have your landmen see
that prompt at all, contact
[sales@theharnesslab.com](mailto:sales@theharnesslab.com) to confirm the current
code-signing status and managed-deployment options before rollout.

## If it will not install

**Blocked by company policy** — some land departments restrict installers by
publisher or hash. Send your IT administrator this page, the publisher name
(Spencer Teague) and the SHA-256; they can allow the specific signature or hash.

**Installer starts then disappears** — this is usually an antivirus quarantine.
Check its quarantine log before re-running.

Anything else: email
[sales@theharnesslab.com](mailto:sales@theharnesslab.com) with the installer
version and what Windows displayed.

# Install TitleDesk on macOS

**Requires:** macOS 12 (Monterey) or later. Separate Apple Silicon (`arm64`)
and Intel (`x64`) targets require separate native qualification. About 700 MB free.

> **Current status:** macOS customer downloads are paused. Archived Apple Silicon
> v0.1.3 reaches the activation screen but lacks the current customer workflow and
> remains unsigned and unnotarized. Archived Intel v0.1.3 has not passed native Intel
> execution and contains an arm64-only native dependency. Do not deploy either archive.

TitleDesk will tell you plainly if your Mac is too old, rather than installing
and failing on launch.

## 1. Obtain a qualified build

Use only a build supplied with a release-specific qualification record for your Mac's
architecture. The [v0.1.3 release page](https://github.com/THE-HARNESS-LAB/titledesk/releases/tag/v0.1.3)
is retained as an archive, not as the current customer download.

## 2. Verify what you downloaded

Each release publishes a `SHA256SUMS` file:

```bash
shasum -a 256 -c SHA256SUMS --ignore-missing
```

You should see `OK`. If not, stop and email
[sales@theharnesslab.com](mailto:sales@theharnesslab.com).

## 3. Install

Open the `.dmg` and drag **TitleDesk Agent** into **Applications**. Then eject
the disk image.

## 4. Activate

On first launch TitleDesk asks for an activation code. Use the one-time link in
your activation email, or paste the code.

Activation emails come from **`licenses@theharnesslab.com`**.

## About Gatekeeper

An unsigned or unnotarized DMG may be refused with *"cannot be opened because the
developer cannot be verified."* For a build you have been explicitly authorized to
evaluate, after verifying its SHA-256:

**System Settings → Privacy & Security**, scroll to the message about TitleDesk,
and choose **Open Anyway**.

Do not disable Gatekeeper globally (`spctl --master-disable`). It is a
system-wide protection, and turning it off to install one application leaves
every other download unchecked.

## If it will not open

**"TitleDesk Agent is damaged and can't be opened"** — verify the SHA-256 first.
If it does not match, delete that copy and download it again. If it does match,
the message may be Gatekeeper refusing the current unsigned evaluation build;
keep Gatekeeper enabled, use **Privacy & Security → Open Anyway** if macOS offers
it, or send the exact message to support. Do not strip quarantine attributes.

**It bounces in the Dock and quits** — send the crash report:
open **Console.app → Crash Reports**, find the TitleDesk entry, and email it to
[sales@theharnesslab.com](mailto:sales@theharnesslab.com).

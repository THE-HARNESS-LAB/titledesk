# Install TitleDesk on macOS

**Requires:** macOS 12 (Monterey) or later. Separate Apple Silicon (`arm64`)
and Intel (`x64`) targets require separate native qualification. About 700 MB free.

> **Current release:** TitleDesk Agent v0.2.8 — separate Apple Silicon and Intel
> images, each Developer ID signed, notarized and stapled.

TitleDesk will tell you plainly if your Mac is too old, rather than installing
and failing on launch.

## 1. Obtain the current build

Download through [title-desk.com/download](https://title-desk.com/download/), or take
the same image from the [v0.2.8 release page](https://github.com/THE-HARNESS-LAB/titledesk/releases/tag/v0.2.8). Apple menu → About This Mac: if the
Chip line says Apple M-anything, take Apple Silicon; otherwise take Intel.

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

Current images are signed with a Developer ID and notarized, so Gatekeeper opens
them without a prompt. If macOS says the image *"cannot be opened because the
developer cannot be verified"*, the file is not ours or was altered: delete it,
verify the SHA-256 of a fresh download against the published value, and do not
use **Open Anyway** on a mismatch.

Do not disable Gatekeeper globally (`spctl --master-disable`). It is a
system-wide protection, and turning it off to install one application leaves
every other download unchecked.

## If it will not open

**"TitleDesk Agent is damaged and can't be opened"** — verify the SHA-256 first.
If it does not match, delete that copy and download it again. If it does match,
keep Gatekeeper enabled and send the exact message to support. Do not strip
quarantine attributes.

**It bounces in the Dock and quits** — send the crash report:
open **Console.app → Crash Reports**, find the TitleDesk entry, and email it to
[sales@theharnesslab.com](mailto:sales@theharnesslab.com).

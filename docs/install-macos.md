# Install TitleDesk on macOS

**Requires:** macOS 12 (Monterey) or later. Separate Apple Silicon (`arm64`)
and Intel (`x64`) builds are published. About 700 MB free.

TitleDesk will tell you plainly if your Mac is too old, rather than installing
and failing on launch.

## 1. Download

Get `TitleDesk-Agent-<version>-mac-arm64-UNSIGNED-EVALUATION.dmg` for Apple
Silicon or `TitleDesk-Agent-<version>-mac-x64-UNSIGNED-EVALUATION.dmg` for an
Intel Mac from the [Releases page](../../releases).

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

The current public evaluation DMGs are not signed or notarized. macOS may refuse
one with *"cannot be opened because the developer cannot be verified."* After
you download it from this organization repository and verify its SHA-256:

**System Settings → Privacy & Security**, scroll to the message about TitleDesk,
and choose **Open Anyway**.

Do not disable Gatekeeper globally (`spctl --master-disable`). It is a
system-wide protection, and turning it off to install one application leaves
every other download unchecked.

## If it will not open

**"TitleDesk Agent is damaged and can't be opened"** — this usually means the
download was truncated or altered in transit. Re-download and re-check the
SHA256 before anything else.

**It bounces in the Dock and quits** — send the crash report:
open **Console.app → Crash Reports**, find the TitleDesk entry, and email it to
[sales@theharnesslab.com](mailto:sales@theharnesslab.com).

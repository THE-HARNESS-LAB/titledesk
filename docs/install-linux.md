# Install TitleDesk on Linux

The Linux download is an **AppImage** — a single file that runs without
installation and without root.

**Requires:** a 64-bit x86 Linux desktop (Ubuntu 22.04+, Fedora 38+, Debian 12+
or similar), about 700 MB free, and an unlocked GNOME Keyring/libsecret or
KWallet session. TitleDesk refuses to fall back to plaintext storage when no
secure keyring is available.

> **Current release:** TitleDesk Agent v0.2.13 — `TitleDesk-Agent-0.2.13-Linux.AppImage`,
> with a signed GitHub verification receipt from native Ubuntu OCR and AI-tool checks.

## 1. Obtain the current build

Download through [title-desk.com/download](https://title-desk.com/download/), or
take the same file from the [v0.2.13 release page](https://github.com/THE-HARNESS-LAB/titledesk/releases/tag/v0.2.13). The first time you run the
AppImage it adds itself to your applications menu.

## 2. Verify what you downloaded

Every release publishes a `SHA256SUMS` file. Check the file you received matches
before you run it:

```bash
sha256sum -c SHA256SUMS --ignore-missing
```

You should see `OK`. If you see `FAILED`, stop and email
[sales@theharnesslab.com](mailto:sales@theharnesslab.com) — do not run the file.

Verify the signed runtime receipt using GitHub CLI:

```bash
gh attestation verify TitleDesk-Agent-0.2.13-Linux.AppImage --repo THE-HARNESS-LAB/titledesk --predicate-type https://theharnesslab.com/attestations/packaged-runtime/v1 --signer-workflow THE-HARNESS-LAB/titledesk/.github/workflows/verify-linux.yml
```

## 3. Make it executable and run it

```bash
chmod +x "TitleDesk-Agent-0.2.13-Linux.AppImage"
./"TitleDesk-Agent-0.2.13-Linux.AppImage"
```

## 4. Activate

On first launch TitleDesk asks for an activation code. Use the one-time link in
your activation email, or paste the code directly.

Activation emails come from **`licenses@theharnesslab.com`**. If nothing has
arrived after ten minutes, check spam, then email
[sales@theharnesslab.com](mailto:sales@theharnesslab.com) from the address you
purchased with.

## Adding it to your applications menu

The AppImage runs from anywhere. To make it a normal desktop entry, move it
somewhere permanent and create a launcher:

```bash
mkdir -p ~/Applications ~/.local/share/applications
mv "TitleDesk-Agent-0.2.13-Linux.AppImage" ~/Applications/TitleDesk-Agent.AppImage

cat > ~/.local/share/applications/titledesk-agent.desktop <<'EOF'
[Desktop Entry]
Type=Application
Name=TitleDesk Agent
Exec=/home/YOUR-USERNAME/Applications/TitleDesk-Agent.AppImage
Icon=titledesk-agent
Categories=Office;
Terminal=false
EOF
```

Replace `YOUR-USERNAME`, then log out and back in if the entry does not appear.

## If it will not start

**`dlopen(): error loading libfuse.so.2`** — AppImages need FUSE 2:

```bash
sudo apt install libfuse2          # Debian / Ubuntu
sudo dnf install fuse-libs         # Fedora
```

Or run it without FUSE:

```bash
./TitleDesk-Agent.AppImage --appimage-extract-and-run
```

**A sandbox error mentioning `SUID`** — some distributions restrict unprivileged
user namespaces. Running with `--appimage-extract-and-run` usually clears it.

**A secure-storage or keyring error** — unlock your desktop login keyring and
open TitleDesk again. On a minimal desktop, install and start GNOME
Keyring/libsecret or KWallet before activating.

Anything else: email [sales@theharnesslab.com](mailto:sales@theharnesslab.com)
with the terminal output.

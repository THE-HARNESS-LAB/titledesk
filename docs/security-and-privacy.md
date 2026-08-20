# Security and privacy

The short version: **your title documents stay on your computer.** TitleDesk is
a desktop application, not a web service with a desktop wrapper.

For the formal document, see the
[privacy policy](https://title-desk.com/privacy/).

## What leaves your machine, and when

| | Leaves your computer? |
|---|---|
| Title documents, scans, county records | **No** |
| OCR text and extractions | **No** — OCR runs locally (Tesseract) |
| Ownership calculations, runsheets, reports | **No** |
| Project files and folders | **No** |
| Licence activation (device fingerprint, licence status) | Yes — to the licence server |
| Content you explicitly send to a connected AI | Yes — to the AI provider you chose |
| Files you sync to a Drive workspace you connected | Yes — to your own Google Drive |

Nothing in the first group has a code path off the machine. TitleDesk reads only
folders you approve, never modifies originals, and writes to the project's own
output folder.

## Working with no AI at all

TitleDesk functions with no AI account connected. Reading documents, the
runsheet, ownership arithmetic, deadlines, billing and report generation are all
local. Connecting an AI is optional and only adds drafting assistance.

This matters for a land department that cannot send client documents to a
third-party model: TitleDesk is useful with the AI switched off entirely.

## If you do connect an AI

The model receives a restricted toolset. It can read project files you approved
and search sources you approved, and it **proposes** findings. It cannot reach
other files on your computer, and it cannot act on your behalf outside that
toolset.

Every proposal stays *proposed* until you accept it. Every material number links
back to the source page it came from. You can run a local model through Ollama
if nothing may leave the machine at all — see [choosing an AI](choosing-an-ai.md).

## Google Drive, if you connect it

Drive is optional. When connected, TitleDesk distinguishes two things:

- **Company workspaces** — read-only by default. TitleDesk reads the company's
  records; it does not write into them unless the company has granted that.
- **Your personal workspace** — writing requires your explicit approval at the
  time it happens.

An independent contractor can hold several company configurations side by side.
They are isolated: one company's workspace cannot read another's.

You can disconnect Drive at any time, and remove a company workspace and all of
its local data from within the application.

## The record

The Activity log is append-only. TitleDesk cannot edit or delete entries in it —
not through the interface, and not through the AI. If a determination was
accepted, rejected or changed, that is on the record with who did it.

## Reporting a security problem

Email **[sales@theharnesslab.com](mailto:sales@theharnesslab.com)** with
"security" in the subject. Please do not open a public issue for a vulnerability.

Never send title documents, credentials, activation secrets or payment-card
details by email.

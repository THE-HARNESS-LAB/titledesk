<p align="center">
  <img src="docs/titledesk-agent-logo.png" alt="TitleDesk Agent — Title Intelligence for Oil &amp; Gas Landmen, by The Harness Lab" width="620">
</p>

<p align="center">
  <strong>The title workstation for petroleum landmen.</strong><br>
  Reads the records, builds the chain, computes ownership exactly, and produces the
  deliverable — on your own computer, with material figures linked to their source pages.
</p>

<p align="center">
  <a href="#downloads"><strong>Download v0.2.13</strong></a><br>
  <sub>
    <a href="https://title-desk.com/">Product site</a> ·
    <a href="https://title-desk.com/#buy">Pricing</a> ·
    <a href="docs/trials.md">Request an evaluation licence</a> ·
    <a href="docs/security-and-privacy.md">Security</a>
  </sub>
</p>

---

## The problem it solves

Much of a title project is repeatable: reading and indexing records,
cross-referencing instruments, transcribing parties and dates, recomputing
fractions, and retyping all of it into somebody's workbook. Those steps consume
the hours of the person whose judgment is actually needed.

TitleDesk absorbs that portion and hands back the part that matters — construing an
ambiguous conveyance, deciding a curative path, forming the opinion.

There is no universal time-savings number. County, document quality, assignment
scope, and the condition of the chain all matter. The honest way to qualify it is
to run a representative held-out assignment and compare elapsed time, accepted
rows, unsupported findings, and deliverable corrections against your existing process.

---

## Downloads

**Current release: [TitleDesk Agent v0.2.13](https://github.com/THE-HARNESS-LAB/titledesk/releases/tag/v0.2.13)** — released 2026-10-08.
Customers download through [title-desk.com/download](https://title-desk.com/download/), which serves these same
files behind a trial, a seat purchase, or an Enterprise demo; the release record here is the published source
of the bytes and their checksums. Existing customers can choose **I already have a code** on the download page and upgrade without a new checkout or card entry.

Version 0.2.13 adds assignment recovery, research time controls, supplied-record reuse and improved ownership and net-acre calculations. Packaged OCR and all 35 AI tools passed native checks on Apple silicon, Intel Mac, Windows and Linux.

| You have | Take |
|---|---|
| A Mac with Apple silicon (M1 or newer) | `TitleDesk-Agent-0.2.13-macOS-Apple-Silicon.dmg` — Developer ID signed, notarized, stapled |
| An Intel Mac | `TitleDesk-Agent-0.2.13-macOS-Intel.dmg` — Developer ID signed, notarized, stapled |
| Windows 10 / 11 (64-bit) | `TitleDesk-Agent-0.2.13-Windows-Setup.exe` — Authenticode-signed (Azure Artifact Signing), RFC 3161 timestamp |
| Linux (x86_64) | `TitleDesk-Agent-0.2.13-Linux.AppImage` — native Ubuntu package verification with a signed GitHub attestation |

This release carries `SHA256SUMS`. The Mac images are Developer ID signed, notarized and stapled; Windows is Authenticode signed and timestamped. The Linux package has a signed verification receipt from its native Ubuntu runtime checks. Verify it with:

```sh
gh attestation verify TitleDesk-Agent-0.2.13-Linux.AppImage --repo THE-HARNESS-LAB/titledesk --predicate-type https://theharnesslab.com/attestations/packaged-runtime/v1 --signer-workflow THE-HARNESS-LAB/titledesk/.github/workflows/verify-linux.yml
```

A matching checksum identifies the published bytes. Installed copies of 0.2.4 and later update themselves
to the current release the next time they are quit.

**Install guides:** [Windows](docs/install-windows.md) ·
[macOS](docs/install-macos.md) · [Linux](docs/install-linux.md) ·
**[First-run walkthrough](docs/first-run.md)**

---

## What it does

### Reading the records

- **On-device OCR.** Scanned county records are rasterised and read on your machine. No
  upload, no cloud queue, no per-page cost, and no account required to read a document.
- **Text-layer PDFs are read directly**, without needless OCR.
- **Built for multi-document county packages.** A pool of OCR workers keeps several
  documents in flight, and the interface reports document and page progress while the
  packet is processed. Throughput depends on scan quality and the customer's hardware.
- **Duplicate-safe.** Concurrent reads of the same scan coalesce on content hash, so a
  document that arrives twice is extracted once and flagged as a copy of the original.
- **Progress only moves forwards**, even though documents finish out of order.

### Understanding them

- **Deterministic classification.** Document type, recording details and parties are
  extracted by code, not by a model.
- **Conservative by design.** The classifier reports *nothing* rather than guessing.
- **It knows a ratification from what it ratifies.** A ratification opens by reciting
  another instrument; reading book and page from the body would file it as the wrong
  document. The filename is treated as the stronger evidence of a document's own
  recording, and the body value is retained separately as a referenced recording.
- **Nothing is accepted silently.** Every extracted date, party and fraction stays
  *proposed* until you accept it, and each carries a link back to the page image it came
  from.

### Doing the title work

| Area | What it covers |
|---|---|
| **Paste Assignment** | Paste the assignment letter exactly as your company sent it. TitleDesk reads out the tracts, parties, deadlines and what is actually being asked for, then builds the project from it |
| **Projects** | Multiple jobs, each with its own records, chain, deadlines and deliverable |
| **Documents** | Every instrument, its extraction, its source page, and its status |
| **Runsheet** | The chain as it stands, assembled from accepted instruments |
| **Ownership** | Mineral and leasehold interests computed with exact fractions |
| **Wells & Leases** | Well and lease records tied to the tracts they burden |
| **Map** | Plat and tract visualisation, including shapefile import |
| **Issues & Curative** | Defects with their provenance and status, so nothing is resolved twice or silently |
| **Heirship Tree** | Succession worked as a graph — heirs, affidavits, probate, per-stirpes and per-capita distribution |
| **Deadlines** | What is due, and when |
| **Owners & Offers** | Owner contact and offer tracking |
| **Time & Billing** | Hours and billing against the project |
| **Research** | Approved outside sources, searched from inside the workflow |

### Producing the deliverable

- **Reports fill your own workbook.** Not a generic export — TitleDesk writes into the
  spreadsheet your client already expects.
- **A row is never overwritten.** Keys of rows already written are tracked, so re-running
  a report adds rather than clobbers.
- **A column it did not match is never touched.** Your working columns stay yours.
- **Excel Template Mapper** teaches TitleDesk a new client workbook by mapping its
  columns once.
- **Submit Package** assembles the deliverable set for turn-in.

### Working in rounds

A title assignment is rarely finished in one pass, and TitleDesk does not pretend
otherwise. Work is split into what the software does and what the landman does; both run
at once, and when both halves are done they are assembled.

```
draft ──approve──> running ──app column done──> awaiting_landman
                                                      │ landman completes her column
                                                      ▼
                                                 assembling
                                       ┌──────────────┴──────────────┐
                              work outstanding                 nothing open
                                       ▼                              ▼
                            draft (round N+1)                      review
                                                                      │ landman accepts
                                                                      ▼
                                                                  complete
```

**What is still outstanding is computed from the project's own records** — documents
read, instruments accepted, fractions that balance, defects still open — never by asking
a model whether the work is done. Only the landman completes an assignment, and she may
complete one with items still open; what was outstanding at that moment is recorded
rather than discarded.

---

## Why the arithmetic matters

Ownership is computed with **exact integer fractions**, never decimals.

This is not a detail. As a decimal, one third is `0.333…`, and three of them do not sum
to one. Carried through a chain of title, that error compounds — and it compounds into
real money on a real mineral interest.

TitleDesk reports a tract as over-conveyed by exactly **`1/4`**. Never by
`0.24999999999999997`.

`1/3 + 1/3 + 1/3` balances to exactly `1`, and there is an automated test that says so.

---

## Your data stays yours

The full detail is in **[Security and privacy](docs/security-and-privacy.md)**. The short
version:

| | Leaves your computer? |
|---|---|
| Title documents, scans, county records | **No by default** — selected content leaves only when you explicitly send it to a connected service |
| OCR text and extractions | **No by default** — selected content leaves only when you explicitly send it to a connected service |
| Ownership calculations, runsheets, reports | **No by default** — a report leaves only when you explicitly export or upload it |
| Project files and folders | **No by default** — selected files leave only when you explicitly send or upload them |
| Licence activation (device fingerprint, licence status) | Yes — to the licence service only |
| Content you explicitly send to a connected AI | Yes — to the provider you chose |
| Files you sync to a Drive workspace you connected | Yes — to your own Google Drive |
| Data you explicitly send through an approved connector | Yes — to the HTTPS host you approved |

- **Encrypted at rest** with AES-256-GCM, the key held in the operating system's own
  keychain — Keychain on macOS, DPAPI on Windows, libsecret on Linux. Copying the
  database off the machine yields nothing readable. TitleDesk **refuses to start** if the
  keychain is unavailable rather than quietly falling back to plaintext.
- **The activity log is append-only**, enforced by database triggers. The application
  itself cannot alter or delete an entry.
- **Company Google Drive is treated as read-only by TitleDesk.** Both company and
  personal Drive connections use Google's narrow `drive.file` Picker scope, limited to
  items the user selects or the app creates. That Google scope is not itself read-only;
  TitleDesk's application rules and database guards refuse company-Drive writes.
- **App-connector destinations are allow-listed.** Until you approve a connector host,
  TitleDesk refuses to send data through that connector. AI, Drive, licensing and research
  destinations have their own visible controls.

### Working with AI — or without it

Local OCR, project files, exact-fraction arithmetic, deadlines, billing and report assembly run on your computer. Automated assignment research and examination use the connected AI you select, including a supported existing ChatGPT/Codex or Claude subscription.

When one *is* connected:

- It receives a **fixed, enumerated toolset** — no shell, no arbitrary file access, no
  arbitrary network. Anything not on that list is unreachable, however the model is
  prompted.
- **It proposes; a person disposes.** Nothing it suggests about your configuration takes
  effect until a human reads a plain-English description and approves it.
- Choose a **ChatGPT/Codex or Claude subscription**, **your own API key**, or a **local
  model via Ollama** if nothing may leave the machine at all.
  See [choosing an AI](docs/choosing-an-ai.md).

---

## Built to fit your company

Land departments do not run title the same way — the order of work, what gets approved
and by whom, what the deliverable must contain, which sources are authoritative.

- **Customization Lab** exists so a company can bend TitleDesk to how it actually works.
  State the difference in plain language — *"make me approve every instrument before it
  goes in the runsheet"* — and it adopts it. Every change is shown in plain English and
  takes effect only when someone approves it.
- **Special Requests** is available from every screen. Ask for something the application
  does not obviously let you do, in your own words. It returns a proposal you approve or
  decline; it never acts on its own.
- **Company and personal workspaces are isolated.** A company can configure TitleDesk
  once and distribute that configuration to its landmen. An independent contractor
  working for several operators can hold multiple company configurations side by side —
  one company's workspace cannot read another's, and a workspace can be removed from the
  machine entirely along with its data.
- **Guided onboarding.** *Getting started* is an agent, not a page of instructions: it
  tracks what you have and have not done, answers questions in your own words, and never
  leaves you at a dead end.

---

## Requirements

- **Windows** 10 or 11, 64-bit · **macOS** 12 (Monterey) or later · **Linux** 64-bit
- About 700 MB free
- Linux requires an unlocked GNOME Keyring/libsecret or KWallet session; TitleDesk will
  not fall back to plaintext storage if secure storage is unavailable
- **No internet required** for ordinary work. Activation needs a connection once, then
  TitleDesk keeps working offline for an extended period — a day in a courthouse
  basement with no signal will not lock you out.

---

## Try it

TitleDesk is commercial software; customer builds activate against a licence issued
at [title-desk.com/download](https://title-desk.com/download/).

- **Evaluating?** Start the 7-day Individual trial there (every feature, one computer;
  your card is verified with a $1 charge that is refunded immediately), or request the
  14-day Enterprise demo (free, no card, up to 5 computers). See [evaluating](docs/trials.md).
- **Buying?** The Individual seat is $199 a month and Enterprise seats are $349 per seat
  per month on a 12-month contract; both check out on the same page and the activation
  code arrives by email.
- **Deploying across a land department?** Email
  [sales@theharnesslab.com](mailto:sales@theharnesslab.com) and we will set it up rather
  than issuing individual trials.

---

## Support

TitleDesk is built and supported by The Harness Lab.

**[sales@theharnesslab.com](mailto:sales@theharnesslab.com)**

[Privacy policy](https://title-desk.com/privacy/) ·
[Terms](https://title-desk.com/terms/) ·
[FAQ](docs/faq.md)

Please don't send title documents, credentials, activation codes or payment-card details
by email — a description and a screenshot is enough to work from.

---

<p align="center">
  <a href="https://github.com/THE-HARNESS-LAB">
    <img src="docs/harness-lab-lockup-footer.png" alt="The Harness Lab" width="300">
  </a>
</p>

<p align="center">
<sub>TitleDesk Agent is a product of <a href="https://github.com/THE-HARNESS-LAB">The Harness Lab</a>.
This repository carries releases and documentation; the application source is not public.
Companies with procurement requirements around source escrow or security review should get in touch.</sub>
</p>

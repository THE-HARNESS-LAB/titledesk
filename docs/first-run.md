# TitleDesk Agent — First Run

*Everything from first launch to reading a real assignment*

> Roughly fifteen minutes. Install and activate first (see the installation guide), then work through the steps below in order. Everything here is reversible, and TitleDesk asks before it does anything that reaches outside your computer.

## Step 1. Let the onboarding agent lead — **Getting started ★**

Open **Getting started** in the left-hand menu. This is not a
page of instructions — it is a guided agent that tracks what you have and have not
done, and you can ask it questions in your own words as you go.
- It shows your real progress, computed from the state of the application, not
  a checklist you tick yourself.
- Nothing in it is a wall. If a step does not apply to you, it offers a way
  past it rather than blocking you.
- If you get stuck anywhere in this document, ask it there first.

It will lead you through Steps 2 and 3 below. They are written out here so you
know what is coming and why.

## Step 2. Connect an AI model — **Settings ⚙**

Open **Settings** and find **AI provider**.
Choose one under **Primary provider**, then
**Choose a model…**:

| Option | Use when

| ChatGPT / Codex subscription | You already pay for one. TitleDesk opens the official sign-in; it never sees your password or tokens.

| Claude subscription | Same — official sign-in, no stored credentials.

| Your own API key | Anthropic, OpenAI or a custom endpoint. Entered under **AI service keys** and stored in the system keychain.

| Local model (Ollama) | Nothing may leave the machine at all. Quality depends on the model you download.

| **No AI — local features only** | You want to evaluate TitleDesk with no model connected. Everything below still works; summaries are just shorter.

While you are on this screen, look at What the AI is allowed to
do. Those permissions are yours to set, and the AI cannot exceed them.

> Worth knowing: reading an assignment does not require an AI. TitleDesk always runs a deterministic pass first; a connected model can only add to what that found, and cannot remove a requirement the letter plainly stated. Connecting one gives a fuller summary, not a different set of facts.

## Step 3. Connect Google Drive — **Connections ⇄**

Open **Connections** and go to
**Folders & Google Drive**. Choose
**Using Google Drive?** and sign in.

> Read Google's consent screen before continuing. A company Drive connection
> should request read-only Drive access; a personal output Drive may request
> write access. If Google displays an unverified-app warning, or the requested
> scopes do not match what your organization approved, stop and contact
> [sales@theharnesslab.com](mailto:sales@theharnesslab.com). Do not bypass a
> security warning on the strength of this guide.

You will be asked **Whose Google Drive is this?**:
- **My company's Drive** — connected **read-only**.
  TitleDesk reads the records; it does not write into company folders.
- **My own Drive** — writing is possible, and each write asks
  for your approval at the time it happens.

You can also connect a plain folder on this computer instead, if the records are
local.

### Approving your company's own systems

The same screen has **Approved connector destinations**. This
is where you authorise any outside system TitleDesk may send data to — a county
clerk subscription, a records provider, or an internal system of your own.
- Enter the **HTTPS hostname** (https only).
- Say **What is it?** — e.g. "County clerk subscription".
- Optionally record **Why is it approved?** for your own audit trail.

If that list is empty, TitleDesk **refuses to send anywhere at all**.
Nothing reaches an outside system until you have named it here.

Sign-ins for those systems go under Company & personal
credentials (**Username**,
**Password or key**), stored encrypted on this machine.

## Step 4. Paste a real assignment — **Paste Assignment ✎**

This is the step that shows you what TitleDesk actually is.
- Open **Paste Assignment**.
- Under **The assignment**, paste the email or letter your
  company sent — **the whole thing, exactly as you received it**,
  including the header and any formatting. Do not summarise it.
- Press **Read my assignment**.

TitleDesk reads it the way a landman would — the tracts, the parties, the
deadlines, and what is actually being asked for — and sets the project up from it.
The result is split into three columns:
- **TitleDesk does it** — work it will carry out.
- **I do it** — work it is handing back to you, deliberately.
- **Still open** — anything it could not resolve from the
  letter, rather than guessing.

Use a real assignment if you can. A representative one tells you far more than a
tidy example would.

## Step 5. Ask for anything else — **Special requests**

**Special requests** is available from **every
screen**, not a menu item. If you want TitleDesk to do something it does not
obviously let you do, type it there in plain language
(**Type a special request…**).
- You can attach a file — it asks **Where is the file?**
  and offers Google Drive or **This computer**.
- It replies with a **proposal** you approve or decline. It does
  not act on its own.

## Step 6. Make it work your way — **Customization Lab ⚡**

**The Customization Lab exists for one purpose: to let a company bend
TitleDesk to how it actually works.** It was built for that, not added as a
settings page. Land departments do not run title the same way — the order of work,
what has to be approved and by whom, what the deliverable must contain, which
sources are authoritative. Rather than ship one opinion and ask your land department to conform
to it, TitleDesk lets you state the difference and adopts it.

Ask in plain language — for example:

*"Make me approve every instrument TitleDesk extracts
before it goes in the runsheet."*

Whatever you ask for arrives as a proposal in the queue below, with what would
change spelled out. **Nothing takes effect until someone reads it and presses
Approve.** The model can put a proposal in the queue; it cannot apply one.

The Lab also covers **Branding**,
**Report Layout** and **App Connectors**,
and shows which destinations are currently allowed to receive data.

> If anything does not behave as described here, email
> [sales@theharnesslab.com](mailto:sales@theharnesslab.com) with the app version
> and a screenshot that contains no title documents, credentials, or activation secrets.

  **The Harness Lab** · TitleDesk Agent 0.1.2

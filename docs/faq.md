# Frequently asked questions

### Can I download the current customer build?

Not yet. Customer downloads and self-service checkout are paused while the current
build completes packaged and native-platform qualification. Public v0.1.3 is an
engineering-evaluation archive, not the current customer release.

### Do my title documents go to the cloud?

Not during ordinary local work. OCR, extraction, ownership arithmetic and report
generation run on your computer. Selected content leaves only when you explicitly
send it to a connected AI, personal Drive, or approved connector. See
[security and privacy](security-and-privacy.md) for the full breakdown.

### Does it need an internet connection?

Only to activate, and periodically to confirm the licence is still valid. Once
activated, TitleDesk keeps working offline for an extended period — a day in a
courthouse basement with no signal will not stop you.

### Do I have to use AI?

No. TitleDesk is fully functional with no AI account connected. See
[choosing an AI](choosing-an-ai.md).

### Can I install it on more than one computer?

Current Solo and Enterprise purchases are counted per device: one seat is
one licensed computer. Some earlier contracts retain their original device
allowance; see [pricing](https://title-desk.com/#buy).

### I work for several companies. Will their data get mixed?

No. Each company configuration is an isolated workspace. One company's workspace
cannot read another's, and you switch between them explicitly. A company
workspace can also be removed from your computer entirely, along with its data.

### Can a company set TitleDesk up once and hand it to its landmen?

Yes. A company can configure policy, security posture and research procedure,
then distribute that configuration. The landman does not reassemble it. Contact
[sales@theharnesslab.com](mailto:sales@theharnesslab.com).

### Why does the ownership math matter so much?

Because decimals lie. `1/3` as a decimal is `0.333…`, and three of them do not
add to `1`. Run that through a chain of title and the error compounds into real
money. TitleDesk uses exact fractions, so `1/3 + 1/3 + 1/3` is exactly `1`, and
an over-conveyance is reported as an exact excess such as "over by `1/4`".

### Can I trust what the AI extracted?

You are not asked to. Every extracted date, party and fraction stays *proposed*
until you accept it, and every material number carries a link back to the page
it came from. The AI proposes; the landman decides.

### What happens when my licence expires?

TitleDesk switches to restricted, read-only operation. Existing work remains
readable and exportable, and your project files stay on disk; creating or changing
work requires an active licence.

### My activation link expired.

Paid-purchase activation links are single-use and last ten minutes. Evaluation
invitations remain redeemable until the deadline stated in the invitation. Email
[sales@theharnesslab.com](mailto:sales@theharnesslab.com) if you need a new link.

### The activation email never arrived.

It comes from **`licenses@theharnesslab.com`**. Check spam first, then email
[sales@theharnesslab.com](mailto:sales@theharnesslab.com) from the address you
purchased or requested with.

### Is the source code available?

No. TitleDesk is commercial software; this repository carries releases and
documentation only. Companies with procurement requirements around source
escrow or security review should contact
[sales@theharnesslab.com](mailto:sales@theharnesslab.com).

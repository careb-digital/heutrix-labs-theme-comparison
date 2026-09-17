# Heutrix acquisition launch pack

**Scheduled kickoff:** Monday 21 September 2026. **Prepared:** 13 September 2026. **Current campaign:** 21 September–16 October, Australia/Sydney. The original pack directory/date remains unchanged for stable links.

**Latest artwork update — 16 September:** All six affected scheduled attachments now use the consistent typography, spacing and corrected numbering: P05 image and P02/P06/P07/P08/P11 documents. Captions, document titles and original dates/times are retained. The live queue contains 12 campaign posts from 21 September to 16 October; the earlier extra 18 September P01 was already absent when this update began. See [the typography review](READINESS.md#typography-and-numbering-review--16-september-2026) for current evidence.

**Scheduling record — 15 September:** P01–P12 are scheduled on the Heutrix Labs company Page at 08:15 Sydney time, Monday/Wednesday/Friday, from 21 September to 16 October. Both existing P01 entries on 18 and 21 September are retained under the owner’s explicit instruction. Eleven new posts were scheduled and the final thirteen-entry queue verified. See the [publication log](READINESS.md#publication-log). No actual publication is claimed.

**Outreach review — 15 September:** Start with [which outreach suits Heutrix](CHANNEL-ANALYSIS.md) for the channel recommendation, buyer roles and partner priorities. [STRATEGY.md](STRATEGY.md) contains the refined execution and measurement rules. [OUTREACH-AND-REPLIES.md](OUTREACH-AND-REPLIES.md) adds seven approach/conversation scripts and two objection replies, with a scenario selector. The publishing desk and ZIP reflect the updated message library. See [updates and checks](READINESS.md#outreach-strategy-review--15-september-2026). No direct outreach is recorded; the company Page campaign is now scheduled.

**Historical owner update — 14 September:** Facebook was deferred and the owner supplied the [LinkedIn Page admin URL](https://www.linkedin.com/company/123474001/admin/dashboard/), initially naming Sachin as publisher. Founder drafts F01–F03 retain the Sachin, Rochelle, Janith order; F04 remains an optional reserve. The subsequent 15 September scheduling instruction and verified queue above control the current handoff.

**Content review — 14 September:** All 12 LinkedIn and 12 Facebook captions have been reviewed against the current strategy. Illustrative labels, the paid Diagnostics/free fit-call distinction, standalone Facebook wording and resource CTAs have been tightened. See the per-post review in [readiness](READINESS.md#strategy-and-content-review--14-september-2026).

Start with [the visual publishing desk](publishing-desk.html), which brings together the dated captions, artwork, documents, alt text and copy buttons for posts, outreach, replies and profiles. Use [the acquisition strategy](STRATEGY.md) for targeting and daily work, [the calendar](CALENDAR.md) for dates, and [the outreach and replies](OUTREACH-AND-REPLIES.md) for conversations. [Profile copy](PROFILE-COPY.md) contains Page and founder profile text. [Readiness and evidence](READINESS.md) is the single handoff record for launch decisions and checks.

## Package

- 12 LinkedIn Page captions and 12 shorter Facebook Page versions in `captions/`.
- Four founder posts, one per week, in `founder/`; F01 Sachin, F02 Rochelle and F03 Janith, each subject to their own wording review; F04 is unassigned.
- One finished image per campaign post in `images/`, plus a branded company Page banner. Some LinkedIn posts intentionally use text alone; their images support Facebook or provide an optional single-image version.
- Five LinkedIn PDF documents in `documents/`: five workflow questions (5 pages), illustrative no-build decision (4), three starting points (4), delivery method (4), and AI decision pathways (6). All 23 pages also have PNG exports in `document-pages/` and readable text in [the document transcript](DOCUMENT-TRANSCRIPTS.md).
- Completed outreach, referral, four distinct community posts, all three resource replies, objections and follow-ups. Bracketed fields occur only where a real person, agreed time or actual conversation must supply the detail.
- [Reusable production source](source/build_pack.py) and [the launch-image prompt](source/IMAGE-PROMPT.md). The conceptual launch illustration uses the built-in image generator; typography and workflow diagrams use editable layout source and the existing brand system.

The ZIP contains the publishing content, images, PDFs, editable sources and fonts. Extract it before opening `publishing-desk.html`. Evidence links into the wider Heutrix repository require the original workspace. For artwork updates use `source/build_pack.py --artwork-only P07` (replace P07 with the affected ID); the obsolete first-build caption generation is disabled to protect reviewed copy. For copy-only updates, refresh with `source/publishing_desk.py`; validate and package with `source/verify_pack.py`. `source/finalise_pack.py` is a historical one-off migration script and should not be rerun.

## Current use

1. Use the verified queue and calendar as the current schedule; do not recreate posts from the old target dates.
2. Use [readiness](READINESS.md) for Page access, scheduling evidence and actual publication updates. Preserve each founder’s separate draft authorship and wording review.
3. Shashane owns website/email enquiries, with Rochelle as backup. Janith's fit-call windows and Rochelle's backup windows are confirmed in the [execution record](../INITIAL-MOTION-EXECUTION.md); agree actual appointments individually.
4. Keep the public research shortlist and prepared scripts ready. Record only real, appropriately permissioned outreach and genuine enquiries in the live tracker. The Friday review remains established.

The original [52-post bank](../../linkedin/2026-launch/README.md) remains available. P01–P12 here are the production copies for this launch; Weeks 5–18 remain adaptive inventory for review after 16 October. This pack does not rename or overwrite the preserved weekly files.

## Brand refresh — 16 September 2026

Local P01–P12 graphics, all five swipe PDFs and their 23 page images, the publishing desk, company banner and avatar now use the selected layered logo. The source templates use the navy/teal palette. P01 was edited with the built-in image tool using the original poster and approved logo; only the upper-left wordmark was requested to change.

The scheduled LinkedIn queue was updated on 16 September: both P01 images, P05 and all five document attachments now use the refreshed local artwork. All 13 entries retain their dates and 08:15 time; five text-first entries retain their format. See [queue evidence](source/scheduling-verification.json). No immediate publication occurred. Use the current company Page cover from the v2 brand set.

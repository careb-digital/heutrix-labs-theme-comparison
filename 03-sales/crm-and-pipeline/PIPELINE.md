# CRM and pipeline specification

**Status:** initial manual outreach location and native tracker configured 15 September; full CRM and automated integrations remain open.

## Live outreach measurement workbook

**15 September 2026:** [Heutrix Outreach Operations — live Google Sheet](https://docs.google.com/spreadsheets/d/1Er5bZt5C-YCW3jdQR-MbQvlxnYe67VyyyXo5-JdaCwA/edit) implements the initial outreach event log and minimum weekly measures. It contains ten public business research records, zero sent contacts and no confirmed contact permissions. Its three sheets cover weekly measures, dated events and sourced research. See the [execution record](../../06-marketing/outreach/INITIAL-MOTION-EXECUTION.md) for counting rules, tailored openings, evidence and the recurring review.

The owner authorised the separate [Outreach folder](https://drive.google.com/drive/folders/1Z08mRSvuUwICz8ISi-Fv6ZLqCB6tIW-p) in hello@heutrix.com.au’s My Drive for live contact/consent records. The native Google Sheet is the live outreach event and measurement record, verified private to that account. Keep identifiable contact/consent evidence in this folder and use opaque contact tokens in the activity log. The local XLSX remains a public-research template; never sync real contact records back into Git. The initial test counts first milestones for one opportunity per organisation; add an opportunity ID before using it for repeat opportunities. Preserve the full minimum CRM fields below when configuring the live system. Blank operating inputs remain visible in the workbook until actual arrangements are confirmed.

## Lead lifecycle

`New → Contacting → Fit call booked → Fit assessed → Nurture / No fit / Opportunity`

## Opportunity stages

`Qualified → Diagnostic proposed / Transformation scoping / AI Guardrails scoping → Proposal sent → Decision → Closed won / Closed lost`

## Minimum fields

- contact and organisation;
- source and campaign;
- sector and workflow family;
- problem summary using non-sensitive language;
- decision-maker and workflow owner availability;
- preferred product route;
- safety/data-handling flag;
- next action, owner and due date;
- proposal value, stage and expected decision date; and
- reason code for no fit, nurture, no show or closed lost.

Do not store participant, patient, worker health or client credentials in the CRM unless the approved system and data standard explicitly permit it.

## Outreach comparison fields

**15 September 2026 proposal:** Add these fields when configuring the approved system for the [outreach test](../../06-marketing/outreach/launch-2026-09-14/STRATEGY.md). This specifies the record structure; no live CRM has been selected, configured or populated by this update. Keep actual prospect/contact and permission records outside Git.

| Field | Purpose |
|---|---|
| Organisation ID and contact ID | Deduplicate people, introductions and organisation-level opportunities |
| Recipient type | End buyer or referral partner; partner interest is not buyer qualification |
| Relationship origin | Existing relationship, welcomed introduction, partner introduction, researched permissioned approach, public-content inbound, community inbound or unknown |
| Delivery channel | Email, LinkedIn message, agreed phone call, in-person conversation or inbound form; separate from relationship origin |
| Research source and date | Evidence for the organisation/workflow hypothesis; not evidence of need or consent |
| Permission basis, scope, date and evidence reference | Reviewed basis for the specific contact; one requested resource does not authorise a sequence |
| Suppression state and date | Stop requests applied across operator channels; check before every approach |
| Campaign, workflow and message ID | Identify the audience/message combination, for example M14; no invented send date |
| First contact, reply and agreed follow-up dates | Actual activity only; silence does not justify extra messages or channel switching |
| Response type | No reply, courtesy, requested resource, relevant interest, decline, stop or other; keep requested resource distinct from a fit-call commitment |
| Introduction reference and outcome | Connect a partner to a welcomed provider introduction and its resulting call/opportunity without duplicate counting |
| Confirmed call, attendance, qualification and next step | Separate requests, agreed bookings, attended calls and suitable provider next steps |
| First-known source and volunteered supporting touchpoints | Preserve uncertainty; do not infer identity from resource use or install tracking |
| Actual acquisition time | Compare time per qualified provider next step; keep shared content time separately stated |

Use the existing lead and opportunity stages above. In reports, compute buyer response rates only from buyer contacts, report inbound separately, and count qualified opportunities by unique organisation. Attribute the same opportunity to one stated primary origin while retaining supporting touchpoints. Use “unknown” for missing facts and “not yet measurable” for zero denominators. A resource request, partner reply or fit-call booking alone is not a qualified opportunity.

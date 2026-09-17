# Risks and blockers

## Launch-blocking items

| Priority | Risk or blocker | Why it matters | Closure evidence |
|---|---|---|---|
| P0 | Website enquiry form does not send a real lead. | A success screen can appear without any enquiry reaching Heutrix. | Test submission received in the approved destination, with validated error and confirmation paths. |
| P0 | Full address, trading-name status, signing authority and formal notices details remain unresolved. Entity, ABN, ACN, GST non-registration and VIC 3978 are now verified in the [registration record](../01-company/identity-and-registrations/REGISTRATION-DETAILS.md), 8 September 2026. | Public and contractual identity may be incomplete or inconsistent. | Official evidence reference, verified company register and populated approved masters. |
| P0 | Legal pack is a pre-reconciliation draft and legal review is not evidenced. Native copies predate the verified registration particulars and contain retired service descriptions. | Heutrix should not onboard paid work on inconsistent or unapproved terms. | Reissued three-product masters and matching renders/ZIP; review register records legal review, owner approval, version and effective date. |
| P0 | Insurance evidence and approved insurance claims are absent. | Intended services may create uninsured or misstated exposure. | Current certificates and approved statement of scope/limits. |
| P0 | Approved systems and project data-handling process are undefined. | Real client information could be collected, accessed or retained unsafely. | Approved systems register plus tested intake, access, retention, deletion and incident process. |
| P0 | Operational names are partly recorded, but enquiry, fit-call, delivery and backup ownership are not fully approved. | Leads and project decisions may stall or be missed. | Role register with accountable owner and backup for each step. |
| P1 | Current pricing model assumptions and margin floor are not approved. | Earlier offers may be uneconomic at the modelled delivery effort. | Approved costs, bands, floor and exception authority. |
| P1 | Delivery capacity, start, acceptance, defect and change rules are unresolved. | Scope, timelines and handover could become ambiguous during the first engagement. | Approved delivery standard and completed synthetic rehearsal. |
| P1 | The Diagnostic operations pack predates the 3 September decisions and contains 30-minute/free-booking wording, the retired “Workflow Diagnostic” name, a fixed AUD 950 fee and pre-registration entity particulars. | Staff could qualify, quote or deliver from an obsolete master. | Reissued native files and packaged ZIP use Heutrix Diagnostics, the current 20-minute request/direct-booking rule, private written-scope pricing and verified particulars. |
| P1 | Resource release is approved and verified, but privacy-safe measurement has not been approved. | Unapproved tracking could create unclear privacy or contact expectations even though the resources themselves are ungated. | Approved privacy-safe attribution approach; matching notices and verification before any tracking is enabled. |
| P1 | Public route, mobile, keyboard-accessibility, download and truthful not-sent form-state checks passed on 3 September 2026, but analytics/privacy review and real-lead end-to-end QA remain incomplete. | The connected conversion path may fail or collect information inappropriately when it is introduced. | Approved analytics/privacy configuration and signed end-to-end launch QA evidence for the real lead destination. |
| P2 | The LinkedIn calendar is now activation-relative, but no activation date, publisher or first-four-week approval is recorded. | Scheduling the preserved dated files without those controls could make launch activity inconsistent. | Outreach gates closed; activation date, publisher and first four weeks approved. |
| P2 | Shared founder baseline and remote review controls are not yet established by the local folder setup. | Founders cloning committed history may miss the new hierarchy or integrate without the agreed review route. | Janith completes the [collaboration rollout](COLLABORATION-SETUP.md): reviewed baseline, selected remote, permissions/review configuration and pilot evidence. |
| P2 | Internal report applications contain nested Git repositories. | Adding them to the root repository without a decision can create embedded-repository confusion. | Owner chooses separate projects, submodules, history consolidation or archive; decision documented. |
| P2 | A separate legacy Codex project and pinned tasks still point to the former website location. | Future work can diverge across two Heutrix project roots. | Consolidation plan applied; obsolete project/tasks archived or clearly marked. |

## Closed or treated items

| Closed | Item | Evidence |
|---|---|---|
| 3 September 2026 | The public Worker exposed the retired pricing, six-service and “Safe AI” experience. | Cloudflare Worker version `d556eed0-aa28-4c65-87cd-722cceeaead2` now serves the three-product, no-pricing site. Live checks confirmed `/pricing` and `/safe-ai` redirects, the `/resources` journey, all controlled routes and all six approved downloads. |

## Market-validation risk recorded 5 September 2026

**P1 — proposed-price willingness to pay and repeatable delivery margin are not demonstrated across a target segment.** The integrated model’s margins depend on estimated scope hours and approved offshore arrangements. The [market-fit evaluation](../02-market-and-offers/ideal-client/MARKET-FIT-EVALUATION-2026-09-05.md) shows that 50% more labour hours takes Standard below the proposed 60% floor. **Owner:** Janith. **Closure evidence:** approve the test profile and commercial rules, complete at least two comparable paid engagements with actual cost/acceptance evidence, and review acquisition-adjusted contribution and outstanding stabilisation costs. This is an early validation gate before scaling, not a requirement to prove sales before the first properly approved engagement.

## Risk treatment rule

- P0: close before accepting or onboarding paid client work; form/identity issues should also close before public outreach at scale.
- P1: close before the affected claim, workflow or offer is used.
- P2: schedule and control; it should not silently become permanent debt.

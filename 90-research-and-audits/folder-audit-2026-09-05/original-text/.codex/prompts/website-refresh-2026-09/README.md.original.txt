# Heutrix website refresh prompts — September 2026

Use these prompts in order. They implement the refined website copy without recreating the retired pricing journey.

| Order | Prompt | Outcome |
|---:|---|---|
| 1 | [`01-implement-no-pricing-copy.md`](01-implement-no-pricing-copy.md) | Completed locally on 3 September 2026: application aligned to the three products, current CTA and no-pricing information architecture. Retained as implementation/verification guidance. |
| 2 | [`02-integrate-ungated-resources.md`](02-integrate-ungated-resources.md) | Completed locally on 3 September 2026: problem-matched resource journeys added. Release approval and distribution verification remain open. |
| 3 | [`03-release-qa-and-deploy.md`](03-release-qa-and-deploy.md) | Run final QA and deploy to the existing Cloudflare Worker only when the changed content's release gates are satisfied. |

Run any remaining prompt from the current Heutrix repository root while preserving the acceptance evidence from each stage. Do not use the former standalone website project as the source of truth.

The source of truth is [`06-marketing/website-copy/WEBSITE-REFINEMENT-BRIEF-2026-09-03.md`](../../../06-marketing/website-copy/WEBSITE-REFINEMENT-BRIEF-2026-09-03.md). The local build is aligned. The worker preview recorded in the current control register remains behind it until an authorised deployment and public-origin verification are completed.

Do not deploy the resource changes while the lead-magnet release row has no named owner, boundary reviewer and approval date. Implementation can be completed and tested locally while that gate is open.

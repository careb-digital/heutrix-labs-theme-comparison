# Heutrix operating workspace

This repository is the working operating system for launching Heutrix and taking it from prepared material to a business that can safely attract, qualify and onboard paid work.

The immediate outcome is not “more planning”. It is to make Heutrix:

1. **outreach-ready** — a defined market, offer, message, proof approach and working lead path; and
2. **onboarding-ready** — verified business details, approved terms, safe information handling, commercial rules and a repeatable delivery process.

The folder structure separates authoritative decisions and live operating assets from research, generated reports and superseded material.

## Founder collaboration

Start with the [founder workflow](00-control/COLLABORATION.md). Each of the seven business folders has a working guide and a `changes/` index. [Janith coordinates merges](01-company/founders-and-roles/ROLE-REGISTER.md#folder-ownership); folder owners remain deliberately unassigned. Shared decisions and source dependencies live in `00-control/`.

Use a separate working copy and short branch per task, then integrate reviewed work into `main`. The [rollout checklist](00-control/COLLABORATION-SETUP.md) identifies what remains before other founders clone the shared baseline; the local folder migration is not yet published by this setup.

## Start here

- [Launch board](00-control/LAUNCH-BOARD.md) — current readiness and next actions.
- [Risks and blockers](00-control/RISKS-AND-BLOCKERS.md) — what prevents outreach or onboarding.
- [Decision register](00-control/DECISIONS.md) — confirmed and unresolved owner decisions.
- [Verified facts](00-control/VERIFIED-FACTS.md) — claims that may safely guide work.
- [Content map](00-control/CONTENT-MAP.md) — where each type of material belongs.
- [Move manifest](00-control/MOVE-MANIFEST.md) — links from former locations to new locations.
- [Implementation comparison](00-control/IMPLEMENTATION-COMPARISON.md) — what is implemented and what remains from the recommended setup.

## Approved strategic direction

Heutrix is a workflow improvement, practical systems and safe-AI business. It starts with the workflow and uses technology only where it supports a defined operating result.

- **Primary launch segment:** Australian disability support providers.
- **Secondary launch segment:** allied health practices.
- **Future, not launch:** GP clinics.
- **Heutrix Diagnostics:** a standalone paid decision product.
- **Heutrix Workflow Transformation:** the primary implementation product.
- **Heutrix AI Guardrails:** practical workplace AI governance.

Do not represent Heutrix as providing legal, privacy, clinical, registration, audit or regulatory advice or outcomes. Do not turn illustrative or synthetic examples into client claims.

## Repository map

| Location | Purpose |
|---|---|
| [`00-control/`](00-control/) | Launch status, decisions, facts, risks, navigation and migration record. |
| [`01-company/`](01-company/) | Identity, registrations, roles, insurance and approved systems. |
| [`02-market-and-offers/`](02-market-and-offers/) | Ideal client, positioning, product architecture, pricing policy and proof. |
| [`03-sales/`](03-sales/) | Lead intake, pipeline, fit call, proposals and follow-up. |
| [`04-delivery/`](04-delivery/) | Delivery methods, service packs, acceptance standards and templates. |
| [`05-legal-privacy-risk/`](05-legal-privacy-risk/) | Legal masters, public policies, data handling and legal review. |
| [`06-marketing/`](06-marketing/) | Brand, website copy, LinkedIn, outreach and proof assets. |
| [`07-finance/`](07-finance/) | Pricing economics, forecasts, assumptions and operating budget. |
| [`08-client-project-template/`](08-client-project-template/) | Empty, reusable client engagement structure; never a live client-data store in Git. |
| [`apps/`](apps/) | The public website and internal report applications. |
| [`tools/`](tools/) | Local generated runtimes; maintained source tools sit with the workstream they support. |
| [`90-research-and-audits/`](90-research-and-audits/) | Historical inputs, assessments and evidence that are not current decisions. |
| [`99-archive/`](99-archive/) | Preserved release bundles and superseded exports. |
| [`.codex/`](.codex/) | Reusable Codex prompts for discrete launch workstreams. |

## Working rules

- Treat [`00-control/VERIFIED-FACTS.md`](00-control/VERIFIED-FACTS.md) and dated owner decisions as the authority for claims.
- Record a decision before silently reconciling conflicting prices, timelines, roles or promises.
- Keep client-identifiable, participant, worker, health and credential information out of Git.
- Use synthetic or explicitly de-identified material for demonstrations and tests.
- Keep source files and issued deliverables distinct during client work.
- Preserve existing work and Git history; do not delete nested repositories until their history has been deliberately consolidated or archived.

## Website development

The active Vite website now lives in [`apps/website/`](apps/website/).

```text
cd apps/website
npm run dev
npm run build
```

On Windows, use `npm.cmd` in place of `npm`. Dependency and build folders are ignored by Git and can be regenerated.

## Current readiness

The information architecture and public website are aligned to the 3 September 2026 decisions, and the major existing assets are preserved in their operational areas. The approved resource portfolio is live and verified; historical reports are explicitly superseded, and the pre–3 September legal and Diagnostic native packs are quarantined as drafts pending reissue. Heutrix is **not yet fully outreach- and onboarding-ready**. The working form, business identity, legal approval, insurance, commercial rules, approved systems, measurement and proof gates in the [launch board](00-control/LAUNCH-BOARD.md) still require completion.

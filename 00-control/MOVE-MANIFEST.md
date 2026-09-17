# Workspace move manifest

**Move date:** 2 September 2026  
**Scope:** Existing Heutrix materials were reorganised inside the same Git workspace. No business source material was intentionally discarded. Empty legacy output folders were removed after verification.

## Business material moves

| Former location | New location |
|---|---|
| `offer-strategy/` | [Offer strategy — September 2026](../02-market-and-offers/offers/offer-strategy-2026-09/) |
| `Client Legal Pack/` | [Client legal pack v1](../05-legal-privacy-risk/legal-masters/client-legal-pack-v1/) |
| `Operations Pack/` | [Diagnostics operations pack v1](../04-delivery/diagnostics/operations-pack-v1/) |
| `website-copy/` | [Website copy](../06-marketing/website-copy/) |
| `LinkedIn Posts/` | [2026 LinkedIn launch campaign](../06-marketing/linkedin/2026-launch/) |
| `Voice.md` | [Brand voice](../06-marketing/brand/VOICE.md) |
| `design.md` | [Visual design notes](../06-marketing/brand/DESIGN.md) |
| `HEUTRIX-LABS-LAUNCH-REVIEW.md` | [Website launch review](../90-research-and-audits/website-launch-review-2026-08/HEUTRIX-LABS-LAUNCH-REVIEW.md) |
| `Instructions.md`, `Notes.md`, `Answers.md`, `Examples.md`, `References.md` | [Legacy business context](../90-research-and-audits/legacy-business-context/) |
| `implementation-prompts/` | [Codex launch-workstream prompts](../.codex/prompts/launch-workstreams/) |

The tracked `website-copy/safe-ai.md` file was already deleted in the working tree before this restructure and was not recreated. Its current replacement is [`06-marketing/website-copy/ai-guardrails.md`](../06-marketing/website-copy/ai-guardrails.md), while `/safe-ai` remains a legacy application route.

On 3 September 2026, the active [`06-marketing/website-copy/pricing.md`](../06-marketing/website-copy/) page source was retired after the team decided to remove pricing from the public website. The preserved historical copy is [`99-archive/website-copy/2026-09-03/pricing.md`](../99-archive/website-copy/2026-09-03/pricing.md). Legacy `/pricing` traffic should redirect to `/services#how-engagements-are-agreed`.

## Application moves

| Former location | New location |
|---|---|
| Root `src/`, `index.html`, package/config files and generated local website folders | [Public website application](../apps/website/) |
| `stitch_code.html` | [Website reference HTML](../apps/website/reference/stitch_code.html) |
| `audit-site/` | [Website launch audit application](../apps/internal-reports/website-launch-audit/) |
| `heutrix-growth-report-site/` | [Growth report application](../apps/internal-reports/growth-report/) |

The two internal report applications retain their nested `.git` directories. Their histories were preserved rather than silently flattened into the root repository.

## Finance and generated analysis moves

| Former location | New location |
|---|---|
| Forecast workbook, images and audit outputs under `outputs/01a03ced-bf44-71d3-8a61-7816c61a946b/` | [Forecast analysis output](../07-finance/forecasts/analysis-output/) |
| Pricing notebook, report, plan, validation and images under the same output directory | [Pricing and margin analysis output](../07-finance/pricing-and-margins/analysis-output/) |
| `tools/audit-heutrix-forecast.mjs` and `tools/build-heutrix-forecast.mjs` | [Forecast tools](../07-finance/forecasts/tools/) |
| Pricing report/notebook scripts formerly under `tools/` | [Pricing and margin tools](../07-finance/pricing-and-margins/tools/) |
| `heutrix-audit-sites.tar.gz` | [2 September 2026 release archive](../99-archive/releases/2026-09-02/) |

## Generated directories intentionally not treated as business records

- `.python-libs/`
- `tools/.notebook-deps/`
- `tools/.python-packages/`

These are local dependency environments with restricted/generated contents. They remain in place and are excluded by `.gitignore`. They can be regenerated or removed in a separate cleanup once no process relies on them.

## Removed empty directories

- `output/`
- `outputs/` after its files were classified and moved
- `PDF/`
- `QA/`

Only empty directories were removed.

## Founder collaboration source move — 5 September 2026
The complete Sales process text was moved from `06-marketing/website-copy/see-where-heutrix-can-help-and-sales-process.md` to [03-sales/fit-call/SALES-PROCESS-SPECIFICATION.md](../03-sales/fit-call/SALES-PROCESS-SPECIFICATION.md). The original Marketing path now contains a navigation pointer, and current navigation links target Sales. Content and approval status were preserved; this move does not reissue the quarantined native Delivery pack. Marketing still owns page copy and campaign assets.

## Token-efficiency audit — 5 September 2026

- Sales process, founder trust layer and LinkedIn visual-library files are now section indexes; their complete content lives in adjacent `process-sections/`, `founder-trust-sections/` and `visual-prompts/` folders.
- Shared website wording and release material moved from its README to [SHARED-COPY-AND-RELEASE.md](../06-marketing/website-copy/SHARED-COPY-AND-RELEASE.md).
- Earlier collaboration recommendation and implementation comparison moved to [workspace history](../90-research-and-audits/workspace-history/); original paths remain pointers.
- The superseded Marketing case-study directory moved to [99-archive/case-studies-2026-09-04/](../99-archive/case-studies-2026-09-04/); current 15 case studies remain in Marketing.
- Machine-readable change and preservation evidence is in [the folder audit](../90-research-and-audits/folder-audit-2026-09-05/AUDIT.md).

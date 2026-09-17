# Heutrix website refinement brief — no pricing and integrated resources

**Prepared:** 3 September 2026  
**Last aligned:** 4 September 2026 against the evidence-refreshed Heutrix case-study collection  
**Scope:** Consolidated implementation direction for the active website copy and `apps/website/`  
**Target deployment:** `https://heutrix-labs.janith.workers.dev/`  
**Status:** Core copy ready for implementation. Case-study modules are prepared but gated; lead submission and legal release gates remain open.

## Outcome

The current page-per-route copy structure remains the controlled source because it maps cleanly to the website application and avoids one unmaintainable master-copy document. This brief consolidates the cross-site decisions, migration rules, resource journeys and implementation acceptance criteria that were previously spread across strategy, launch-control, lead-magnet and application material.

The public website should now do four things clearly:

1. Lead with Australian disability support providers and retain allied health as the secondary segment.
2. Present only Heutrix Diagnostics, Heutrix Workflow Transformation and Heutrix AI Guardrails.
3. Remove pricing as a public information-architecture branch.
4. Give visitors a useful, ungated resource before asking them to request a 20-minute workflow fit call.
5. Use approved, anonymised Heutrix delivery evidence where it helps a buyer assess fit, without implying 15 clients, audited outcomes or guaranteed results.

## Sources reconciled

Use the following precedence during implementation:

1. [`00-control/DECISIONS.md`](../../00-control/DECISIONS.md), [`VERIFIED-FACTS.md`](../../00-control/VERIFIED-FACTS.md) and [`RISKS-AND-BLOCKERS.md`](../../00-control/RISKS-AND-BLOCKERS.md).
2. The current [`README.md`](README.md) and page files in this directory.
3. The [case-study source-evidence map](../case-studies-and-assets/SOURCE-EVIDENCE-MAP.md), [case-study index](../case-studies-and-assets/README.md) and [proof-asset register](../case-studies-and-assets/PROOF-ASSET-REGISTER.md).
4. The September 2026 [offer strategy](../../02-market-and-offers/offers/offer-strategy-2026-09/) and [brand voice](../brand/VOICE.md).
5. The [lead-magnet release gate](../lead-magnets/README.md), [operating standard](../lead-magnets/LEAD-MAGNET-OPERATING-STANDARD.md) and [release manifest](../lead-magnets/RELEASE-MANIFEST.md).
6. The active local application in [`apps/website/`](../../apps/website/).
7. The August launch review only as historical evidence. Later confirmed decisions supersede its pricing, offer and proof assumptions.

The retired pricing-page copy is preserved at [`99-archive/website-copy/2026-09-03/pricing.md`](../../99-archive/website-copy/2026-09-03/pricing.md). It is not a current source.

## Material audit and consolidation result

| Material reviewed | Current role | Consolidation treatment |
|---|---|---|
| Launch board, decisions, verified facts, risks and content map | Controls what can be said and what remains blocked. | Updated with the no-pricing decision, resource-integration direction and live-site implementation gap. |
| Website-copy README and route files | Controlled public copy, hierarchy, labels and CTA language. | Retained as the page-level source; refined in place so implementation can map one file to one route. |
| Founder trust-layer specification | Proposed people, identity, proof and accountability content. | Kept as a separate gated implementation pack because most facts still require evidence or owner approval. None of its placeholders or held claims were promoted into public copy. |
| Evidence-refreshed Heutrix case studies | Fifteen anonymised case studies from delivery across four Australian disability support providers. | Added as gated proof modules on Home, Disability Providers, Services, About, AI Guardrails and FAQ. Claims retain their unit, evidence basis and limitation; allied-health examples remain illustrative. |
| Fit-call and sales-process specification | Detailed form, call, CRM, consent and follow-up rules. | Kept as a separate operating specification. Only its approved request-mode and resource-context rules are reflected in page copy. |
| September offer-strategy documents | Product architecture, audience, scope and commercial rules. | Marked where the 3 September no-pricing decision supersedes the earlier pricing-page treatment. |
| Brand voice and positioning | Naming, tone, claim boundaries and CTA conventions. | Updated so the no-pricing rule cannot be reversed by an older “withhold exact prices” instruction. |
| Lead-magnet portfolio, operating standard and manifest | Resource names, value, boundaries, files, hashes and release gate. | Mapped into Home, Services, both sector pages, AI Guardrails, FAQ, About and Contact. The release gate remains explicit. |
| `apps/website/` source and public downloads | Current local implementation candidate and distribution files. | Audited against the copy pack. Application changes are intentionally deferred to the Codex prompts; all six distribution hashes were confirmed against the manifest on 3 September 2026. |
| Deployed worker preview | Current public behaviour. | Recorded as stale: it still shows pricing, six retired services, “Safe AI”, the old call CTA and no dedicated Resources route. |
| August website launch review and internal audit app | Historical diagnosis and recommendations. | Preserved as evidence only. Later owner/team decisions, current registers and controlled copy take precedence. |
| Retired pricing page | Historical public-copy branch. | Moved to the archive and replaced by concise engagement-agreement wording on Home, Services, FAQ, Terms and Disclaimer. |

The result is one controlled page-copy pack, one cross-site refinement brief, one gated lead-magnet system and one sequential implementation-prompt set. No second master copy was created that could drift from the route files.

## Live-site gap confirmed on 3 September 2026

The deployed worker is behind the current source and copy pack.

| Live behaviour | Required state |
|---|---|
| Pricing appears in desktop navigation, mobile navigation, footer and repeated secondary CTAs. | No pricing navigation item or CTA on any viewport. |
| `/pricing` publishes starting prices and the retired service menu. | Redirect `/pricing` to `/services#how-engagements-are-agreed`; do not render pricing content. |
| Services presents six separate offers. | Present only Diagnostics, Workflow Transformation and AI Guardrails. Keep dashboards, trackers, forms, automation and lightweight tools inside Workflow Transformation. |
| “Safe AI” and “Safe AI Setup” are public names. | Use Heutrix AI Guardrails. Redirect legacy `/safe-ai` to `/ai-guardrails`. |
| “Book a free fit call” is used despite the absence of a working scheduler. | Use “Request a free consultation” and the current request-mode button “Request my 20-minute call”. |
| `/resources` falls back to the homepage and is absent from navigation. | Publish a dedicated Resources route and add Resources to main and footer navigation after the release gate is approved. |
| The contact form asks visitors to choose from six services and a “preferred next step”, including View pricing. | Do not ask an unsure visitor to choose a product or technology. Use the controlled qualification fields in [`contact.md`](contact.md). |
| The visible examples are not consistently labelled as illustrative. | Put “Illustrative example — not a client result” on each relevant visual or example group. |

## Target sitemap and page jobs

| Route | Primary job | Resource role |
|---|---|---|
| `/` | Explain the problem, the three starting points and Workflow Transformation as the primary implementation product. | Feature the Workflow Bottleneck Scorecard and, after approval, a compact onboarding/reminders/reconciliation proof module. |
| `/services` | Help a buyer choose among the three products by the decision in front of them. | Match all three resources to their natural paid bridge and show approved evidence under Workflow Transformation and the combined Workflow Transformation/AI Guardrails case. Include `id="how-engagements-are-agreed"` on the written-scope section. |
| `/disability-providers` | Lead the launch segment with intake/referral, reporting and evidence/document workflow problems. | Feature the Enquiry-to-Service-Start Visibility Starter Kit and, after approval, the detailed disability-provider case-study module. |
| `/allied-health` | Explain the secondary-segment fit without giving it equal homepage weight. | Feature the Workflow Bottleneck Scorecard using referral, intake, reporting and document examples. Keep examples illustrative because the current case evidence is disability-provider delivery. |
| `/ai-guardrails` | Explain practical workplace AI boundaries and accountable review. | Feature the AI Guardrails Staff Starter Pack and, after approval, the bounded shift-note summarisation case. |
| `/resources` | Provide all three complete resources without an email gate. | Explain immediate value, information boundaries and the next paid bridge for each resource. |
| `/about` | Explain the verified operating approach without publishing unverified founder, identity or insurance claims. | Offer Resources as the self-guided next step and add the approved, anonymised delivery-experience summary when its separate gate closes. |
| `/faq` | Answer product, timing, proof, resource, information-handling and boundary questions. | Explain that case studies are anonymised delivery evidence across four providers and that resources are ungated and not approvals, advice, proof or contact consent. |
| `/contact` | Request a 20-minute, no-obligation workflow fit call using only high-level, non-sensitive information. | Preserve source/resource context and ask only for a high-level conclusion; never request a completed workbook. |
| `/privacy-and-data-handling`, `/terms-of-use`, `/website-disclaimer` | State the reviewed operational and legal boundaries. | Cover downloads, synthetic/de-identified use, no contact permission and no organisational approval. |

Retired paths:

- `/pricing` → `/services#how-engagements-are-agreed`
- `/safe-ai` → `/ai-guardrails`

Retired paths must not appear in navigation, internal links, canonical metadata, structured data or the sitemap.

## Site-wide conversion flow

```text
Recognise one recurring problem
        ↓
Use one relevant ungated resource
        ↓
Identify a high-level priority, gap or question
        ↓
See the matching Heutrix product or request a 20-minute fit call
        ↓
Receive Diagnostics, Workflow Transformation, AI Guardrails or no-project direction
```

The resources should not create a second lead-capture funnel. The complete files are delivered immediately. A download is not a lead, consent signal, client result or organisational approval.

## CTA and destination map

| Intent | Label | Destination |
|---|---|---|
| Primary site conversion | Request a free consultation | `/contact` |
| Request-mode form submission | Request my 20-minute call | Real lead endpoint when approved; never local-only success |
| Product overview | View the three products / View services | `/services` |
| Self-guided path | View free resources | `/resources` |
| Diagnostics | Explore Heutrix Diagnostics | `/contact?service=heutrix-diagnostics` |
| Workflow Transformation | Transform a workflow | `/contact?service=heutrix-workflow-transformation` |
| AI Guardrails | Put AI guardrails in place | `/contact?service=heutrix-ai-guardrails` |
| Scorecard | Use the Workflow Bottleneck Scorecard | `/resources#workflow-bottleneck-scorecard` |
| Visibility kit | Use the Visibility Starter Kit | `/resources#enquiry-to-service-start-starter-kit` |
| AI starter pack | Use the AI Guardrails Starter Pack | `/resources#ai-guardrails-staff-starter-pack` |

## Controlled download map

| Resource | Guide | Workbook |
|---|---|---|
| Workflow Bottleneck Scorecard | `/downloads/workflow-bottleneck-scorecard-guide.pdf` | `/downloads/workflow-bottleneck-scorecard.xlsx` |
| Enquiry-to-Service-Start Visibility Starter Kit | `/downloads/enquiry-to-service-start-starter-kit-guide.pdf` | `/downloads/enquiry-to-service-start-starter-kit.xlsx` |
| AI Guardrails Staff Starter Pack | `/downloads/ai-guardrails-staff-starter-pack-guide.pdf` | `/downloads/ai-guardrails-staff-starter-pack.xlsx` |

Use the website distribution copies in `apps/website/public/downloads/`. Their hashes must match `06-marketing/lead-magnets/RELEASE-MANIFEST.md` immediately before deployment.

## Pricing-removal rule

Remove all public pricing mechanisms, including:

- pricing navigation and footer links;
- pricing buttons and secondary CTAs;
- the pricing page and `PricingPage` rendering;
- public pricing data exports, rows, factors and pricing exclusions in the website bundle;
- dormant pricing components that could be imported later;
- pricing metadata, canonical entries and sitemap entries;
- “How much does it cost?” and “exact prices are not published” copy; and
- visible dollar amounts, starting ranges and `+ GST` statements.

Retain only concise engagement wording where it helps set expectations:

> If there is a suitable paid next step, its deliverables, responsibilities, assumptions, dependencies, exclusions, timing, third-party costs, acceptance criteria, change triggers and applicable fee are confirmed in writing before work begins.

This is commercial-boundary copy, not a substitute pricing page.

## Copy and claims rules

- Use Australian English, a calm practical tone and workflow-first language.
- Lead general pages with disability support providers; allied health remains secondary.
- Use the three exact public product names.
- Do not publish GP clinics as a launch segment.
- Do not imply legal, privacy, clinical, audit, registration, compliance or regulatory advice or outcomes.
- Do not publish unverified tools, integrations, founder biographies, identity details, insurance, locations, testimonials, time savings or guarantees. Evidence-refreshed case-study claims may be published only after their final claim, confidentiality and owner approval is recorded.
- Keep the four source providers unnamed, disclose that the 15 case studies span four providers, retain approximate units and limitations, and do not present client feedback as an independent audit or verbatim testimonial.
- Label examples and demonstrations as illustrative or synthetic; never present them as client outcomes.
- Keep the initial request high-level and non-sensitive. Do not accept uploads.
- Do not show a success state unless the server confirms receipt.
- Keep Resources ungated. Any optional marketing permission must remain separate from direct call-request permission.

## Implementation acceptance criteria

The copy implementation is complete only when:

1. All active routes render the controlled page copy and correct metadata.
2. No pricing item, CTA, public amount or pricing component remains in the rendered site or active website content bundle.
3. `/pricing` redirects to `/services#how-engagements-are-agreed` without rendering the retired page.
4. Only the three current products appear in service cards, forms, CTAs and FAQ copy.
5. `/safe-ai` redirects to `/ai-guardrails` and all visible labels use Heutrix AI Guardrails.
6. The Resources route, three resource cards and all six files work on desktop and mobile after release approval.
7. Home, Services, Disability Providers, Allied Health and AI Guardrails use the resource placements in this brief.
8. Resource downloads do not request an email address or create contact consent.
9. Contact preserves source/resource context without asking for completed files or sensitive information.
10. Unknown paths have an intentional not-found experience rather than silently rendering Home.
11. `npm.cmd run build` passes, and navigation, legacy redirects, downloads and the request form are browser-tested.
12. The deployed worker is inspected after deployment; a successful command alone is not release evidence.
13. Every enabled case-study module exactly matches the approved source-evidence wording, contains no identifying source material and links to the relevant product; gated modules are absent in full until approval.

## Release gates that remain open

The refined copy does not close these operational gates:

- The lead-magnet register still needs a named review owner, boundary reviewer, approval date, release status and review trigger.
- The lead destination, lead owner, caller, backup, scheduler and truthful receipt/error path are not yet evidenced as operational.
- The legal review register says the public privacy and terms material must not be represented as approved legal notices.
- Founder, entity, insurance, service-area and unrelated tool-capability claims remain unverified.
- The case-study collection is evidence-refreshed, but final claim, confidentiality and owner approval remains open. Do not render its prepared website modules until that gate closes.

Do not turn a copy implementation into a claim that the website is conversion-ready or legally approved.

## Codex implementation prompts

Use the sequential prompts in [`../../.codex/prompts/website-refresh-2026-09/`](../../.codex/prompts/website-refresh-2026-09/):

1. Implement the three-product, no-pricing copy architecture.
2. Integrate and verify the ungated resource journeys.
3. Run release QA and deploy the worker preview when all publication gates for the changed content are satisfied.

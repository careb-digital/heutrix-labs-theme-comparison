# Heutrix canonical website: implementation audit

Audited 8 September 2026. Sole production base: [Heutrix original-theme](https://heutrix-labs-original-theme.janith.workers.dev/).

**No website, source implementation, deployment, form integration or configuration was changed.** Audit evidence and this report were saved in a separate audit folder. Synthetic form entries were used only to review local drafts; no email or referral was sent and no booking was made.

The current site is substantially aligned with the three-offer, disability-provider direction. The remaining production conversion dependency is the intentionally unfinished enquiry/booking handoff. Concrete defects include the AI Guard section anchor and a reporting-example CTA that lands on a hub without a reporting example. Audience consistency, attributable proof and resource-to-enquiry continuity are the main content improvements.

## Baseline and evidence

- The production brief in the existing **Transform Heutrix Labs website** task establishes: Australian disability service providers, initially NDIS relevance; a 20-minute introductory conversation; workflow resources as secondary conversion; Heutrix Diagnostics, Heutrix Workflow Transformation and Heutrix AI Guard; workflow first, technology second; credible evidence; original-theme identity.
- The newer [CTA Style Guide](../comparison/CTA-STYLE-GUIDE.md) supersedes the earlier “See what Heutrix can improve” button concept with **Talk to Heutrix**. Its draft-form exception explicitly requires **Review My Enquiry → Open Email Draft** until real delivery exists. These are correct current labels, not CTA conflicts.
- The [canonical README](../comparison/README.md) records the owner's intentional deferral of the Google connection. F01 remains an open production dependency rather than an instruction to enable it during this audit.
- Inspected all **20 sitemap pages**, **14 legacy redirects**, **six downloads**, robots/sitemap and two representative missing routes. Public routes were reconciled against the canonical route implementation and live links. Unlinked arbitrary URLs cannot be exhaustively enumerated; no additional content routes were declared in that implementation.
- Browser checks covered 20 pages at **1440, 390 and 320 pixels**: 60 checks, one H1 per page, no horizontal overflow or page-script errors observed. This is not a full accessibility, performance or legal audit. Homepage desktop/mobile screenshots were also visually inspected.
- Expanded all 17 FAQ answers and homepage FAQs; exercised all six homepage pressure points; completed one synthetic path through each assessment; reviewed contact and referral drafts. Waited for lazy-loaded example articles before recording final content.
- All 20 pages returned 200; six download hashes matched the local canonical files. Fourteen redirects returned 301; missing page/example routes returned 404. GET /api/requests returned 405. Its POST-unavailable behavior is source-observed, not a submitted live test.
- PDF text and link annotations, workbook cell content/hyperlinks and the fetched production bundle were searched for legacy terms. Download content review did not recalculate workbook formulas or certify PDF layout.

## Severity and implementation backlog

**P0:** blocks production or materially harms conversion/trust. **P1:** significant improvement. **P2:** optimisation. Ratings reflect impact on this site's production goal, not a generic defect score. There is one P0 dependency, eight P1 findings and eight P2 findings.

| ID | Severity | Finding | Affected area |
|---|---|---|---|
| F01 | P0 | Complete the primary conversion handoff | /contact; /refer; all commercial CTAs |
| F02 | P1 | Repair the AI Guard section link | /services#heutrix-ai-guardrails |
| F03 | P1 | Repair the reporting-example journey | / — pressure point 5 |
| F04 | P1 | Reinforce the disability-provider ICP | Shared footer; /services; /ai-guardrails; /allied-health; /about; /privacy-and-data-handling |
| F05 | P1 | Add attributable evidence of who delivers the work | /; /about; /case-studies and details |
| F06 | P1 | Resolve the platform-replacement contradiction | / — “Will this replace our existing systems?”; /faq; /services; /disability-providers |
| F07 | P1 | Make the scorecard promise match the chosen format | /services; /faq; /allied-health; /resources/workflow-bottleneck-scorecard |
| F08 | P1 | Give downloaded resources a route back to Heutrix | All three PDF guides and three workbooks |
| F09 | P1 | Clarify website-specific information handling | /privacy-and-data-handling; /contact; /refer |
| F10 | P2 | Finish terminology and CTA cleanup | / expanded FAQ; every HTML noscript fallback; /faq timing answer; homepage carousel; example detail endings |
| F11 | P2 | Reduce repetition and density | /services; /case-studies; example details; shared footer |
| F12 | P2 | Improve route metadata and search presentation | All routes; especially three example details |
| F13 | P2 | Reduce initial enquiry effort | /contact; /refer |
| F14 | P2 | Align resource names and microcopy | Resource promotions, /resources and three tool routes; /privacy-and-data-handling |
| F15 | P2 | Keep internal legacy content from returning | Canonical source components, not live routes |
| F16 | P2 | Measure real conversions | Primary and resource journeys |
| F17 | P2 | Improve evaluation detail without adding promises | /services; /faq |

### F01 · P0 · Complete the primary conversion handoff

**Where:** /contact; /refer; all commercial CTAs.

**Observed:** The live form stops at a reviewed email draft. No calendar is visible. A visitor must open an email app and send manually; the site cannot confirm receipt or a booking. The reserved endpoint rejects GET (405); local canonical handler explicitly returns 503 for POST. No POST was made in this audit.

**Recommended implementation:** Production-conversion blocker, deliberately deferred in the earlier task—not a claim that the current draft flow is broken. Connect the agreed enquiry/booking destination, verify receipt, failure and retry handling, and show success only after delivery. Preserve the truthful draft fallback until then.

### F02 · P1 · Repair the AI Guard section link

**Where:** /services#heutrix-ai-guardrails.

**Observed:** The decision table links to #heutrix-ai-guardrails; the live target is id="heutrix-ai-guard". The link cannot scroll to the offer.

**Recommended implementation:** Point the link at the current ID and preserve a legacy alias if old links must work. Keep the working /ai-guardrails route and enquiry service parameter compatible.

### F03 · P1 · Repair the reporting-example journey

**Where:** / — pressure point 5.

**Observed:** “Explore a reporting example” goes through /case-studies/power-bi-invoice-reconciliation (301) to /case-studies, whose three examples cover onboarding, payment reminders and action follow-up.

**Recommended implementation:** Use an accurate destination/label or publish an explicitly illustrative reporting example. Do not restore an unverified old client narrative.

### F04 · P1 · Reinforce the disability-provider ICP

**Where:** Shared footer; /services; /ai-guardrails; /allied-health; /about; /privacy-and-data-handling.

**Observed:** The homepage leads with disability providers, but equal audience language survives in Services and AI Guard meta descriptions. Shared footer copy and navigation continually promote allied health; the homepage gives it a second audience card.

**Recommended implementation:** Make disability service providers the consistent primary audience in shared copy and metadata. Keep allied health only as an explicitly secondary comparable-workflow audience if still intended. Historical allied-health experience is not itself conflicting positioning.

### F05 · P1 · Add attributable evidence of who delivers the work

**Where:** /; /about; /case-studies and details.

**Observed:** Three examples are honestly illustrative, but no verified client result or testimonial is presented. About refers to a founding team and first-hand operating experience without naming people or explaining attributable roles and credentials.

**Recommended implementation:** Add verified, consented founder/team background and eventually a substantiated provider case with baseline, scope, result and limitations. Keep illustrative examples labelled until evidence exists.

### F06 · P1 · Resolve the platform-replacement contradiction

**Where:** / — “Will this replace our existing systems?”; /faq; /services; /disability-providers.

**Observed:** Homepage answer begins “Not necessarily” and allows “replacement” subject to scope. Dedicated FAQ says Heutrix does not replace the core practice/client/case-management system; provider H1 makes the same promise.

**Recommended implementation:** Distinguish changes to peripheral workflow tools from replacement of the provider’s core platform, then use the same boundary across these pages.

### F07 · P1 · Make the scorecard promise match the chosen format

**Where:** /services; /faq; /allied-health; /resources/workflow-bottleneck-scorecard.

**Observed:** Resource cards promise comparison of up to 12 workflows. “Get the Scorecard” opens a one-workflow assessment, which explicitly says it does not compare every workflow. The workbook supports comparison.

**Recommended implementation:** Explain online single-workflow check versus downloadable multi-workflow scorecard before the CTA. Make the recommended first action unambiguous.

### F08 · P1 · Give downloaded resources a route back to Heutrix

**Where:** All three PDF guides and three workbooks.

**Observed:** Each PDF ends with “Talk to Heutrix” but contains no link annotations or contact URL/email in extracted text. Workbook cell/hyperlink inspection also found no contact link. Branding and service bridges do not create an actionable enquiry path offline.

**Recommended implementation:** Add a visible canonical contact URL and clickable link to each guide and workbook, alongside the actual 20-minute introductory-conversation wording. Keep resources ungated.

### F09 · P1 · Clarify website-specific information handling

**Where:** /privacy-and-data-handling; /contact; /refer.

**Observed:** The privacy page describes project principles and the email-draft mechanism. It does not clearly explain what happens to business enquiry emails once received, retention, service providers, or a specific privacy-request process. The resources paragraph refers to an “approved lead record” despite the draft-only site flow.

**Recommended implementation:** Describe the actual website/email handling and contact process separately from project controls; align it with the future connection when enabled. This is a content-completeness finding, not a legal compliance determination.

### F10 · P2 · Finish terminology and CTA cleanup

**Where:** / expanded FAQ; every HTML noscript fallback; /faq timing answer; homepage carousel; example detail endings.

**Observed:** “free consultation” remains in the homepage FAQ answer and common noscript text. The FAQ timing answer calls the service “AI Guardrails”. Carousel says “Find your workflow bottleneck”; example endings say “start the workflow scorecard” instead of the approved resource CTA.

**Recommended implementation:** Use introductory conversation and Heutrix AI Guard for the paid offer; standardise resource conversion actions to Get the Scorecard. Retain descriptive “AI guardrails” for controls, the free pack and compatible URLs.

### F11 · P2 · Reduce repetition and density

**Where:** /services; /case-studies; example details; shared footer.

**Observed:** Services repeats the three-product proposition before extensive lists; the case hub shows the same three examples as featured cards and a filtered list; detail pages repeat the illustrative warning twice near the top. Service boundaries recur in page bodies, legal pages and every footer.

**Recommended implementation:** Keep the short comparison, move detailed evaluation content into scannable sections, consolidate the three-example listing, and retain one clear evidence label and proportionate boundary copy.

### F12 · P2 · Improve route metadata and search presentation

**Where:** All routes; especially three example details.

**Observed:** Each route has a title, description, same-origin canonical and social fields. All three example descriptions are identical. All share one social image and there is no JSON-LD in rendered pages. Page body content is absent from the raw HTML shell.

**Recommended implementation:** Write distinct descriptive example summaries, consider truthful Organisation/WebSite structured data and page-specific share images, and assess prerendering for content accessibility and crawler resilience. Do not change the canonical origin.

### F13 · P2 · Reduce initial enquiry effort

**Where:** /contact; /refer.

**Observed:** Contact requires name, email, organisation, role, sector, workflow size, message, timing, decision context and two checkboxes before a draft can be reviewed; optional fields include tools and preferred time. Service choice is hidden and appears in the draft.

**Recommended implementation:** Review which qualification fields are necessary before a first conversation; show the selected service context and allow correction. Add a response expectation only if operations can meet it.

### F14 · P2 · Align resource names and microcopy

**Where:** Resource promotions, /resources and three tool routes; /privacy-and-data-handling.

**Observed:** “Visibility Starter Kit” becomes “Planner”; “Staff Starter Pack” becomes “Check”. These are related formats, but the relation is not always explicit. Privacy copy says “a introductory conversation”; copy feedback refers to a connected form that is not currently present.

**Recommended implementation:** Give each resource family one name with clear Online assessment / PDF guide / Workbook format labels. Fix grammar and remove dormant-integration wording from current-flow messages.

### F15 · P2 · Keep internal legacy content from returning

**Where:** Canonical source components, not live routes.

**Observed:** Unused Contact/Services/FAQ/Hero/Methodology component files contain Workflow Diagnostic, Workflow Automation Sprint and broad practice-led copy. Those terms were not found in the fetched production bundle apart from the separately documented free-consultation phrase.

**Recommended implementation:** After the public fixes, archive/remove or clearly mark inactive components and add content checks that cover active copy, expanded states, HTML fallback and downloads. Do not classify unused source as a live-site defect.

### F16 · P2 · Measure real conversions

**Where:** Primary and resource journeys.

**Observed:** No first-party conversion event implementation was identified in canonical source searches. Draft review, an email-link click, delivered enquiry and confirmed booking are different outcomes; actual delivery cannot currently be confirmed by this site.

**Recommended implementation:** When the handoff is connected, define minimal events for CTA, assessment completion, resource download, enquiry acceptance and confirmed booking. Do not report draft preparation as a lead received. Analytics backend/dashboard configuration was not audited.

### F17 · P2 · Improve evaluation detail without adding promises

**Where:** /services; /faq.

**Observed:** Services explains written scope and fees being agreed, and FAQ gives conditional 2–4 week Workflow Transformation timing. There is no public investment range, named delivery responsibility or concise example of the Diagnostics output.

**Recommended implementation:** Consider a redacted/synthetic deliverable sample and clearer participation requirements. Publish investment guidance only if commercially settled; lack of a price table is not a production blocker.

## Required terminology search

| Search | Current public finding | Severity / treatment |
|---|---|---|
| fit call | Not found in rendered/expanded copy, fetched production bundle, fallback or six downloads. Internal identifier `fitCall` is not visible copy. | No current public defect. |
| sprint | Not found on the current public surfaces or downloads. Unused source has Workflow Automation Sprint. | P2 regression prevention only (F15). |
| low-code | Not found on current public surfaces or downloads. | No current public defect. |
| free consultation | Homepage expanded FAQ: “Bring one high-level operational problem to the free consultation.” Common noscript fallback also uses it. | P2 wording cleanup (F10). “Free, 20-minute conversation” is consistent with the offer and is not the same defect. |
| generic small-business positioning | No current small-business proposition found in public pages, bundle or downloads. Organisation-size flexibility in FAQ is not equivalent to a small-business ICP. | No current public defect. |
| conflicting health-practice positioning | Dedicated allied-health page, homepage audience card and shared footer remain; Services/AI Guard SEO pairs audiences without the selected/secondary qualifier. | P1 hierarchy/SEO alignment (F04). Historical operating experience and sensitive-information cautions are not themselves conflicts. |
| old six-product references | No current public six-product architecture found. Live Services and FAQ explain three offers. | Preserve current architecture. Old source components are separately recorded in F15. |
| Workflow Diagnostic instead of Heutrix Diagnostics | Not found as a public paid-offer name in pages, fetched bundle or downloads. Present in unused components. Free scorecard remains a separate resource. | No current public rename required; P2 regression prevention. |
| old automation/dashboard standalone primary offers | No current public primary offer found. Management dashboards, forms and automation are correctly scoped deliverables; hero dashboard is labelled illustrative. | Preserve this distinction. |
| conflicting CTA wording/destinations | Core Talk/Discuss/View actions mostly follow the latest guide. Broken AI anchor, wrong reporting-example landing, alternative scorecard labels and resource-format mismatch remain. | P1 F02/F03/F07; P2 F10/F14. |
| AI Guardrails used as a paid-offer name | FAQ timing answer says “Diagnostics and AI Guardrails timing is confirmed…” | P2 F10. Descriptive controls, free-resource names and compatible URLs/IDs are not automatically obsolete. |

## Shared implementation inventory

All page records below inherit these elements. Repeated header links in the raw DOM include desktop and mobile navigation; that is a responsive implementation detail, not automatically duplicated visible content.

- **Header order:** brand → Home → Services → Workflow examples → Resources → About → FAQ → Talk to Heutrix (/contact). Mobile uses a menu.
- **Footer order:** brand/positioning → informational/sector/legal navigation → conversation prompt and Talk to Heutrix → scorecard prompt and Get the Scorecard → service disclaimer → operator/ABN → copyright.
- **Exact footer positioning:** “Heutrix Labs helps Australian disability support providers—and selected allied health practices—diagnose operational friction, transform one bounded workflow and put practical AI guardrails in place.”
- **Shared CTAs:** Talk to Heutrix → /contact; Get the Scorecard → /resources/workflow-bottleneck-scorecard. Informational footer routes include /allied-health, /disability-providers and /ai-guardrails.
- **Shared trust:** “Heutrix Labs is operated by Heutrix Pty Ltd · ABN 64 702 109 662”; copyright 2026; explicit service limitations. Identity details are observed on the site, not independently registry-verified here.
- **Shared SEO:** en-AU; index/follow on successful content pages; unique page titles; same-origin route canonicals; server-provided description/OG/Twitter metadata; shared OG image /images/workflow-team.webp; summary_large_image; no JSON-LD observed. Raw HTML contains an empty React root and a noscript email/resource fallback rather than rendered main copy.
- **Shared conversion close** on Home, About and examples: “What keeps your team chasing updates?” / “Let’s talk about it. A free, 20-minute conversation to work out a practical next step.” / Talk to Heutrix / “No obligation. No sensitive information needed.”

## Page-by-page implementation inventory

The following covers all 15 requested dimensions for every current content route. Supporting copy here records the exact opening proposition; [Full current copy](./supporting-copy.md) preserves each page's section content, expanded FAQs, carousel slides and sampled assessment/result screens. CTA lists include shared conversion actions; standard informational header/footer links are defined above. Icon glyphs are omitted from labels where practical.

### /

1. **Route/page:** [/](https://heutrix-labs-original-theme.janith.workers.dev/) — HTTP 200.
2. **Section order:** Hero with illustrative dashboard → operating-principles strip → six pressure-point carousel → three offers → three workflow examples → origin story → four-step Heutrix Method → three resources → two audience cards → four FAQs → conversation close → shared footer.
3. **Current headline:** Less chasing. Clearer work. More room to care.
4. **Current supporting copy:** Less repetitive administration and clearer handovers for Australian disability service providers, including NDIS providers. / We improve the workflows around the systems your team already uses, so it is easier to see what needs doing, who owns it and what happens next.
5. **CTAs and destinations:** Talk to Heutrix → `/contact`; See How It Works → `/#heutrix-method`; Explore how Heutrix can help → `/services`; Try the intake visibility tool → `/resources/enquiry-to-service-start-starter-kit`; Explore Services → `/services`; When the priority is unclear Heutrix Diagnostics Find the workflow worth improving, understand the constraints and decide what to do next—including when not to build. View Diagnostics → `/services#heutrix-diagnostics`; From process to practice When one workflow is ready to change Heutrix WorkflowTransformation Redesign, build and test one operational workflow. Give your team clear ownership, practical guidance and a system they can use. View Transformations → `/services#heutrix-workflow-transformation`; When AI needs practical boundaries Heutrix AI Guard Give staff clear rules for appropriate AI use, information boundaries, human review and escalation. View AI Guard → `/ai-guardrails`; Explore workflow examples → `/case-studies`; Onboarding Clear starts Define what ready means Worker onboarding with a clear finish line A possible improvement to explore around your existing systems. Explore the workflow → `/case-studies/quickbooks-onboarding-and-access`; Financial operations Useful reminders Make the next step easy to find Payment reminders with a clear next action A possible improvement to explore around your existing systems. Explore the workflow → `/case-studies/pay-cycle-reminders-and-access`; Incident management & shift notes Visible actions Assign ownership and review Follow-up actions with visible ownership A possible improvement to explore around your existing systems. Explore the workflow → `/case-studies/incident-actions-and-closure`; Read the Heutrix story → `/about`; See How We Help → `/about`; Get the Scorecard → `/resources/workflow-bottleneck-scorecard`; Get the Guide → `/downloads/workflow-bottleneck-scorecard-guide.pdf`; Get the Template → `/downloads/workflow-bottleneck-scorecard.xlsx`; Take the Assessment → `/resources/enquiry-to-service-start-starter-kit`; Get the Guide → `/downloads/enquiry-to-service-start-starter-kit-guide.pdf`; Get the Template → `/downloads/enquiry-to-service-start-starter-kit.xlsx`; Take the Assessment → `/resources/ai-guardrails-staff-starter-pack`; Get the Guide → `/downloads/ai-guardrails-staff-starter-pack-guide.pdf`; Get the Template → `/downloads/ai-guardrails-staff-starter-pack.xlsx`; Our primary focus Disability support providers. Intake, worker onboarding, service commencement, document tracking and operational handovers. Explore provider workflows → `/disability-providers`; For selected practices Allied health teams. Referral follow-up, document collection, reporting preparation and practice visibility. Explore practice workflows → `/allied-health`; Explore FAQs → `/faq`. 
6. **Product terminology:** Heutrix Diagnostics; Heutrix Workflow Transformation; Heutrix AI Guard. Automation is a mechanism; the dashboard is an illustrative view, not a standalone product.
7. **Target-market terminology:** Australian disability service providers, including NDIS providers, lead the hero. Later: disability support providers (primary), selected allied health teams (secondary). Origin: disability and allied health services organisation.
8. **Case studies/proof used:** Three illustrative examples: worker onboarding, payment reminders, action follow-up. Synthetic dashboard and labelled AI-generated image. Unattributed first-hand operating-experience statement.
9. **Lead magnets/resources used:** All three resource families, each with assessment, PDF and workbook. Scorecard is the primary resource; hero secondary action is See How It Works.
10. **Trust elements:** Workflow-first principle; clear ownership; human judgement; maintainable handover; 20 minutes/free/no obligation; explicit synthetic/illustrative labels. Shared operator/legal elements apply.
11. **Forms:** No form in this page body. 
12. **Metadata/SEO:** Title: “Heutrix Labs | Workflow Improvement for Disability Providers”. Description: “Heutrix Labs helps Australian disability service providers, including NDIS providers, reduce repetitive administration, clarify handovers and improve workflows around existing systems.”. Canonical: https://heutrix-labs-original-theme.janith.workers.dev/. Shared SEO implementation applies.
13. **Repeated content:** Examples, three offers, founder story, resources and FAQ answers recur on dedicated routes. Conversion close also appears on About and example pages.
14. **Obsolete/conflicting terminology:** Free consultation in expanded FAQ; the reporting-example destination is a retired URL; scorecard carousel wording differs from approved CTA. “Lived experience” is ambiguous here because the evidence offered is operating experience. All HTML routes also inherit the old “free consultation” noscript phrase.
15. **Gaps against production goal:** F01, F03–F07, F10–F12, F16. P2: clarify “lived experience” as provider-operations experience if that is the intended claim.

### /services

1. **Route/page:** [/services](https://heutrix-labs-original-theme.janith.workers.dev/services) — HTTP 200.
2. **Section order:** Hero and three-offer introduction → decision comparison → detailed Diagnostics → detailed Workflow Transformation → detailed AI Guard → three free resources → written engagement terms → Find the Right Fit close → footer.
3. **Current headline:** Diagnose the right problem, transform one bounded workflow, or put practical AI guardrails in place.
4. **Current supporting copy:** Heutrix helps Australian disability support providers—and selected allied health practices—improve one recurring non-clinical workflow at a time. / Heutrix Diagnostics identifies and prioritises the right problem. Heutrix Workflow Transformation redesigns and implements one bounded workflow. Heutrix AI Guard gives staff practical boundaries for responsible AI use.
5. **CTAs and destinations:** Talk to Heutrix → `/contact`; Talk to Heutrix arrow_forward → `/contact`; Heutrix Diagnostics → `#heutrix-diagnostics`; Heutrix Workflow Transformation → `#heutrix-workflow-transformation`; Heutrix AI Guard → `#heutrix-ai-guardrails`; Discuss Diagnostics chevron_right → `/contact?service=heutrix-diagnostics`; Discuss Transformations chevron_right → `/contact?service=heutrix-workflow-transformation`; Discuss AI Guard chevron_right → `/contact?service=heutrix-ai-guardrails`; Get the Scorecard arrow_forward → `/resources/workflow-bottleneck-scorecard`; Get the Guide picture_as_pdf → `/downloads/workflow-bottleneck-scorecard-guide.pdf`; Get the Template table_view → `/downloads/workflow-bottleneck-scorecard.xlsx`; Take the Assessment arrow_forward → `/resources/enquiry-to-service-start-starter-kit`; Get the Guide picture_as_pdf → `/downloads/enquiry-to-service-start-starter-kit-guide.pdf`; Get the Template table_view → `/downloads/enquiry-to-service-start-starter-kit.xlsx`; Take the Assessment arrow_forward → `/resources/ai-guardrails-staff-starter-pack`; Get the Guide picture_as_pdf → `/downloads/ai-guardrails-staff-starter-pack-guide.pdf`; Get the Template table_view → `/downloads/ai-guardrails-staff-starter-pack.xlsx`; Find the Right Fit arrow_forward → `/contact?service=not-sure`; Get the Scorecard → `/resources/workflow-bottleneck-scorecard`. 
6. **Product terminology:** Three current offers; Workflow Transformation labelled primary implementation product. Forms, registers, automation and dashboards are expressly possible deliverables within it. Diagnostics is a paid standalone decision engagement.
7. **Target-market terminology:** Disability support providers plus selected allied health practices in visible copy; meta description drops the secondary qualifier and pairs both audiences.
8. **Case studies/proof used:** Scope, acceptance criteria, testing and handover detail; no delivered-client evidence or results.
9. **Lead magnets/resources used:** All three families with guide, workbook and assessment.
10. **Trust elements:** Written scope before fees/work; inclusions and exclusions; no-build option; client approvals; synthetic testing; handover boundaries. Shared operator/legal elements apply.
11. **Forms:** No form in this page body. 
12. **Metadata/SEO:** Title: “Diagnostics, Workflow Transformation and AI Guard | Heutrix Labs”. Description: “Compare Heutrix Diagnostics, Workflow Transformation and AI Guard for Australian disability support providers and allied health practices.”. Canonical: https://heutrix-labs-original-theme.janith.workers.dev/services. Shared SEO implementation applies.
13. **Repeated content:** Three-products framing repeated in hero, decision section and detailed list. Long boundary and deliverable lists duplicate AI Guard, FAQ and legal pages.
14. **Obsolete/conflicting terminology:** No six-product architecture. “Fit process” remains as explanatory copy, not “fit call”. Legacy AI Guardrails anchor points at a missing ID. All HTML routes also inherit the old “free consultation” noscript phrase.
15. **Gaps against production goal:** F01, F02, F04, F07, F08, F11–F14, F17.

### /disability-providers

1. **Route/page:** [/disability-providers](https://heutrix-labs-original-theme.janith.workers.dev/disability-providers) — HTTP 200.
2. **Section order:** Provider hero → who this is for → common problems → workflows → five illustrative before/after patterns → suitable starting points → boundary note → intake resource → conversation close → footer.
3. **Current headline:** Fix one recurring disability-provider workflow without replacing your core platform.
4. **Current supporting copy:** Heutrix helps Australian disability support providers improve the non-clinical workflows around service delivery: the intake, reporting, evidence, document and handover work that must move reliably between people and systems. / The focus is one bounded improvement with clear ownership, visible status and next action, written acceptance criteria, practical staff guidance and a maintainable handover.
5. **CTAs and destinations:** Talk to Heutrix → `/contact`; Talk to Heutrix arrow_forward → `/contact`; Take the Assessment arrow_forward → `/resources/enquiry-to-service-start-starter-kit`; Get the Guide picture_as_pdf → `/downloads/enquiry-to-service-start-starter-kit-guide.pdf`; Get the Template table_view → `/downloads/enquiry-to-service-start-starter-kit.xlsx`; Get the Scorecard → `/resources/workflow-bottleneck-scorecard`. 
6. **Product terminology:** All three current offers; trackers, dashboards and registers appear as scoped deliverables.
7. **Target-market terminology:** Provider owners, operations managers and team leaders. Intake, service agreements, participant documents, incidents, complaints, evidence, onboarding and handovers.
8. **Case studies/proof used:** Five labelled illustrative patterns: incident/complaint tracking, evidence, onboarding, service agreements and participant document collection; no client outcome claim.
9. **Lead magnets/resources used:** Enquiry-to-Service-Start Visibility Starter Kit with assessment, guide and workbook; shared footer scorecard.
10. **Trust elements:** Core-platform preservation, approved information access, scope and acceptance criteria; clear non-clinical/service boundary. Shared operator/legal elements apply.
11. **Forms:** No form in this page body. 
12. **Metadata/SEO:** Title: “Workflow Improvement for Disability Support Providers | Heutrix Labs”. Description: “Heutrix Labs helps Australian disability support providers improve intake, service agreement tracking, document collection, incidents, complaints, evidence, onboarding and handovers.”. Canonical: https://heutrix-labs-original-theme.janith.workers.dev/disability-providers. Shared SEO implementation applies.
13. **Repeated content:** Problem and workflow lists partly mirror Services. Boundary note and resource disclaimer repeat shared content.
14. **Obsolete/conflicting terminology:** No banned offer terminology in body. Shared footer retains secondary allied health promotion. All HTML routes also inherit the old “free consultation” noscript phrase.
15. **Gaps against production goal:** F01, F04–F06, F08, F11, F14. Strongest audience fit among the dedicated pages.

### /allied-health

1. **Route/page:** [/allied-health](https://heutrix-labs-original-theme.janith.workers.dev/allied-health) — HTTP 200.
2. **Section order:** Allied-health hero → who this is for → common problems → workflows → five illustrative patterns → suitable starting points → boundary → scorecard → conversation close → footer.
3. **Current headline:** Make one recurring allied health admin workflow easier to see, manage and hand over.
4. **Current supporting copy:** Heutrix works with selected Australian allied health practices where referral, intake, reporting or document work crosses people and systems but still depends on inboxes, spreadsheets, memory or repeated status checks. / The aim is one bounded non-clinical workflow with clearer ownership, visible status and next action, agreed testing, practical staff guidance and a maintainable handover—not a replacement practice-management platform.
5. **CTAs and destinations:** Talk to Heutrix → `/contact`; Talk to Heutrix arrow_forward → `/contact`; Get the Scorecard arrow_forward → `/resources/workflow-bottleneck-scorecard`; Get the Guide picture_as_pdf → `/downloads/workflow-bottleneck-scorecard-guide.pdf`; Get the Template table_view → `/downloads/workflow-bottleneck-scorecard.xlsx`; Get the Scorecard → `/resources/workflow-bottleneck-scorecard`. 
6. **Product terminology:** All three current offers; practice dashboards and trackers are deliverables, not separate products.
7. **Target-market terminology:** Psychology, physiotherapy, occupational therapy, speech pathology, dietetics, multidisciplinary/multi-site clinics and practice managers/owners.
8. **Case studies/proof used:** Five explicitly illustrative patterns: referral tracking, reporting, onboarding, enquiry/intake follow-up and document collection.
9. **Lead magnets/resources used:** Scorecard described as best for disability-provider operations leaders even on this audience page; PDF and workbook links.
10. **Trust elements:** Selected-practice qualifier; non-clinical scope; practice decision/approval responsibility; written/scoped improvement. Shared operator/legal elements apply.
11. **Forms:** No form in this page body. 
12. **Metadata/SEO:** Title: “Workflow Improvement for Allied Health Practices | Heutrix Labs”. Description: “Heutrix Labs helps Australian allied health practices improve enquiry and referral tracking, document collection, reporting, onboarding, handovers and management visibility.”. Canonical: https://heutrix-labs-original-theme.janith.workers.dev/allied-health. Shared SEO implementation applies.
13. **Repeated content:** Uses the same audience-page structure as Disability Providers; repeats shared offers, resource and boundary.
14. **Obsolete/conflicting terminology:** A real secondary health-practice landing page remains indexable and linked globally. Not old generic small-business language, but its prominence can dilute the chosen ICP. All HTML routes also inherit the old “free consultation” noscript phrase.
15. **Gaps against production goal:** F04, F07, F08, F11, F14. Keep/demote as a secondary page rather than automatically deleting an established route.

### /ai-guardrails

1. **Route/page:** [/ai-guardrails](https://heutrix-labs-original-theme.janith.workers.dev/ai-guardrails) — HTTP 200.
2. **Section order:** AI Guard hero → what it helps with → suitable and unsuitable uses → example AI-use positions → privacy/information boundaries → inclusions → starter pack → Discuss AI Guard close → footer.
3. **Current headline:** Heutrix AI Guard for responsible day-to-day use.
4. **Current supporting copy:** Commercially available AI tools can support internal admin, drafting and workflow guidance. They can also create privacy, quality, security and accountability risks when staff use them without approved boundaries. / Heutrix Labs helps organisations turn general AI concerns into clear use cases, information rules, human review responsibilities and practical staff guidance.
5. **CTAs and destinations:** Talk to Heutrix → `/contact`; Discuss AI Guard arrow_forward → `/contact?service=heutrix-ai-guardrails`; Take the Assessment arrow_forward → `/resources/ai-guardrails-staff-starter-pack`; Get the Guide picture_as_pdf → `/downloads/ai-guardrails-staff-starter-pack-guide.pdf`; Get the Template table_view → `/downloads/ai-guardrails-staff-starter-pack.xlsx`; Get the Scorecard → `/resources/workflow-bottleneck-scorecard`. 
6. **Product terminology:** Heutrix AI Guard. AI guardrails remains a valid description of controls and the free starter resource.
7. **Target-market terminology:** Generic organisations/teams in body; title specifies disability providers; description pairs disability support providers and allied health practices.
8. **Case studies/proof used:** Illustrative AI-use positions and concrete inclusion lists; no client deployment evidence or certification.
9. **Lead magnets/resources used:** AI Guardrails Staff Starter Pack: assessment, PDF and workbook.
10. **Trust elements:** Accountable human review, approved use cases, information boundaries, review/escalation responsibilities and professional-advice limits. Shared operator/legal elements apply.
11. **Forms:** No form in this page body. 
12. **Metadata/SEO:** Title: “Heutrix AI Guard for Disability Providers | Heutrix Labs”. Description: “Heutrix AI Guard helps Australian disability support providers and allied health practices define approved AI uses, information boundaries, accountable review and staff guidance.”. Canonical: https://heutrix-labs-original-theme.janith.workers.dev/ai-guardrails. Shared SEO implementation applies.
13. **Repeated content:** Substantial overlap with Services AI Guard section and privacy/FAQ exclusions.
14. **Obsolete/conflicting terminology:** /ai-guardrails is a compatible legacy URL, not by itself obsolete offer wording. Paid offer heading is correctly Heutrix AI Guard. All HTML routes also inherit the old “free consultation” noscript phrase.
15. **Gaps against production goal:** F01, F04, F08, F11, F14. P2: introduce provider-specific administrative examples earlier without implying clinical use.

### /about

1. **Route/page:** [/about](https://heutrix-labs-original-theme.janith.workers.dev/about) — HTTP 200.
2. **Section order:** Origin hero → founding-team experience → three interactive follow-through examples → approach/handover statement → See the Process → conversation close → footer.
3. **Current headline:** We started inside the work.
4. **Current supporting copy:** Heutrix grew from first-hand experience running a disability and allied health services organisation—and a practical question: how can the work behind care run more clearly?
5. **CTAs and destinations:** Talk to Heutrix → `/contact`; Explore this workflow → `/case-studies/quickbooks-onboarding-and-access`; See the Process → `/#heutrix-method`; Get the Scorecard → `/resources/workflow-bottleneck-scorecard`. 
6. **Product terminology:** Workflow improvement, process change and scoped build in body; three named offers in footer.
7. **Target-market terminology:** Disability and allied health origin; current Australian disability support providers and selected allied health practices.
8. **Case studies/proof used:** First-hand operating-experience and combined founding-team skills asserted; no named people, bios or supporting credentials. Three possible workflow improvements repeat the examples.
9. **Lead magnets/resources used:** Shared footer scorecard only; no dedicated in-body lead magnet.
10. **Trust elements:** Operational familiarity, client participation, testing, documentation, responsibilities and written scope; examples labelled illustrative. Shared operator/legal elements apply.
11. **Forms:** No form in this page body. 
12. **Metadata/SEO:** Title: “About Heutrix Labs”. Description: “Learn how Heutrix approaches bounded workflow improvement, responsible technology use, testing, documentation and maintainable handover.”. Canonical: https://heutrix-labs-original-theme.janith.workers.dev/about. Shared SEO implementation applies.
13. **Repeated content:** Origin story overlaps homepage; interactive examples reuse onboarding, reminders and action follow-up; shared final conversion.
14. **Obsolete/conflicting terminology:** No banned commercial terminology. Allied-health origin is historical context and should not be erased merely for mentioning health. All HTML routes also inherit the old “free consultation” noscript phrase.
15. **Gaps against production goal:** F01, F04, F05, F11, F17.

### /case-studies

1. **Route/page:** [/case-studies](https://heutrix-labs-original-theme.janith.workers.dev/case-studies) — HTTP 200.
2. **Section order:** Workflow-example hero and evidence label → three featured cards → category filters → same three examples as list → conversation close → footer.
3. **Current headline:** Better workflows, in the details.
4. **Current supporting copy:** Explore how clearer ownership, practical checks and useful handovers could improve everyday provider workflows. / Illustrative workflow examples. These explain possible approaches, not verified client projects or promised results.
5. **CTAs and destinations:** Talk to Heutrix → `/contact`; Onboarding Clear starts Define what ready means Worker onboarding with a clear finish line A possible improvement to explore around your existing systems. Explore the workflow → `/case-studies/quickbooks-onboarding-and-access`; Financial operations Useful reminders Make the next step easy to find Payment reminders with a clear next action A possible improvement to explore around your existing systems. Explore the workflow → `/case-studies/pay-cycle-reminders-and-access`; Incident management & shift notes Visible actions Assign ownership and review Follow-up actions with visible ownership A possible improvement to explore around your existing systems. Explore the workflow → `/case-studies/incident-actions-and-closure`; 01 Onboarding Worker onboarding with a clear finish line → `/case-studies/quickbooks-onboarding-and-access`; 02 Financial operations Payment reminders with a clear next action → `/case-studies/pay-cycle-reminders-and-access`; 03 Incident management & shift notes Follow-up actions with visible ownership → `/case-studies/incident-actions-and-closure`; Get the Scorecard → `/resources/workflow-bottleneck-scorecard`. 
6. **Product terminology:** Workflow improvement examples; three current offers in shared footer.
7. **Target-market terminology:** Provider workflows; categories Onboarding, Financial operations, Incident management & shift notes.
8. **Case studies/proof used:** Three illustrative examples only. No client names, verified results, testimonials or success metrics.
9. **Lead magnets/resources used:** Shared footer scorecard; detail pages link to scorecard.
10. **Trust elements:** Honest illustrative classification; no claim of delivered outcomes. Shared operator/legal elements apply.
11. **Forms:** No form in this page body. 
12. **Metadata/SEO:** Title: “Workflow Examples | Heutrix Labs”. Description: “Explore illustrative approaches to worker onboarding, payment reminders and action follow-up for disability providers.”. Canonical: https://heutrix-labs-original-theme.janith.workers.dev/case-studies. Shared SEO implementation applies.
13. **Repeated content:** The same three entries appear as featured cards and a filtered list on one page, then again on homepage and About.
14. **Obsolete/conflicting terminology:** /case-studies is retained while visible label is Workflow examples. That compatibility is acceptable; it should not be presented as verified evidence. All HTML routes also inherit the old “free consultation” noscript phrase.
15. **Gaps against production goal:** F03, F05, F11, F12. Missing reporting example makes the homepage reporting link misleading.

### /case-studies/quickbooks-onboarding-and-access

1. **Route/page:** [/case-studies/quickbooks-onboarding-and-access](https://heutrix-labs-original-theme.janith.workers.dev/case-studies/quickbooks-onboarding-and-access) — HTTP 200.
2. **Section order:** Back to examples → category/title → illustrative evidence statement → second illustrative warning → Where work gets stuck → A possible improvement → What to test → How to assess progress → Scope and limits → service/scorecard links → conversation close → footer.
3. **Current headline:** Worker onboarding with a clear finish line
4. **Current supporting copy:** Illustrative workflow examples. These explain possible approaches, not verified client projects or promised results.
5. **CTAs and destinations:** Talk to Heutrix → `/contact`; ← All workflow examples → `/case-studies`; Get the Scorecard → `/resources/workflow-bottleneck-scorecard`. 
6. **Product terminology:** Heutrix Workflow Transformation; free workflow scorecard; three current offers in shared footer.
7. **Target-market terminology:** Provider operational workflows; Worker onboarding.
8. **Case studies/proof used:** Illustrative only: Account invitation sent before access, guidance and handover are complete. Suggested testing and measures are prospective, not achieved results.
9. **Lead magnets/resources used:** Scorecard link in article; shared footer scorecard.
10. **Trust elements:** Explicit evidence status; approved systems/permissions; baseline before measuring; clinical/legal/regulatory boundary. Shared operator/legal elements apply.
11. **Forms:** No form in this page body. 
12. **Metadata/SEO:** Title: “Worker onboarding with a clear finish line | Heutrix Labs”. Description: “Illustrative provider workflow. Illustrative workflow example; no client result claimed.”. Canonical: https://heutrix-labs-original-theme.janith.workers.dev/case-studies/quickbooks-onboarding-and-access. Shared SEO implementation applies.
13. **Repeated content:** Same article structure, two consecutive evidence warnings, shared scope paragraph and conversion close. Reused on homepage/hub/About.
14. **Obsolete/conflicting terminology:** Legacy detail URL retained. QuickBooks remains in slug but the body does not make QuickBooks implementation claims. Article says “start the workflow scorecard”. All HTML routes also inherit the old “free consultation” noscript phrase.
15. **Gaps against production goal:** F05, F10–F12. 

### /case-studies/pay-cycle-reminders-and-access

1. **Route/page:** [/case-studies/pay-cycle-reminders-and-access](https://heutrix-labs-original-theme.janith.workers.dev/case-studies/pay-cycle-reminders-and-access) — HTTP 200.
2. **Section order:** Back to examples → category/title → illustrative evidence statement → second illustrative warning → Where work gets stuck → A possible improvement → What to test → How to assess progress → Scope and limits → service/scorecard links → conversation close → footer.
3. **Current headline:** Payment reminders with a clear next action
4. **Current supporting copy:** Illustrative workflow examples. These explain possible approaches, not verified client projects or promised results.
5. **CTAs and destinations:** Talk to Heutrix → `/contact`; ← All workflow examples → `/case-studies`; Get the Scorecard → `/resources/workflow-bottleneck-scorecard`. 
6. **Product terminology:** Heutrix Workflow Transformation; free workflow scorecard; three current offers in shared footer.
7. **Target-market terminology:** Provider operational workflows; Payment reminders.
8. **Case studies/proof used:** Illustrative only: Reminder arrives without the file, instructions or contact needed to act. Suggested testing and measures are prospective, not achieved results.
9. **Lead magnets/resources used:** Scorecard link in article; shared footer scorecard.
10. **Trust elements:** Explicit evidence status; approved systems/permissions; baseline before measuring; clinical/legal/regulatory boundary. Shared operator/legal elements apply.
11. **Forms:** No form in this page body. 
12. **Metadata/SEO:** Title: “Payment reminders with a clear next action | Heutrix Labs”. Description: “Illustrative provider workflow. Illustrative workflow example; no client result claimed.”. Canonical: https://heutrix-labs-original-theme.janith.workers.dev/case-studies/pay-cycle-reminders-and-access. Shared SEO implementation applies.
13. **Repeated content:** Same article structure, two consecutive evidence warnings, shared scope paragraph and conversion close. Reused on homepage/hub/About.
14. **Obsolete/conflicting terminology:** Legacy detail URL retained. Pay-cycle/access slug differs from the broader visible title. Article says “start the workflow scorecard”. All HTML routes also inherit the old “free consultation” noscript phrase.
15. **Gaps against production goal:** F05, F10–F12. 

### /case-studies/incident-actions-and-closure

1. **Route/page:** [/case-studies/incident-actions-and-closure](https://heutrix-labs-original-theme.janith.workers.dev/case-studies/incident-actions-and-closure) — HTTP 200.
2. **Section order:** Back to examples → category/title → illustrative evidence statement → second illustrative warning → Where work gets stuck → A possible improvement → What to test → How to assess progress → Scope and limits → service/scorecard links → conversation close → footer.
3. **Current headline:** Follow-up actions with visible ownership
4. **Current supporting copy:** Illustrative workflow examples. These explain possible approaches, not verified client projects or promised results.
5. **CTAs and destinations:** Talk to Heutrix → `/contact`; ← All workflow examples → `/case-studies`; Get the Scorecard → `/resources/workflow-bottleneck-scorecard`. 
6. **Product terminology:** Heutrix Workflow Transformation; free workflow scorecard; three current offers in shared footer.
7. **Target-market terminology:** Provider operational workflows; Action follow-up.
8. **Case studies/proof used:** Illustrative only: An action in meeting notes becomes difficult to find or complete. Suggested testing and measures are prospective, not achieved results.
9. **Lead magnets/resources used:** Scorecard link in article; shared footer scorecard.
10. **Trust elements:** Explicit evidence status; approved systems/permissions; baseline before measuring; clinical/legal/regulatory boundary. Shared operator/legal elements apply.
11. **Forms:** No form in this page body. 
12. **Metadata/SEO:** Title: “Follow-up actions with visible ownership | Heutrix Labs”. Description: “Illustrative provider workflow. Illustrative workflow example; no client result claimed.”. Canonical: https://heutrix-labs-original-theme.janith.workers.dev/case-studies/incident-actions-and-closure. Shared SEO implementation applies.
13. **Repeated content:** Same article structure, two consecutive evidence warnings, shared scope paragraph and conversion close. Reused on homepage/hub/About.
14. **Obsolete/conflicting terminology:** Legacy detail URL retained. Incident/shift-note category is narrower than the generic meeting-action content. Article says “start the workflow scorecard”. All HTML routes also inherit the old “free consultation” noscript phrase.
15. **Gaps against production goal:** F05, F10–F12. P2: align category with the actual general action-follow-up example.

### /resources

1. **Route/page:** [/resources](https://heutrix-labs-original-theme.janith.workers.dev/resources) — HTTP 200.
2. **Section order:** Resource hero → three tool cards (each assessment, PDF, workbook) → scope disclaimer → footer.
3. **Current headline:** Start with a clearer picture.
4. **Current supporting copy:** Work through one operational question. Get a useful result, save it for your team, or bring it to a conversation with Heutrix. / No account needed. Your answers stay in this page unless you choose to share a summary.
5. **CTAs and destinations:** Talk to Heutrix → `/contact`; Get the Scorecard → `/resources/workflow-bottleneck-scorecard`; Get the Guide → `/downloads/workflow-bottleneck-scorecard-guide.pdf`; Get the Template → `/downloads/workflow-bottleneck-scorecard.xlsx`; Take the Assessment → `/resources/enquiry-to-service-start-starter-kit`; Get the Guide → `/downloads/enquiry-to-service-start-starter-kit-guide.pdf`; Get the Template → `/downloads/enquiry-to-service-start-starter-kit.xlsx`; Take the Assessment → `/resources/ai-guardrails-staff-starter-pack`; Get the Guide → `/downloads/ai-guardrails-staff-starter-pack-guide.pdf`; Get the Template → `/downloads/ai-guardrails-staff-starter-pack.xlsx`. 
6. **Product terminology:** Workflow Bottleneck Scorecard; Enquiry-to-Service-Start Planner; AI Guardrails Check are free resources, not additions to the paid offer architecture.
7. **Target-market terminology:** Operational teams; disability-first context mostly through shared footer and tool content.
8. **Case studies/proof used:** Working tools provide useful demonstrations of the approach; outputs are not client proof or validated industry benchmarks.
9. **Lead magnets/resources used:** Three interactive tools plus three PDFs and three XLSX workbooks; no email gate.
10. **Trust elements:** No account/email requirement, in-memory answers, explicit limits on advice/approval/compliance. Shared operator/legal elements apply.
11. **Forms:** No form in this page body. 
12. **Metadata/SEO:** Title: “Free Workflow Tools and AI Guardrails Templates | Heutrix Labs”. Description: “Download practical, ungated workflow prioritisation, enquiry-to-service-start visibility and AI guardrails starter resources from Heutrix Labs.”. Canonical: https://heutrix-labs-original-theme.janith.workers.dev/resources. Shared SEO implementation applies.
13. **Repeated content:** Same resources promoted on homepage, Services, audience pages, FAQ and AI Guard.
14. **Obsolete/conflicting terminology:** Guardrails is a valid free-resource term. Pack/Planner/Check format naming varies across pages. All HTML routes also inherit the old “free consultation” noscript phrase.
15. **Gaps against production goal:** F07, F08, F12, F14, F16.

### /resources/workflow-bottleneck-scorecard

1. **Route/page:** [/resources/workflow-bottleneck-scorecard](https://heutrix-labs-original-theme.janith.workers.dev/resources/workflow-bottleneck-scorecard) — HTTP 200.
2. **Section order:** All free tools link → title/promise → Step 1 Choose the workflow → Step 2 Understand the friction → Step 3 Check readiness → result and score → next actions/methodology/answer review → service enquiry and save/share actions → footer.
3. **Current headline:** Find the workflow worth improving first.
4. **Current supporting copy:** Assess one recurring workflow. Get a practical next step based on its friction, evidence and feasibility.
5. **CTAs and destinations:** Talk to Heutrix → `/contact`; All free tools → `/resources`; Get the Scorecard → `/resources/workflow-bottleneck-scorecard`. Later states add Back, See My Result, service-specific Discuss action, Save My Action Plan, Copy My Summary, Share this tool, Introduce an organisation and Edit my answers.
6. **Product terminology:** Free Workflow Bottleneck Scorecard; result may recommend Heutrix Diagnostics, Workflow Transformation or a no-project action.
7. **Target-market terminology:** Worker onboarding, payment follow-up, reporting, enquiry/service commencement, documents/actions and other admin; participant-information boundary.
8. **Case studies/proof used:** Versioned heuristic prioritisation, not validated benchmark or success probability. Observed synthetic result: Gather better evidence first, 20/100.
9. **Lead magnets/resources used:** Online assessment; downloadable text action plan; summary copy; linked PDF; companion workbook accessible from hub/promotional pages.
10. **Trust elements:** No names/uploads/email gate; evidence and control concerns override the score; organisation retains approval. Shared operator/legal elements apply.
11. **Forms:** Which workflow would you like to examine? [required] (workflow); Continue Assessment All questions are required; no contact-details gate. All steps/result wording are in the copy appendix.
12. **Metadata/SEO:** Title: “Workflow Bottleneck Scorecard | Heutrix Labs”. Description: “Assess one recurring workflow. Get a practical next step based on its friction, evidence and feasibility.”. Canonical: https://heutrix-labs-original-theme.janith.workers.dev/resources/workflow-bottleneck-scorecard. Shared SEO implementation applies.
13. **Repeated content:** Purpose repeated on progress screens; shared result conversion/save controls across tools.
14. **Obsolete/conflicting terminology:** Not a paid Workflow Diagnostic. It is intentionally a free assessment; do not mechanically rename it Heutrix Diagnostics. All HTML routes also inherit the old “free consultation” noscript phrase.
15. **Gaps against production goal:** F07, F08, F14, F16. Online tool evaluates one workflow while the related workbook compares up to 12.

### /resources/enquiry-to-service-start-starter-kit

1. **Route/page:** [/resources/enquiry-to-service-start-starter-kit](https://heutrix-labs-original-theme.janith.workers.dev/resources/enquiry-to-service-start-starter-kit) — HTTP 200.
2. **Section order:** All tools → title/promise → Step 1 Your starting point → Step 2 Review the handovers → result/gap count → next actions → seven-stage starter map → answer review → enquiry/save/share actions → footer.
3. **Current headline:** See where enquiries stall.
4. **Current supporting copy:** Check the handovers in your intake process and leave with a starter map your team can discuss.
5. **CTAs and destinations:** Talk to Heutrix → `/contact`; All free tools → `/resources`; Get the Scorecard → `/resources/workflow-bottleneck-scorecard`. Later states add Back, See My Result, service-specific Discuss action, Save My Action Plan, Copy My Summary, Share this tool, Introduce an organisation and Edit my answers.
6. **Product terminology:** Free Enquiry-to-Service-Start Planner / Visibility Starter Kit; result may lead to Heutrix Workflow Transformation.
7. **Target-market terminology:** Selectable Disability support provider or Allied health practice; existing care/practice system or inbox/disconnected systems.
8. **Case studies/proof used:** Operational self-check; synthetic result showed six of six gaps and seven map stages; not a commencement approval.
9. **Lead magnets/resources used:** Online planner, PDF guide, workbook via hub, text action plan, summary copy and share-tool control.
10. **Trust elements:** No personal records; explicit authorised commencement decision; organisation-owned readiness approval. Shared operator/legal elements apply.
11. **Forms:** Which setting is this for? [required] (sector); Where is this work tracked today? [required] (system); Continue Assessment All questions are required; no contact-details gate. All steps/result wording are in the copy appendix.
12. **Metadata/SEO:** Title: “Enquiry-to-Service-Start Planner | Heutrix Labs”. Description: “Check the handovers in your intake process and leave with a starter map your team can discuss.”. Canonical: https://heutrix-labs-original-theme.janith.workers.dev/resources/enquiry-to-service-start-starter-kit. Shared SEO implementation applies.
13. **Repeated content:** Common tool result/sidebar controls; same resource promoted on provider page and homepage.
14. **Obsolete/conflicting terminology:** Starter-kit URL preserved; Planner vs Visibility Starter Kit naming needs explanation. Allied health option is secondary scope, not standalone proof of ICP conflict. All HTML routes also inherit the old “free consultation” noscript phrase.
15. **Gaps against production goal:** F08, F14, F16; F04 only where audience presentation becomes equal.

### /resources/ai-guardrails-staff-starter-pack

1. **Route/page:** [/resources/ai-guardrails-staff-starter-pack](https://heutrix-labs-original-theme.janith.workers.dev/resources/ai-guardrails-staff-starter-pack) — HTTP 200.
2. **Section order:** All tools → title/promise → Step 1 Choose the use case → Step 2 Information and authority → Step 3 Human review → result/control count → next actions/answers → AI Guard enquiry/save/share → footer.
3. **Current headline:** Give AI use a clear review path.
4. **Current supporting copy:** Screen one administrative use case and see which controls need attention before the team proceeds.
5. **CTAs and destinations:** Talk to Heutrix → `/contact`; All free tools → `/resources`; Get the Scorecard → `/resources/workflow-bottleneck-scorecard`. Later states add Back, See My Result, service-specific Discuss action, Save My Action Plan, Copy My Summary, Share this tool, Introduce an organisation and Edit my answers.
6. **Product terminology:** Free AI Guardrails Check / Staff Starter Pack; paid next step is Heutrix AI Guard.
7. **Target-market terminology:** Teams considering administrative drafting, general-information summaries, checklists or another administrative task.
8. **Case studies/proof used:** Six-control screening, not approval/certification. Observed synthetic path correctly produced Stop and seek internal review.
9. **Lead magnets/resources used:** Online check, PDF guide, workbook via hub, text action plan and summary/share controls.
10. **Trust elements:** Tool approval, personal information, high-stakes decisions, named reviewer, output checking and escalation; no prompts or confidential content requested. Shared operator/legal elements apply.
11. **Forms:** What would the team use AI for? [required] (task); Continue Assessment All questions are required; no contact-details gate. All steps/result wording are in the copy appendix.
12. **Metadata/SEO:** Title: “AI Guardrails Check | Heutrix Labs”. Description: “Screen one administrative use case and see which controls need attention before the team proceeds.”. Canonical: https://heutrix-labs-original-theme.janith.workers.dev/resources/ai-guardrails-staff-starter-pack. Shared SEO implementation applies.
13. **Repeated content:** Common assessment and result patterns; pack appears in Services, AI Guard and homepage.
14. **Obsolete/conflicting terminology:** Descriptive AI Guardrails resource title and compatible URL/parameter are legitimate. Do not rename every guardrails mention as if it were a paid offer. All HTML routes also inherit the old “free consultation” noscript phrase.
15. **Gaps against production goal:** F08, F14, F16.

### /contact

1. **Route/page:** [/contact](https://heutrix-labs-original-theme.janith.workers.dev/contact) — HTTP 200.
2. **Section order:** Contact/referral switch → introductory-conversation promise and reassurance → email contact → qualification form → Review My Enquiry → draft preview → Copy draft/Open Email Draft (or long-draft paste path) → Edit details → footer.
3. **Current headline:** Let’s talk about the work.
4. **Current supporting copy:** Talk to Heutrix. / Twenty minutes to discuss one operational workflow and whether Heutrix is the right fit to help.
5. **CTAs and destinations:** Talk to Heutrix → `/contact`; Refer an organisation → `/refer`; hello@heutrix.com.au → `mailto:hello@heutrix.com.au`; Privacy and data handling → `/privacy-and-data-handling`; Get the Scorecard → `/resources/workflow-bottleneck-scorecard`. 
6. **Product terminology:** Current service preselection is stored in a hidden field from query parameters, then shown in the email draft. Default Not sure yet.
7. **Target-market terminology:** Sector options: Disability support provider, Allied health practice, Other; workflow-role count and decision context qualify organisation.
8. **Case studies/proof used:** No proof block. Conversion relies on conversation promise, operator/footer and transparent delivery instructions.
9. **Lead magnets/resources used:** Optional assessment summary when arriving from the matching result; opt-out checkbox before sharing; shared footer scorecard.
10. **Trust elements:** No obligation, no need to choose service, no sensitive information, contact permission and clear “Nothing has been sent” review notice. Shared operator/legal elements apply.
11. **Forms:** Your name [required] (name); Your email [required] (email); Your organisation [required] (organisation); Your role [required] (role); service (service); Sector [required] (sector); How many people or roles touch this workflow? [required] (workflowSize); What would you like to improve? [required] (message); Tools or systems involved (optional) (systems); When would this need to improve? [required] (timing); What is the decision context? [required] (decisionContext); Preferred days, times and time zone (optional) (preferredTime); I have not included participant, patient, clinical, payment, credential or other sensitive information. [required] (safeInformation); Heutrix may contact me about this request and its direct follow-up. [required] (contactPermission); Review My Enquiry 
12. **Metadata/SEO:** Title: “Start a 20-Minute Introductory Conversation | Heutrix Labs”. Description: “Request a 20-minute introductory conversation about one recurring operational problem. No sensitive information is needed.”. Canonical: https://heutrix-labs-original-theme.janith.workers.dev/contact. Shared SEO implementation applies.
13. **Repeated content:** Talk to Heutrix in switch, lead, header and footer; safety instructions repeated in helper text/checkbox.
14. **Obsolete/conflicting terminology:** Uses Review My Enquiry truthfully. Not Send Enquiry, not a live booking. Copy feedback mentions a connected form despite current email-only mode. All HTML routes also inherit the old “free consultation” noscript phrase.
15. **Gaps against production goal:** F01, F09, F13, F14, F16.

### /refer

1. **Route/page:** [/refer](https://heutrix-labs-original-theme.janith.workers.dev/refer) — HTTP 200.
2. **Section order:** Contact/referral switch → introduction promise/permission boundary → email contact → referrer and organisation form → Review My Referral → draft preview → copy/open-email actions → edit → footer.
3. **Current headline:** Know a team we could help?
4. **Current supporting copy:** Introduce an organisation with a recurring operational problem. / Share a high-level business introduction. We can explore whether Heutrix is a useful fit for the team.
5. **CTAs and destinations:** Talk to Heutrix → `/contact`; Refer an organisation → `/refer`; hello@heutrix.com.au → `mailto:hello@heutrix.com.au`; Privacy and data handling → `/privacy-and-data-handling`; Get the Scorecard → `/resources/workflow-bottleneck-scorecard`. 
6. **Product terminology:** Business introduction; no separate referral product. Shared footer names the three offers.
7. **Target-market terminology:** Organisations with recurring operational problems. Explicitly not participant/patient referral.
8. **Case studies/proof used:** No proof block; relies on brand/operator and clear business-introduction scope.
9. **Lead magnets/resources used:** Shared footer scorecard. No automatic assessment data included in referral.
10. **Trust elements:** Permission to introduce/share contact details, no-sensitive-information declaration, contact permission and honest unsent draft state. Shared operator/legal elements apply.
11. **Forms:** Your name [required] (name); Your email [required] (email); Your organisation [required] (organisation); Your role [required] (role); Organisation name [required] (referredOrganisation); Business contact name (optional) (referredName); Business contact email (optional) (referredEmail); service (service); Why could Heutrix be useful to this team? [required] (message); I have permission to make this introduction and share any business contact details included. [required] (permission); I have not included participant, patient, clinical, payment, credential or other sensitive information. [required] (safeInformation); Heutrix may contact me about this request and its direct follow-up. [required] (contactPermission); Review My Referral 
12. **Metadata/SEO:** Title: “Refer an Organisation | Heutrix Labs”. Description: “Introduce an organisation to Heutrix with permission.”. Canonical: https://heutrix-labs-original-theme.janith.workers.dev/refer. Shared SEO implementation applies.
13. **Repeated content:** Shares most contact-form structure and review controls.
14. **Obsolete/conflicting terminology:** No fit-call or free-consultation label. Generated draft includes generic “Interested in: Not sure yet” and “Preferred time / time zone: To agree”, although referral form does not ask these. All HTML routes also inherit the old “free consultation” noscript phrase.
15. **Gaps against production goal:** F01, F09, F13, F14. P2: remove irrelevant consultation fields from generated referral text.

### /faq

1. **Route/page:** [/faq](https://heutrix-labs-original-theme.janith.workers.dev/faq) — HTTP 200.
2. **Section order:** FAQ hero → 17 accordion questions → scorecard promotion → contact close → footer.
3. **Current headline:** Frequently asked questions
4. **Current supporting copy:** Practical answers about Heutrix Diagnostics, Workflow Transformation, AI Guard, timing, resources, privacy and the limits of Heutrix Labs services.
5. **CTAs and destinations:** Talk to Heutrix → `/contact`; Get the Scorecard arrow_forward → `/resources/workflow-bottleneck-scorecard`; Get the Guide picture_as_pdf → `/downloads/workflow-bottleneck-scorecard-guide.pdf`; Get the Template table_view → `/downloads/workflow-bottleneck-scorecard.xlsx`; Talk to Heutrix arrow_forward → `/contact`; Get the Scorecard → `/resources/workflow-bottleneck-scorecard`. 
6. **Product terminology:** All three current offers; explicitly says forms, automation and management views are deliverables, not separate products; conditional 2–4 week Workflow Transformation timing.
7. **Target-market terminology:** Australian disability support providers primary, selected allied health practices secondary.
8. **Case studies/proof used:** No client results; answers explain operational process and boundaries.
9. **Lead magnets/resources used:** Scorecard assessment, PDF and workbook.
10. **Trust elements:** Written scope, prerequisites, no guaranteed compliance/audit outcomes, sensitive-information and human-review boundaries. Shared operator/legal elements apply.
11. **Forms:** No form in this page body. 
12. **Metadata/SEO:** Title: “FAQ | Heutrix Labs”. Description: “Answers about Heutrix Diagnostics, Workflow Transformation, AI Guard, project timing, free resources, information handling and service boundaries.”. Canonical: https://heutrix-labs-original-theme.janith.workers.dev/faq. Shared SEO implementation applies.
13. **Repeated content:** Service selection, existing systems and information handling overlap homepage/Services/legal pages. Several separate exclusion questions could be grouped.
14. **Obsolete/conflicting terminology:** Timing answer says “Diagnostics and AI Guardrails timing…”; paid-service name should be Heutrix AI Guard. All HTML routes also inherit the old “free consultation” noscript phrase.
15. **Gaps against production goal:** F06–F08, F10–F12, F17.

### /privacy-and-data-handling

1. **Route/page:** [/privacy-and-data-handling](https://heutrix-labs-original-theme.janith.workers.dev/privacy-and-data-handling) — HTTP 200.
2. **Section order:** Purpose and data-minimisation introduction → information not to send → introductory-conversation handling → downloads → project controls → eight project checks → AI boundaries → client responsibility → footer.
3. **Current headline:** Privacy and data handling
4. **Current supporting copy:** Heutrix works with disability support providers and allied health practices where privacy, confidentiality and careful information handling are part of everyday operations. / Our project approach starts with data minimisation: use the least information needed, prefer de-identified or sample data where practical, define access and storage boundaries, and agree review and retention steps.
5. **CTAs and destinations:** Talk to Heutrix → `/contact`; Get the Scorecard → `/resources/workflow-bottleneck-scorecard`. 
6. **Product terminology:** Introductory conversation and resources; operational project controls; paid offers named in footer.
7. **Target-market terminology:** Disability support providers and allied health practices presented together.
8. **Case studies/proof used:** Statement of intended handling practices; no independent certification or legal approval asserted.
9. **Lead magnets/resources used:** Explains ungated downloads, no contact permission by downloading, and no completed-workbook uploads.
10. **Trust elements:** Data minimisation, in-memory answers, email-draft transparency, permissions, retention/deletion and project controls. Shared operator/legal elements apply.
11. **Forms:** No form in this page body. 
12. **Metadata/SEO:** Title: “Privacy and Data Handling | Heutrix Labs”. Description: “Read how Heutrix Labs approaches data minimisation, access, storage, retention and AI information boundaries during workflow projects.”. Canonical: https://heutrix-labs-original-theme.janith.workers.dev/privacy-and-data-handling. Shared SEO implementation applies.
13. **Repeated content:** Information exclusions and AI guidance overlap FAQ, AI Guard and Disclaimer.
14. **Obsolete/conflicting terminology:** “a introductory conversation” typo; “approved lead record” wording needs alignment with actual email handling. All HTML routes also inherit the old “free consultation” noscript phrase.
15. **Gaps against production goal:** F04, F09, F11, F14.

### /terms-of-use

1. **Route/page:** [/terms-of-use](https://heutrix-labs-original-theme.janith.workers.dev/terms-of-use) — HTTP 200.
2. **Section order:** General terms introduction → service boundary → website information → introductory conversation → downloads → client responsibility → project scope/terms → website operator → footer.
3. **Current headline:** Terms of use
4. **Current supporting copy:** These terms apply to use of the Heutrix Labs website and its general service information. / Website content is general in nature. It is not a project scope, service agreement or advice tailored to your organisation, and it should not be treated as legal, clinical, privacy, employment, regulatory or audit advice.
5. **CTAs and destinations:** Talk to Heutrix → `/contact`; Get the Scorecard → `/resources/workflow-bottleneck-scorecard`. 
6. **Product terminology:** Diagnostics, Workflow Transformation and AI Guard; introductory conversation is separate from a paid engagement.
7. **Target-market terminology:** Organisation/client terminology; ICP in shared footer.
8. **Case studies/proof used:** No case proof; named legal operator and ABN as identity signals, not independently verified by this audit.
9. **Lead magnets/resources used:** Download/template use and information boundaries.
10. **Trust elements:** Heutrix Pty Ltd, ABN 64 702 109 662; hello@heutrix.com.au; written engagement terms; accurate email-draft/booking distinction. Shared operator/legal elements apply.
11. **Forms:** No form in this page body. 
12. **Metadata/SEO:** Title: “Terms of Use | Heutrix Labs”. Description: “Terms for using the Heutrix Labs website, including general-information limits, service boundaries, project scopes and client responsibilities.”. Canonical: https://heutrix-labs-original-theme.janith.workers.dev/terms-of-use. Shared SEO implementation applies.
13. **Repeated content:** Exclusion list, client responsibility and scope language recur on Disclaimer and footer.
14. **Obsolete/conflicting terminology:** No obsolete offer wording observed. All HTML routes also inherit the old “free consultation” noscript phrase.
15. **Gaps against production goal:** F11–F12. Update delivery wording with F01 when integration is actually enabled; P2 effective/review date would aid maintenance.

### /website-disclaimer

1. **Route/page:** [/website-disclaimer](https://heutrix-labs-original-theme.janith.workers.dev/website-disclaimer) — HTTP 200.
2. **Section order:** Offer/audience introduction → service boundaries → illustrative examples → resources → engagement/third-party systems → AI disclaimer → privacy disclaimer → operator → footer.
3. **Current headline:** Website disclaimer
4. **Current supporting copy:** This website describes Heutrix Diagnostics, Heutrix Workflow Transformation and Heutrix AI Guard for Australian disability support providers and selected allied health practices.
5. **CTAs and destinations:** Talk to Heutrix → `/contact`; Get the Scorecard → `/resources/workflow-bottleneck-scorecard`. 
6. **Product terminology:** Exactly three current offers; no old automation/dashboard product.
7. **Target-market terminology:** Australian disability support providers primary with selected allied health practices.
8. **Case studies/proof used:** Explicitly explains synthetic/illustrative views and that examples do not promise identical outcomes.
9. **Lead magnets/resources used:** Scores, templates and screening results are general starting points, not approval or business-case evidence.
10. **Trust elements:** Service/advice boundaries; written scope; named operator/ABN/contact; accountable review. Shared operator/legal elements apply.
11. **Forms:** No form in this page body. 
12. **Metadata/SEO:** Title: “Website Disclaimer | Heutrix Labs”. Description: “Website disclaimer covering Heutrix Labs operational services, professional-advice limits, AI use, privacy and client responsibilities.”. Canonical: https://heutrix-labs-original-theme.janith.workers.dev/website-disclaimer. Shared SEO implementation applies.
13. **Repeated content:** Large overlap with Terms, Privacy, AI Guard and global footer.
14. **Obsolete/conflicting terminology:** No obsolete offer name observed. All HTML routes also inherit the old “free consultation” noscript phrase.
15. **Gaps against production goal:** F04, F11–F12. P2 effective/review date would aid maintenance.

## Redirects, resources and utility routes

Redirects have no independent headline, sections, forms, proof or CTA copy. Their content/SEO inventory is the destination page above. They are not extra current offers.

| Old route | Current response / destination | Audit treatment |
|---|---|---|
| /pricing | 301 → /services#how-engagements-are-agreed | Valid consolidation; no current standalone pricing page. |
| /safe-ai | 301 → /ai-guardrails | Valid compatibility redirect to Heutrix AI Guard. |
| /case-studies/support-worker-lifecycle-process-map | 301 → /case-studies | Retired narrative; do not restore unverified proof. |
| /case-studies/contractor-engagement-and-signing | 301 → /case-studies | Retired narrative; do not restore unverified proof. |
| /case-studies/contractor-invoice-workspace | 301 → /case-studies | Retired narrative; do not restore unverified proof. |
| /case-studies/protected-formula-driven-invoices | 301 → /case-studies | Retired narrative; do not restore unverified proof. |
| /case-studies/invoice-status-and-payment-locking | 301 → /case-studies | Retired narrative; do not restore unverified proof. |
| /case-studies/invoice-discrepancy-workflow | 301 → /case-studies | Retired narrative; do not restore unverified proof. |
| /case-studies/power-bi-invoice-reconciliation | 301 → /case-studies | Retired narrative; still linked by homepage reporting CTA: F03. |
| /case-studies/hours-and-kilometres-visibility | 301 → /case-studies | Retired narrative; do not restore unverified proof. |
| /case-studies/fortnightly-data-snapshot-pipeline | 301 → /case-studies | Retired narrative; do not restore unverified proof. |
| /case-studies/structured-incident-intake | 301 → /case-studies | Retired narrative; do not restore unverified proof. |
| /case-studies/incident-register-and-database | 301 → /case-studies | Retired narrative; do not restore unverified proof. |
| /case-studies/shift-note-capture-and-summarisation | 301 → /case-studies | Retired narrative; do not restore unverified proof. |

| Utility | Result | Interpretation |
|---|---|---|
| /robots.txt | 200; Allow /; Disallow /api/; canonical sitemap | Correct canonical origin. |
| /sitemap.xml | 200; 20 content URLs | Includes current three example detail URLs, no retired cases. |
| /api/requests | GET 405; local handler specifies unavailable 503 for POST | Backend integration boundary, not a public content page; no submission attempted. |
| Missing top-level and case-detail samples | HTTP 404; noindex/nofollow response header | No successful-page fallback status observed. |

All six assets returned 200 with file hashes matching the canonical public files. They are ungated and distinct from the three paid offers.

| Resource | Public paths | Contents / terminology | CTA/trust/gap |
|---|---|---|---|
| Workflow Bottleneck Scorecard | /downloads/workflow-bottleneck-scorecard-guide.pdf; /downloads/workflow-bottleneck-scorecard.xlsx | Five-page guide; multi-workflow scoring workbook; comparison of up to 12 workflows. Disability-provider-first; selected allied health secondary in workbook. Service bridge names Diagnostics, Transformation and AI Guard. | Guide says Talk to Heutrix but has no contact link; no workbook contact hyperlink found. F07/F08. No fit call, sprint, low-code, free consultation, small-business or Workflow Diagnostic string found. |
| Enquiry-to-Service-Start Visibility Starter Kit | /downloads/enquiry-to-service-start-starter-kit-guide.pdf; /downloads/enquiry-to-service-start-starter-kit.xlsx | Six-page guide; operational tracker, stage/status/owner/next action/due dates/readiness. Disability-first, adaptable for allied health. | Guide says Talk to Heutrix but has no contact link; no workbook contact hyperlink found. F08/F14. No prohibited legacy terms found. |
| AI Guardrails Staff Starter Pack | /downloads/ai-guardrails-staff-starter-pack-guide.pdf; /downloads/ai-guardrails-staff-starter-pack.xlsx | Seven-page guide; AI-use classification and control registers; organisation approval and human review. Paid bridge correctly names Heutrix AI Guard. | Guide says Talk to Heutrix but has no contact link; no workbook contact hyperlink found. F08/F14. AI guardrails is legitimate descriptive resource language. |

Resource filenames, not separate HTML SEO pages, identify the downloads. The guide/workbook copy includes general-information and sensitive-data boundaries. No forms or verified client case evidence are embedded. They repeat common starter-resource instructions and provider-first positioning. PDF visual-layout QA and spreadsheet recalculation were outside this content audit.

## Production-goal gap assessment

| Goal | Current assessment |
|---|---|
| Sole original-theme production base | Met for inspected content, canonical tags, sitemap and redirects. No alternate deployment used as a base. |
| Disability-provider ICP | Strong hero/provider page; partial shared-copy and metadata drift remains (F04). |
| Three public offers | Met on live pages. Old component files create future regression risk only (F15). |
| Workflow first, outcomes before technology | Generally met. Clarify core-platform boundary and avoid overly abstract “bounded/decision-ready” density when editing (F06/F11). |
| 20-minute introductory-conversation conversion | Correct proposition and truthful draft labels; reliable online receipt/booking is deliberately unfinished (F01). |
| Secondary resource conversion | Three working assessments and six downloads; scope/naming/contact continuity need improvement (F07/F08/F14). |
| Evidence before claims | Illustrative labels are present; no invented results observed. Attributable team/client evidence still weak (F05). |
| No obsolete terminology / conflicting CTAs | Mostly met; exact remaining exceptions and link defects listed in F02/F03/F10. |
| Responsive identity and accessibility | Original navy/mint presentation retained. No overflow in 60 route-width checks; homepage visually checked. Full assistive-technology and contrast audit not performed. |
| SEO consistency and performance | Correct current origin and crawlable routes; mixed-audience descriptions, duplicate example summaries and JS-only page content remain. No Core Web Vitals benchmark collected. |
| No placeholders / no broken builds | No placeholder main content after articles loaded; enquiry integration intentionally incomplete. Build/tests were not rerun because this was a read-only live inventory; prior README test claims were not treated as new test results. |

## Recommended implementation order

1. **P0 — close the agreed conversion dependency (F01).** Prepare and verify the actual delivery/booking integration, real receipt, failure/retry behavior and honest confirmation. Keep the email draft fallback until that is complete. Respect the existing deferral until implementation is authorised.
2. **P1 — repair destination promises (F02/F03).** Fix AI Guard anchor compatibility and the reporting-example journey. These are small, direct corrections with clear acceptance checks.
3. **P1 — align proposition and ICP (F04/F06/F07).** Make disability providers primary in shared copy/SEO, unify core-platform boundaries, and distinguish the online single-workflow check from the multi-workflow workbook.
4. **P1 — restore continuity and credible evidence (F08/F09/F05).** Add contact paths in downloaded resources, explain actual website/email handling, and add attributable team evidence. Publish client outcomes only when supported and permitted.
5. **P2 — finish wording and reduce duplication (F10/F11/F13/F14/F17).** Update fallback/FAQ terms, standardise CTAs and resource labels, simplify initial enquiry effort and repetitive sections, and improve evaluation detail where settled.
6. **P2 — finish SEO, measurement and regression prevention (F12/F16/F15).** Distinct example metadata, appropriate structured data/rendering decisions, outcome-based conversion measurement and retirement of unused old components.
7. **Release verification.** Recheck all 20 routes, 14 redirects, six downloads, expanded FAQs, every carousel CTA, all assessment/result paths and contact/referral flows. Include visual mobile review, keyboard use, intended anchors and sensitive-information handling. Re-run the repository’s meaningful build/tests after changes. Confirm the original-theme origin is the only deployment target.

The dependency order does not prevent the small F02/F03 repairs being prepared while the external enquiry connection is pending. The original visual identity and route compatibility should remain the base throughout.

## Evidence files

- [Exact section copy and dynamic states](./supporting-copy.md)
- [Structured page inventory](./live-inventory.json)
- [HTTP, redirect and download evidence](./http-checks.json)
- [Responsive route checks](./layout-checks.json)
- [Assessment journeys](./assessment-journeys.json)
- [Contact/referral draft review](./enquiry-review.json)
- [Carousel content and reporting destination](./carousel.json)
- [Homepage dashboard and About tab copy](./tabbed-examples.md)
- [Download text/terminology extraction](./download-content.json)

Implementation locations for follow-up: `comparison/src/siteContent.js` (shared offers/SEO/FAQ), `src/RefinedPages.jsx` (home/about/examples), `src/components/WorkflowPressurePoints.jsx` (carousel), `src/App.jsx` (routes/sections/metadata), `src/leadMagnets/` (assessments/enquiry), `public/downloads/` (assets), and `worker.js` plus `server/googleRequests.js` (routing/delivery boundary). These were read only.

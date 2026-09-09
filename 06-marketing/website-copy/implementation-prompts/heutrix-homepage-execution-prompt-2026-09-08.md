# Heutrix homepage implementation prompt

**Reviewed and revised 9 September 2026:** Future homepage implementation, not a deployment instruction. The authoritative workspace is D:/AI Information Heirarchy/Heutrix. This revision incorporates the workspace reconciliation, approved founder summaries and marketing proof, the current AI Guardrails name and repaired reporting-card journey. The owner-directed follow-up removes the homepage photograph, its generated-image label, the auxiliary synthetic-data sentence and the separate proof callout. Preserve all six problem cards with distinct contextual CTAs. Retain the six approved resource files until a coordinated source rebuild and review.

Checked against current application files, the 8 September integration record, offer decisions and validation status, and the controlled proof/founder records on 9 September 2026. The filename is retained for link continuity. Historical live-site audit findings are not current defects unless rechecked.

## Execution target and source precedence

Work in `D:/AI Information Heirarchy/Heutrix/apps/website`.
The retained original-theme deployment target is https://heutrix-labs-original-theme.janith.workers.dev/. The reconciled homepage and owner-directed presentation follow-up were deployed and verified on 9 September 2026 as Cloudflare Worker version `e7c5e57c-d3c8-4e5c-a344-aac43c7a99ea`.
Do not use `refined-reference`, the copy-comparison deployment or the refined deployment as the implementation base. Despite its name, `src/RefinedPages.jsx` contains the active original-theme homepage, `RefinedHome`, imported by `src/App.jsx`.

This is a complete replacement for the earlier homepage prompt. Use the copy and decisions below; do not reintroduce its superseded CTA labels, five-minute scorecard promise or generic offer summaries.

Read root `AGENTS.md`, `06-marketing/README.md` and `06-marketing/website-copy/README.md` from the authoritative workspace. For the affected facts and scope, use these workspace-root-relative sources:
- `00-control/DECISIONS.md` and `00-control/VERIFIED-FACTS.md`: dated owner decisions, approved founder summaries and identity.
- `02-market-and-offers/offers/offer-strategy-2026-09/06-integrated-offer-architecture.md` together with `05-owner-validation-register.md`: current strategy versus proposed operating requirements.
- `06-marketing/case-studies-and-assets/PROOF-ASSET-REGISTER.md`, `SOURCE-EVIDENCE-MAP.md` and `09-power-bi-invoice-reconciliation.md`: the selected approved proof and its limits.
- `06-marketing/changes/2026-09-08-workspace-integration.md`: reconciliation authority and current implementation boundaries.
- `06-marketing/lead-magnets/RELEASE-MANIFEST.md`: the approved version 1.0 resource files; do not replace them with archived incoming PDF revisions.

Direct dated owner decisions take precedence over verified current assets, approved strategy, historical evidence and unadopted proposals. An application's omission of approved material does not revoke that material's approval. Older page drafts, founder copy packs and CTA guidance must not override newer dated decisions. The CTA guide's remaining reference to `comparison` is stale location wording; use `apps/website`.

The following paths are relative to `apps/website`:
- `CTA-STYLE-GUIDE.md`: current CTA authority, including truthful form labels.
- `README.md`: current deployment and operating state; distinguish current guidance from historical release notes.
- `src/siteContent.js`: paid offer scope, exclusions, route definitions and CTA constants.
- `src/RefinedPages.jsx`, `src/App.jsx`, `src/components/WorkflowPressurePoints.jsx`, `src/components/Navbar.jsx`, `src/components/Footer.jsx`: active presentation and routing.
- `src/original-theme.css`, `src/refined.css`, `src/index.css`: actual style stack.
- `src/leadMagnets/model.js`, `InteractiveTools.jsx`, `EnquiryPage.jsx`, `integrations.js`: actual resource and enquiry behaviour.
- `src/caseStudies.json`: public illustrative examples. The separate `../../99-archive/heutrix-labs-import-2026-09-08/comparison/content/evidence-review/case-studies-unverified.json` is not approved public proof.
- `../../90-research-and-audits/website-implementation-audit-2026-09-08/Heutrix-implementation-audit.md` and `findings.json`: observed issues to recheck, not blanket authorisation to implement the whole audit.

The working tree contains substantive uncommitted updates. Preserve them. Do not reset, replace the tree from Git history, or mistake the latest commit for the latest content. Inspect the current diff before changes.

## Settled implementation decisions

- Primary commercial CTA: **Talk to Heutrix** → `/contact`.
- Hero secondary: **See How It Works** → `/#heutrix-method`.
- Lead-generation CTA: **Get the Scorecard** → `/resources/workflow-bottleneck-scorecard`.
- Service discovery: **View Diagnostics**, **View Transformations**, **View AI Guardrails**. Exact destinations appear below.
- Australian disability service providers, including NDIS providers, remain primary. Selected allied health practices are a secondary comparable-workflow audience, not an equal homepage proposition. Retain their existing route without adding another homepage section.
- Diagnostics is a standalone paid decision engagement; Workflow Transformation is the primary implementation offer and implements one defined non-clinical workflow; AI Guardrails is a paid, fixed-scope governance engagement for commercially available AI tools.
- The three offers are independent entry points, not compulsory successive purchases. Diagnostics is unnecessary when the workflow and dependencies are sufficiently clear for direct Transformation; AI Guardrails can be engaged directly. AI inside a workflow does not automatically require a separate Guardrails purchase if suitable controls already exist.
- A process-only improvement can be a valid Transformation. Do not promise a software build where responsibilities, handovers and operating controls are the appropriate solution. AI Guardrails governance does not imply technical enforcement, continuous monitoring, certification or authority to approve every AI use.
- The integrated offer architecture contains proposed operational requirements. Do not promote its detailed workshop counts, investigation coverage, registers, sponsor review, support, delivery commitments or new capability claims into homepage promises before the validation register confirms them. Keep this homepage at the established offer-summary level. No automatic Diagnostics fee credit, new package or public price is introduced.
- No public prices, discounts, savings guarantees or unconditional delivery timelines. Paid scope, responsibilities, dependencies, timing, acceptance criteria and fees are agreed in writing before work starts.
- Improvement is around approved existing systems. Replacing a core practice, client or case-management platform is outside the current Workflow Transformation offer.
- The contact journey currently prepares a reviewable email draft. The visitor must send it in their email application. It neither delivers an enquiry automatically nor confirms a booking. Google Apps Script delivery remains intentionally reserved; do not activate it, a calendar, a vendor or mock success as part of this homepage task.
- Resources exist and remain ungated. The online scorecard checks one workflow; the downloadable workbook compares up to 12. Do not promise either format completes in five minutes.
- The application currently shows three illustrative examples. Separately, the controlled marketing collection contains 15 approved anonymised Heutrix case-study angles across four providers, and the facts register approves four short founder summaries. Use the specific homepage proof and founder copy below; do not describe these approved assets as missing. Keep the existing illustrative detail pages labelled illustrative.
- Preserve the current navy/mint/blue original-theme identity, hero visual and synthetic workflow view. Keep their illustrative and AI-generated labels. Do not present generated people as actual staff or clients.
- Preserve the team-preferred problem cards and their contextual CTAs, as shown in the supplied screenshot. Keep the six-card, one-at-a-time pressure-point carousel, introductory service link, keyboard controls, reduced-motion support and responsive behaviour. Refine copy or destinations where needed; do not strip the CTAs or replace the cards with four generic problem statements.

## Scope boundary

Implement and validate the homepage. This prompt does not authorise deployment, pushing or committing unrelated changes, external messages, new lead collection, new tracking vendors, edits to resources/downloads, or a site-wide audit remediation.

Use homepage-local content or opt-in props when a component is shared. `FinalCta`, `FounderIntro`, example cards and shared data also serve other pages; their defaults must not change those pages. Keep the shared header/footer and existing legal/operator identity intact. Report pre-existing off-homepage issues separately.

You are implementing the final approved homepage copy and conversion architecture for the Heutrix production website.

## PRIMARY OBJECTIVE

Update the HOMEPAGE ONLY of the existing Heutrix `original-theme` website so it reflects the final approved production copy architecture below.

This is an implementation task, not a redesign exercise and not a new copywriting exercise.

Preserve the existing original-theme visual identity, styling system, layout language, responsiveness, and overall design quality wherever possible.

Do not modify other service pages unless a homepage link must point to an existing route.

Do not invent new services, pricing, testimonials, statistics, credentials, client outcomes, case studies, or claims.

Use the approved proof and founder information specified below. If new evidence withdraws or limits an approval, report the specific conflict and use truthful reduced content; do not show empty cards, invented profiles or placeholder copy.

---

# BUSINESS CONTEXT

Business: Heutrix Pty Ltd

Primary homepage audience:

Disability service providers, including organisations operating in disability and NDIS-related service delivery.

Primary conversion goal:

Start a free 20-minute introductory conversation with Heutrix.

Primary CTA wording:

**Talk to Heutrix**

Secondary conversion:

Workflow Bottleneck Scorecard.

Lead-magnet CTA:

**Get the Scorecard**

The homepage must position Heutrix around operational improvement, workflow improvement, systems, visibility, administrative efficiency and organisational capacity.

Do not position Heutrix as a generic software consultancy.

---

# CRITICAL TERMINOLOGY RULES

Do NOT use:

- fit call
- sprint
- low-code
- generic software consultancy language
- exaggerated AI language
- aggressive direct-response language
- unnecessary technical jargon

Do not present dashboards, automations, integrations, forms, apps or similar components as standalone top-level products.

They may appear only as potential implementation components within a broader workflow solution.

---

# CRITICAL OFFER DISTINCTION

The website must make an unmistakable distinction between:

## Free introductory conversation

A free 20-minute conversation used to:

- understand the organisation at a high level;
- understand the operational problem;
- determine whether Heutrix may be able to help;
- identify an appropriate next step.

This is NOT a diagnostic engagement.

## Heutrix Diagnostics

A separate PAID professional engagement involving deeper examination of:

- workflows;
- systems;
- operational friction;
- bottlenecks;
- improvement opportunities;
- prioritised recommendations.

Never imply that the free introductory call includes a Heutrix Diagnostic.

The distinction must appear clearly in:

1. the engagement process;
2. the FAQ;
3. the final CTA section.

---

# IMPLEMENTATION PRINCIPLES

Before making changes:

1. Inspect the current homepage implementation.
2. Identify the existing original-theme components currently used.
3. Reuse existing components wherever they appropriately fit the new architecture.
4. Preserve existing typography, spacing, colour system, visual motifs and responsive behaviour.
5. Avoid introducing unnecessary new dependencies.
6. Avoid rewriting working shared components unless required.
7. Do not make broad global CSS changes unless clearly necessary.
8. Do not modify code outside the scope of implementing this homepage unless required for a homepage-specific component.
9. Preserve accessibility and semantic heading order.
10. Preserve or improve performance.

Where an existing component can contain a section with minor adaptation, prefer adaptation over building a replacement.

---

# REQUIRED HOMEPAGE ARCHITECTURE

The final homepage must appear in this order:

1. Hero
2. Problem recognition
3. Three Heutrix offers
4. Workflow-first methodology
5. Featured approved proof
6. Why Heutrix
7. Engagement process
8. Workflow Bottleneck Scorecard
9. Team / authority
10. Objection-led FAQ
11. Final CTA

Do not reorder these sections unless a genuine implementation constraint makes the order impossible.

---

# SECTION 1 — HERO

## Purpose

Immediately communicate:

- who Heutrix serves;
- what Heutrix improves;
- the operational outcome;
- the primary next step.

Lead with the business and operational outcome, not technology.

## Eyebrow

Operational improvement for disability service providers

## H1

Build a disability service business that runs better as it grows.

## Body copy

Heutrix helps Australian disability service providers, including NDIS providers, improve the non-clinical workflows around their existing systems — with clearer ownership, less administrative friction and better visibility as the organisation grows.

## Primary CTA

Talk to Heutrix

## Secondary CTA

See How It Works

The secondary CTA should anchor-scroll to or otherwise navigate directly to the workflow-first methodology/process section where appropriate.

## Microcopy

Start with a free 20-minute introductory conversation. No obligation.

## Component guidance

Reuse the existing original-theme hero component.

Preserve the hero's strongest visual qualities.

Do not overload it with additional copy.

---

# SECTION 2 — PROBLEM RECOGNITION

## Purpose

Create immediate recognition among disability service provider owners, executives and operational leaders.

The visitor should recognise that organisational growth can create operational friction even when service quality is strong.

## Eyebrow

The work between the systems

## H2

Does this sound familiar?

## Body

Even capable teams lose visibility when important work is spread across memory, inboxes, spreadsheets and manual reminders.

## Cards and contextual CTAs — preserve the existing pattern

The team specifically prefers the screenshot's presentation: introductory copy and a service link on the left, with one substantial problem card on the right. Each card has a numbered category, a concrete problem headline, a divider, an “A clearer next step” explanation and a contextual text CTA with an arrow. Preserve this structure, the six topics and their order.

### Card 1 — Intake & follow-up

Title: Intake, referral or enquiry follow-up handled differently by different people

A clearer next step: Make the owner, next action and due date visible from the first enquiry to the service-start decision.

CTA: **Take the Intake Assessment** → `/resources/enquiry-to-service-start-starter-kit`.

Keep the intake context in the visible link label as well as its accessible name. This contextual variation of “Take the Assessment” is approved for this card.

### Card 2 — Onboarding & handovers

Title: Service agreements, staff onboarding or handovers managed through memory and repeated reminders

A clearer next step: Define what “ready” means, who checks it and when the next person takes over.

CTA: **Explore an onboarding example** → `/case-studies/quickbooks-onboarding-and-access`.

### Card 3 — Tracking & follow-through

Title: Incident, complaint, risk or evidence tracking spread across spreadsheets

A clearer next step: Give each follow-up an owner, a due date and a review step, with a clear path for exceptions.

CTA: **Explore a follow-through example** → `/case-studies/incident-actions-and-closure`.

Preserve this card particularly closely to the supplied screenshot. Do not imply that the operational example provides regulatory, clinical or audit assurance.

### Card 4 — Operational visibility

Title: Managers lacking visibility over what is waiting, overdue or stuck

A clearer next step: Start with one recurring bottleneck. Identify the missing information and the decision it needs to support.

CTA: **Get the Scorecard** → `/resources/workflow-bottleneck-scorecard`.

This replaces the old “Find your workflow bottleneck” label while preserving its useful next step.

### Card 5 — Reporting preparation

Title: Reporting preparation that takes too long because information is scattered

A clearer next step: Agree the source inputs, review steps and exception checks before building another report.

CTA: **Check your reporting workflow** → `/resources/workflow-bottleneck-scorecard`.

Preserve this repaired destination and contextual label from the reconciled application. Explain that the assessment checks one workflow, and the visitor can select Operational reporting; do not imply that the link opens a reporting case study or a preselected result. This card-specific scorecard label is an intentional exception to the general Get the Scorecard promotion label, preserving the user-requested distinct CTAs. Do not revert to the retired reporting detail URL.

### Card 6 — AI use & human review

Title: AI tools being used informally without clear rules for privacy, review or suitable use

A clearer next step: Check the proposed task, information boundaries and accountable human review before using AI in the workflow.

CTA: **Check AI Guardrails** → `/resources/ai-guardrails-staff-starter-pack`.

Keep this distinct, descriptive label visible. This is a free screening tool, not the paid Heutrix AI Guardrails engagement or an approval to use AI. This contextual tool label is approved for this card.

## Introductory service CTA

Retain the left-column link placement and understated text-link styling. Use **Explore Services** → `/services`, aligning the existing “Explore how Heutrix can help” link with the current CTA guide.

These are contextual discovery/resource actions, subordinate to **Talk to Heutrix**. Preserve one relevant CTA per card and the introductory service link; do not add a commercial button to every card. Each card should offer a next step specific to its problem, with the six distinct visible labels specified above. Do not standardise them all to “Talk to Heutrix”, “Explore Services” or “Take the Assessment”. Descriptive example links and the contextual intake, reporting and AI tool labels are intentionally specified here; the general CTA guide must not erase this user-requested distinction.

## Component and visual guidance

Reuse the active `WorkflowPressurePoints` component and `workflow-pressure-points.css`. The user-provided screenshot is the visual reference for this section. Preserve the dark navy background, blue-tinted card surface, mint outline/accent, rounded corners, prominent problem heading, next-step divider and restrained arrow links. Keep the desktop split layout and comfortable stacked mobile layout; do not reproduce screenshot cropping or force its desktop dimensions onto mobile.

Retain the six-card sequence, previous/next buttons, position indicators, current/total count and pause/resume control. Preserve stable card height without clipping content, keyboard focus, touch navigation, pause on hover/focus, and reduced-motion behaviour. Hidden or outgoing cards must not expose focusable links. Do not let automatic rotation interrupt someone reading or activating a CTA.

Refine spacing, wrapping, contrast or concise wording only where needed for clarity, current offer accuracy and accessibility. The screenshot's card-and-CTA treatment is a preservation requirement, not an invitation to redesign the section. If a genuine implementation constraint prevents an exact detail, retain the closest accessible equivalent and explain the specific deviation in the completion report.

---

# SECTION 3 — THREE HEUTRIX OFFERS

## Purpose

Introduce the three ways Heutrix helps without duplicating service-page detail.

The purpose is to help a visitor recognise the appropriate path.

## Eyebrow

How Heutrix helps

## H2

Start with the problem you need to solve.

## Body

Whether you need clarity on what is slowing the organisation down, improvements to a specific workflow, or stronger controls around AI use, Heutrix provides a clear path forward.

## Offer 1

Title:

Heutrix Diagnostics

Supporting headline:

Find what is holding operations back.

Body:

A standalone paid engagement that maps the workflow, ranks bottlenecks and feasible options, and produces an implementation brief to support the next decision — including when not to build.

CTA:

View Diagnostics

Link to `/services#heutrix-diagnostics`; the current offer has a section on Services, not a separate Diagnostics route.

## Offer 2

Title:

Heutrix Workflow Transformation

Supporting headline:

Improve how critical work gets done.

Body:

Map, redesign, configure or build, and test one clearly defined non-clinical workflow in approved systems, with clear ownership, staff guidance and a maintainable handover.

CTA:

View Transformations

Link to `/services#heutrix-workflow-transformation`; do not invent a separate service route.

## Offer 3

Title:

Heutrix AI Guardrails

Supporting headline:

Establish controlled and appropriate AI use.

Body:

A paid, fixed-scope governance engagement for commercially available AI tools: approved, conditional and prohibited uses, information boundaries, accountable human review, escalation and practical staff guidance.

CTA:

View AI Guardrails

Link to `/ai-guardrails`, the working dedicated Heutrix AI Guardrails page. The reconciled Services title now generates the valid section ID `heutrix-ai-guardrails`; the earlier `heutrix-ai-guard` mismatch is historical. Preserve the `/ai-guardrails` route and `heutrix-ai-guardrails` enquiry parameter and assessment IDs.

## Section CTA

Explore Services

## Microcopy

Not sure where to begin? The introductory conversation can help determine the appropriate next step.

## Component guidance

Use the existing original-theme three-card service/offers component.

The three cards should feel related but clearly distinct.

Do not expand them into full service descriptions.

---

# SECTION 4 — WORKFLOW-FIRST METHODOLOGY

Purpose: explain the current Heutrix Method while keeping it distinct from the buying journey.

Eyebrow: Workflow first

H2: Improve the workflow before choosing the solution.

Body:
Heutrix starts by understanding how work moves through your organisation — the people, decisions, information and points where work slows down. The next step may be a simpler process, a scoped implementation or a recommendation not to build.

Keep the current four method names:
1. **Diagnose** — Understand the operational problem, workflow, ownership and gaps. Where deeper investigation is needed, Heutrix Diagnostics is a separate paid engagement.
2. **Triage** — Prioritise bottlenecks, dependencies and risks. Agree a useful next step, scope and success measures.
3. **Build** — Implement the simplest suitable improvement in approved systems. Test normal work, permissions and exception paths, with accountable human review.
4. **Handover** — Guide the team, document the workflow and agree ownership, maintenance and support boundaries.

CTA: **See How We Help** → `/about`, matching the existing methodology link.

Microcopy: Technology supports the solution. It does not define the problem.

Adapt the active `r-method` numbered section. Keep `id="heutrix-method"` and a suitable sticky-header scroll offset. The hero link must reach this section, including after direct navigation or reload. Method names describe delivery, not four free services or a mandatory paid sequence.

---

# SECTION 5 — FEATURED APPROVED PROOF

Purpose: show one substantiated Heutrix delivery example while keeping its controlled source evidence and claim wording intact.

Use the current approved case `06-marketing/case-studies-and-assets/09-power-bi-invoice-reconciliation.md`, the corresponding source-evidence entry and the 5 September publication approval. This is deliberate mapping of one controlled case into the homepage, not restoration of the archived JSON or republication of all 15 cases.

Eyebrow: In practice

H2: A clearer way to investigate reporting discrepancies.

Featured title: Bringing invoices and time records into one review workflow

Body:
An Australian disability support provider reviewed contractor invoices and QuickBooks time records in separate sources. Heutrix aligned the reporting model and delivered a cloud-connected Power BI reconciliation report so reviewers could filter the same information and investigate differences in one place. Client feedback supported approximately 1–2 hours less reconciliation and investigation effort per discrepancy.

Do not render a separate anonymised-delivery or evidence-limitation callout in this homepage module. This owner-directed presentation change does not strengthen the claim: retain the attribution to client feedback in the body, and keep the controlled evidence limits in the source records.

Do not turn the range into an exact or independently verified saving, a total weekly saving, an ROI claim, a testimonial or a product guarantee. The report does not itself validate either source system or establish an error-rate or financial benefit. Do not add a client name, identifying records, screenshots or raw source assets.

CTA: **View Transformations** → `/services#heutrix-workflow-transformation`.

This CTA opens the relevant offer, not a full case-study page. Do not link the approved delivery story to the currently illustrative onboarding page, the retired reporting detail URL, or a hub presented as if it contains this case. A separate full case-page rollout is outside this homepage task; a self-contained homepage proof panel is sufficient.

Adapt the existing `r-proof` / case-card visual language for one featured story. Any supporting diagram must be synthetic and labelled; no client source screenshot is approved by the narrative permission. Keep the three existing illustrative detail pages and the problem-card example links unchanged. Do not alter shared case data or other-page card defaults.

The controlled collection contains 15 case-study angles across four providers, not 15 clients or independent engagements. Do not publish that count unless the distinction remains explicit. Publication approval covers the current anonymised narratives and qualified ranges; it does not license stronger claims. If a current withdrawal or conflicting approval is found during execution, omit the affected claim, use a clearly labelled illustrative fallback and report the specific new conflict. Do not reopen settled publication approval without new evidence.

---

# SECTION 6 — WHY HEUTRIX

## Purpose

Answer:

Why Heutrix rather than another consultant, technology provider or software implementation company?

## Eyebrow

Why Heutrix

## H2

Operational improvement built around how your organisation actually works.

## Body

Disability service providers do not need more technology for its own sake. They need workflows that are easier to operate, easier to understand and better equipped to support growth.

## Cards

### Card 1

Title:

Workflow before technology

Body:

Recommendations begin with the operational problem, not a predetermined platform or tool.

### Card 2

Title:

Built around your organisation

Body:

Improvements reflect your existing team, systems, responsibilities and operating environment.

### Card 3

Title:

Practical implementation

Body:

Heutrix goes beyond identifying problems by helping turn better ways of working into operational reality.

### Card 4

Title:

Designed for sustainable improvement

Body:

The objective is not simply to fix today's bottleneck, but to create stronger foundations for the organisation as it grows.

## CTA

No CTA required.

## Component guidance

Use the existing benefits / why-us card grid.

---

# SECTION 7 — ENGAGEMENT PROCESS

## Purpose

Make the buying journey clear and remove uncertainty around what happens after clicking the primary CTA.

This section MUST clearly differentiate the free introductory conversation from paid Heutrix Diagnostics.

## Eyebrow

What happens next

## H2

A clear path from conversation to improvement.

## Body

You do not need to know which Heutrix service you need before getting in touch.

## Steps

### Step 1

Title:

Introductory conversation — free

Body:

Start with a free 20-minute conversation about your organisation, the operational challenge and what you would like to improve.

Microcopy:

This is an introductory conversation — not a Heutrix Diagnostic.

### Step 2

Title:

Determine the right next step

Body:

If there is a clear opportunity for Heutrix to help, we will explain the most appropriate way forward and what it involves.

### Step 3

Title:

Diagnose where required

Body:

Where the priority or feasible solution is unclear, Heutrix Diagnostics is a separate, standalone paid engagement. It maps the workflow, ranks bottlenecks and options, and provides an implementation brief that remains useful even if you do not proceed with a build.

### Step 4

Title:

Improve

Body:

Where implementation is appropriate, agree the scope, responsibilities, timing, acceptance criteria and fee in writing. Heutrix Workflow Transformation implements one defined non-clinical workflow, with testing, guidance and handover. Where AI-use controls are the issue, Heutrix AI Guardrails may be the appropriate route instead.

## CTA

Talk to Heutrix

## CTA microcopy

Free 20-minute introductory conversation · No obligation · Diagnostics are quoted separately.

## Component guidance

Use the original-theme numbered process/timeline component.

---

# SECTION 8 — WORKFLOW BOTTLENECK SCORECARD

Purpose: offer a lower-commitment, ungated starting point that accurately describes the existing tool.

Eyebrow: Free workflow scorecard

H2: Where is operational friction slowing you down?

Body:
Use the online Workflow Bottleneck Scorecard to assess one recurring non-clinical workflow. Review the friction, evidence, feasibility and control questions, then get a practical next step to discuss with your team.

Bullets:
- Review manual effort, handovers, delay, rework and visibility.
- Check how strong the evidence is and whether a change is feasible.
- Identify control questions that need attention before implementation.
- Save an action plan or discuss the selected result with Heutrix.

Primary resource CTA: **Get the Scorecard** → `/resources/workflow-bottleneck-scorecard`.

Format clarification, visible before or beside the CTA:
The online assessment checks one workflow. To compare up to 12 workflows, use the downloadable scorecard workbook.

Optional compact download links:
- **Get the Guide** → `/downloads/workflow-bottleneck-scorecard-guide.pdf`.
- **Get the Template** → `/downloads/workflow-bottleneck-scorecard.xlsx`.

Microcopy: Free · No email address required · No consultation required

Short boundary: A general starting point, not a paid Diagnostic or approval to implement a change. Keep information general and non-sensitive.

Do not promise a five-minute completion time or a multi-workflow comparison inside the online tool. Existing workbook material uses a 20-minute title, which must not be transferred to the online assessment or confused with the introductory conversation.

Reuse the highlighted original-theme resource styling and existing tool route. Do not rebuild, gate, change scoring or collect additional data. Retain evidence/feasibility/control overrides, optional result handoff and the in-memory information model. A download or assessment is not a captured commercial lead.

The other two resource families remain available on `/resources`: Enquiry-to-Service-Start Visibility Starter Kit and AI Guardrails Staff Starter Pack. They are free resources, not extra paid offers. Do not duplicate the three-resource grid on the homepage; an optional **Explore Resources** link to `/resources` may sit within this section.

---

# SECTION 9 — TEAM / AUTHORITY

Purpose: put the approved founder names and relevant experience behind the proposition without expanding unverified biographies or delivery commitments.

Eyebrow: The team behind Heutrix

H2: Practical experience applied to operational problems.

Body:
Heutrix grew from first-hand experience running a disability and allied health services organisation. The founders bring together workflow implementation, provider operations, project delivery, data and engineering experience.

Use these four concise profiles from the 5 September approved public summaries in `00-control/VERIFIED-FACTS.md`:
- **Janith** — Workflow implementation and experience helping build a disability support business.
- **Rochelle** — Project delivery and disability-provider administration and operations.
- **Sach** — Data and analytics.
- **Shash** — Backend engineering and infrastructure.

These are approved experience summaries, not assigned operational job titles or guarantees about who leads every engagement. Do not add surnames, credentials, employers, years, international experience, founder portraits, named-lead commitments or capacity promises from older draft copy packs. Those need their own evidence or operating approval. The general proof register's older open biography row does not revoke these later specifically approved short summaries.

CTA: **About Heutrix** → `/about`.

Adapt `FounderIntro` / `r-origin` locally for the homepage and use existing card typography/spacing for the four text profiles. Keep the shared About-page version unchanged. Use text-led profiles rather than empty image placeholders or generated portraits.

Preserve existing verified operator details in the shared footer. No new location line is necessary: the registration record supports VIC 3978, but that alone does not establish an exact office address or the broader personal-location claims in historical copy. Do not add “Melbourne, Australia” solely from the older prompt.

---

# SECTION 10 — OBJECTION-LED FAQ

## Purpose

Answer high-intent objections preventing a qualified disability service provider from starting a conversation.

Use an accordion if one already exists.

## Eyebrow

Common questions

## H2

Before you talk to Heutrix.

## FAQ 1

Question:

Do we need to know exactly what needs fixing?

Answer:

No. Many organisations know that a process is taking too much time or becoming difficult to manage without knowing exactly where the underlying problem sits. The introductory conversation is designed to understand that situation and determine whether Heutrix can help.

## FAQ 2

Question:

Is the 20-minute introductory conversation a Heutrix Diagnostic?

Answer:

No. The introductory conversation is free and is intended to understand your situation at a high level.

Heutrix Diagnostics is a separate, standalone paid engagement involving deeper examination of workflows, systems and operational friction, ranked options and an implementation brief. It can recommend not building, and does not commit you to implementation.

## FAQ 3

Question:

Will Heutrix recommend replacing our existing systems?

Answer:

Heutrix works around your approved existing systems. Workflow Transformation does not replace your core practice, client or case-management platform. Changes to supporting workflow tools are considered only where feasible and agreed in scope.

## FAQ 4

Question:

Do you only help with technology problems?

Answer:

No. The problem may involve workflow design, responsibilities, information flow, systems, automation or a combination of these. Technology is considered as part of the solution where appropriate.

## FAQ 5

Question:

Do we need to undertake a Diagnostic before working with Heutrix?

Answer:

Not necessarily. The appropriate starting point depends on the problem. Where the cause or priority is unclear, a paid Diagnostic may be recommended before implementation begins.

## FAQ 6

Question:

What happens during the introductory conversation?

Answer:

We discuss the operational challenge, how it is affecting the organisation and what you would like to improve. If Heutrix appears able to help, we explain the appropriate next step. To request a conversation, use the contact page to review an email draft, then send it from your email application. Opening the draft does not send it or confirm a booking. Keep the description high-level and non-sensitive.

## CTA

Talk to Heutrix

## Microcopy

Start with a free 20-minute introductory conversation.

## Component guidance

Use the existing FAQ accordion.

Ensure it is keyboard accessible.

---

# SECTION 11 — FINAL CTA

## Purpose

Convert visitors who reach the end of the homepage.

Do not introduce a new proposition here.

## Eyebrow

Start with a conversation

## H2

What could work better in your organisation?

## Body

If manual processes, disconnected workflows or limited operational visibility are making your organisation harder to run, start by showing us where the friction is.

We will use a free 20-minute introductory conversation to understand the situation and determine whether Heutrix can help.

## Primary CTA

Talk to Heutrix

## Secondary CTA

Get the Scorecard

## Microcopy

Free 20-minute introductory conversation · No obligation · Heutrix Diagnostics is a separate paid engagement.

Supporting handoff note: The contact page helps you prepare an email request. Review and send it in your email app; a time is then agreed separately.

## Component guidance

Use the existing original-theme final CTA/banner component.

---

# CTA HIERARCHY AND EXACT DESTINATIONS

Follow `CTA-STYLE-GUIDE.md`. Surrounding copy explains the benefit; labels name the actual action.

| Context | Exact label | Destination |
|---|---|---|
| Hero, engagement, FAQ ending, final CTA, existing high-intent placements | Talk to Heutrix | `/contact` |
| Hero secondary | See How It Works | `/#heutrix-method` |
| Scorecard promotions and final secondary | Get the Scorecard | `/resources/workflow-bottleneck-scorecard` |
| Diagnostics card | View Diagnostics | `/services#heutrix-diagnostics` |
| Transformation card | View Transformations | `/services#heutrix-workflow-transformation` |
| AI Guardrails card | View AI Guardrails | `/ai-guardrails` |
| Service overview | Explore Services | `/services` |
| Methodology discovery | See How We Help | `/about` |
| Team / authority | About Heutrix | `/about` |
| Featured approved proof | View Transformations | `/services#heutrix-workflow-transformation` |

Section 2 additionally retains the six contextual card CTAs specified there: intake assessment, onboarding example, follow-through example, scorecard, reporting-workflow check and AI assessment, plus its introductory **Explore Services** link. These are approved discovery/resource actions within the card treatment, not competing primary commercial CTAs. Validate every one, including cards initially hidden by the carousel.

Do not use the superseded primary label “See what Heutrix can improve” or the old Explore Diagnostics / Explore Workflow Transformation / Explore AI Guardrails labels.

Service-specific enquiry actions, only where relevant, remain **Discuss Diagnostics** → `/contact?service=heutrix-diagnostics`, **Discuss Transformations** → `/contact?service=heutrix-workflow-transformation`, and **Discuss AI Guardrails** → `/contact?service=heutrix-ai-guardrails`. Preserve those query values; the legacy AI identifier is compatible internal routing, not public offer copy. Do not add service-enquiry buttons to every card alongside discovery buttons.

The shared footer already has the two conversion actions **Talk to Heutrix** and **Get the Scorecard**. Preserve them and ordinary navigation; do not add more conversion actions.

The existing form uses **Review My Enquiry** / **Review My Referral**, followed by **Open Email Draft** or **Open Email to Paste**. Do not substitute **Send Enquiry**, **Send My Scorecard**, **Choose a Time** or **Continue to Booking** unless the matching real delivery/calendar action is separately connected and verified. That integration is outside this task.

Avoid vague “Get Started”, “Learn More”, “Click Here”, “Submit”, “Next”, “Get in Touch” or generic “Download Now” conversion labels. Internal property names such as `ctas.fitCall`, compatibility URLs and free-resource names such as AI Guardrails Staff Starter Pack are not prohibited visitor-facing offer wording and need no unrelated refactor.

---

# COPY AND UX REQUIREMENTS

Keep the homepage concise.

Avoid repeating detailed information that belongs on service pages.

The homepage should progressively answer:

1. Is this for an organisation like mine?
2. Do they understand our operational problems?
3. What can they help with?
4. How do they approach it?
5. Why should I believe them?
6. Why are they different?
7. What happens if I contact them?
8. Is there a lower-commitment next step?
9. Who is behind the business?
10. What objections remain?
11. What should I do next?

Use enough whitespace between sections to preserve readability.

Do not create excessively dense cards.

Avoid long paragraphs.

Do not add unnecessary badges, labels or decorative text.

Do not make every section visually identical.

Use the existing theme's established patterns to create rhythm.

---

# ACCESSIBILITY REQUIREMENTS

Ensure:

- one H1 only;
- logical H2/H3 hierarchy;
- meaningful link text;
- buttons and links have accessible focus states;
- accordions are keyboard accessible;
- images have appropriate alt text;
- decorative graphics do not create screen-reader noise;
- sufficient contrast is preserved;
- mobile layouts do not create horizontal overflow;
- clickable card areas are semantically valid;
- CTA links remain understandable outside visual context.

---

# RESPONSIVE REQUIREMENTS

Verify at minimum:

- desktop;
- tablet;
- mobile.

Check for:

- hero line breaks;
- overly tall cards;
- card grids collapsing correctly;
- CTA wrapping;
- FAQ readability;
- process/timeline alignment;
- proof metrics;
- team card sizing;
- section padding;
- heading widows/orphans where practical;
- horizontal overflow.

---

# SEO REQUIREMENTS

Do not keyword-stuff.

The homepage should clearly communicate disability service provider relevance in:

- hero;
- supporting copy;
- metadata where appropriate.

Preserve existing SEO infrastructure.

Review the existing:

- page title;
- meta description;
- canonical tag;
- Open Graph content;
- schema markup.

Only update homepage metadata if needed to reflect the approved positioning.

Suggested direction — do not blindly overwrite better approved existing metadata:

Title concept:

Heutrix | Operational Improvement for Disability Service Providers

Meta description concept:

Heutrix helps disability service providers improve workflows, reduce administrative friction and build stronger operational systems for growth.

Keep metadata within sensible search-result lengths.

---

# ANALYTICS / EVENT HANDLING

Preserve existing analytics and tracking.

If CTA analytics are already implemented, make sure the new CTA buttons continue to trigger equivalent events.

Do not introduce a new analytics vendor.

Where tracking naming is already standardised, use the existing convention.

Potential distinct CTA identifiers should make it possible to distinguish:

- hero primary CTA;
- engagement CTA;
- scorecard CTA;
- FAQ CTA;
- final CTA;
- service-card CTAs.

Do not change existing tracking architecture unnecessarily.

---

# ROUTING / LINK VALIDATION

Check every homepage CTA.

Verify that:

- Diagnostics points to the correct service page;
- Workflow Transformation points to the correct service page;
- AI Guardrails points to the correct service page;
- About Heutrix points to the correct page;
- Scorecard points to the correct scorecard route or form;
- See How It Works points to the correct methodology section/page;
- primary CTA points to the intended introductory-conversation journey.

Do not invent routes where valid routes already exist.

If a destination does not yet exist, document it clearly rather than silently linking to the wrong place.

---

# PRODUCTION CONTENT SAFETY

Do not invent or alter factual claims to make the website sound stronger.

In particular, never invent:

- prices;
- client counts;
- ROI;
- percentages;
- cost savings;
- hours saved;
- NDIS credentials;
- certifications;
- partnerships;
- customer names;
- testimonials;
- case-study outcomes;
- years of experience;
- regulatory approvals.

Where approved content is missing, flag it.

---

# IMPLEMENTATION WORKFLOW

Carry out the work in this order.

## Phase 1 — Inspect

Inspect:

- homepage files;
- component architecture;
- existing content source;
- styling system;
- navigation;
- footer;
- service routes;
- scorecard route;
- contact/consultation flow;
- About page;
- current testimonials/proof;
- team content;
- responsive patterns.

Identify which existing original-theme component will be reused for each of the 11 required sections.

## Phase 2 — Map

Create an internal mapping such as:

Section → Current component → Changes required

Prefer reuse.

## Phase 3 — Implement

Implement all approved homepage copy.

Maintain the exact strategic meaning of the supplied copy.

Minor grammatical adaptations are permitted only where required by component constraints.

Do not independently rewrite the positioning.

## Phase 4 — Clean up

Remove homepage content that conflicts with the approved architecture.

In particular remove or replace:

- outdated offers;
- duplicate value propositions;
- generic software-development messaging;
- unsupported claims;
- redundant CTAs;
- terminology prohibited above;
- sections that undermine the workflow-first positioning.

Do not remove globally shared content that other pages depend on unless it is safe to do so.

## Phase 5 — Validate

Check:

- section order;
- exact CTA hierarchy;
- free vs paid Diagnostic distinction;
- all links;
- accessibility;
- responsive layout;
- mobile typography;
- repeated copy;
- dead code introduced by the homepage change;
- console errors;
- broken images;
- invalid routes.

## Phase 6 — Visual QA

Render or inspect the full homepage.

Compare the completed implementation against the original-theme visual quality.

Do not accept a technically correct implementation that visibly degrades:

- spacing;
- hierarchy;
- balance;
- typography;
- visual rhythm;
- card consistency;
- mobile layout.

Make corrective adjustments where necessary.

---

# ACCEPTANCE CRITERIA

The implementation is complete only when all of the following are true:

- homepage targets disability service providers clearly;
- all 11 required sections exist;
- sections appear in the approved order;
- primary CTA is consistently "Talk to Heutrix";
- Workflow Bottleneck Scorecard is clearly presented as the lead magnet;
- the free 20-minute conversation is clearly distinguished from paid Heutrix Diagnostics;
- all three approved offers appear;
- section 2 preserves the six problem cards, their “A clearer next step” content, one relevant contextual CTA per card and the introductory service link, with the screenshot's visual treatment and accessible carousel controls;
- service cards remain concise;
- workflow-first positioning is clear;
- no prohibited visitor-facing terminology remains in the changed homepage, including expanded FAQs; legacy internal identifiers are preserved where needed;
- no invented pricing appears;
- no unsupported claims have been added;
- section 5 uses the selected approved anonymised reporting case with its approximate, client-feedback-supported range and visible limitations; illustrative detail pages remain clearly labelled;
- section 9 uses the four approved founder summaries without unapproved portraits, credentials or operational role promises;
- homepage works on desktop, tablet and mobile;
- existing theme quality is preserved or improved;
- all published homepage links and hash targets work; a missing destination is reported as a blocker, never accepted as a dead or placeholder CTA;
- accessibility has not regressed;
- no unrelated pages are unintentionally changed;
- there are no obvious console errors or broken assets.

---

# FINAL OUTPUT REQUIRED

After implementation, return a concise completion report containing:

## 1. Files changed

List each file changed and what changed.

## 2. Homepage section mapping

For each of the 11 sections state which existing original-theme component was reused or adapted.

## 3. CTA validation

Confirm the final destination of:

- Talk to Heutrix
- See How It Works
- Get the Scorecard
- View Diagnostics
- View Transformations
- View AI Guardrails
- About Heutrix

Also report each problem card's visible CTA, destination and destination-content match:

- Take the Intake Assessment — `/resources/enquiry-to-service-start-starter-kit`
- Explore an onboarding example — `/case-studies/quickbooks-onboarding-and-access`
- Explore a follow-through example — `/case-studies/incident-actions-and-closure`
- Get the Scorecard — `/resources/workflow-bottleneck-scorecard`
- Check your reporting workflow — `/resources/workflow-bottleneck-scorecard`
- Check AI Guardrails — `/resources/ai-guardrails-staff-starter-pack`

Verify all six cards by navigating the carousel, not only its initially visible card. A successful HTTP response alone is insufficient if the destination does not deliver what the CTA promises.

## 4. Content requiring confirmation

List only genuine unresolved items such as:

- a new withdrawal, changed claim or unresolved evidence conflict affecting the selected approved case;
- any requested founder detail beyond the four approved short summaries;
- unavailable route;
- missing scorecard destination.

Do not create unnecessary approval questions.

## 5. QA completed

Confirm:

- desktop;
- tablet;
- mobile;
- accessibility basics;
- link validation;
- console/error check.

## 6. Remaining production blockers

State either:

**No new homepage implementation blockers identified. The existing manual email-draft handoff remains in place; automated delivery and booking are intentionally unconnected.**

or list the specific remaining blockers.

Do not modify unrelated code.

Do not stop after analysis when this prompt is executed. Implement locally and validate; do not deploy without a separate instruction.

Inspect the existing implementation, make the homepage changes, validate them, and leave the homepage in production-ready condition.
---

# REPOSITORY-SPECIFIC QA AND HANDOVER

Before editing, capture the current homepage at desktop, tablet and narrow mobile sizes and record existing changes so final reporting identifies only this task's edits. Map all eleven sections to active implementations; do not revive inactive legacy components simply because they have convenient names such as Hero, Services or FAQ.

Validate at 1440, 768, 390 and 320 pixels. Check the hero illustrative-view tabs, all six pressure-point cards and CTA destinations, previous/next and indicator controls, pause/resume and pause-on-focus behaviour, reduced motion, keyboard focus, expanded FAQs, anchor scrolling below the header and the single featured approved case. Compare section 2 with the supplied screenshot: preserve the card hierarchy, next-step divider, contextual links and desktop split layout while allowing responsive reflow. Check that the longest card and CTA do not clip, overlap controls or cause layout jumps. Keep one H1 and meaningful section headings. Confirm the removed homepage photograph and requested auxiliary labels are absent; retain the workflow demonstration’s “Illustrative view” label.

Run the existing production build and tests (`npm run build`, `npm test`). Use `npm run check` with the local Worker origin for route/resource verification as appropriate. Existing browser checks include `npm run test:browser` and `node scripts/check-pressure-points-browser.mjs`; update only expectations genuinely changed by the approved homepage copy or carousel content. Use synthetic information and do not send external messages or enable delivery to test the page. Distinguish tests actually run from previous README/audit results.

Recheck homepage links, their exact fragments and any query-context handoff. Spot-check Services, About, Resources, Contact and an illustrative detail page to confirm shared components have not changed their content or behaviour. Preserve canonical origin, route metadata machinery, redirects, downloads and Worker behaviour. A homepage metadata edit must not rewrite defaults for every route. Report shared noscript wording or other cross-site audit findings separately if changing them would exceed scope.

Do not invent analytics. No first-party conversion event implementation was identified in the reviewed source; inspect again and preserve what actually exists. If no events are implemented, state that. Never call an email-draft click a delivered enquiry or confirmed booking.

In the completion report include all CTA destinations above, the eleven-section component mapping, actual QA results and any failed or unavailable checks. Separate newly introduced homepage blockers from known limitations: manual email handoff, client-feedback rather than audited proof, and approval limited to short founder summaries rather than full credentials or portraits. Do not list the approved case or four approved summaries as missing. Report the manual handoff as an intentional limitation, not as automatic booking or as permission to build an integration.

# Heutrix Labs Website Launch Review

**Review date:** 25 August 2026  
**Live site reviewed:** [heutrix-labs.janith.workers.dev](https://heutrix-labs.janith.workers.dev/)  
**Lens:** Service-business customer acquisition, offer design, lead generation, and conversion — applying the underlying Value Equation, Grand Slam Offer, and Core Four concepts associated with Acquisition.com without imitating anyone's style.

## Bottom line first

**Verdict: Do Not Launch Yet. Launch readiness: 46/100.**

The strategic foundation is promising: the audience, operational problems, service boundaries, starting prices, and “workflow first, technology second” philosophy are unusually clear for an early-stage consultancy. But the website is not currently a working acquisition asset. Its enquiry forms do not transmit, email, store, or schedule anything; they only show a local thank-you message. There is also no founder/team identity, real proof, working booking calendar, response-time commitment, analytics, conversion tracking, branded website domain, proper 404, favicon, sitemap, social metadata, or credible end-to-end follow-up path. Fix those before directing referrals or paid traffic here.

The Acquisition.com source material describes a Grand Slam Offer as one that improves outcome, proof/guarantees, speed, effort, and enhancers; it also treats the offer as the prerequisite for scalable lead generation. That is the right diagnostic here: Heutrix has defined services, but not yet an offer with enough proof, specificity, risk reduction, and conversion infrastructure to make cold traffic efficient. See [Acquisition.com's offers workshop](https://www.acquisition.com/workshop-offers-v1), [official Value Equation training](https://www.acquisition.com/training/offersold/value-equation), and the [official Core Four overview](https://www.acquisition.com/journal-14).

## Audit basis, facts, assumptions, and limits

### Verified from the live site and source

- The site targets Australian allied health practices and disability support providers.
- GP clinics appear in the supplied business brief and in the unrendered HTML description, but not in the visible site's audience, navigation, sector pages, or core offer. This is an unresolved market-positioning inconsistency.
- It presents three named products, with published starting prices from **$950 to $2,500 + GST**.
- A Heutrix Workflow Transformation is described as typically taking **2–4 weeks**.
- The primary CTA is consistently presented as **“Book a free fit call.”**
- There is no booking calendar. The CTA leads to a contact form.
- The form prevents normal submission and only changes local page state to a thank-you message. No enquiry leaves the visitor's browser.
- There are no published testimonials, customer logos, case studies, quantified client outcomes, founder biographies, staff names, professional credentials, address, ABN, phone number, or social profiles on the site.
- The “before and after examples” are illustrative scenarios, not demonstrated client outcomes.
- HTTPS works. The production build completes and the dependency audit reported no known vulnerabilities.
- `robots.txt`, `sitemap.xml`, `favicon.ico`, and unknown URLs all return the generic SPA HTML. Unknown URLs display the homepage with a `200` response instead of a real 404.
- No analytics or conversion-tracking implementation is present in the reviewed source.
- The current site is hosted on a `janith.workers.dev` preview-style domain while a professional `@heutrixlabs.com` email address is displayed as plain text.

### Assumptions

- Heutrix is early-stage and does not yet have approved, publishable customer proof.
- Delivery is owner-led or performed by a very small team.
- Melbourne is the intended primary market, with remote Australian delivery possible.
- The site is a pre-launch build, not the intended final public domain.
- The most controllable initial outcome is improving **one bounded operational workflow**, not promising compliance, revenue growth, or a fixed number of hours saved.

### Important limits

- I did not submit invented personal data through the form. Source inspection conclusively showed there is no receiving endpoint.
- A responsive viewport override did not apply reliably in the available browser, so mobile is assessed from the responsive source, navigation implementation, accessibility tree, and desktop rendering. Real iPhone and Android testing remains required.
- The single live speed sample showed a fast roughly **0.14-second TTFB from Melbourne**, but that is not a Core Web Vitals or Lighthouse test.
- Privacy and contract comments are launch-risk observations, not legal advice. Obtain Australian legal/privacy review.

# Phase 1 — Understand the business before critiquing the website

| Element | Current interpretation |
|---|---|
| Target customer | Based on the visible site: Australian allied health practice owners/managers and small-to-mid-sized disability provider owners/operations leads, particularly teams outgrowing inboxes, spreadsheets, memory, and inconsistent handovers. The supplied brief also names GP clinics, but the site does not. |
| Primary problem | Important operational work is fragmented, person-dependent, hard to track, slow to report, and increasingly risky to manage informally. |
| Desired outcome | Clear ownership, visible status and next actions, fewer manual handoffs, easier management oversight, maintainable workflows, and safer use of automation/AI. |
| Primary service | Diagnose, redesign, build, test, and hand over one operational workflow, tracker, dashboard, automation, or lightweight internal system. |
| Primary differentiator | “Workflow first, technology second”: bounded improvements around existing core systems, with data minimisation, human review, documentation, and handover. |
| Primary promise | Current implied promise: make internal operations clearer and more reliable. It is not yet specific or measurable enough. |
| Price position | Low-cost boutique/entry-level: $950 for Heutrix Diagnostics, $2,500 for Heutrix Workflow Transformation, and $1,800 for Heutrix AI Guardrails, all plus GST. |
| Why choose Heutrix | Sector-specific problem language, practical scope boundaries, no forced replatforming, transparent entry pricing, and maintainability emphasis. |
| Why hesitate | No visible human identity, no proof, uncertain depth of technical/sector expertise, low prices that may signal shallow delivery, unclear support, no real booking mechanism, and no functioning lead submission. |
| Primary CTA | “Book a free fit call,” although the actual action is “send an enquiry requesting a call.” |
| Intended journey | Land → recognise operational problem → review service/sector/pricing → request fit call → receive follow-up → sales conversation → scoped paid diagnostic/build. The journey currently stops at the form. |

### “Based only on the current website, here is what I believe this business sells and why someone should buy it.”

Heutrix Labs helps Australian allied health and disability service operators replace one messy, spreadsheet- or memory-dependent workflow with a clearer tracker, dashboard, automation, or lightweight internal system. A buyer should choose it when they want a practical, bounded improvement around existing software, with attention to privacy, human review, documentation, and handover rather than a large replatforming project.

This can be explained in 2–3 sentences, so the category positioning is not broken. The major positioning weakness is that the promised result remains generic and unproven: “clearer workflows” is credible, but it is not yet an urgent, valuable, believable offer.

### Questions that must be answered before launch

1. Who delivers the work, and what verified experience makes that person credible in care operations, automation, security, privacy, or implementation?
2. Which segment comes first: allied health practices or disability providers? What team-size, revenue, software, and operational-maturity range is ideal?
3. Which tools and integrations can Heutrix competently support today?
4. What are the delivery hours and loaded cost for each package, including sales, revisions, training, and support?
5. What response SLA, delivery capacity, and concurrent-project limit can be honoured?
6. What actual previous work can be shown, even if anonymised or demonstrated with synthetic data?
7. What happens to client data during discovery, building, testing, handover, and deletion?
8. Who owns accounts, automations, source files, dashboards, and maintenance after handover?
9. What professional indemnity, cyber, and public liability coverage is appropriate for the scope?
10. Is the market Melbourne-only, Australia-wide remote, or both?
11. Are GP clinics a genuine launch segment? If yes, define their distinct high-value workflows and give them a dedicated landing page; do not add “GP” to generic copy without a specific offer and proof plan.

# Phase 2 — The 5-second test

| Prospect question | Grade | Why |
|---|---|---|
| What is this? | **Clear** | “Practical workflow systems” and the examples establish the category. |
| Is it for someone like me? | **Clear for allied health/disability; unclear for GP clinics** | Allied health practices and disability support providers are named in the H1. GP clinics from the supplied brief are absent. |
| What problem does it solve? | **Clear** | Messy admin, spreadsheets, follow-up, reporting gaps, and unsafe AI use are explicit. |
| What outcome do I get? | **Somewhat Clear** | Clearer workflows and visibility are implied, but no concrete first result or measurable transformation is stated. |
| Why should I care? | **Somewhat Clear** | Operational friction is recognisable, but the financial, capacity, risk, and staff impacts are not quantified or prioritised. |
| Why should I believe them? | **Unclear** | No person, proof, demonstration, result, credential, or third-party validation appears above the fold or elsewhere. |
| What should I do next? | **Clear in wording; misleading in mechanism** | “Book a free fit call” is obvious, but it opens a non-functioning enquiry form rather than a booking flow. |

## Recommended above-the-fold copy

**Eyebrow:** Workflow improvement for Melbourne allied health and disability providers

**Headline:** Fix the admin workflow slowing your care team down.

**Subheadline:** Heutrix Labs maps, rebuilds and hands over one intake, referral, onboarding, incident, evidence or reporting workflow—designed around your existing systems and day-to-day service delivery.

**Primary CTA:** Book a 20-minute workflow fit call

**Secondary CTA:** See packages and starting prices

**Supporting trust statement:** Melbourne-based • Fixed-scope starting points • No forced replatforming • Testing, training and handover included

Only publish “Melbourne-based” and the stated call duration after verifying them operationally.

## Recommended hero structure

1. Sector label.
2. Outcome-led headline.
3. One-sentence explanation of the vehicle.
4. Primary booking CTA and secondary pricing CTA.
5. “What happens on the call” microcopy: **“In 20 minutes, we will identify the workflow, assess fit, and agree the smallest useful next step. No patient or participant information is needed.”**
6. Trust strip with verified facts only.
7. Right-side visual: an annotated, synthetic-data before/after workflow showing owner, status, next action, overdue flag, and handover—not an unlabelled generic dashboard.

# Phase 3 — Value Equation audit

## 1. Dream Outcome — 6/10

**What is wrong:** The site can still describe Heutrix Diagnostics and Heutrix Workflow Transformation through mechanisms such as automation, dashboards and systems more prominently than the business outcomes: fewer dropped follow-ups, less management chasing, faster handovers, less reporting preparation, lower dependency on one person, and more team capacity.

**Why it matters:** Buyers do not primarily want a dashboard. They want confidence that referrals will not be lost, overdue work will be visible, staff will know the next action, and growth will not create proportionally more admin.

**Conversion effect:** The service can appear useful but optional—another technology project rather than relief from an expensive operating constraint.

**Fix:** Lead with one controllable transformation: **“One critical workflow working end to end, with clear ownership, live status, staff guidance, and a handover plan.”** Connect it to business value through an agreed baseline, without inventing savings.

**True desired end result:** A calmer, more controllable operation that can grow without missed work, constant chasing, unsafe shortcuts, or excessive management overhead.

## 2. Perceived Likelihood of Achievement — 2/10

**What is wrong:** The site contains no real evidence. The dashboard is a mockup. The before/after examples are plausible descriptions but not case studies. “Practical implementation partner” is repeated self-description, not validation.

**Why it matters:** A regulated service provider is being asked to trust an unknown company with workflows touching staff, participants, patients, records, incidents, or reporting. The downside of choosing badly feels much larger than the published fee.

**Conversion effect:** Qualified prospects may like the copy, then defer action or select a competitor with named operators, visible work, quantified results, or client validation.

**Fix before launch:**

- Add founder name, professional photo, Melbourne location/service area, verified experience, relevant training/credentials, and a clear explanation of who performs the work.
- Publish one synthetic-data demonstration: workflow map → prototype → management view → handover pack. Label it clearly as a demonstration.
- Show a redacted sample diagnostic, acceptance checklist, runbook, and dashboard.
- Label current “before/after examples” as **illustrative examples**, not outcomes.
- If prior work exists, obtain explicit permission for one evidence-backed case study with baseline, scope, timeline, result, limitations, and client quote.
- Add client logos/testimonials only with written permission.
- Do not add badges, certifications, statistics, or guarantees that cannot be substantiated.

## 3. Time Delay — 5/10

**What is wrong:** One service mentions 2–4 weeks, but the site does not state response time, fit-call length, scheduler availability, diagnostic turnaround, dashboard/system timelines, proposal timing, or time to the first visible result.

**Why it matters:** Ambiguous delay increases perceived cost and makes an already abstract consulting purchase easier to postpone.

**Conversion effect:** Visitors cannot answer “when will this be better?” or “how much management time will this consume?”

**Fix:** Publish honest service windows and the first milestone. For example:

- Response: within one business day.
- Fit call: 20 minutes.
- Diagnostic: findings within 7 business days of the workshop.
- Heutrix Workflow Transformation: first prototype in 10 business days; typical completion in 3–5 weeks, with visibility-heavy scopes subject to data access.
- Proposal: within two business days after scope is confirmed.

Use these only if delivery capacity supports them.

## 4. Effort & Sacrifice — 6/10

**What works:** The site says it works around existing tools, does not replace core systems, begins with one bounded workflow, includes testing and handover, and asks visitors not to send sensitive information.

**What is wrong:** The contact form has five required fields plus two dropdowns; one dropdown offers irrelevant “next steps” such as “View Services.” The prospect cannot select a time. Client responsibilities are buried in FAQ. The full discovery/build workload is unclear.

**Conversion effect:** The buyer cannot estimate meetings, staff involvement, approvals, data preparation, or maintenance burden.

**Fix:**

- CTA → short qualification form → calendar on the same flow.
- Required fields: name, work email, organisation, sector, primary workflow. Make role and message optional or use one concise qualifying question.
- State the buyer commitment: **one 60–90 minute workflow workshop, access to one workflow owner, two review checkpoints, and one decision-maker.**
- Use de-identified/synthetic data until a secure data process is agreed.
- Give the client one named Heutrix contact and one shared project view.
- Include staff training, administrator handover, and a maintenance note in every implementation package.

# Phase 4 — Grand Slam Offer audit

## Core offer

The current offer has three paths: diagnose what to change, transform one operational workflow, or establish practical guardrails for workplace AI.

## Outcome

The implied transformation is from fragmented, person-dependent admin to a documented workflow with visible ownership, status, next action, and a maintainable system. This is valuable, but it should be made the centre of the offer.

## Differentiation

“Workflow first. Technology second.” is credible and useful. However, competitors also claim human-centred, fixed-scope, no-replatform, documented handover approaches. Heutrix needs a sharper combination:

> **The low-disruption, one-workflow operating improvement for Melbourne care providers: baseline it, rebuild it around existing tools, prove it against agreed acceptance criteria, train the team, and hand it over.**

## Recommended offer stack

### Flagship: Heutrix Workflow Transformation

**Promise:** In a defined 3–5 week project, take one high-friction operational workflow from “hard to see and dependent on follow-up” to a tested working process with clear ownership, status, next action, staff guidance, and management visibility.

**Components:**

1. Fit and feasibility call.
2. Current-state workflow map.
3. Baseline and success measures.
4. Bottleneck, handover, data, and risk review.
5. Future-state workflow and acceptance criteria.
6. Configuration/build in approved tools.
7. Synthetic/de-identified testing first.
8. User testing and one defined refinement round.
9. Staff quick-start guide and administrator runbook.
10. Training and recorded handover, if consented.
11. Ownership, access, maintenance, and limitation register.
12. 30-day stabilisation review and correction of in-scope defects.
13. Before/after measurement summary using the agreed baseline.

These are not random bonuses; each reduces implementation, adoption, quality, maintenance, or trust risk.

### Entry offer: Heutrix Diagnostics

- 60–90 minute workshop with relevant staff.
- Current-state map.
- Ranked bottlenecks and opportunities.
- Rough benefit/cost/risk logic.
- Recommended first project, success measures, scope, dependencies, and no-go conditions.
- Written findings within a defined turnaround.
- Optional: credit a portion of the Heutrix Diagnostics fee to Heutrix Workflow Transformation booked within 30 days, provided margins allow. Frame this as continuity, not a fake discount.

## Risk reversal

### Risks the buyer feels

- Paying for a strategy document that never becomes a working system.
- Disrupting service delivery.
- Exposing sensitive data.
- Choosing the wrong tool.
- Staff refusing to use the new workflow.
- Scope creep and open-ended bills.
- Being locked into a consultant.
- Receiving an automation nobody can maintain.

### Ethical risk reducers

- **Fixed-scope, fixed-price:** deliverables, exclusions, assumptions, review rounds, and change control in writing.
- **Acceptance-criteria commitment:** in-scope functions must pass agreed tests before handover.
- **30-day defect correction:** correct failures against the written acceptance criteria at no extra fee; exclude new requests and third-party platform changes.
- **Client ownership:** client-controlled accounts, documentation, exportable artifacts, and no undisclosed platform lock-in.
- **Stage gate:** the client may stop after Heutrix Diagnostics if the benefit case or feasibility is weak.
- **Honest no-build recommendation:** if no sensible improvement is found, say so and do not recommend implementation.
- **Safe testing:** synthetic or de-identified data before approved live data use.

Do not offer a blanket money-back or business-outcome guarantee. Heutrix cannot control adoption, source-data quality, third-party platforms, client approvals, or regulatory interpretation.

## Urgency and scarcity

There is no legitimate urgency currently communicated. Do not manufacture one.

Truthful options:

- Capacity-based: **“We onboard up to [verified number] implementation projects per month so the person who scopes the work remains involved in delivery.”**
- Regulatory/change-based: refer only to a real, dated operational change and explain its actual relevance.
- Cost-of-delay: calculate the buyer's own recurring manual hours, missed follow-ups, or reporting delay; do not invent an industry average.

## Product naming

| Product | Role | Scope rule |
|---|---|---|
| **Heutrix Diagnostics** | Paid decision-ready assessment and action plan. | Use when the priority, feasibility, baseline or acceptance criteria are not yet clear. |
| **Heutrix Workflow Transformation** | Primary implementation product. | Workflow redesign, automation, dashboards, visibility and lightweight internal systems are scope variants—not separate products. |
| **Heutrix AI Guardrails** | Operational workplace-AI governance product. | Keep the boundary to appropriate use, information handling, accountable review, escalation and staff guidance. |

Regulated-provider and disability-provider language is sector positioning, not an additional product.

## CURRENT OFFER

Choose one of three products, pay from $950–$2,500 + GST, and request a fit call to confirm the right scope.

## RECOMMENDED OFFER

Lead with three clear products: **Heutrix Diagnostics** for evidence and prioritisation, **Heutrix Workflow Transformation** for a bounded operational change, and **Heutrix AI Guardrails** for responsible workplace-AI adoption. Keep visibility, dashboards, automation and lightweight internal systems inside Workflow Transformation scope. Include baseline, map, design, build, testing, training, handover, documentation, acceptance criteria, and a 30-day stabilisation review where applicable.

## Recommended pricing and margin position

The current implementation prices are likely too low for discovery, workflow design, configuration/build, testing, documentation, training, project management, and regulated-sector risk. They also undercut visible market reference points: BrainWaveX lists builds from $5,000 including training and support, while LinkUp IT lists provider packages from $6,500, $12,500, and $25,000 depending on scope. These are competitor claims, not a prescription. See [BrainWaveX](https://brainwavex.com.au/) and [LinkUp IT](https://www.linkupit.com.au/packages/complex-multi-site).

### Recommended starting bands

| Offer | Recommended range, ex GST | Commercial note |
|---|---:|---|
| Heutrix Diagnostics | **$1,500–$2,500** | Enough room for workshop, analysis, written deliverable, and sales handoff. |
| Heutrix Workflow Transformation | **$6,000–$12,000** | Use lower end for simple single-tool configuration; upper end for integrations, permissions, and multiple roles. |
| Heutrix AI Guardrails | **$3,500–$7,500** | Keep scope operational; legal/privacy review is separate. |
| Stabilisation/support plan | **$750–$2,500/month** | Only with a defined SLA, included hours, monitoring boundary, and exit terms. |

Visibility-heavy and expanded implementation work should be quoted as scope variants of Heutrix Workflow Transformation, with complex multi-system work phased rather than presented as additional products.

For the first 2–3 clients, a clearly disclosed **founding case-study engagement** could use lower fixed pricing in return for baseline access, feedback, and permission to publish an approved anonymised case study. Do not hide that arrangement or fabricate scarcity.

### Margin rule

Target roughly **60–70% gross margin** for custom implementation and **70%+** for repeatable diagnostics/templates once delivery is standardised. Price from loaded delivery cost, not competitor prices:

> **Required price = total loaded delivery cost ÷ (1 − target gross margin).**

At a 65% gross-margin target, a project with $3,500 of loaded labour, tools, and subcontractor cost needs a price of approximately $10,000. Track discovery, revisions, meetings, documentation, support, sales engineering, and rework; otherwise the published price will conceal poor margins.

# Phase 5 — Customer problem and objection audit

| Customer question / objection | Does website address it? | Strength | Recommended fix |
|---|---|---|---|
| Will this work for an organisation like mine? | Partly | Weak | Add segment-specific case proof or a synthetic demonstration plus clear fit criteria. |
| Can I trust you? | Barely | Very weak | Name the people, show faces, experience, location, company details, credentials, and proof. |
| Why are you different? | Partly | Medium | Own the one-workflow, low-disruption, existing-systems, acceptance-and-handover position. |
| How much does it cost? | Yes | Strong clarity, weak value framing | Keep ranges but repackage around outcomes, scope examples, and payment stages. |
| Is it worth the money? | No | Absent | Baseline recurring cost/friction, measure before/after, and show case evidence. |
| How long will this take? | Partly | Weak | Give response, diagnostic, prototype, build, and proposal timeframes. |
| What happens after I contact you? | Partly | Weak | State response SLA, qualification, calendar, call agenda, and proposal/no-fit outcome. |
| What if it does not work? | No | Absent | Add written acceptance criteria and 30-day in-scope defect correction. |
| Who actually does the work? | No | Absent | Founder/team section and named delivery owner. |
| What is included? | Yes | Strong | Surface the flagship stack in a shorter comparison. |
| What is not included? | Yes | Strong | Keep, but stop repeating disclaimers so heavily on every page. |
| Why not do it myself? | No | Absent | Explain the cost of cross-role discovery, design, testing, documentation, and maintenance—and offer the free scorecard for DIY-ready teams. |
| Why not choose a cheaper competitor? | No | Absent | Demonstrate lower disruption, clearer scope, ownership, and handover rather than arguing price. |
| Why should I act now? | No | Absent | Use the prospect's measured cost of delay; no fake urgency. |
| What experience/results do you have? | No | Absent | Highest-priority trust gap after form repair. |
| Will this disrupt client care? | Partly | Medium | Show parallel testing, limited workshops, staged rollout, and rollback plan. |
| Will we need to replace our current software? | Yes | Strong | Repeat the “no forced replatforming” point near the main CTA. |
| What do you need from us? | Yes, in FAQ | Medium | Surface buyer commitment on service and proposal pages. |
| Who owns and maintains it? | Partly | Weak | Explicit account ownership, access, runbook, admin training, and support terms. |
| How is sensitive information handled? | Partly | Medium | Replace general guidance with a reviewed privacy policy, collection notice, and project data-handling schedule. |

The major completely absent objections are: **who performs the work, why they are qualified, what proven result exists, what happens if the build fails acceptance, and whether the enquiry actually reaches anyone.**

# Phase 6 — Trust and proof audit

## Proof available now that should be displayed better

These are trust assets, not outcome proof:

- Transparent starting prices and extensive inclusions/exclusions.
- A clear 2–4 week window for Heutrix Workflow Transformation.
- The “workflow first, technology second” method.
- No-replatform positioning.
- Sector-specific operational problem language.
- Data minimisation and human-review boundaries.
- A professional `hello@heutrixlabs.com` email address.
- Synthetic dashboard and before/after concepts.

Improve them by adding a visible service comparison, a labelled synthetic demonstration, a sample deliverable, a step-by-step engagement timeline, and a “what you own at handover” box.

## Proof the company should begin collecting after launch

1. Baseline and post-launch time-to-complete, overdue count, handoff count, error/rework rate, and adoption rate—selected per project.
2. Approved client quote with name, role, organisation, and specific result.
3. Before/after screenshots with sensitive information removed and written permission.
4. Short implementation video showing the actual workflow and human controls.
5. On-time delivery rate and acceptance-test pass rate after enough projects exist.
6. Google reviews from genuine customers, never incentivised in a misleading way.
7. Platform/vendor certifications only when actually earned and relevant.
8. Follow-up outcomes at 30 and 90 days, including limitations and what changed after handover.

## Credibility reducers

- No named person or team.
- No founder story, photo, experience, years in business, credentials, ABN, phone, or Melbourne address/service area.
- No testimonials, reviews, case studies, customer logos, portfolio, or quantified results.
- “Before and after examples” can be mistaken for case evidence.
- “Practical implementation partner” is repeated without proof.
- The relationship with Heutrix Assurance is disclosed but unexplained and unlinked; it can create confusion rather than borrowed trust.
- Preview-style `workers.dev` domain conflicts with the professional email domain.
- The contact form displays a false receipt confirmation.

# Phase 7 — Copy and messaging audit

## Site-wide

**What is wrong:** The copy is clear but repetitive. “Practical,” “clearer,” “workflow,” “operational,” and long exclusion lists recur across almost every page. It thoroughly explains the vehicle before proving the destination.

**Why it matters:** Repetition increases reading effort without increasing belief. Defensive boundary copy dominates persuasion and can make the company seem uncertain.

**Conversion effect:** Visitors understand what Heutrix does but feel little emotional or commercial urgency, and no increase in trust.

**Fix:** Use a tighter message hierarchy:

1. Costly problem.
2. Controllable outcome.
3. One flagship offer.
4. Proof/demonstration.
5. Process and risk reduction.
6. Boundaries and FAQ.

### Hero rewrite

**Current weakness:** The H1 names the category, not the urgent destination.

**Recommended:**

> **Fix the admin workflow slowing your care team down.**  
> We map, rebuild and hand over one intake, referral, onboarding, incident, evidence or reporting workflow—using approved tools your team can maintain.

### Problem-section rewrite

> **When important work lives across inboxes, spreadsheets and memory, growth creates more chasing—not more capacity.**  
> Referrals wait without an owner. Documents are discovered missing late. Incident actions sit open. Managers assemble reports by asking five people for updates. The problem is not that your team does not care; it is that the workflow does not make status, ownership and next action visible.

### Offer-section rewrite

> **Start with one workflow worth fixing.**  
> We define the current process, agree what “better” means, build the smallest useful improvement, test it with the people who use it, and hand it over with training and maintenance notes.

### Method rewrite

> **Diagnose → Design → Build → Prove → Hand over**  
> First, map the real workflow and baseline. Next, agree the future state and acceptance tests. Then build and test in approved tools. Finally, train the team, document ownership, and review the first 30 days.

### Proof-section copy before client evidence exists

> **See what a finished workflow looks like before you buy.**  
> Review a synthetic-data example showing the current-state map, future-state workflow, manager view, staff guide, acceptance checklist, and handover notes. It is a demonstration—not a client result.

### CTA rewrite

> **Book a 20-minute workflow fit call**  
> Bring one workflow that is hard to track, hand over, or report. We will assess fit, identify the smallest useful next step, and tell you if a build is not justified. No patient or participant information is needed.

## Page-specific messaging changes

- **Services:** Use a three-product comparison: “Need clarity on what to fix,” “Ready to transform one workflow,” and “Need clear workplace-AI boundaries.” Keep dashboards, visibility, automation and lightweight systems inside Heutrix Workflow Transformation scope.
- **Allied Health:** Lead with referral, intake, report-request, document collection, and multi-site visibility outcomes. Add common practice systems only if Heutrix can verifiably support them.
- **Disability Providers:** Lead with open/overdue incident actions, service agreement renewals, evidence visibility, onboarding, and handovers. Avoid implying regulatory approval or audit outcomes.
- **Pricing:** State what a typical scope contains, why prices vary, payment stages, and what the client owns. Remove prices that cannot sustain the promised delivery stack.
- **AI Guardrails:** Position this as an operating-rules and staff-adoption package, not a broad privacy/compliance service. Show sample rule categories and the human approval path.
- **About:** Stop talking only about beliefs. Introduce the actual people, verified relevant experience, why Heutrix exists, and why care operations are the chosen niche.
- **FAQ:** Keep the boundaries, but add “who does the work,” “what response should I expect,” “what do we own,” “how support works,” “what happens if acceptance tests fail,” and “how many staff need to participate.”
- **Contact:** Replace “Contact Heutrix Labs” with “Book your workflow fit call” and show duration, agenda, response time, and calendar.

# Phase 8 — Call-to-action and lead generation audit

## CTA inventory

- Header/mobile/footer: **Book a free fit call**.
- Homepage hero: **Book a free fit call**, **View Services**.
- Homepage service cards: **Learn more**; **View all services**.
- Homepage form: **Request fit call**.
- Services: service-specific “Start/Improve/Build/Set up/Scope/Discuss” CTAs, then **Book a free fit call** and **View pricing**.
- Sector pages: **Book a free fit call**, **View pricing**.
- Pricing: **Book a free fit call**.
- AI Guardrails: **Set up responsible AI use**, **View pricing**.
- FAQ: **Book a free fit call**, **View pricing**.
- Contact: **Send enquiry**.
- Mobile drawer additionally offers **View pricing**.

## Diagnosis

- One CTA is visually dominant, which is good.
- The wording is inaccurate: users cannot book; they can only send a request.
- Service-specific CTAs improve relevance but all collapse into the same form without explaining the next step.
- The “Preferred next step” dropdown creates confusion. Options such as “View Services” and “View pricing” should be links, not submitted preferences.
- The website asks for action before supplying credible proof.
- No lower-friction path exists for a research-stage prospect.
- The form never transmits, so current lead-capture capacity is effectively zero.

## Recommended primary conversion path

**Book a 20-minute workflow fit call** → 4–5 field qualification form → calendar → confirmation page → immediate email → reminder sequence → fit call → Heutrix Diagnostics, a defined implementation scope, Heutrix AI Guardrails, or a no-fit recommendation.

If a live calendar cannot be offered, rename the CTA **“Request a workflow fit call”**, promise a one-business-day response, and never display “received” until the backend confirms successful delivery.

## Lead magnet recommendation

### 1. The 20-Minute Workflow Bottleneck Scorecard

- **Target:** Practice managers and disability provider operations leads.
- **Problem solved:** Too many operational problems and no rational first priority.
- **Format:** Guided scorecard/calculator ranking workflows by frequency, staff time, handoffs, delay, risk, and feasibility.
- **CTA:** “Score my workflows.”
- **Paid-service bridge:** The highest-scoring workflow becomes the candidate for Heutrix Diagnostics or Heutrix Workflow Transformation.

### 2. The Referral and Intake Visibility Starter Kit

- **Target:** Allied health practices and disability providers losing visibility between enquiry and commencement.
- **Problem solved:** Unclear owner, status, next action, due date, and document completeness.
- **Format:** Synthetic-data tracker template, field guide, status definitions, and 15-minute setup video.
- **CTA:** “Get the starter kit.”
- **Paid-service bridge:** Reveals integration, permissions, handover, and adoption gaps that justify a tailored Heutrix Workflow Transformation scope.

### 3. The AI Guardrails Staff Starter Pack

- **Target:** Owners/managers whose staff are already experimenting with public AI tools.
- **Problem solved:** No shared rules for approved uses, information boundaries, human review, or escalation.
- **Format:** One-page decision tree, sample acceptable-use rules, prompt checklist, output-review checklist, and use-case register.
- **CTA:** “Create our first AI boundaries.”
- **Paid-service bridge:** The template exposes organisation-specific decisions that Heutrix AI Guardrails resolves.

Do not gate everything. Let the scorecard show immediate value before requesting an email; ask for contact details to save/download the personalised result or book a review.

# Phase 9 — Conversion process audit

## Current journey

**Website → CTA → contact form → local visual confirmation → nothing**

### Website to CTA

The CTA is easy to find and repeated logically. However, “Book” creates an expectation of immediate calendar selection that is not fulfilled.

### Form

**Problem found:** Both the homepage and contact-page forms call `preventDefault()` and set a local `submitted` state. There is no API request, email, CRM write, storage, webhook, or scheduler. A prospect can believe the enquiry was received when it was discarded.

This is the most serious launch problem because it creates lost leads and reputational harm while concealing the failure from both buyer and owner.

Other friction:

- Five required free-text fields are more than necessary before a fit call.
- “Preferred next step” duplicates the site's navigation and has nonsensical form options.
- No consent/collection-notice link appears at the point of collection.
- No spam protection, server validation, rate limiting, delivery monitoring, or failure state exists.
- The professional email address is plain text, not a `mailto:` link.
- No phone or calendar option is present.

### Confirmation and follow-up

The on-page message says “We have received your enquiry,” which is false under the current implementation. It does not state when a reply will arrive, provide a calendar, send a confirmation email, create a task, or explain the sales call.

### Sales conversation

No public process is defined. The prospect does not know who will attend, how long the call takes, whether it is a sales call, what to prepare, or what outcome to expect.

## Recommended conversion architecture

1. **CTA:** “Book a 20-minute workflow fit call.”
2. **Qualification:** name, work email, organisation, sector, workflow/problem, optional staff-size range.
3. **Secure submission:** server-side validation, consent timestamp, source/UTM capture, spam protection, rate limiting, and CRM/email delivery.
4. **Calendar:** show available times immediately after successful form creation; pass only non-sensitive qualifying context.
5. **Confirmation page:** booking details, agenda, privacy reminder, reschedule link, and one useful preparation prompt.
6. **Immediate confirmation email:** confirms receipt/booking, names the person meeting them, sets expectations, and repeats the no-sensitive-data instruction.
7. **Internal alert and CRM:** owner, status, source, qualification notes, response deadline, and audit trail.
8. **Reminders:** 24 hours and 1 hour before the call; easy rescheduling.
9. **Fit call:** problem, current impact, desired outcome, systems, stakeholders, urgency, constraints, budget/authority, next step.
10. **Within 1 business day:** send a no-fit recommendation, Heutrix Diagnostics proposal, defined Heutrix Workflow Transformation scope, or Heutrix AI Guardrails proposal.

## Suggested confirmation copy

> **Your workflow fit call is booked.**  
> You will receive a calendar invitation and email confirmation within a few minutes. We will spend 20 minutes understanding one operational workflow, assessing whether Heutrix can help, and agreeing the smallest useful next step. Please do not send patient, participant, clinical, Medicare, NDIS, diagnostic, credential, or other sensitive information.

# Phase 10 — Service-business-specific review

| Requirement | Current state | Launch recommendation |
|---|---|---|
| Who it is for | Strong | Add ideal team size, maturity, decision-maker, and Melbourne/Australia service area. |
| Who it is not for | Strong boundaries, scattered | Consolidate into a concise “good fit / not a fit” section. |
| Problems solved | Strong | Prioritise the 3–5 highest-value problems instead of long catalogues. |
| Desired outcomes | Medium | Translate systems into observable operating outcomes and agreed measures. |
| Service area | Weak/absent | State Melbourne base, onsite radius if any, and Australia-wide remote availability if true. |
| Scope of work | Strong on Services page | Create a short package comparison and proposal example. |
| Process | Medium | Add baseline, design, build, acceptance, handover, and stabilisation. |
| Expected timeline | Weak | Publish honest windows for every entry offer. |
| Price expectations | Strong visibility | Raise/restructure to fit delivery economics; show ranges and scope examples. |
| Included/excluded | Strong | Reduce repetition and put project-specific limits in written scopes. |
| What happens first | Medium | State exact fit-call and Heutrix Diagnostics outcomes. |
| What happens after purchase | Weak | Explain onboarding, workshops, reviews, training, support, and ownership. |
| Customer responsibilities | Present in FAQ | Surface staff access, decision-maker, approvals, data, and review turnaround. |
| Communication | Absent | Name communication channel, cadence, delivery owner, and response expectations. |
| Differentiation | Medium | Sharpen one-workflow, low-disruption, acceptance-and-handover position. |
| How to get started | Visually clear, technically broken | Repair the form and calendar path. |

### Bad-fit leads the current site may attract

- Buyers expecting legal, privacy, audit, registration, or compliance certification—despite the disclaimers—because regulated-provider positioning and AI guardrails can sound advisory.
- Organisations wanting a full practice/participant-management platform.
- Very small operators whose recurring problem does not justify custom implementation.
- Large multi-site providers needing enterprise security, procurement, integration, and support capabilities not yet evidenced.
- Buyers looking for generic AI training or a chatbot.
- Prospects with only a vague desire to “automate” and no process owner or decision-maker.

Prevent these with explicit team-size/maturity criteria, minimum project ranges, required buyer participation, supported-tool boundaries, and a short qualification flow.

# Phase 11 — Customer journey review

| Stage | What the visitor must believe | Their question | Content that should answer it | Current gap | Recommended improvement |
|---|---|---|---|---|---|
| Stranger | “This is specifically relevant to my operation.” | Is this for an allied health/disability provider like us? | Hero and sector landing page | Mostly solved | Add Melbourne/service area, team size, and specific priority workflow. |
| Interested prospect | “This problem is expensive and solvable.” | Is our messy process worth fixing now? | Problem section, calculator, illustrative demonstration | Business impact is vague | Add baseline calculator and cost-of-delay questions. |
| Lead | “Heutrix is credible, and contacting them is safe and useful.” | Who are they; what will I get from the call? | Founder/proof, fit-call page, privacy notice | No human identity or proof; form broken | Add named operator, evidence, call agenda, SLA, working form/calendar. |
| Sales conversation | “The proposed first step has a credible benefit case and controlled risk.” | What exactly happens, costs, and could go wrong? | Diagnostic output, proposal, acceptance criteria | Not visible | Use standard scope, milestones, responsibilities, stage gate, and risk reducers. |
| Customer | “Implementation will be adopted and maintainable.” | Will this work day to day after handover? | Onboarding, project view, testing, training, support | Partly described, not operationalised | Include adoption plan, admin owner, runbook, 30-day review, measurement. |

## Single biggest leak

**The lead-to-conversation transition is completely broken.** The form pretends to receive enquiries but sends nothing. No amount of stronger copy, proof, SEO, or paid traffic can compensate for a conversion mechanism that discards every lead.

# Phase 12 — Page-by-page review

## Homepage — Priority: Critical

### Purpose

Qualify the visitor, create urgency and belief, present the flagship offer, and convert them into a fit call.

### What works

- Audience and broad problem are immediately clear.
- The hero shows a concrete category of output.
- Services, method, examples, and CTA form a logical basic sequence.
- Detailed privacy warning reduces the chance of sensitive information being submitted.

### What weakens conversion

- No proof or human identity anywhere on the page.
- The promise is “clearer workflows,” not a specific first transformation.
- Six categories of problem and five illustrative examples create breadth without priority.
- The page is long and repetitive before belief is earned.
- The full-page capture visually repeated several animated sections while stitching. The DOM contained only one instance, so this is likely an interaction between scroll-triggered animation and stitched capture rather than duplicated markup; verify on real devices and consider reducing motion.
- The embedded form is non-functional and shows a false success message.

### Missing information

Named operator, verified credentials/experience, location/service area, sample deliverable, real proof, price/timeline of the primary offer, exact call outcome, response time, and risk reversal.

### Messaging changes

Use the recommended hero, lead with one-workflow outcome, add a proof/demonstration section before the detailed process, and shorten the service menu.

### CTA changes

Replace “Book” with an actual scheduler or rename it “Request.” Remove the homepage form if a reliable dedicated booking flow exists; otherwise keep a shorter functional form.

## Services — Priority: High

### Purpose

Help a problem-aware visitor choose the right starting engagement.

### What works

Excellent detail on suitable clients, problems, inclusions, exclusions, possible deliverables, and outcomes.

### What weakens conversion

The three-product architecture reduces decision load. The remaining conversion risk is allowing Workflow Transformation scope variants to reappear as separate choices, while proof, timelines and typical inclusions remain too far from the decision point.

### Missing information

Package comparison, typical duration, buyer time commitment, supported tools, ownership, support, acceptance criteria, and evidence.

### Messaging changes

Organise around three buyer situations:

1. **“We know work is messy but not what to fix first.”** → Heutrix Diagnostics.
2. **“We know the workflow that is failing.”** → Heutrix Workflow Transformation.
3. **“Staff use AI but our boundaries are unclear.”** → Heutrix AI Guardrails.

Management visibility, automation, dashboards and lightweight internal systems remain possible Heutrix Workflow Transformation deliverables rather than separate products.

### CTA changes

Use **“See whether this fits my workflow”** and carry the selected path into the booking flow.

## Allied Health — Priority: High

### Purpose

Convert allied health owners/managers from sector-specific traffic.

### What works

Specific workflows—enquiry, intake, referral, reports, documents, onboarding, handovers—and the no-replacement position are relevant.

### What weakens conversion

No clinician/admin economics, practice-size fit, supported systems, real allied health result, or founder credibility. The “before/after” heading can imply evidence when the examples are illustrative.

### Missing information

Ideal disciplines/team size, Melbourne/remote delivery, systems supported, data-handling boundaries, project timeline, and actual proof.

### Messaging changes

Headline: **“Stop losing referral and admin visibility between the inbox, practice system and the people doing the follow-up.”**

### CTA changes

**“Book an allied health workflow fit call.”** Use this as the landing page for allied-health ads and LinkedIn content.

## GP Clinics — Priority: High if retained as a launch segment

### Purpose

No dedicated GP page exists, so a GP practice manager cannot tell whether Heutrix understands general-practice workflows or is only using broad health-sector language.

### Recommendation

Either remove GP clinics from the launch ICP or create a distinct page and offer around verified, non-clinical workflows Heutrix can deliver—for example referral/admin handoffs, recall/admin queues, document requests, staff onboarding, or management visibility. Do not imply expertise in Medicare, clinical systems, accreditation, or privacy obligations without verified capability and evidence.

## Disability Providers — Priority: High

### Purpose

Convert disability provider owners/operations leaders from sector-specific traffic.

### What works

Strong understanding of intake, service agreements, evidence, incidents, complaints, onboarding, reporting, and handovers. Scope boundaries are responsible.

### What weakens conversion

The copy focuses on lists rather than the management outcome. No ideal provider profile, platform support, real provider evidence, security posture, or delivery identity is shown. Regulatory disclaimers are repeated enough to crowd out value.

### Missing information

Provider size/maturity, Melbourne/Australia delivery, actual workflow example, approved tools, support, and proof.

### Messaging changes

Headline: **“See every open action, owner and due date—without rebuilding your participant-management platform.”**

### CTA changes

**“Book a disability operations fit call.”** Qualify provider type, approximate team size, and workflow category.

## Pricing — Priority: High

### Purpose

Set expectations, qualify budget, and make value easier to compare than hourly consulting.

### What works

Transparent starting prices, GST clarity, and a useful explanation of scope factors.

### What weakens conversion

Prices are low relative to the described work, risking poor delivery margin and low perceived competence. There is no value anchor, typical scope example, payment schedule, support price, or decision logic based on economic impact.

### Missing information

Recommended price bands, typical inclusions, duration, payment stages, ownership, third-party costs, support, and what triggers a change request.

### Messaging changes

Headline: **“Fixed-scope starting points for one measurable operational improvement.”** Add “typical project” examples and state that final scope is priced against agreed deliverables and acceptance tests.

### CTA changes

Use **“Discuss a realistic first scope”** with a working calendar.

## Heutrix AI Guardrails — Priority: Medium

### Purpose

Create demand for responsible staff-use rules and qualify organisations before AI becomes embedded informally.

### What works

Strong restraint, human-review language, suitable/unsuitable use examples, and data-minimisation emphasis.

### What weakens conversion

It is lengthy, defensive, and potentially adjacent to legal/privacy consulting. No named expert, sample staff kit, implementation timeline, supported-tool evaluation boundary, or proof exists.

### Missing information

Exact deliverables, workshop count, approval owner, review cadence, tool-selection limits, and legal/privacy adviser boundary.

### Messaging changes

Headline: **“Give staff clear AI rules before informal use becomes normal.”** Promise an approved/conditional/prohibited use map, staff one-pager, review checklist, use-case register, and rollout briefing—not “AI compliance.”

### CTA changes

Offer the AI Guardrails Starter Pack first, then **“Scope our staff rules and rollout.”**

## About — Priority: Critical

### Purpose

Answer “Who are these people, why this niche, and why should I trust them?”

### What works

The principles—workflow first, minimum necessary information, accountable review, maintainability—are sensible.

### What weakens conversion

It is an anonymous philosophy page. No person, face, experience, credentials, company history, Melbourne presence, delivery responsibility, or proof appears. The Heutrix Assurance relationship is disclosed but not explained enough to add confidence.

### Missing information

Founder/team biographies, verified track record, reason for choosing this market, role division, legal entity, ABN, location, insurance where appropriate, and partner/vendor experience.

### Messaging changes

Lead with: **“Your workflow is scoped and delivered by [verified name], not handed from a salesperson to an unknown build team.”** Follow with verified experience and a precise Heutrix Assurance explanation.

### CTA changes

**“Meet the person who will assess your workflow.”**

## FAQ — Priority: Medium

### Purpose

Resolve late-stage scope, risk, privacy, timing, and ownership objections.

### What works

It handles existing tools, replacement risk, sensitive information, AI, exclusions, price, handover, and client responsibilities.

### What weakens conversion

The balance is overly defensive. Several answers say what Heutrix does not do without increasing belief in what it does well. Only Heutrix Workflow Transformation has a timing range.

### Missing information

Who performs work, response time, acceptance failure, ownership, support, meeting load, payment stages, security/tool vetting, and cancellation/rescheduling.

### Messaging changes

Put the five most conversion-relevant questions first and group legal/service-boundary questions under one heading.

### CTA changes

After relevant answers, use the selected service CTA rather than a generic footer-only prompt.

## Contact / booking — Priority: Critical

### Purpose

Convert an interested prospect into a booked, qualified sales conversation.

### What works

Helpful prompts and strong warnings not to submit sensitive information.

### What weakens conversion

The form discards every enquiry. No calendar, phone link, clickable email, SLA, named recipient, success/failure handling, spam protection, or collection notice is present.

### Missing information

Call length, agenda, response time, availability, who calls whom, booking/rescheduling, and confirmation/follow-up.

### Messaging changes

Headline: **“Book a 20-minute workflow fit call.”** Copy: **“Choose one workflow that is hard to track, hand over or report. We will assess fit and agree the smallest useful next step. You will receive confirmation immediately and speak with [verified name].”**

### CTA changes

Working qualification form plus calendar; alternatively an accurately labelled request form with one-business-day response promise.

## Privacy/data handling, terms, disclaimer — Priority: Critical for privacy; Medium for terms

### Purpose

Set transparent data, website, and service boundaries.

### What works

The site repeatedly discourages sensitive-data transmission and states service limitations.

### What weakens conversion

“Privacy and data handling” is project guidance, not a complete privacy policy or form-specific collection notice. It does not clearly cover all data actually collected, purposes, service providers/processors, storage/retention, access/correction, complaints, overseas disclosure, or a policy effective date. Obtain legal review based on Heutrix's actual practices. OAIC guidance distinguishes an APP privacy policy from a collection notice and lists the matters that may need to be disclosed at collection. See [OAIC APP quick reference](https://www.oaic.gov.au/privacy/australian-privacy-principles/australian-privacy-principles-quick-reference) and [APP 5 guidance](https://www.oaic.gov.au/privacy/australian-privacy-principles/australian-privacy-principles-guidelines/chapter-5-app-5-notification-of-the-collection-of-personal-information).

### Missing information

Legal entity/contact details, effective date, actual vendors, retention, access/correction, complaint pathway, overseas recipients, marketing consent, and project-contract relationship.

### Messaging and CTA changes

Link a concise collection notice directly beside the submit button and maintain a reviewed full privacy policy. Do not copy generic legal text.

## Case studies, testimonials, blog/resources, location page — Priority: High for proof; Low/Medium for content

These pages do not exist. A case study/demo page is high priority. A resource library is not required for a referral soft launch, but it becomes important for LinkedIn nurturing and organic search. A Melbourne/service-area page should follow only after the physical/service-area claims and Google Business Profile eligibility are confirmed.

## Thank-you page — Priority: Critical

There is no real thank-you page, only local component state. Create a unique URL after confirmed backend success or calendar booking. Use it for conversion measurement, next-step expectations, reminders, and useful preparation—not an upsell barrage.

## 404 page — Priority: High

Unknown URLs display the homepage and return `200`. Create a real branded 404 response with navigation, search/help, and the primary CTA. This prevents user confusion and “soft 404” indexing problems.

# Phase 13 — UX, mobile, and technical launch review

| Item | Status | Finding and action |
|---|---|---|
| Mobile experience | **Needs Verification** | Responsive classes and a mobile drawer exist, but a real mobile viewport could not be reliably applied. Test 320, 375, 390, 412, 768, and 1024px on iOS/Android. |
| Navigation | **Appears Correct** | Clear routes and active state; internal service anchors resolve. Too many top-level choices are manageable on desktop but should be user-tested. |
| Accessibility of mobile navigation | **Problem Found** | The closed off-canvas navigation remains in the accessibility tree with duplicate links. Add `inert`/conditional rendering, `aria-hidden`, focus trapping, Escape close, focus return, and dialog semantics where appropriate. |
| Reduced motion | **Problem Found** | Scroll animations are widespread and no reduced-motion handling was found. Respect `prefers-reduced-motion` and avoid meaning depending on animation. |
| Page speed indicators | **Appears Correct / Needs Verification** | One Melbourne sample: ~0.14s TTFB. Build output: ~408KB JS (~122KB gzip) and ~29KB CSS (~6KB gzip). Run mobile Lighthouse and field Core Web Vitals after final domain/deployment. |
| Broken internal links | **Appears Correct** | Reviewed primary routes and service anchors load. Run an automated crawl after final domain and content freeze. |
| Forms | **Problem Found** | Forms do not transmit or store data and show false success. Blocker. |
| CTA functionality | **Problem Found** | CTAs navigate, but “Book” has no scheduler and the downstream form is non-functional. |
| Phone links | **Problem Found** | No phone number or `tel:` link. Add only if Heutrix will answer and wants calls. |
| Email links | **Problem Found** | Email is visible as text but not clickable. Use `mailto:` and protect/monitor the inbox. |
| SSL/security | **Verified** | HTTPS and Cloudflare delivery work. This does not verify application security or data-processing controls. |
| Security headers | **Needs Verification** | Perform a final header review for CSP, HSTS, frame controls, referrer policy, and permissions policy after production domain setup. |
| Dependency vulnerabilities | **Verified at review time** | `npm audit --omit=dev` reported zero known vulnerabilities. Continue updates and scanning. |
| Production build | **Verified** | Vite production build completed successfully. |
| Favicon | **Problem Found** | `/favicon.ico` returns HTML, not an icon. Add favicon/app icons and verify content type. |
| Page titles | **Appears Correct after JavaScript / Problem Found in initial shell** | Route-specific titles exist client-side. Direct HTML returns a shared title; pre-render or server-render important pages for reliable metadata. |
| Meta descriptions | **Problem Found** | Route-specific descriptions are injected client-side, while the initial shared HTML still mentions GP clinics that the visible site does not target. Align the market decision, then pre-render accurate per-page metadata. |
| Canonicals | **Problem Found** | No canonical links. Add self-referencing canonical URLs on final branded domain. Google treats canonicals as a strong signal; see [Google canonical guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls). |
| Social sharing metadata | **Problem Found** | No Open Graph/Twitter title, description, or image. Add per-page metadata and an approved 1200×630 share image. |
| Structured data | **Problem Found** | No Organisation/ProfessionalService, FAQ (where eligible), or breadcrumb schema. Add only factually accurate data. |
| 404 page/status | **Problem Found** | Unknown paths show the homepage with `200`. Implement a true 404. |
| `robots.txt` | **Problem Found** | URL returns site HTML. Add an actual text file referencing the sitemap. |
| XML sitemap | **Problem Found** | URL returns site HTML. Add final canonical URLs and submit to Search Console. See [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap). |
| Indexing | **Needs Verification** | No blocking robots tag was found, but the SPA shell, soft 404s, and missing sitemap/canonicals weaken control. Check URL Inspection after production launch. |
| Analytics | **Problem Found** | No analytics implementation found. Add privacy-reviewed analytics with defined events. |
| Conversion tracking | **Problem Found** | No CTA, form-success, scheduler, qualified-lead, or booked-call tracking. |
| Google Search Console | **Needs Verification** | Verify final domain, submit sitemap, inspect each key URL, and monitor coverage/search queries. |
| Google Business Profile | **Needs Verification** | If eligible, add/claim and verify the business; Google says verified profiles can control how business information appears on Search and Maps. See [Google Business Profile help](https://support.google.com/business/answer/2911778?hl=en-AU). |
| Local SEO | **Problem Found** | No Melbourne claim, service area, local schema, location proof, or GBP link appears. Establish only accurate, policy-compliant details. |
| Privacy policy | **Problem Found** | A data-handling page exists but is not a complete policy/collection notice. Obtain legal review and align it to actual vendors and practices. |
| Terms/disclaimer | **Appears Correct / Needs Verification** | Present and appropriately cautious, but brief. Ensure engagement contracts, not website terms, govern services. |
| Cookie/consent | **Needs Verification** | Depends on final analytics, advertising, embeds, and vendors. Do not add a banner by reflex; document the actual technologies and obtain advice. |
| Form collection notice | **Problem Found** | No proper just-in-time notice/link beside submit. |
| Spam protection | **Problem Found** | None. Add privacy-preserving server-side controls and monitored failure handling. |
| Form confirmation | **Problem Found** | False local success. Confirm only after server acknowledgement. |
| Error monitoring | **Needs Verification** | Add form-delivery monitoring and client/server error alerts before traffic. |
| Accessibility basics | **Needs Verification / Problems Found** | Labels and headings are generally good; fix hidden drawer semantics, focus management, reduced motion, and complete keyboard/screen-reader/contrast testing. |

# Phase 14 — Competitive positioning

This is a focused market sample, not an exhaustive competitor census.

| Competitor | Positioning/headline | Offer and CTA | Proof/risk reduction | Implication for Heutrix |
|---|---|---|---|---|
| [Chater Consulting Services](https://www.chaterconsulting.com.au/) | Care-provider automation framed as freeing frontline staff from “clipboards”; 5–150-person focus. | Fixed-fee automation; free 20-minute Process Review; ROI calculator and worksheet. | Publishes anonymised quantified outcomes and testimonials; promises an honest no-build answer and no-pressure call. | Far stronger hook, proof, call outcome, lead magnet, and sector/team-size specificity. |
| [Aivy](https://aivy.com.au/industries/ndis-providers/) | NDIS-specific AI automation integrated with named platforms. | Free 30-minute call, interactive audit, scoped pilot, 4–6 week workflow delivery. | Many specific claims, fixed scope/no hourly billing/no obligation, timelines, data-handling assertions. | Heutrix should avoid unverified compliance claims, but match specificity on workflow, timing, tools, and call deliverable. |
| [BrainWaveX](https://brainwavex.com.au/) | “Built by someone who runs NDIS houses”; strong operator-founder angle. | Free discovery, audit, $5k+ build, $15k+ transformation. | Founder/operator story, tools shown, deployment counts, testimonials, 4–6 weeks, training and support. | Heutrix's anonymous About page and low implementation prices compare poorly. |
| [LinkUp IT](https://www.linkupit.com.au/) | “Calm systems for care providers.” | Four fixed-scope packages; 20-minute call; same-day reply. | Team/history numbers, outcome claims, client examples, fixed price, handover, no retainer trap. | Similar workflow-first territory; Heutrix needs a narrower, more ownable promise and proof. |
| [Mavat](https://mavat.com.au/industries/allied-health-ndis) | Clearer care operations with human oversight and careful change. | Free fit call → paid discovery → fixed-price phased build. | Named operator involvement, selected work, clear ownership/process, paid discovery. | Strong commercial model for Heutrix to study: paid design is valuable, not a disguised sales step. |

## What Heutrix could credibly own

### Angle 1 — One workflow, proven and handed over

> **For care providers that do not need a new platform—just one critical workflow working end to end in the tools they already use.**

Own bounded scope, acceptance tests, team adoption, and client ownership.

### Angle 2 — Management visibility without service disruption

> **Make open work, ownership and next actions visible without rebuilding the systems your team relies on.**

Own low-disruption improvement for practice/provider managers.

### Angle 3 — Human-controlled automation for care operations

> **Automate the repeatable admin while keeping sensitive information, exceptions and accountable decisions under human control.**

Own the line between unsafe AI hype and useful workflow improvement.

**Recommended:** Angle 1 is the most commercially distinct and easiest to prove. Angle 2 is the strongest supporting benefit. Angle 3 should remain a specialist principle, not the whole brand.

# Phase 15 — Scorecard

| Category | Score | Reason |
|---|---:|---|
| Target Market Clarity | 7/10 | Allied health and disability audiences are clear, but the supplied GP target is absent and Melbourne is not stated. |
| Problem Clarity | 8/10 | Operational problems are specific and recognisable. |
| Dream Outcome | 6/10 | Clearer operations are attractive but not specific, measured, or urgent enough. |
| Offer Strength | 5/10 | Real service packaging exists, but there is no dominant flagship, strong stack, or risk reversal. |
| Differentiation | 5/10 | Workflow-first/no-replatform is useful but widely claimed in the market. |
| Value Perception | 5/10 | Inclusions and prices are visible, but business value and proof are missing; low prices may weaken perception. |
| Proof | 1/10 | No real customer evidence, demonstration, credentials, or third-party validation. |
| Trust | 3/10 | Professional copy and boundaries help, but the company is anonymous and the form confirmation is misleading. |
| Objection Handling | 6/10 | Strong on exclusions, privacy, and existing tools; weak on people, proof, ownership, failure, and support. |
| Risk Reversal | 2/10 | Narrow scopes reduce risk, but no acceptance, defect, ownership, stage-gate, or fixed-price commitments are stated. |
| CTA Clarity | 5/10 | Repeated and visible, but “Book” does not book and form choices compete. |
| Lead Capture | 1/10 | The form captures nothing. |
| Conversion Process | 1/10 | No scheduler, backend, CRM, confirmation email, response SLA, or tracked sales path. |
| Copy & Messaging | 7/10 | Clear, relevant, and responsible, but repetitive, defensive, and insufficiently outcome/proof-led. |
| User Experience | 6/10 | Coherent structure and navigation; long pages, motion/capture issue, CTA mismatch, and hidden-nav accessibility defect. |
| Mobile Readiness | 5/10 | Responsive implementation appears present, but real-device verification is outstanding and drawer accessibility needs work. |
| Launch Readiness | 3/10 | Fundamental conversion, trust, tracking, privacy, domain, and SEO launch controls are incomplete. |

# LAUNCH READINESS SCORE: 46/100

**Below 60 — Recommend fixing major issues before driving meaningful traffic.**

# Phase 16 — The “Do Not Launch Until…” list

## BLOCKERS

1. **Make lead submission real.** Use a secure backend/CRM/calendar, server acknowledgement, truthful success/failure states, monitoring, and test delivery end to end.
2. **Put the site on the verified Heutrix-branded domain** and show the legal entity, monitored contact details, Melbourne/service area, and business identity.
3. **Replace the anonymous trust gap.** Add the actual founder/delivery team, verified experience, photo, role, and who performs the work.
4. **Install analytics and conversion tracking** for CTA clicks, form start/success/failure, bookings, qualified leads, show rate, and closed customers—with source/UTM capture.
5. **Implement reviewed privacy and form collection disclosures** based on actual tools/vendors; add consent where needed, spam controls, rate limits, retention, and failure monitoring.
6. **Complete real-device and accessibility QA,** especially the closed mobile drawer, keyboard/focus, reduced motion, form errors, and calendar flow.

## HIGH-IMPACT IMPROVEMENTS

1. Present **Heutrix Diagnostics**, **Heutrix Workflow Transformation** and **Heutrix AI Guardrails** as the only three public product choices.
2. Add one honest proof substitute before real case studies: synthetic workflow demonstration plus a sample Diagnostics output, runbook and acceptance checklist.
3. Make the fit call concrete: 20 minutes, named person, agenda, one-business-day response, exact next-step outcomes.
4. Raise/restructure pricing around loaded delivery cost, value, milestones, and a 60–70% implementation gross-margin target.
5. Add acceptance criteria, 30-day defect correction, client ownership, stage gate, and no-build recommendation as risk reducers.
6. Fix launch SEO basics: favicon, real 404, sitemap, robots file, canonical/OG metadata, pre-rendered key pages, and Search Console.

## POST-LAUNCH OPTIMISATIONS

1. Publish sector-specific case studies and genuine reviews.
2. Launch the Workflow Bottleneck Scorecard and AI Guardrails Starter Pack.
3. Build a focused LinkedIn content engine around specific workflow failure modes and demonstration clips.
4. Test vertical-specific landing pages, headlines, CTA wording, call length, and qualification fields.
5. Add Melbourne/local content and Google Business Profile only after eligibility and service-area facts are verified.
6. Start Google Ads only after form/bookings, attribution, proof, follow-up, and unit economics are functioning.

# Phase 17 — Recommended homepage

## 1. Hero

**Purpose:** Immediate relevance, valuable outcome, clear next step.

**Headline:** Fix the admin workflow slowing your care team down.

**Copy:** Heutrix Labs maps, rebuilds and hands over one intake, referral, onboarding, incident, evidence or reporting workflow—designed around your existing systems and day-to-day service delivery.

**Proof:** Melbourne-based • Fixed-scope starting points • No forced replatforming • Testing, training and handover included. Use only after each fact is verified.

**CTA:** Book a 20-minute workflow fit call. Secondary: See packages and starting prices.

**Visual/content:** Synthetic before/after workflow with status, owner, next action, overdue flag, and handover. Clearly label “Demonstration using synthetic data.”

## 2. Problem recognition

**Purpose:** Make the operational cost vivid without exaggeration.

**Headline:** Growth should not create more chasing.

**Copy:** Referrals wait without an owner. Required documents are discovered missing late. Incident actions stay open. Managers assemble reports by asking several people for updates. When work lives across inboxes, spreadsheets and memory, capable teams still miss handoffs.

**Proof:** None needed; these are problem descriptions. Add links to the two sector pages.

**CTA:** Score my workflow bottlenecks.

**Visual/content:** Five-row “Where work disappears” flow from trigger → owner → status → next action → handover.

## 3. Desired outcome

**Purpose:** Sell the destination.

**Headline:** One workflow your team can see, use and maintain.

**Copy:** The finished workflow gives staff a consistent way to work and gives managers a shared view of what is waiting, overdue, blocked or ready for review. The goal is not more technology. It is clearer ownership, fewer repeated checks, safer information handling and a handover your team can operate.

**Proof:** Show a redacted/synthetic sample manager view and staff quick-start guide.

**CTA:** See a sample finished workflow.

**Visual/content:** Two panels: “For staff” and “For managers.”

## 4. Primary offer

**Purpose:** Turn a broad consultancy into an easy-to-understand purchase.

**Headline:** Start with the smallest useful engagement.

**Copy:**

**Heutrix Diagnostics**  
For teams that know operations are messy but need evidence about what to fix first. Receive a current-state map, ranked bottlenecks, success measures, dependencies, and a recommended first scope.

**Heutrix Workflow Transformation**  
For teams with one defined workflow to improve. We design, build, test, train and hand over the agreed improvement in a typical 3–5 week project.

**Heutrix AI Guardrails**  
For teams adopting workplace AI that need clear use boundaries, information-handling rules, human review, escalation and staff guidance.

**Proof:** Prices, typical timeframes, and sample deliverables. Do not use fictitious value totals.

**CTA:** Compare scope and pricing.

**Visual/content:** Three-card decision tree using the three product names.

## 5. How it works

**Purpose:** Increase likelihood and reduce time/effort uncertainty.

**Headline:** Diagnose → Design → Build → Prove → Hand over

**Copy:**

1. **Diagnose:** Map the real workflow and agree the baseline.
2. **Design:** Define ownership, status, next action, controls and acceptance tests.
3. **Build:** Configure the smallest useful improvement in approved tools.
4. **Prove:** Test with synthetic/de-identified data first, then with agreed users.
5. **Hand over:** Train the team, document administration and maintenance, and review the first 30 days.

**Proof:** Example project timeline and acceptance checklist.

**CTA:** Discuss my first workflow.

**Visual/content:** Five-step horizontal or stacked timeline.

## 6. Why Heutrix

**Purpose:** Differentiate and introduce the people.

**Headline:** The person who scopes the workflow stays accountable for delivery.

**Copy:** Heutrix starts with how the work is actually done, not a preferred software sale. We use approved tools, keep accountable decisions with people, design around realistic maintenance, and leave the client with the documentation and access needed to own the result.

**Proof:** Founder photo/name, verified experience, credentials, Melbourne base, actual role in delivery, insurance/security facts if relevant.

**CTA:** Meet the person behind Heutrix.

**Visual/content:** Real professional portrait and concise biography—not a stock team image.

## 7. Proof and demonstration

**Purpose:** Show believable capability without inventing customer outcomes.

**Headline:** See the system before you trust the claim.

**Copy:** Review a synthetic-data example showing the current-state map, future-state workflow, manager view, staff guide, acceptance test and handover note. This demonstrates the deliverable; it is not presented as a client result.

**Proof:** Sample artifacts now; replace/supplement with approved case studies later.

**CTA:** View the demonstration.

**Visual/content:** Interactive walkthrough or short captioned video.

## 8. Fit and boundaries

**Purpose:** Improve lead quality and reduce sales friction.

**Headline:** A good fit when one operational workflow matters enough to fix.

**Copy:**

**Good fit:** You have a workflow owner, relevant staff can join discovery/testing, a decision-maker can approve scope, and you want a bounded improvement around existing systems.

**Not a fit:** You need legal/clinical advice, audit or registration outcomes, a complete practice/participant-management platform, or a system that removes accountable human review.

**Proof:** Clear scope document and no-build recommendation policy.

**CTA:** Check whether your workflow fits.

**Visual/content:** Two-column good-fit/not-fit checklist.

## 9. Objection handling

**Purpose:** Resolve the final five buying questions.

**Headline:** What buyers usually want to know first

**Copy:**

- **Will we replace our current system?** Usually no. We first test what can be improved around the approved tools you already use.
- **How much time will our team need?** A typical bounded project needs one workflow workshop, two review checkpoints, user testing, and one decision-maker.
- **How is sensitive information handled?** We begin with the minimum necessary information and prefer synthetic/de-identified data until an approved process is agreed.
- **Who owns the result?** The written scope defines client-controlled accounts, access, documentation, exports and maintenance responsibility.
- **What if the agreed build does not pass testing?** In-scope functions must pass the written acceptance criteria before handover; qualifying defects found within 30 days are corrected without an additional build fee.

**Proof:** Link to full FAQ, privacy policy, and sample acceptance criteria.

**CTA:** Read all questions.

**Visual/content:** Accessible accordion with the first item open.

## 10. Final CTA

**Purpose:** Convert a now-informed visitor.

**Headline:** Bring one workflow that should not be this hard.

**Copy:** In 20 minutes, we will identify the problem, assess whether Heutrix is a fit, and agree the smallest useful next step. If a build is not justified, we will tell you. No patient or participant information is needed.

**Proof:** Named caller, response/availability statement, no-obligation/no-build policy.

**CTA:** Book my workflow fit call.

**Visual/content:** Short functional form and calendar; no generic stock image.

# Phase 18 — 30-day post-launch measurement plan

## Measurement setup before day 1

- Define session, lead, qualified lead, booked call, attended call, proposal, customer, and revenue consistently.
- Capture first-touch and last-touch source/medium/campaign plus landing page.
- Instrument: primary CTA click, pricing click, service selection, form start, validation error, submission success/failure, calendar view, booking, reschedule/cancel, email click, phone click, lead qualification, show, proposal, win/loss.
- Connect website events to a CRM record without collecting sensitive care information.
- Use a unique confirmed booking/thank-you event; do not count button clicks as conversions.
- Test analytics, CRM creation, internal notification, confirmation email, calendar invite, reminders, and attribution on production.

## First 30 days

| Metric | Definition | What underperformance should trigger |
|---|---|---|
| Visitors by source and landing page | Qualified sessions, separated into referral, LinkedIn, organic, and paid | Wrong audience/source? Message-to-landing-page mismatch? Bot/internal traffic? |
| Primary CTA click rate | Unique primary CTA clickers ÷ eligible landing-page visitors | Is the outcome weak, proof missing, or CTA too high-friction? Break down by page/source. |
| Form starts | Visitors interacting with first form field | Is the CTA creating a different expectation than the form? Is the form visible and fast? |
| Form completion rate | Confirmed submissions ÷ form starts | Which field/errors cause abandonment? Is the privacy warning frightening rather than reassuring? |
| Booking completion rate | Confirmed bookings ÷ successful lead submissions/calendar views | Are slots poor, scheduler slow, timezone unclear, or calendar shown too late? |
| Calls | Confirmed inbound calls/click-to-calls, if offered | Are mobile users seeking a faster option? Are calls being answered/tracked? |
| Qualified leads | Leads matching segment, role, problem, fit, and minimum economics | Is messaging attracting vague AI interest or non-commercial/compliance requests? |
| Show rate | Attended calls ÷ booked calls | Are reminders, agenda, caller identity, and rescheduling clear? |
| Close rate | New customers ÷ qualified attended calls; also track proposal win rate | Is the website overpromising, the call weak, price/value unclear, or proof inadequate? |
| Cost per lead | Channel spend ÷ valid leads | Are clicks cheap but unqualified? Use qualified CPL as the better measure. |
| Customer acquisition cost | Direct acquisition spend and attributable selling cost ÷ new customers | Can gross profit support the channel? Do not scale spend before this is understood. |
| Revenue and gross profit by source | Collected/projected revenue and delivery margin by first/last touch | Are high-volume sources producing low-value or low-margin clients? |

## The five numbers to monitor first

1. **Qualified leads per 100 relevant visitors, by source.**
2. **Confirmed booking rate from primary CTA click.**
3. **Show rate.**
4. **Qualified-call-to-paid-engagement close rate.**
5. **Gross profit and CAC by source.**

With low referral traffic, raw counts and call notes matter more than tiny percentage changes. Do not A/B test from 30 visits. Record a reason code for every no-fit, no-show, lost proposal, and closed project.

## Weekly operating questions

- **Low relevant traffic:** Are referral partners, LinkedIn posts, local presence, and search pages actually sending the right audience?
- **Traffic but low CTA clicks:** Is the page naming a high-priority problem, specific outcome, proof, and reasonable next step?
- **CTA clicks but low form starts:** Does “Book” lead to an unexpected form? Is trust too weak at the point of action?
- **Form starts but low completion:** Which fields, errors, device, or privacy language cause abandonment?
- **Submissions but low bookings:** Are calendar slots, response delay, timezone, and confirmation clear?
- **Bookings but low show:** Are reminders, caller identity, agenda, and rescheduling working?
- **Calls but few qualified leads:** Is targeting too broad? Add team-size, role, workflow, and minimum-scope qualifiers.
- **Qualified calls but low closes:** Is proof insufficient, scope unclear, price disconnected from value, or the offer too risky?
- **Wins but poor margin:** Were revisions, integrations, support, and founder time underestimated? Narrow scope or raise price before scaling.

# Final Executive Summary

## 1. VERDICT

**Do Not Launch Yet.** The site has a solid strategic base—clear sectors, recognisable operational problems, sensible boundaries, transparent prices, and a credible workflow-first philosophy—but it currently cannot create a customer. Every enquiry is discarded while a false success message says it was received. The lack of named people, real proof, booking/follow-up, analytics, privacy collection disclosures, branded domain, and basic launch SEO further makes meaningful referral or paid traffic too risky. Repair the conversion system and trust layer, then soft-launch to warm referrals; delay Google Ads until proof, attribution, follow-up, and unit economics are working.

## 2. BIGGEST STRENGTH

The strongest element is **market and problem clarity**. An allied health practice manager or disability provider operator can recognise the messy-admin, spreadsheet, handover, reporting, and visibility problems quickly. The service boundaries are also unusually responsible.

## 3. BIGGEST WEAKNESS

The single issue most likely to reduce acquisition is **a completely broken lead-to-sales path**. The form sends nothing, there is no scheduler or backend, and the site falsely confirms receipt. This produces a 0% effective form-to-lead conversion rate regardless of traffic quality.

## 4. THE OFFER

The offer is now organised around three products: **Heutrix Diagnostics**, **Heutrix Workflow Transformation** and **Heutrix AI Guardrails**. Keep workflow redesign, automation, dashboards, visibility and lightweight internal systems inside Workflow Transformation scope. Package implementation work around baseline, map, design, build, testing, acceptance, training, client ownership, documentation and 30-day stabilisation—not around a particular technology.

## 5. TOP 5 CHANGES

1. Build and test the real form → CRM/calendar → confirmation → follow-up system.
2. Add the named founder/delivery person, verified experience, company identity, branded domain, and one honest demonstration/proof asset.
3. Give each of the three products a specific controllable result, timeline, price band and risk reducers.
4. Add analytics, source attribution, conversion events, CRM stages, response SLA, and a defined fit-call sales process.
5. Complete privacy/legal, mobile/accessibility, 404, favicon, sitemap, canonical/OG, Search Console, and local-presence launch checks.

## 6. RECOMMENDED HOMEPAGE MESSAGE

**Headline:** Fix the admin workflow slowing your care team down.

**Subheadline:** Heutrix Labs maps, rebuilds and hands over one intake, referral, onboarding, incident, evidence or reporting workflow—designed around your existing systems and day-to-day service delivery.

**Primary CTA:** Book a 20-minute workflow fit call.

**Proof statement:** Melbourne-based • Fixed-scope starting points • No forced replatforming • Testing, training and handover included. Publish only after verifying each fact and add real evidence as soon as it exists.

**Offer statement:** One defined workflow. A clear baseline. A tested working improvement. Staff guidance, management visibility and a handover your team can maintain.

## 7. LAUNCH CHECKLIST

### Offer

- [ ] One flagship offer selected.
- [ ] Ideal client, good fit, and not-a-fit criteria defined.
- [ ] Outcome, scope, timeline, price range, buyer effort, and success measures stated.
- [ ] Acceptance, ownership, defect-correction, stage-gate, and change-control terms defined.
- [ ] Delivery-cost model supports target gross margin.

### Copy

- [ ] Outcome-led hero replaces category-led headline.
- [ ] Repetition and defensive disclaimers reduced.
- [ ] Illustrative examples are labelled as demonstrations, not results.
- [ ] Melbourne/service-area and supported-tool claims are verified.
- [ ] All timelines, capacity, and performance claims are operationally supportable.

### Proof

- [ ] Founder/team identity, photo, role, and verified experience published.
- [ ] Synthetic-data demonstration and sample deliverables published.
- [ ] Company/legal identity and genuine contact details visible.
- [ ] Case-study and testimonial consent process ready.
- [ ] No invented badges, customers, results, or statistics.

### CTA

- [ ] “Book” opens a real booking flow; otherwise CTA says “Request.”
- [ ] Call duration, agenda, named person, and response time shown.
- [ ] Primary CTA is consistent across pages.
- [ ] Secondary CTA supports research-stage visitors.
- [ ] Service selection carries into the booking flow.

### Forms

- [ ] Backend delivery, CRM record, internal alert, and calendar tested in production.
- [ ] Success appears only after confirmed server receipt.
- [ ] Failure state preserves input and offers a fallback.
- [ ] Required fields minimised and redundant dropdown removed.
- [ ] Server validation, rate limiting, spam protection, and monitoring enabled.

### Tracking

- [ ] Analytics and privacy configuration complete.
- [ ] CTA, form start/error/success, calendar, booking, show, qualification, proposal, and sale tracked.
- [ ] UTM/source data reaches CRM.
- [ ] Internal/test traffic filtered.
- [ ] Revenue and gross margin attributed by source.

### Technical

- [ ] Final branded domain and redirects configured.
- [ ] Production build and security headers verified.
- [ ] Real 404, favicon, robots file, sitemap, canonicals, and social metadata live.
- [ ] Key pages pre-rendered/server-rendered or verified in Google rendering.
- [ ] Search Console property verified and sitemap submitted.

### Mobile

- [ ] Real iPhone and Android tests completed at common widths.
- [ ] No horizontal overflow or clipped CTA/form content.
- [ ] Drawer hidden from accessibility tree when closed.
- [ ] Keyboard, focus trap/return, Escape, touch targets, and accordions verified.
- [ ] Reduced-motion preference honoured.

### Legal/trust

- [ ] Privacy policy and form collection notice reviewed against actual practices/vendors.
- [ ] Terms, disclaimer, proposal, service agreement, and data-handling schedule aligned.
- [ ] Legal entity, ABN, contact details, service area, and insurance facts verified.
- [ ] Consent, retention, access/correction, complaints, and overseas processing addressed where applicable.
- [ ] No sensitive information requested through the public form.

### Follow-up

- [ ] Immediate confirmation email and calendar invite tested.
- [ ] One-business-day human response owner assigned.
- [ ] 24-hour and 1-hour reminders configured.
- [ ] Fit-call agenda and qualification rubric documented.
- [ ] No-fit, Diagnostics, proposal, follow-up, won/lost, and reason-code stages active in CRM.

## 8. FINAL QUESTION

**If I could make only ONE change to this website before launch, what should it be and why?**

Make the conversion path real: replace the fake local form success with a tested, monitored **qualification form → CRM/calendar → confirmation → follow-up** workflow. It is the only change that turns the site from an informative brochure into an acquisition asset; without it, every other improvement still ends in a discarded lead.

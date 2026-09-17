# Refine the Heutrix website without crossing launch gates

**Run status:** completed locally on 4 September 2026; retained for review and repeat verification. The resulting release candidate has not been deployed.

## Copy this prompt into Codex

```text
Own one local, repository-grounded refinement pass for the Heutrix Labs public website.

Workspace:
- Repository root: the current Heutrix repository root
- Website: apps/website/
- Audit evidence: 90-research-and-audits/website-acquisition-audit-2026-09-04/HEUTRIX-WEBSITE-ACQUISITION-AUDIT.md

Outcome

Make the current three-product website easier for a suitable Australian disability support provider or selected allied health practice to understand, compare and act on, while preserving every current evidence, privacy, professional, pricing and launch boundary.

This task is a local release-candidate refinement. It must not connect external systems, enable analytics, publish unresolved facts or deploy.

Read before editing

1. Read AGENTS.md completely.
2. Read README.md and the current 00-control/LAUNCH-BOARD.md, DECISIONS.md, VERIFIED-FACTS.md and RISKS-AND-BLOCKERS.md.
3. Read 06-marketing/website-copy/README.md, WEBSITE-REFINEMENT-BRIEF-2026-09-03.md, home.md, services.md, contact.md, about.md, privacy-and-data-handling.md, terms-of-use.md and website-disclaimer.md.
4. Read 02-market-and-offers/offers/offer-strategy-2026-09/04-website-ready-copy.md, 05-owner-validation-register.md, 02-market-and-offers/pricing/PRICING-POLICY.md and the current proof registers.
5. Read 03-sales/lead-capture/LEAD-HANDLING.md, 03-sales/fit-call/README.md and the current legal review register.
6. Read the 4 September audit named above and inspect the active source, public deployment and current git status. Preserve all unrelated and pre-existing changes. Do not reset or discard the workspace reorganisation.

Source precedence

Apply AGENTS.md source precedence. A recommendation in the audit is not a business fact or publication approval. If the audit conflicts with a newer dated decision or verified asset, use the newer authoritative source and record the difference in the final report.

Facts and constraints that must survive

- Heutrix is workflow-first and technology-second.
- Australian disability support providers are primary; allied health practices are secondary; GP clinics are not a launch segment.
- The public products are Heutrix Diagnostics, Heutrix Workflow Transformation and Heutrix AI Guardrails.
- Workflow Transformation is the primary implementation product. Dashboards, trackers, forms, automation and lightweight internal tools may be scoped deliverables inside it, not extra public offers.
- Do not add public prices, ranges, pricing navigation, pricing CTAs or a pricing page. Fees are confirmed privately in a written post-fit scope.
- Keep /pricing retired and directed to /services#how-engagements-are-agreed. Keep /safe-ai retired in favour of /ai-guardrails.
- Use “See where Heutrix can help” publicly and “Request my 20-minute call” on the form while the real lead and scheduler paths remain unverified.
- Never show success unless a server has confirmed receipt. In this task, keep the current truthful not-sent state.
- Keep all current sensitive-information, consent, illustrative-example, legal/clinical/regulatory and third-party limitations.
- Do not invent or infer founder/company identity, clients, testimonials, results, credentials, insurance, address, service area, delivery capacity, named tools, integrations or legal approval.
- Keep the three approved resources and their six downloadable files ungated. Do not describe them as client proof.

Implement only these local changes

1. Home-page hierarchy
   - Use only controlled copy or careful consolidation of it.
   - Tighten the sequence to: buyer outcome/problem → proof of method/resource → primary Workflow Transformation path → three-product routing → boundaries → one closing CTA.
   - Consolidate overlapping method, capability, trust and illustrative-example sections where they repeat the same decision job.
   - Make Workflow Transformation clearly primary without diminishing Diagnostics or AI Guardrails.
   - Do not introduce a new outcome, timing, savings, revenue or adoption claim.

2. Services decision aid
   - Add a compact, accessible “choose by the decision in front of you” comparison near the top using the controlled services copy.
   - For each product, show the problem state, what the product decides or changes and the smallest useful next step.
   - Visually distinguish Workflow Transformation as the primary implementation route.
   - Keep the fit process responsible for final product routing; do not force visitors to choose a product on the contact form.

3. Contact form presentation
   - Preserve every required and optional field in contact.md, resource-context behaviour, source capture, consent and sensitive-information confirmation.
   - Present the form as two accessible visual stages: contact/context, then workflow/decision/safety.
   - Preserve entered values, allow Back, show clear progress, move focus to the stage heading, expose validation errors accessibly and prevent accidental loss.
   - The final action must keep the truthful not-sent state. Do not add an endpoint, scheduler, fake receipt, email fallback or external data transfer.
   - If a two-stage implementation would materially weaken progressive enhancement or accessibility in the current architecture, stop and document the evidence instead of forcing it.

4. Accessibility foundations
   - Add a consistent, high-contrast :focus-visible treatment for interactive links, buttons and controls without removing useful native focus.
   - Make mobile menu/close and other primary touch targets at least 44 × 44 CSS pixels.
   - Respect prefers-reduced-motion across Framer Motion and CSS transitions; retain meaning without motion.
   - Re-check landmarks, one H1 per route, heading order, field names/instructions/errors, drawer focus trap/restoration, 200% zoom, reflow and horizontal overflow.
   - Record physical devices and assistive technologies as untested unless actually used.

5. Technical foundation that is safe before a production-domain decision
   - Add real public/robots.txt and public/sitemap.xml files only if their origin and indexability are truthful for the current public Worker. Do not promote an unapproved custom domain.
   - Replace browser-only legacy-route replacement with verified HTTP redirects supported by this Cloudflare Worker static-assets configuration, while retaining the client fallback.
   - Add a narrowly scoped public/_headers baseline only after checking it against Google Fonts, Material Symbols, the Vite bundle, downloads and the current Worker behaviour.
   - Add default Open Graph/Twitter metadata and an approved existing image only if the asset and origin are verified. Do not fabricate a logo/social image or business fact.
   - Do not claim a genuine 404 is solved if the SPA still returns HTTP 200. If correct 404 status requires a Worker/router or pre-render architecture change, produce a scoped H6 implementation note rather than expanding this task.
   - Keep canonical URLs and Search Console work blocked until the production domain is decided, unless a newer control record verifies it.

6. Control-record reconciliation
   - Compare 00-control/VERIFIED-FACTS.md and the owner validation register with the dated 3 September launch board and lead-magnet release manifest.
   - Update only demonstrably stale resource approval/deployment status. Preserve the open proof and privacy-safe measurement statements.
   - Do not close any launch, legal, identity, insurance, data-handling, lead-path, analytics, pricing-model or onboarding gate without its specified evidence.

Content synchronisation

If you change public wording or section logic, update the relevant file in 06-marketing/website-copy/ in the same change so the controlled copy and application do not drift. Do not silently convert an audit recommendation into approved copy; label material new wording as a draft and call out the owner decision required before publication.

Allowed side effects

- Edit apps/website/, directly corresponding controlled-copy files, and demonstrably stale status text in the named registers.
- Add local tests or audit evidence needed to verify this change.
- Build and run local browser checks.

Forbidden side effects

- No deployment, Cloudflare configuration mutation, production-domain change or Search Console action.
- No form endpoint, CRM, calendar, email, webhook, analytics, pixel, cookie or external data connection.
- No deletion or rewrite of unrelated user work.
- No public pricing, guarantee, urgency, scarcity, capacity, identity, proof, platform or compliance claims.

Verification and acceptance criteria

1. Run npm run build from apps/website/ (use npm.cmd on Windows).
2. Run focused source/dist searches for public pricing, retired services, “Safe AI”, GP launch positioning, unsupported claims and accidental secrets.
3. Verify locally in a browser at desktop and 390 px mobile widths:
   - /, /services, /contact, /resources and /ai-guardrails;
   - the home-to-service-to-contact journey;
   - the complete two-stage form with keyboard only, including Back, errors and the truthful not-sent state;
   - mobile drawer, focus visibility, reduced motion, 200% zoom, reflow and no unintended horizontal overflow;
   - all six resource downloads.
4. Verify built/public HTTP behaviour for robots, sitemap, /pricing, /safe-ai and an unknown path. Report browser destination and HTTP status separately.
5. Verify controlled copy and application remain aligned.
6. Run git diff --check and inspect git status. Report every file changed and distinguish this task's changes from pre-existing work.

Definition of done

- A suitable visitor can understand the primary outcome and choose the next path with less repetition.
- Workflow Transformation is visibly the primary implementation product within the unchanged three-product architecture.
- Services provides a compact decision aid.
- The approved qualification fields are easier to complete without weakening privacy or accessibility.
- Focus, target-size and reduced-motion basics are implemented and tested locally.
- Safe crawler/redirect/header improvements are verified; any genuine 404 or production-domain dependency is explicitly deferred rather than overstated.
- The form still cannot claim receipt, no external system is connected and no deployment occurs.
- Stale resource status is reconciled without closing unrelated gates.

Final response

Lead with the user-visible outcome. Then list changed files, tests and evidence, deferred items, and exact owner decisions still required. Do not claim outreach readiness, conversion improvement, accessibility compliance, legal approval or technical SEO completion beyond the tests actually performed.
```

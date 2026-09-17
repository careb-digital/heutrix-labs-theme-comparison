# Prompt 1 — Implement the no-pricing, three-product website copy

## Copy this prompt into Codex

```text
Work as the implementation owner for the Heutrix Labs Vite/React website in:

the current Heutrix repository root

Goal: implement the controlled September 2026 website copy and information architecture in apps/website, removing pricing as a public website path while preserving a useful legacy redirect.

Before editing:
1. Read AGENTS.md completely.
2. Read README.md; 00-control/DECISIONS.md, VERIFIED-FACTS.md and RISKS-AND-BLOCKERS.md; 06-marketing/brand/VOICE.md; 06-marketing/website-copy/README.md; and 06-marketing/website-copy/WEBSITE-REFINEMENT-BRIEF-2026-09-03.md.
3. Read every current page file in 06-marketing/website-copy/. Treat them as the controlled public copy. Do not treat 99-archive/website-copy/2026-09-03/pricing.md as current.
4. Inspect apps/website and the current deployed site at https://heutrix-labs.janith.workers.dev/. Check git status and preserve all unrelated or pre-existing changes. Do not reset or discard the workspace reorganisation.

Implement:
- Present only Heutrix Diagnostics, Heutrix Workflow Transformation and Heutrix AI Guardrails. Workflow Transformation is the primary implementation product; dashboards, trackers, forms, automation and lightweight internal tools are possible deliverables inside it, not separate offers.
- Use disability support providers as the primary launch audience and allied health as secondary. Remove GP clinics and broad care-provider positioning from active and dormant website copy.
- Replace “Safe AI” and “Safe AI Setup” with “Heutrix AI Guardrails”. Make /ai-guardrails canonical. Redirect /safe-ai to /ai-guardrails using the existing custom routing approach without flashing or rendering obsolete content.
- Remove Pricing from desktop navigation, mobile navigation, footer, cards and all secondary CTAs.
- Remove the /pricing page renderer, route metadata, pricing data exports, pricing-only helpers and dormant Pricing component after verifying nothing valid depends on them.
- Add a compatibility redirect from /pricing to /services#how-engagements-are-agreed. The retired URL must not render pricing content and must not appear in navigation, internal links, canonical metadata, structured data or a sitemap.
- Remove visible dollar amounts, starting ranges, “+ GST”, “View pricing”, “How pricing works”, “How much does it cost?”, and “exact prices are not published” from the active site and bundle.
- On Home and Services, use the controlled “How an engagement begins/How engagements are agreed” copy. Put id="how-engagements-are-agreed" on the Services section targeted by the legacy redirect.
- Use “See where Heutrix can help” as the public CTA. Until a real scheduler is live and tested, use “Request my 20-minute call” on the form and never say a time was booked.
- Implement the current controlled content for Home, Services, Disability Providers, Allied Health, AI Guardrails, About, FAQ, Contact, Privacy and Data Handling, Terms of Use and Website Disclaimer.
- Use the controlled form fields and privacy language in contact.md. Do not ask visitors to choose a product, technology or preferred next step. Do not accept uploads. Show success only after a real lead endpoint confirms receipt; otherwise preserve the existing truthful not-sent state.
- Label illustrative and synthetic examples so they cannot be mistaken for client results.
- Do not add founder, identity, address, insurance, tool-capability, integration, client-result, testimonial, legal-approval or service-area claims that the registers do not verify.
- Add an intentional not-found experience for unknown routes instead of silently rendering Home.

Implementation discipline:
- Prefer central content objects where they reduce drift, but do not leave active and dormant copies with different product names.
- Preserve the existing design system and responsive behaviour unless a copy change requires a small layout adjustment.
- Do not deploy in this task.

Verification:
1. Run npm.cmd run build from apps/website.
2. Search active website source and built output for pricing labels, public amounts, + GST, retired six-service names, “Safe AI”, “Book a free fit call” and GP clinic references. Explain any intentional internal-only match.
3. Test /, /services, /disability-providers, /allied-health, /ai-guardrails, /faq, /contact, /pricing, /safe-ai and an unknown path in a browser.
4. Test desktop and a mobile viewport, including the mobile drawer and keyboard focus.
5. Confirm /pricing and /safe-ai land on the intended canonical content without obsolete-copy flashes.
6. Check git status and report every changed file, tests run and remaining blockers.

Definition of done: the local production build contains only the three current products, no public pricing journey, a working legacy /pricing redirect, canonical AI Guardrails naming, controlled request-mode CTA/form copy and an intentional not-found state.
```

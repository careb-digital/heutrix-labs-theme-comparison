# Website acquisition refinement integration record

**Date:** 4 September 2026  
**State:** local release candidate; not deployed  
**Authority:** implementation evidence only; this record does not close the lead, legal, privacy, identity, proof, analytics or onboarding gates

## Outcome

The safe, reversible recommendations from the 4 September website acquisition audit have been integrated into the active website and controlled copy pack. The release candidate makes the existing offer easier to understand and use without adding public pricing, a lead destination, analytics, unverified trust claims or false proof.

## Integrated locally

- Shortened the home-page decision path and moved Heutrix Workflow Transformation ahead of the three-product routing cards.
- Added a compact, accessible services decision guide and made Workflow Transformation visually primary while preserving Diagnostics and AI Guardrails.
- Reworked the contact form into two accessible stages with progress, inline validation, focus management, Back navigation, preserved values and the existing truthful not-sent outcome.
- Added high-contrast keyboard focus, reduced-motion handling and 44 × 44 CSS-pixel mobile navigation targets.
- Added explicit labelling to the illustrative dashboard so it cannot be mistaken for a client result.
- Added HTTP-level redirects for `/pricing` and `/safe-ai` and baseline static response headers.
- Reconciled the controlled website-copy notes and stale verified-status references to the existing 3 September deployment and resource approval evidence.

## Verification

| Check | Result |
|---|---|
| Production build | Passed with 421 modules transformed. |
| Local home and services browser review | Passed; controlled three-product hierarchy and illustrative label visible. |
| Contact form | Passed for empty-field validation, stage transition, Back navigation, retained values, safety confirmations and truthful not-sent state using synthetic data. |
| Keyboard/mobile navigation | Passed; focus returns to the menu button after Escape and visible focus is a 3 px solid green outline with 3 px offset. |
| Responsive reflow | Passed at 390 × 844 and 320 × 800 with no horizontal document overflow. |
| Touch targets | Mobile open and close controls measured 44 × 44 CSS pixels. |
| Legacy HTTP routes | `/pricing` returns 301 to `/services#how-engagements-are-agreed`; `/safe-ai` returns 301 to `/ai-guardrails`. |
| Baseline headers | `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` and `X-Frame-Options` present in the local Cloudflare preview. |
| Resource integrity | All six website download SHA-256 values match the approved version 1.0 release manifest. |
| Unknown route | Still returns HTTP 200 because the current SPA fallback handles the response; deferred to H6. |

The source includes both a Framer Motion user-reduced-motion policy and a CSS `prefers-reduced-motion` fallback. The browser environment used for QA did not expose reduced-motion emulation, so this was verified in the built source rather than through an emulated live preference.

## Deliberately not integrated

- No form endpoint, scheduler, inbox, CRM, notification or email fallback.
- No analytics, pixels or resource-attribution tracking.
- No public pricing, starting range or pricing CTA.
- No founder identity, credentials, insurance, address, testimonials, client outcomes or unapproved sample proof.
- No canonical production URL, crawler files, social share image, genuine HTTP 404 or deployment.

The technical search and indexability decisions are recorded in [H6-TECHNICAL-SEO-DEFERRED-NOTE.md](H6-TECHNICAL-SEO-DEFERRED-NOTE.md).

## Remaining owner gates

1. Review and approve this local release candidate before deployment.
2. Decide the production domain and H6 rendering/routing approach.
3. Close the approved lead destination, ownership, privacy and end-to-end receipt path before making the form operational.
4. Approve the public identity/trust layer and one honest synthetic/sample proof asset.
5. Approve minimum privacy-safe measurement before enabling analytics or attribution.

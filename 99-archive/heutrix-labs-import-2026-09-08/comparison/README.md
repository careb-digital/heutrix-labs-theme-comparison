# Heutrix Labs

Canonical implementation and deployment: https://heutrix-labs-original-theme.janith.workers.dev/

Operator: Heutrix Pty Ltd, ABN 64 702 109 662 (provided by the owner).

## Current website

The original navy, mint and blue-tinted theme, dashboard, responsive navigation and pressure-point carousel are preserved. The primary audience is Australian disability service providers, including NDIS providers. Primary CTA: **Talk to Heutrix**, routed to `/contact` for a 20-minute introductory conversation. The homepage secondary CTA is **See How It Works**, routed to `/#heutrix-method`. Resource promotions and the footer use **Get the Scorecard**. See [CTA-STYLE-GUIDE.md](CTA-STYLE-GUIDE.md) for the authoritative CTA rules.

Public offers are Heutrix Diagnostics, Heutrix Workflow Transformation and Heutrix AI Guard. Existing `/ai-guardrails` URLs and assessment IDs are retained for compatibility.

Three explicitly illustrative workflow examples replace unverified delivery claims. The original 15 narratives remain in `content/evidence-review/case-studies-unverified.json`, outside the public bundle. Twelve retired detail URLs redirect to the example hub; three retained detail URLs now contain illustrative content. Do not restore results or client claims without evidence and publication permission.

## Enquiries — intentionally reserved Google connection

The owner requested placeholder architecture for a future Google Apps Script deployment that writes to Google Sheets and sends notifications. `GOOGLE-ENQUIRIES.md` documents the connection contract and activation tests. The current form prepares an email draft for the visitor to review and send. It does not automatically deliver a request or book an appointment. The deployed `/api/requests` endpoint returns 503 until connected; mock success is never presented as delivery.

Three interactive assessments, six direct resource downloads and downloadable action plans remain available without an email gate. Updated PDF guides use the current offer and CTA wording. Diagnostic answers are held in memory and included in an enquiry only with the visitor's selection.

## Development and verification

- `npm run dev`: local application preview.
- `npm run build`: production assets.
- `npm test`: assessment, validation and production-contract checks.
- `npm run check`: resource integrity and content checks; set `CHECK_ORIGIN` to test the running Worker routes and headers.
- `npm run dev:worker`: local Worker on port 4173.
- `npm run test:browser`: desktop/mobile assessment and email-draft journeys.
- `node scripts/check-pressure-points-browser.mjs`: carousel, keyboard, reduced-motion and layout checks.

Browser scripts accept `PLAYWRIGHT_MODULE` (a file URL for external modules on Windows), `CHROME_PATH`, `CHECK_ORIGIN` and `QA_OUTPUT`. Use synthetic data. Do not send real external messages during tests.

Route metadata, canonical URLs, Open Graph fields, robots and sitemap use the original-theme origin. Update the trusted origin in both App and Worker if a production custom domain is later agreed. Successful routes are indexable; error responses are noindex.

## Deployment

Verify the authenticated Cloudflare account with `npx wrangler whoami`, then `npm run deploy`. `wrangler.jsonc` targets only `heutrix-labs-original-theme`; do not substitute either reference deployment.

## 8 September 2026 verification

Build and 14 tests pass. All 20 routes and six download hashes pass against the local Worker; twelve legacy case redirects and the unavailable enquiry endpoint are checked. Seventeen main routes pass heading/content/overflow checks at 1440, 390 and 320 pixels. Full desktop/mobile assessment journeys and all three carousel viewport checks pass. Edited PDF pages were rendered and visually reviewed. Browser artifacts remain under ignored `output/`.

The Google connection is intentionally unfinished at the owner's request. Legal copy contains the supplied operator details; no legal-review approval is asserted.

Live verification passed on 8 September 2026 at the canonical origin: 20 routes, six resource hashes, route metadata and desktop/mobile checks. Cloudflare version: fec13f23-117b-4058-bfdd-6d3734f400c9.

## CTA guide release — 8 September 2026

Implemented CTA-STYLE-GUIDE.md across canonical pages, resource tools, footer and PDF guides; aligned reference copy documentation. Cloudflare version: f4f2af90-5b71-485c-ba24-b72481fa8107. Build and 14 tests passed; local desktop/mobile assessment journeys passed. CTA and overflow checks passed across 11 routes at 1440, 390 and 320 pixels. Live checks passed for 20 routes, six download hashes and published CTA destinations. The full live browser journey reached its final zero-POST assertion but detected background POST requests on opaque paths; the equivalent local journey passed. No enquiry integration was enabled by this change.


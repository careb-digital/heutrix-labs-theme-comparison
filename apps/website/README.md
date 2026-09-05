# Heutrix refined comparison website

A separate comparison of the Heutrix website, based on the navy/mint design of `shashaneRanasinghe/heutrix-labs` at `fc323b9` and the Heutrix ecosystem content current on 5 September 2026. The original root application and its deployment remain unchanged.

## Run and publish

From `apps/website/`:

- `npm ci`
- `npm run dev` — local authoring
- `npm run build` — production assets
- `npm run dev:worker` — actual Cloudflare runtime at port 4173
- `CHECK_ORIGIN=http://127.0.0.1:4173 npm run check` — route, download and response checks
- `npx wrangler whoami` — verify account before deployment
- `npm run deploy` — publish only the separate `heutrix-labs-refined` Worker

The comparison deliberately has no custom-domain route and uses `noindex, nofollow` and restrictive robots rules. Search exclusion is not access control: its URL is public. Do not point it at the main domain or remove comparison indexing restrictions without a separate release decision.

## Content and owner decisions

- The three approved products are Heutrix Diagnostics, Heutrix Workflow Transformation (primary implementation product), and Heutrix AI Guardrails. Disability providers remain the primary audience, allied health secondary. There are no public product prices.
- Janith confirmed on 5 September 2026 that **all 15 current anonymised case studies are cleared for publication** and requested the registers be updated. `src/caseStudies.json` reproduces the approved narratives from the ecosystem's `06-marketing/case-studies-and-assets/`; only internal links were mapped to website routes. One provider / connected body of work, approximate qualification and evidence limits remain visible. No identifying source material or verbatim testimonial was included. Case 15 retains its configuration/output evidence limits.
- Janith supplied **hello@heutrix.com.au** as the consultation destination. The CTA is **Request a free consultation**, replacing “See where Heutrix can help”. A consultation remains a free 20-minute, no-obligation fit conversation.
- The contact page opens a reviewable email draft in the visitor's email app. The visitor must send it there. It does not claim a confirmed booking, server submission, delivery receipt or response-time guarantee. No form backend, CRM, analytics, tracking or database is configured. Inbox receipt has not been tested by sending a message.
- All six download files are unchanged from the approved 3 September 2026 resource release. `content/download-manifest.json` captures their SHA-256 values; `npm run check` verifies them. Covers are previews of the actual guides.
- The hero photograph was generated for this website and is labelled illustrative; it does not depict actual staff or clients. Fonts are self-hosted from their licensed Fontsource packages.

## Release checks and limits

The production build and content checks pass. Local Worker checks cover 28 routes, six byte-identical downloads, legacy redirects, real 404 responses, rejected POST requests, comparison crawler restrictions and security headers. Browser checks cover desktop/mobile layouts, menu opening/closing and Escape behaviour, workflow switching, case-study filtering, full article loading, resources and consultation links. Dependency audit reports zero known vulnerabilities at build time.

Business identity particulars, formal legal review and broader onboarding readiness remain separate owner/adviser gates in the ecosystem. This technical comparison release does not approve legal drafts or imply those business gates are closed. The published legal pages retain their review status. A primary-domain launch should also confirm the privacy notice, monitored inbox operation, response ownership and any future scheduler/form routing.

## Maintenance

Keep public source copy, case narratives, evidence qualifications and download hashes aligned with the ecosystem. Never copy raw client records or internal control registers into this public repository. The comparison source is isolated under `apps/website/`; the existing root application is the baseline.

The GitHub workflow verifies the comparison; deployment uses authenticated Wrangler against the named Worker. No Cloudflare secret is stored in GitHub or the repository. To roll back the comparison, select its previous Worker version in Cloudflare or use Wrangler's rollback command. Do not deploy or roll back the baseline Worker as part of this comparison.

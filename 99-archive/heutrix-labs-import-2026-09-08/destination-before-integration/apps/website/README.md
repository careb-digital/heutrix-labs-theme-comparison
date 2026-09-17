# Heutrix website application

The website source is a Vite/React application. The current release is deployed to the public Cloudflare Worker.

## Local commands

```text
npm run dev
npm run build
npm run preview
```

Run these commands from this directory. On Windows, `npm.cmd` can be used in place of `npm`.

## Content sources

- Active implementation: [`src/`](src/)
- Approved/draft copy pack: [`../../06-marketing/website-copy/`](../../06-marketing/website-copy/)
- Current no-pricing and resource-integration brief: [`../../06-marketing/website-copy/WEBSITE-REFINEMENT-BRIEF-2026-09-03.md`](../../06-marketing/website-copy/WEBSITE-REFINEMENT-BRIEF-2026-09-03.md)
- Lead-magnet sources and release gate: [`../../06-marketing/lead-magnets/`](../../06-marketing/lead-magnets/)
- Website distribution copies: [`public/downloads/`](public/downloads/)
- Brand direction: [`../../06-marketing/brand/`](../../06-marketing/brand/)
- Launch gates: [`../../00-control/LAUNCH-BOARD.md`](../../00-control/LAUNCH-BOARD.md)

## Known conversion blocker

The 5 September interactive-resource implementation restores consultation and business-referral forms with qualification, permission and reviewable email drafts. Hosted Formtree and calendar URLs are intentionally empty configuration slots. Explicit test submissions go to a same-origin mock endpoint, which validates and discards them. It returns a labelled demo confirmation and does not store contacts, send messages or book calls. See [interactive resources and connection instructions](LEAD-MAGNETS.md). A live destination, notifications and pipeline still require end-to-end verification before calling the site conversion-ready.

For later resource changes, rebuild the website, confirm all six downloads resolve on desktop and mobile, confirm the public files match the reviewed lead-magnet outputs, and keep download attribution separate from contact permission.

## Current implementation status

The application implements the 3 September 2026 three-product, no-pricing architecture, `/pricing` and `/safe-ai` redirects, problem-matched ungated resources, request-mode CTA/form wording and an intentional not-found page. The production build, local browser checks and public-origin checks passed on 3 September 2026.

JD approved resource version 1.0 as review owner and boundary reviewer on 3 September 2026. The release was deployed as Cloudflare Worker version `d556eed0-aa28-4c65-87cd-722cceeaead2`, and the live route, redirect, mobile, keyboard-navigation, download and truthful not-sent form-state checks passed.

On 4 September 2026, the repository-grounded acquisition audit was integrated as a local, undeployed release candidate. It shortens the home-page decision path, makes Workflow Transformation visibly primary, adds a services decision guide, stages the contact form, strengthens focus/reduced-motion/touch-target behaviour, labels the illustrative dashboard, and moves the two retired routes to HTTP redirects with baseline response headers. The build and local Cloudflare/browser checks passed. See the [integration record](../../90-research-and-audits/website-acquisition-audit-2026-09-04/INTEGRATION-RECORD.md).

The lead destination, direct scheduler, legal/privacy gates, analytics approval and real-lead end-to-end conversion QA remain open. The public site must not be treated as conversion-ready until those gates close.

The production-domain, crawler metadata, `robots.txt`, sitemap, social image and genuine HTTP 404 approach remain part of the deferred [H6 technical decision](../../90-research-and-audits/website-acquisition-audit-2026-09-04/H6-TECHNICAL-SEO-DEFERRED-NOTE.md). Do not deploy the 4 September candidate until owner review.

## Separate refined comparison — 5 September 2026

[Live comparison](https://heutrix-labs-refined.janith.workers.dev) · [Review request](https://github.com/careb-digital/heutrix-labs/pull/3). The isolated comparison is in `apps/website/` on branch `codex/refined-comparison-2026-09-05`; it does not replace this working copy or the baseline Worker. It includes all 15 owner-cleared anonymised case studies, the six approved downloads and “Request a free consultation” directed to hello@heutrix.com.au via an email draft. All 28 live routes and six download hashes passed verification. Business identity/legal review and inbox delivery verification remain separate from technical release readiness.

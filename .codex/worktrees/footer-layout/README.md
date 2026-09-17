# Heutrix website

Website repository: https://github.com/Heutrix/heutrix-website. All subsequent website implementation work belongs here.

The application is React/Vite with a Cloudflare Worker for routes, metadata, security headers and static assets. Run commands from the repository root.

## Development and checks

Use Node.js 22 and npm. On Windows, use `npm.cmd` if PowerShell blocks `npm`.

```sh
npm ci
npm run dev
npm test
npm run check
npm run build
npm run dev:worker
```

With the local Worker running, set `CHECK_ORIGIN=http://127.0.0.1:4173` and run `npm run check` to verify public routes, redirects, error responses, security headers and all six retained download hashes. Browser scripts in `scripts/` accept `CHECK_ORIGIN`, `PLAYWRIGHT_MODULE`, `CHROME_PATH` and `QA_OUTPUT`. Form tests use intercepted synthetic submissions; they do not prove inbox delivery.

Run `npm run test:footer` against the built Worker for footer checks at 360, 390, 768, 1024 and 1440 CSS pixels, plus real 200% Chromium browser zoom. It checks layout, every footer destination, keyboard order and unobscured focus, current-page/section semantics, touch targets, composited text/state contrast and both CTA journeys. Synthetic enquiry submissions are intercepted. Measurements and desktop/mobile footer screenshots are saved under `output/playwright/footer/`; footer-only crops hide the fixed header during capture. CI runs this check with the existing release suites.

Run `npm run test:launch` against the local Worker for the full release check. It covers metadata, prerendering and hydration, mobile navigation at 200% text size, enquiry/referral validation and recovery, all three resource journeys, carousel controls and reduced motion, and all 20 public pages at 1440, 768, 390 and 320 px. The page scan checks internal link destinations, image loading, duplicate IDs, text contrast, unexpected requests and browser errors. Axe checks WCAG A/AA rules on desktop and narrow mobile views; these automated checks do not establish complete accessibility conformance. A blocked article chunk must show a usable recovery page and work again after reload. Screenshots and results are written under ignored `output/playwright/`.

GitHub runs this same release suite on pull requests, followed by `npm run test:webkit` for the second browser engine. WebKit coverage includes all 20 routes on desktop and mobile, mobile modal navigation, both forms with privacy/Back and failed-send recovery, consent and scorecard handoff. It uses mobile emulation, not a physical iPhone. Install the browsers with `npx playwright install chromium webkit` first; `CHROME_PATH` can instead point the Chromium checks at an installed Chrome executable. Keep `CHECK_ORIGIN` set for the whole suite. Production assets remain self-hosted and assessment/form drafts stay in memory.

Canonical origin and path normalisation are shared by React and the Worker in `src/siteUrl.js`. With the Worker running, run `npm run test:metadata` for HTTP HTML and browser coverage across all routes, query strings, trailing slashes, internal navigation and history. Install Chromium with `npx playwright install chromium`, or set `CHROME_PATH` to an existing browser. CI runs this check with an independent expected production origin so the retired origin cannot silently return. Route titles and descriptions continue to come from the existing content.

## Contributing

Branch from current `main`, make a focused change and open a pull request. Run the affected checks and obtain independent review. Janith coordinates merges; code ownership assignments remain unconfirmed. Do not force-push or delete `main`. Revert through a reviewed pull request when a correction is needed.

GitHub Actions runs build, tests and Worker HTTP checks. Actions are pinned to commit IDs, with read-only repository permissions and no deployment secrets in pull request runs. Dependabot proposes weekly dependency and Actions updates.

The owner chose to keep this repository private on its current GitHub plan on 11 September 2026. GitHub returned HTTP 403 for repository rulesets and requires Pro for this private repository. Reviews and passing checks are therefore a documented process, not enforced branch protection. Squash-only merges, automatic branch cleanup, read-only workflow defaults, dependency alerts and automated security fixes are enabled. Upgrade before relying on enforced review or required-check gates.

## Deployment

Destination Cloudflare account: `c8d5258dd1d3bd3e24d51a6f0f2539f2`, authenticated as `hello@heutrix.com.au`. The live website is [heutrix-website.heutrix.workers.dev](https://heutrix-website.heutrix.workers.dev). On 12 September 2026, merged commit `3cff6d936c0bcc5829f29510ca1a1c2d8504d0be` was deployed as Worker version `307e09de-179a-414f-be56-c4adf80b02ec`. All 20 routes, six download hashes, redirects, error responses, security headers and the new canonical origin passed live checks.

The current release path is reviewed pull request → passing checks → merge to `main` → deploy from a clean, updated local `main` checkout. Verify `git status -sb`, the commit and `npx wrangler whoami`; run `npm run deploy`, then `CHECK_ORIGIN=https://heutrix-website.heutrix.workers.dev npm run check`. On this Windows machine, setting `$env:NODE_OPTIONS = '--dns-result-order=ipv4first'` resolved Wrangler API timeouts. Keep the previous verified Worker version available for rollback.

Automatic Git deployment is not configured. To enable Cloudflare Workers Builds later, connect only this repository, use `main` as the production branch, repository root as the build root, `npm ci && npm test && npm run check && npm run build` as the build command and `npx wrangler deploy` as the deploy command. The Cloudflare Worker name must match `wrangler.jsonc`. Disable production deployment from other branches. This requires separate Cloudflare dashboard Git authorisation; the Wrangler login does not grant Workers Builds configuration access.

Verify the destination account and canonical origin before each release. Store credentials in the provider's approved secret storage, never in this repository. No custom domain or DNS cutover was performed during this migration.

## Content and release boundaries

Australian disability support providers are the primary audience; allied health is secondary. Products are Heutrix Diagnostics, Heutrix Workflow Transformation and Heutrix AI Guardrails. Public prices are excluded. Illustrative examples retain their labels.

See [design guidance](design.md), [CTA guidance](CTA-STYLE-GUIDE.md), [Formspree behaviour](FORMSPREE.md) and [resource behaviour](LEAD-MAGNETS.md). The wider Heutrix business workspace retains authority over commercial, proof, privacy and legal approvals; the website migration does not close those gates. No client records, credentials or internal business packs belong here.

### Monday public launch — 14 September 2026

The owner chose to retain `https://heutrix-website.heutrix.workers.dev` for this launch. No domain cutover is needed. The launch candidate was prepared separately on `codex/monday-public-launch` and merged through PR #15 as `f8cb5b8`; the complete main-branch suite passed. The owner waived independent review for this launch on 12 September 2026. Deployment still uses a clean, current `main` checkout.

The candidate aligns the homepage, enquiry/referral collection wording, privacy summary and terms with the verified Formspree delivery path. It identifies Heutrix Pty Ltd using the verified ABN/ACN, removes the unverified “trading as” assertion, describes Formspree storage/overseas processing and Cloudflare hosting, and offers email recovery after form errors. This is an implementation of observed behaviour, not legal approval or a new retention policy. Provider references: [Formspree privacy policy](https://formspree.io/legal/privacy-policy/) and [Cloudflare privacy policy](https://www.cloudflare.com/privacypolicy/), checked 12 September 2026.

On 12 September 2026, the owner requested website privacy and terms drafts and confirmed Shashane's enquiry cover with Rochelle as backup. That confirmation is recorded in the business role register. It does not independently verify each person's account access or add a public response-time promise. The two-business-day response target remains in business launch records.

The follow-up branch `codex/website-policy-drafts` expands the existing privacy page into a website/enquiry privacy policy and adds consumer-rights, acceptable-use, intellectual-property and external-service clauses to the website terms. The owner approved publication of both completed versions on 12 September 2026, answering “Approve” to the publication question after the full checks passed on `4b8f993` in PR #16. Their scope is this website, its resources and initial business communications; they do not reissue the native client legal pack or approve processing of real client records. The policy adopts purpose-based retention and a privacy-request process, without inventing a fixed deletion schedule, Australian-only hosting or a legal-compliance certification.

The $3 million threshold is not a blanket finding that Heutrix has no privacy obligations. [OAIC small-business guidance](https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/organisations/small-business) describes the general Privacy Act exemption for annual turnover of $3 million or less and exceptions, including health service providers and Commonwealth contractors. This task has not established Heutrix's turnover or assessed every exception. Website terms are a separate issue; they cannot remove applicable consumer rights ([ACCC contracts guidance](https://www.accc.gov.au/business/selling-products-and-services/contracts)). Sources checked 12 September 2026. Do not claim that an optional transparency policy means Heutrix has opted in to Privacy Act coverage or that a website policy alone establishes compliance.

Publication approval for these website-specific policies is recorded in the business legal review register separately from the native legal-pack draft statuses. Website policy publication, independent-review requirements and enquiry cover are resolved for this launch. Deploy the approved website from clean `main` and verify the public result before calling the launch complete.

The Formspree destination and delivery behaviour are unchanged. The [12 September delivery record](FORMSPREE.md#live-account-and-delivery-verification--12-september-2026) confirms provider acceptance and owner-confirmed mailbox receipt for both form types. It recorded 46 of 50 monthly submissions remaining; recheck quota, notifications and spam before launch, and have the enquiry owner check the mailbox and provider inbox each business day. This is a manual operating check, not an installed monitor. Account restrictions, subscription and routing have not been changed.

After review and merge, use the clean-main deployment sequence above, retain the previous verified Worker version, and run public-origin route/download checks plus a browser smoke check of the homepage, contact, referral and resources. The request forms agree conversation times by email; they do not advertise confirmed calendar bookings. If a release fails its smoke checks, roll back to the recorded previous Worker version and verify the public origin again. Any further real test messages require explicit owner authorisation; the release suite itself intercepts submissions.

## Migration status

Prepared from the `Heutrix/apps/website` working files on 11 September 2026, including existing local homepage, Formspree and scorecard refinements. The source workspace and its Git history remain preserved. This is a website-only snapshot; internal reports and business records are excluded. The destination was empty. [PR #1](https://github.com/Heutrix/heutrix-website/pull/1) was owner-approved and merged on 12 September 2026 (Australia/Sydney), after GitHub CI passed. Subsequent website work belongs in this repository, locally at `D:/AI Information Heirarchy/heutrix-website`.

## Prerendered informational pages

`npm run build` generates the usual Vite client assets, then renders the existing React pages to HTML with React DOM's server renderer. The temporary server bundle stays under `node_modules/.prerender` and is never deployed. No runtime SSR service or extra production dependency is needed. Case-study Markdown is fully resolved before HTML is written.

The Worker selects the generated page for informational routes and a generated error page for unknown URLs, retaining its metadata, redirects, security headers and true 404 responses. Generated file URLs are not public routes. Contact/referral forms and the three assessments retain their client-rendered shell and query/in-memory behaviour. Downloads continue through the unchanged asset handler. The browser hydrates populated roots and mounts empty interactive roots; informational motion content starts visible so it is readable with JavaScript disabled.

After building and starting the Worker, run `node scripts/check-prerender-browser.mjs` with Playwright available (`PLAYWRIGHT_MODULE` can point to an installed module; `CHROME_PATH` optionally selects Chrome). It verifies all informational routes and 404s on desktop/mobile with JavaScript disabled, original heading node reuse during hydration, no duplicate content, navigation and interactive homepage tabs. Existing assessment and Formspree browser checks cover interactive journeys.

# Formspree integration — 11 September 2026

Owner instruction: connect existing genuine customer submissions to `https://formspree.io/f/maeyavnk`, preserve the current site and keep resources ungated. This is a local implementation; it has not been deployed or verified in the Formspree account.

## Audit before implementation

The audit covered the production entry point, route switch, all source components, submission helpers, Worker, scripts, HTML reference and internal report source. It searched forms, handlers, fetch calls, inputs, selects, radios, checkboxes, resource/download flows, CTA destinations, placeholder logic and analytics hooks.

| Component | Page/journey | Purpose and fields | Previous behaviour | Connect? / required change |
|---|---|---|---|---|
| `EnquiryPage`, consultation | `/contact`; shared destination for homepage, service, audience and resource CTAs | Name, email, organisation, role, selected service, sector, workflow size, message, systems, timing, decision context, preferred time, safe-information confirmation, contact consent, optional assessment-summary choice | Review, then visitor-sent email draft | Yes: keep review, add asynchronous send, pending/success/error states and source fields |
| `EnquiryPage`, referral | `/refer` | Referrer name, email, organisation, role, introduced organisation, optional business contact name/email, service, message, permission to introduce, safe-information confirmation, contact consent | Review, then visitor-sent email draft | Yes: same shared submission implementation |
| `InteractiveTool`, scorecard | `/resources/workflow-bottleneck-scorecard` | Workflow, eight ratings, sensitive/high-stakes choice | Local score and downloadable/copyable action plan; explicit link to enquiry | No: assessment stays local; summary sent only if included in a separate reviewed enquiry |
| `InteractiveTool`, intake planner | `/resources/enquiry-to-service-start-starter-kit` | Sector, current system and six visibility choices | Local result, downloads and enquiry link | No: same ungated, explicit-handoff rule |
| `InteractiveTool`, AI check | `/resources/ai-guardrails-staff-starter-pack` | Task category and six AI-use choices | Local result, downloads and enquiry link | No: same ungated, explicit-handoff rule |
| `Contact.jsx` | Unused legacy component, not imported into active routes | Legacy unnamed contact fields; prevented submission | Unmounted placeholder | No: not a production customer journey |
| `ConsultationPage` in `RefinedPages.jsx` | Unused export; active `/contact` renders `EnquiryPage` | Email link/copy action | Visitor-sent email | No: no mounted form; leave unrelated component intact |
| `reference/stitch_code.html` | Design reference | Placeholder inputs and checkboxes | Static prevented form | No: reference only |
| Downloads, copy/share controls, navigation, filters and internal reports | Across site / outside public app | UI choices and assets | Local actions or links | No: not lead submissions |

No active newsletter, footer, modal, standalone service-page or gated resource email-capture forms were found. There are no active form analytics/conversion dispatchers; existing CTA and download attributes remain intact. Mock and deferred Google handlers are not connected to Formspree.

## Implementation

- `src/leadMagnets/formspree.js` holds the public endpoint, a small field adapter and the reusable `submitToFormspree()` helper. No dependency, credential, environment system or backend is introduced.
- The review step collects existing named fields using `FormData`. The adapter flattens reviewed fields into readable names, keeps the visitor's address in `email`, and sends POST multipart data with `Accept: application/json`. There is no client-side recipient-routing field.
- Hidden `source_page` reads the current pathname; `form_name` identifies the enquiry/referral; `lead_type` distinguishes introductory conversations, resource enquiries and business referrals. `source` accepts only the three known resource IDs or `resources`, never arbitrary query values, URLs or browser state.
- Assessment submission contains only the visitor-reviewed summary when selected. No raw context object, cookies, storage, tokens, session identifiers or referrer URL is added. The provider receives no credentials. The existing contact consent and introduction permission remain required.
- Formspree's `_gotcha` honeypot is hidden from people, keyboard navigation and assistive technology. No CAPTCHA or custom bot-scoring system is added.
- Sending disables the send/edit actions; a synchronous ref blocks duplicate attempts. Only an HTTP success with JSON `ok: true` shows receipt. HTTP errors, invalid responses, network failures and a 15-second timeout show a generic retry message and retain all input and the draft. There is no automatic retry and no false booking confirmation.
- Review and confirmation headings receive keyboard focus. Pending and error messages use accessible live feedback; the send button describes its status/error. The pending-button colour transition is disabled to avoid an unreadable intermediate state.
- The Worker allows `connect-src` to the exact supplied Formspree endpoint. Native form navigation remains blocked; both review and final send are JavaScript-controlled.
- Production always uses Formspree. The existing mock mode can only be selected for development and cannot silently replace production delivery.

## Verification commands

```powershell
npm.cmd test
npm.cmd run build
npm.cmd run dev:worker
# In another terminal, with Playwright available:
$env:CHECK_ORIGIN = 'http://127.0.0.1:4173'
$env:QA_OUTPUT = 'output/playwright/resources'
npm.cmd run test:browser
$env:QA_OUTPUT = 'output/playwright/formspree'
node scripts/check-formspree-browser.mjs
npm.cmd run check
```

`PLAYWRIGHT_MODULE` may point to an existing Playwright `index.mjs`; `CHROME_PATH` can select the local Chrome executable. No new test framework is needed. Stop the local Worker before rebuilding on Windows to avoid locks on generated assets.

There are no lint or typecheck scripts in this JavaScript repository. Browser submission tests intercept Formspree requests and exercise synthetic success/failure responses: they do not send production leads or prove inbox delivery. Resource tests check that assessment navigation, downloads and draft review do not submit anything.

### Results — 11 September 2026

- Unit tests: **26 passed**, including field mapping, consent/summary opt-out, timeout, malformed/provider/network errors and the CSP restriction.
- Production build: **passed**. Windows file-access/Worker-lock failures were resolved by stopping the local Worker and running the build with the required filesystem access. Vite's informational plugin timing warning remains.
- Local Worker checks: **20 routes and six download hashes passed**, including redirects, 404s, rejected same-origin POSTs, robots and security headers.
- Resource browser suite: **passed at 1440 and 390 px** for all three tools, required answers, local results, downloads, summary handoff/opt-out, referral permissions and no transmission during review.
- Form browser suite: **passed at 1440, 390 and 320 px** for consultation and referral. Verified required/email/permission validation, all named fields, source metadata, pending and duplicate prevention, HTTP/network failure, retained input, editing, retry, keyboard activation, focus, inline success, text contrast, no overflow and no unexpected console/runtime/CSP errors. Also verified scorecard-origin submission with and without its summary.
- Visual inspection: reviewed generated desktop form and mobile success screenshots in `output/playwright/formspree/`. Full-page captures can position the fixed header at the current scroll offset; browser focus and layout checks passed.
- Lint/typecheck: **not configured**; no tooling was added solely for this task.
- No Formspree POST was allowed through the browser test interceptor. Account receipt and notification delivery are **not verified**.

### Changed source and documentation

| File | Change |
|---|---|
| `src/leadMagnets/EnquiryPage.jsx` | Shared contact/referral send step, attribution, honeypot, feedback and production delivery |
| `src/leadMagnets/formspree.js` (new) | Flat field adapter and reusable AJAX helper |
| `src/leadMagnets/integrations.js` | Public delivery mode and configuration comments |
| `src/leadMagnets/leadMagnets.css` | Readable send-button pending/retry transitions |
| `worker.js` | Narrow Formspree connection permission |
| `package.json` | Include new unit tests in the existing test command |
| `scripts/test-formspree.mjs` (new) | Provider/payload/error/CSP unit coverage |
| `scripts/test-production-contract.mjs` | Expect Formspree production mode |
| `scripts/check-formspree-browser.mjs` (new) | Intercepted desktop/mobile submission and retry coverage |
| `scripts/check-lead-magnets-browser.mjs` | Expect real send controls while retaining no-POST review checks |
| `README.md` | Current local delivery and release status |
| `LEAD-MAGNETS.md` | Current review/send behaviour; resources stay ungated |
| `CTA-STYLE-GUIDE.md` | Accurate review/send labels and release status |
| `FORMSPREE.md` (new) | Audit, implementation, checks and account action |
| `../../00-control/RISKS-AND-BLOCKERS.md` | Record local progress without closing the delivery gate |

Existing migration and homepage edits were preserved. This task did not stage, commit or deploy. At the request of the parallel homepage release task, reconstructed pre-edit runtime files were saved under ignored `output/formspree-before/` so that its isolated deployment could exclude this unpublished integration. Those copies are coordination artifacts, not a second source of truth.

## Account and release follow-up

The site determines the POST endpoint. Configure and verify the final notification email in the Formspree account for `maeyavnk`, along with any applicable allowed-domain settings. Account access, notification delivery and live end-to-end receipt have not been verified here. This implementation does not close the operational lead-handling gate until it is deployed and a submission is confirmed at the destination.

Provider references: [AJAX submission](https://help.formspree.io/articles/building-your-form/submit-forms-with-javascript-ajax) and [Formspree honeypot handling](https://help.formspree.io/articles/building-your-form/honeypot-spam-filtering).

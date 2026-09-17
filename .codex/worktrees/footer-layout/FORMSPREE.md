# Formspree integration — 11 September 2026

Owner instruction: connect existing genuine customer submissions to `https://formspree.io/f/maeyavnk`, preserve the current site and keep resources ungated. The implementation is deployed. Live provider acceptance and owner-confirmed mailbox receipt were verified on 12 September 2026; see the current verification below. The implementation history remains below as dated evidence.

## Live account and delivery verification — 12 September 2026

Origin: `https://heutrix-website.heutrix.workers.dev`. The deployed JavaScript (`/assets/index-Dis_J3Gr.js`) contains the exact endpoint and requires a successful HTTP response with JSON `ok: true`; the live CSP permits connection to that endpoint. No intercepted or mocked responses were used for these delivery tests.

The owner authorised one synthetic enquiry and one synthetic referral and confirmed `hello@heutrix.com.au` as the intended recipient. Both were prepared and reviewed in the deployed site's normal forms, then sent once. No real client, participant or business introduction was used. The synthetic reply address was `heutrix-delivery-test@example.com`; the messages explicitly instructed recipients not to contact that address or create a sales opportunity.

| Check | Observed result |
|---|---|
| Form identity | `maeyavnk`, named **Heutrix Website Referrals**, in **My First Project**, account **Heutrix Pty Ltd**. Both enquiry types intentionally use the supplied endpoint. |
| Recipient verification | Account Linked Emails shows `hello@heutrix.com.au` as **VERIFIED**. |
| Notifications | Workflow Email action enabled; target address `hello@heutrix.com.au`. |
| Allowed domains | Project **Restrict to Domain** is blank: no domain allowlist is configured. The deployed origin successfully submitted both tests. |
| Spam controls | Formshield enabled; CAPTCHA disabled. Crypto, drugs, fraud, porn, spammy phrases and spammy URLs classifiers enabled; profanity and spammy emails disabled. Smart Filter displays enabled with slider 50 and a Professional-plan requirement; entitlement/effectiveness was not independently tested. Site `_gotcha` honeypot retained. |
| Storage and availability | Form enabled; submission archive enabled. No settings changed. |
| Quota after tests | **4 / 50 monthly submissions (8% used; 46 remaining)**, refreshed after both tests. Reset date was not shown on the inspected account page. |
| Provider acceptance: enquiry | `HEUTRIX-20260912-ENQ-01`: live success confirmation and matching Formspree Inbox record, `Talk to Heutrix`, `Introductory conversation`, source `/contact`, 12 September 02:35 UTC. |
| Provider acceptance: referral | `HEUTRIX-20260912-REF-01`: live success confirmation and matching Formspree Inbox record, `Organisation Referral`, `Business referral`, source `/refer`, 12 September 02:35 UTC. |
| Actual mailbox receipt | Owner replied **Received** when asked to confirm both IDs at `hello@heutrix.com.au`. This is owner-confirmed receipt, separate from provider acceptance; the agent did not independently inspect message headers or mailbox folder placement. |
| Provider spam folder | Formspree displayed **Spam (0)**. This does not establish the destination mailbox's spam-folder status. |
| Site checks | Production checks passed for 20 routes, six download hashes, redirects, 404s, rejected same-origin POST, robots and security headers. |

Formspree account access was supplied interactively. Gmail connector authentication repeatedly returned an authentication prompt instead of mailbox access, so no independent mailbox inspection is claimed. Neither authorised submission showed a delivery failure; no retries were sent.

**Remaining owner decision:** whether to enable a domain restriction for `heutrix-website.heutrix.workers.dev` and which future production domains to support. It was left unchanged because this task requested inspection. The client currently sends with `referrerPolicy: 'no-referrer'`; any restriction change needs a separate compatibility and delivery check before treating it as verified. No other account settings, routing or subscriptions were changed. This evidence verifies this endpoint's tested delivery path, not unrelated business launch gates.

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

The site determines the POST endpoint; recipient routing belongs in Formspree. The 12 September verification above supersedes the earlier pending account/delivery status: recipient verification, enabled notification routing, real provider records and owner-confirmed receipt have been checked. Domain restriction remains an explicit owner decision. Recheck delivery after changing the origin, notification recipient or spam/domain controls.

Provider references: [AJAX submission](https://help.formspree.io/articles/building-your-form/submit-forms-with-javascript-ajax) and [Formspree honeypot handling](https://help.formspree.io/articles/building-your-form/honeypot-spam-filtering).

## Memory-only enquiry and referral drafts — 12 September 2026

Each form type keeps its own field values, checked and unchecked permissions, service/source context and assessment-summary choice in the mounted React provider. Internal navigation, including privacy and browser Back, restores the form for a fresh review. No contact information is written to localStorage, sessionStorage, cookies or history state. Reloading or closing the page loses drafts.

Discard draft removes only that form’s draft and clears its fields, choices and review payload. A confirmed successful submission does the same; errors retain the draft for retry. Pending requests stay locked across navigation. A late success clears a restored submitted draft but does not delete a newer edited draft or the other form type. Assessment tool answers remain separate. These rules concern the browser draft, not records already sent to Formspree.

Browser regression coverage includes privacy/Back, both form types, checked and unchecked consent, assessment opt-out, cross-form separation, discard, reload, delayed success and intercepted delivery errors. Tests never send real leads.

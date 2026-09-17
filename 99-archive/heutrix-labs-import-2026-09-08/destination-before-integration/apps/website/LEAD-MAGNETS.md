# Interactive resources and enquiry handoff

## Deployed comparison releases — 6 September 2026

Janith authorised integration and deployment to both comparison websites. Both now include all three interactive tools, optional result handoff, consultation/referral forms in clearly labelled mock mode, and the six approved downloads. Copy-comparison uses the current three-product, no-public-pricing copy; refined retains its updated copy, founder story, imagery and 15 approved anonymised case studies.

| Website | Cloudflare version | Release source |
|---|---|---|
| https://heutrix-labs-copy-comparison.janith.workers.dev | `28aeccc3-f87c-4636-a62d-613fa1940082` | `D:/AI Information Heirarchy/heutrix-copy-deploy/apps/website`, branch `codex/interactive-copy-comparison-2026-09-06` |
| https://heutrix-labs-refined.janith.workers.dev | `791c2ec6-9117-43bd-a8d6-6160c2aa493d` | `D:/AI Information Heirarchy/heutrix-refined-deploy/apps/website`, branch `codex/interactive-refined-2026-09-06` |

Verification passed: both production builds; 11 rule/endpoint tests per source; desktop/mobile journeys on both final preview builds and both public origins; 16 copy-comparison and 32 refined routes; all six approved download hashes per site; redirects, 404s and search-index controls. Browser checks include results, action-plan downloads, required fields, summary opt-out, referral permission, mock confirmations, failure/retry and absence of browser storage or runtime/CSP errors. Local Cloudflare runtime requests timed out; standard preview and the deployed Cloudflare origins supplied the successful verification.

The release sources build into `dist-release/` and deploy from that directory; `npm run preview` uses the same output. This avoids Windows locks on earlier preview output. The baseline `heutrix-labs` Worker and the original workspace migration remain untouched. Mock submissions still discard data and do not deliver leads or book calls; provider connection and receiving-account verification remain open.

Implemented 5 September 2026 at Janith's request. Live form collection and scheduling remain intentionally unconnected. At Janith’s follow-up request the forms submit to a mock endpoint. It validates and returns a clearly labelled demo reference, then discards the data. No CRM, email delivery or booking system is activated.

## Entry points

| Route | Behaviour |
|---|---|
| `/resources` | Three interactive tools plus the six existing guide/workbook downloads |
| `/resources/workflow-bottleneck-scorecard` | One-workflow prioritisation with evidence, feasibility and control overrides |
| `/resources/enquiry-to-service-start-starter-kit` | Intake visibility checks, sector-specific starter map and missing-control actions |
| `/resources/ai-guardrails-staff-starter-pack` | Administrative use-case screen; missing answers never imply approval |
| `/contact` | Restored qualification fields, optional selected result, reviewable draft and mock submission |
| `/refer` | Business introduction with permission to share; reviewable draft and mock submission |

Home and problem-specific resource cards lead into the interactive tools. Results support saving a plain-text action plan, copying a team summary, sharing a clean tool URL, discussing a selected result, and introducing an organisation. PDF and workbook companions remain available unchanged.

The scorecard retains the source weights and 20–100 range. Its 55/75 thresholds are heuristics, not industry benchmarks. Low evidence, uncertain controls or insufficient feasibility prevent an implementation recommendation. The AI check validates every required control; it does not copy the workbook's unsafe blank-answer fallthrough. The intake planner contains no live participant records.

## Connect Formtree or a booking calendar

Edit `src/leadMagnets/integrations.js`. The public configuration has three intentionally empty slots:

```js
consultationFormUrl: '', // published HTTPS form URL
referralFormUrl: '',     // published HTTPS referral form URL
calendarUrl: '',         // published HTTPS booking URL
submissionMode: 'mock',  // use 'email' for the manual email fallback
```

Paste the verified hosted URLs from the chosen provider and rebuild. Do not add API keys to frontend configuration. Unsupported or unsafe URLs are ignored. The current integration uses external links, not embedded frames, vendor scripts or undocumented endpoint assumptions.

- An empty form URL and `submissionMode: mock` enable demo submission. Set `submissionMode` to `email` for the manual email fallback to `hello@heutrix.com.au`.
- A configured form URL changes the final handoff to “Continue to enquiry/referral form”. The visitor copies the draft and completes submission there. Contact details and answers are not put in URL parameters.
- A configured calendar URL displays “Choose a time”. Confirmation happens in the calendar service, never on the Heutrix page merely because a link was opened.
- Long email drafts use a copy-and-paste fallback to avoid unreliable oversized `mailto` links.

For a later direct submission adapter, `createEnquiry()` provides a versioned provider-neutral object: contact, qualification, requested service, message, timing, permissions, optional referral, and explicitly included assessment summary. Implement that adapter server-side against the selected provider's documented contract. Validate inputs and permission, add appropriate spam/duplicate handling, and only display receipt after the provider confirms success. Preserve entries on failure. Replace the mock adapter only when the real provider contract is configured and verified. Do not relabel demo acknowledgement as production receipt.

Before enabling live submission, verify receiving account, inbox/pipeline creation, access, retention, notification ownership and actual collection copy. Test a synthetic submission through to receipt. Do not treat a resource download, copied summary or email-link click as a captured lead or successful referral.

## Information behaviour

Assessment answers and form fields remain in page memory until the visitor submits or shares them. They are not persisted in local/session storage. An explicit mock submission sends the reviewed request to the same-origin demo endpoint, which validates it and discards it without storing contact details or forwarding them. A chosen result can move into the consultation page within the current session; the visitor can exclude it. Reloading the page clears this context. Business contact and permission fields are retained in the draft the visitor chooses to send. Referrals do not automatically inherit another person's assessment.

No analytics, marketing subscription, automatic email sequence, calendar account or new database has been activated. The referral route is for introductions to Heutrix, not clinical or participant referrals.

## Verification

```text
npm run build
npm test
npm run preview -- --host 127.0.0.1 --port 4174
CHECK_ORIGIN=http://127.0.0.1:4174 npm run test:browser
```

The browser test requires Playwright and Chrome. If Playwright is installed outside this project, set `PLAYWRIGHT_MODULE` to its `index.mjs`; override `CHROME_PATH` if needed. `QA_OUTPUT` selects the screenshot directory. No browser tests send real email or contact external form providers. They send synthetic payloads to the mock endpoint and verify success, rejection and retry behaviour.

The unit suite covers score bounds, control and evidence overrides, invalid/missing fields, all 729 complete AI answer combinations, intake routing, summary opt-out, permission serialisation and HTTPS configuration validation. Browser checks cover desktop/mobile navigation, validation, personalised results, downloads, editing, handoff, summary opt-out, referral permission and truthful drafts, mock confirmations, failure recovery and no external submissions.

## Source coordination

`src/leadMagnets/` contains the shared implementation. It is integrated into this reconnected baseline project and the separate refined-comparison working copy at `/private/tmp/heutrix-comparison-0905/apps/website/`. Each retains its existing layout, content and deployment target. No baseline migration or nested history was replaced, and neither website was deployed as part of this implementation.

## Mock endpoint

`POST /api/requests` accepts the `createEnquiry()` JSON contract. Both the Cloudflare Worker and Vite dev/preview use `server/mockRequests.js`. The handler validates contact/qualification fields, permissions, optional assessment structure, same-origin requests and a 16 KiB body limit. It returns `mode: mock`, `status: simulated`, a `DEMO-…` reference and timestamp. There is no database, email, calendar write or payload logging. References are not stored or retrievable.

The frontend shows a submitting state, prevents double-click submissions, checks the mock response contract, and displays the explicit demo confirmation. Validation/network failures keep the draft and allow a retry. A ten-second timeout also retains the draft. Connected hosted-form URLs take precedence over mock mode.

This flow is suitable for demonstration and integration testing, not production lead capture. Before a production launch, replace the adapter and repeat receiving-account, privacy, notification and booking checks.

## Verified result — 5 September 2026

Production builds passed for the baseline and refined comparison. Eleven automated rule/endpoint tests passed, including all 729 complete AI combinations. Desktop/mobile browser journeys passed in both local Cloudflare runtimes: resource navigation, results, downloads, qualification, selected-summary inclusion/exclusion, permission, actual mock submission, demo confirmation, simulated failure and retry. The baseline confirmation heading was also checked against the fixed mobile header. The comparison passed 32 route checks and all six approved download hashes; the six files match the baseline exactly. The standard Vite preview separately accepted a valid synthetic mock request and rejected an incomplete one. No production deployment or real provider submission was performed.

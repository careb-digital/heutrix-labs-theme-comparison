# Heutrix Labs — original theme, current features

Compare the original repository's navy/mint, blue-tinted, dashboard-led design with the refined website, using the same current copy and features.

- Comparison: https://heutrix-labs-original-theme.janith.workers.dev/
- Reference: https://heutrix-labs-refined.janith.workers.dev/
- Upstream: https://github.com/shashaneRanasinghe/heutrix-labs
- Fork: https://github.com/careb-digital/heutrix-labs-theme-comparison
- Branch: `codex/original-theme-current-content-2026-09-06`

The account already had a GitHub fork of the requested repository. This branch reuses that fork and starts from upstream main at `fc323b99341c6ca94192b2ac39482450dae7fd4d`. Neither default branch nor the existing refined deployment is changed.

## Sources and presentation

The application was imported from the exact 6 September refined deployment source at `D:/AI Information Heirarchy/heutrix-refined-deploy/apps/website`. Its `dist-release` entry assets (`index-BM6hKhrA.js` and `index-YT1KqAGx.css`) matched the live reference. This includes interactive-tool changes newer than the published refined branch at `8c1c895`.

All 32 routes, 15 anonymised case narratives, six downloads, three assessments, consultation/referral journeys, workflow tabs, case filters, About-page diagrams, resources, FAQs and legal pages are retained. Evidence qualifications and legal review status remain unchanged.

`src/original-theme.css` adapts presentation to the upstream design: bold typography, blue-tinted surfaces, navy/mint accents, bordered cards, outlined secondary actions and a prominent operations dashboard. The illustrative photo is retained beneath the dashboard. Other content and behaviour are shared with the refined site. Original upstream component files remain as design references; `src/App.jsx` selects the actual pages.

## Run and deploy

From this repository root:

```sh
npm ci
npm run dev
npm run build
npm test
npm run check
npm run dev:worker
```

For route/download checks against the local Worker in PowerShell:

```powershell
$env:CHECK_ORIGIN = 'http://127.0.0.1:4173'
npm run check
```

Publish only the separate comparison Worker:

```sh
npx wrangler whoami
npm run deploy
```

Wrangler targets `heutrix-labs-original-theme`, with Workers Static Assets and the imported routing/API Worker. Build output is `dist/`. There is no custom-domain binding. The public comparison retains `noindex, nofollow` headers and crawler exclusions.

## Verification

The build, 11 assessment/mock-endpoint tests, case narrative checks and six SHA-256 download checks are included. With `CHECK_ORIGIN`, `npm run check` additionally covers all 32 routes, redirects, 404s, rejected unsupported requests, robots and security headers. GitHub Actions runs build, tests and content checks.

The existing browser journey script checks all three tools, action-plan downloads, required answers, context handoff, optional summary removal, consultation and referral permissions, mock submission and retry recovery at desktop/mobile widths. It accepts `PLAYWRIGHT_MODULE`, `CHROME_PATH`, `CHECK_ORIGIN` and `QA_OUTPUT` environment variables. Local browser artifacts under `output/` are excluded from Git.

Release verification on 6 September 2026 passed all 11 tests, all 32 Worker routes and six download hashes, and desktop/mobile assessment and form journeys. All 32 rendered pages matched the live reference's main-content text exactly. Layout checks passed at 1440, 390 and 320 pixels without horizontal overflow or browser runtime errors.

## Forms retain the live site's test mode

Consultation/referral forms validate input and send it to the local `/api/requests` mock endpoint. It returns an explicitly labelled DEMO reference and discards the data. It does not deliver enquiries, store leads, send email or book calls. Email fallback remains available at `hello@heutrix.com.au`. No real external messages are sent during verification.

Provider connection settings remain empty in `src/leadMagnets/integrations.js`, matching the live reference. See `LEAD-MAGNETS.md` for the inherited implementation and source-release notes.


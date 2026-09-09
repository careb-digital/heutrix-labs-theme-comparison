# Heutrix website application

Work here: D:/AI Information Heirarchy/Heutrix/apps/website. The former heutrix-labs/comparison folder is historical evidence only.

The original-theme implementation and its uncommitted improvements were reconciled on 8 September 2026. [Integration record](../../06-marketing/changes/2026-09-08-workspace-integration.md) documents scope, retained assets and conflicts. Root [working instructions](../../AGENTS.md) apply.

## Run and verify
Run npm ci, npm run build, npm test and npm run check from this directory. On Windows use npm.cmd. npm run dev:worker starts the local Worker; CHECK_ORIGIN enables HTTP checks. Browser scripts accept PLAYWRIGHT_MODULE, CHROME_PATH, CHECK_ORIGIN and QA_OUTPUT. Use synthetic data only.

## Current content and behaviour
Three products: Heutrix Diagnostics, Heutrix Workflow Transformation and Heutrix AI Guardrails. Disability providers are primary; allied health secondary. No public prices. [CTA guide](CTA-STYLE-GUIDE.md) controls website labels. The site displays three illustrative examples; the [authoritative proof register](../../06-marketing/case-studies-and-assets/PROOF-ASSET-REGISTER.md) separately retains the 15 approved anonymised cases.

The contact/referral flow prepares an email draft to hello@heutrix.com.au. Visitors must send it. No delivery or booking confirmation is claimed. [Google connection contract](GOOGLE-ENQUIRIES.md) remains deferred. [Interactive resources](LEAD-MAGNETS.md) remain ungated; six existing download files were retained. Their hashes are in content/download-manifest.json.

## Sources and release boundary
[Page copy](../../06-marketing/website-copy/README.md), [offer decisions](../../00-control/DECISIONS.md), [resource release](../../06-marketing/lead-magnets/RELEASE-MANIFEST.md), [launch gates](../../00-control/LAUNCH-BOARD.md).

wrangler.jsonc retains the imported original-theme Worker target. The reconciled homepage and owner-directed presentation follow-up were deployed and verified on 9 September 2026 at https://heutrix-labs-original-theme.janith.workers.dev/ as Cloudflare Worker version `e7c5e57c-d3c8-4e5c-a344-aac43c7a99ea`. The former destination README is preserved in the import archive. Deployment does not close the separate lead-handling, legal, privacy, analytics or outreach gates.

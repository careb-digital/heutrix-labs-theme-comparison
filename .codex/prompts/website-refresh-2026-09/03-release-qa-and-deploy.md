# Prompt 3 — Release QA and deploy the Worker preview

## Copy this prompt into Codex after Prompts 1 and 2

```text
Act as the release owner for the existing Heutrix Labs Cloudflare Worker website in:

the current Heutrix repository root

Target: https://heutrix-labs.janith.workers.dev/

Goal: independently verify the completed no-pricing, three-product and ungated-resource implementation, then deploy it to the existing heutrix-labs Worker only when the changed content's publication gates are satisfied.

Before changing or deploying anything:
1. Read AGENTS.md completely.
2. Read 00-control/LAUNCH-BOARD.md, DECISIONS.md, VERIFIED-FACTS.md and RISKS-AND-BLOCKERS.md.
3. Read 06-marketing/website-copy/WEBSITE-REFINEMENT-BRIEF-2026-09-03.md and 06-marketing/lead-magnets/README.md plus RELEASE-MANIFEST.md.
4. Inspect git status and the full diff. Preserve unrelated and pre-existing changes; do not reset or discard the workspace reorganisation.
5. Confirm the lead-magnet release row names the review owner and boundary reviewer and records an approval date and website-release decision. If it does not, do not deploy the resource-integrated build. Finish local QA and report the exact missing approval fields.
6. Confirm you are targeting the existing Cloudflare Worker named heutrix-labs from apps/website/wrangler.jsonc. Do not create a new Worker, Pages project, account, route or domain.

Run release checks:
- Install dependencies only if required by the existing lockfile.
- Run npm.cmd run build from apps/website and treat warnings/errors according to risk.
- Inspect the built output for secrets, source maps or unintentional files.
- Search active source and dist for pricing navigation, pricing CTAs, public amounts, + GST, retired six-service names, Safe AI naming, Book a free fit call and GP clinic launch copy. Resolve unintended matches.
- Recalculate and compare SHA-256 for all six resource files against the release manifest.
- Start the production preview and test, in a browser, /, /services, /disability-providers, /allied-health, /ai-guardrails, /resources, /about, /faq, /contact, /privacy-and-data-handling, /terms-of-use, /website-disclaimer, /pricing, /safe-ai and an unknown path.
- Test desktop and representative mobile viewports, navigation, headings, visible focus, resource links, download names/types, illustrative labels and no horizontal overflow.
- Confirm /pricing redirects to /services#how-engagements-are-agreed and /safe-ai redirects to /ai-guardrails.
- Confirm the contact form does not ask visitors to choose a product/technology, does not accept uploads, warns against sensitive information, and never shows success without server-confirmed receipt.
- Confirm the legal pages are not described as legally approved if the legal review register remains open.

Deployment:
- Use the repository's existing Wrangler configuration and authenticated Cloudflare account. Do not change account, Worker name or routes.
- Deploy the production build to the existing heutrix-labs Worker.
- Capture the exact deployment version/identifier and target URL.
- A successful deploy command is not sufficient. Re-open https://heutrix-labs.janith.workers.dev/ and repeat the critical route, redirect, navigation, resource-download and contact-form checks against the deployed site.
- If any deployed critical check fails, stop, diagnose and correct only the in-scope defect. Rebuild and redeploy only after the local check passes.

Update control records only with verified evidence:
- Record the deployment and post-deploy evidence in 00-control/LAUNCH-BOARD.md.
- Close or revise the stale-pricing/offer risk in 00-control/RISKS-AND-BLOCKERS.md only if the deployed checks pass.
- Do not close the lead-submission, scheduler, legal, identity, insurance, founder-proof or analytics gates unless this task produced the required evidence.

Final report:
- Deployment URL and version/identifier.
- Changed files and commit/diff status.
- Build result.
- Resource hash table.
- Route/redirect/download/form QA result.
- Remaining owner or launch blockers.
- Explicit go/no-go limited to this website-copy and resource release.

Definition of done: the existing worker serves the controlled three-product copy, has no public pricing journey, redirects legacy routes correctly, makes the approved resources available without an email gate, and passes post-deploy browser verification. If a release gate is missing, definition of done becomes a verified local release candidate plus a precise no-deploy blocker report.
```

# Prompt 2 — Integrate the three ungated resources

## Copy this prompt into Codex after Prompt 1

```text
Work as the content and front-end implementation owner for the Heutrix Labs website in:

the current Heutrix repository root

Goal: integrate the three approved-in-architecture lead magnets as problem-matched, ungated website resources while preserving their professional, privacy and consent boundaries.

Before editing:
1. Read AGENTS.md completely and check git status. Preserve all unrelated and pre-existing changes.
2. Read 06-marketing/website-copy/WEBSITE-REFINEMENT-BRIEF-2026-09-03.md, README.md and the controlled Home, Services, Disability Providers, Allied Health, AI Guardrails, Resources, Contact, Privacy, Terms and Disclaimer copy files.
3. Read 06-marketing/lead-magnets/README.md, LEAD-MAGNET-OPERATING-STANDARD.md and RELEASE-MANIFEST.md.
4. Inspect apps/website/public/downloads and the existing resource content in apps/website/src/siteContent.js and App.jsx before changing it.

Implement the resource journey:
- Publish one /resources page containing exactly these three resources:
  1. 20-Minute Workflow Bottleneck Scorecard.
  2. Enquiry-to-Service-Start Visibility Starter Kit.
  3. AI Guardrails Staff Starter Pack.
- Add Resources to the main and footer navigation only when the release gate is approved for public use. If the release row is still incomplete, implement and test locally but do not deploy or claim release approval.
- Feature the Workflow Bottleneck Scorecard on Home as the general lowest-friction first action.
- On Services, match all three resources to the relevant buyer decision and paid bridge.
- On Disability Providers, feature the Enquiry-to-Service-Start Visibility Starter Kit.
- On Allied Health, feature the Workflow Bottleneck Scorecard using referral, intake, reporting and document examples.
- On AI Guardrails, feature the AI Guardrails Staff Starter Pack.
- On About and FAQ, offer Resources as the self-guided path.
- On Contact, preserve source and resource ID from the URL or CTA in the lead record. When relevant, allow only a high-level statement of what the visitor noticed. Never request the score, completed workbook, screenshot, upload, record or sensitive information.

Use these exact public files:
- /downloads/workflow-bottleneck-scorecard-guide.pdf
- /downloads/workflow-bottleneck-scorecard.xlsx
- /downloads/enquiry-to-service-start-starter-kit-guide.pdf
- /downloads/enquiry-to-service-start-starter-kit.xlsx
- /downloads/ai-guardrails-staff-starter-pack-guide.pdf
- /downloads/ai-guardrails-staff-starter-pack.xlsx

Use these stable resource anchors:
- workflow-bottleneck-scorecard
- enquiry-to-service-start-starter-kit
- ai-guardrails-staff-starter-pack

Boundary requirements:
- Deliver the complete guide and workbook without an email form or partial-content gate.
- State the information boundary beside each resource, not only in the footer.
- A download is not contact consent, a lead, client proof, a business case, an approved workflow, a service-readiness decision, an approved AI use or a guaranteed outcome.
- Direct visitors to use general, synthetic or appropriately de-identified examples.
- Do not activate download analytics until the approved analytics, consent and privacy approach exists. Never send workbook contents, free text, contact information or sensitive data to analytics.
- Do not present the lead magnets as case studies or verified client outcomes.

Verification:
1. Recalculate SHA-256 for the six files in apps/website/public/downloads and compare every value with 06-marketing/lead-magnets/RELEASE-MANIFEST.md. Stop and report any mismatch; do not silently replace a reviewed file.
2. Run npm.cmd run build from apps/website.
3. Test /resources and every resource placement on Home, Services, Disability Providers, Allied Health, AI Guardrails, About, FAQ and Contact.
4. Test all six downloads on desktop and a mobile viewport. Confirm correct file type/name, no email gate, useful accessible link labels and no horizontal-overflow or touch-target problem.
5. Confirm source/resource query context survives navigation to Contact without exposing it as sensitive analytics data.
6. Search for wording that treats a download as consent, proof, approval or tailored advice.
7. Report changed files, hash results, browser checks and whether the release gate is approved or still blocking deployment.

Do not deploy in this task.

Definition of done: the local site offers all three complete resources in the intended page journeys, all six files match the reviewed manifest, boundaries are adjacent and unambiguous, no email is required, and any still-open release approval is clearly reported.
```

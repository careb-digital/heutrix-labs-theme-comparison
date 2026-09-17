# Heutrix lead-magnet system

**Created:** 3 September 2026  
**Status:** version 1.0 approved for website release on 3 September 2026  
**Primary audience:** Australian disability support provider owners, executives and operations leaders  
**Secondary audience:** selected allied health practice owners and operations leaders

**Website integration decision:** The resource journeys, page placements and version 1.0 website release were approved on 3 September 2026. JD is the recorded review owner and boundary reviewer.

This folder turns the three lead-magnet recommendations in the August website launch review into practical, ungated resources that align with the September offer architecture.

The resources are designed to produce a useful decision before asking for contact details. They are educational operating tools, not proof of client outcomes and not substitutes for a scoped Heutrix engagement or qualified advice.

## Portfolio

| Resource | Reader decision | Working file | Guide | Natural paid bridge |
|---|---|---|---|---|
| 20-Minute Workflow Bottleneck Scorecard | Which one recurring workflow deserves evidence-backed attention first? | [Workbook](outputs/01a065e9-56af-7223-ae0d-257bfa651beb/workflow-bottleneck-scorecard.xlsx) | [PDF guide](output/pdf/workflow-bottleneck-scorecard-guide.pdf) | Heutrix Diagnostics when the priority or feasible option is unclear; Workflow Transformation when one bounded workflow is already clear. |
| Enquiry-to-Service-Start Visibility Starter Kit | What minimum fields, statuses and review rules make one intake or commencement path visible? | [Workbook](outputs/01a065e9-56af-7223-ae0d-257bfa651beb/enquiry-to-service-start-starter-kit.xlsx) | [PDF guide](output/pdf/enquiry-to-service-start-starter-kit-guide.pdf) | Workflow Transformation when integration, permission, handover or adoption gaps exceed a template. |
| AI Guardrails Staff Starter Pack | Can a proposed administrative AI use move toward approval, require review or stop pending review? | [Workbook](outputs/01a065e9-56af-7223-ae0d-257bfa651beb/ai-guardrails-staff-starter-pack.xlsx) | [PDF guide](output/pdf/ai-guardrails-staff-starter-pack-guide.pdf) | AI Guardrails when uses are widespread, ownership is unclear or staff cannot apply rules consistently. |

## Public distribution

The website-ready copies live in [`apps/website/public/downloads/`](../../apps/website/public/downloads/). Version 1.0 matches the approved source outputs and was verified on the public Worker on 3 September 2026. Future releases must repeat the source/distribution comparison before deployment.

- Give the PDF and workbook directly; do not require an email address to access their core value.
- If a visitor later requests a fit call, record the resource context separately from the download.
- Do not claim that a download, score, template or screening classification creates an approved workflow, business case, service-readiness decision, compliant process or approved AI use.
- Do not collect participant, patient, worker, clinical, credential or other personal or sensitive information through these resources or their follow-up path.

## Source and build

- [`build/build_workbooks.mjs`](build/build_workbooks.mjs) is the source for the three formula-driven workbooks.
- [`build/build_guides.py`](build/build_guides.py) is the source for the three branded PDF guides.
- [`_qa/`](./_qa/) contains rendered visual checks and compact formula-verification records.
- [`LEAD-MAGNET-OPERATING-STANDARD.md`](LEAD-MAGNET-OPERATING-STANDARD.md) controls ownership, publication, handoff and measurement.
- [`RELEASE-MANIFEST.md`](RELEASE-MANIFEST.md) records the approved version 1.0 files and matching source/distribution hashes.

## Release approval

Before publication, an accountable owner must:

1. approve the resource names, copy, workbook formulas and service bridges;
2. confirm the legal and professional-boundary wording is suitable for public use;
3. confirm the distributed files match the reviewed source outputs;
4. test all six downloads on desktop and mobile;
5. confirm download and fit-call attribution can be measured without unapproved tracking or data collection; and
6. record the approved version, date, owner and withdrawal trigger below.

| Version | Review owner | Boundary reviewer | Approval date | Website release | Withdrawal / next review |
|---|---|---|---|---|---|
| 1.0 | JD | JD | 3 September 2026 | Approved for website release | Review after any material offer, legal, privacy or AI-boundary change. |

## Interactive companions — 5 September 2026

Janith requested implementation of all three interactive lead magnets, restored referral/enquiry forms, and placeholder connections for Formtree or a calendar. The current source implementation and provider setup are documented in `LEAD-MAGNETS.md` in the canonical `heutrix-website` repository; the workspace `apps/website/` directory is preserved migration source. Results are generated locally and can be saved, copied or explicitly included in a reviewable consultation draft. The original version 1.0 PDFs/workbooks remain unchanged. The interactive AI check validates incomplete answers separately from the workbook formula. This implementation does not activate live collection, a scheduler or analytics.

**17 September Resources hierarchy:** The canonical `heutrix-website` application presents the three interactive companions as problem-first pathways. Workflow Bottleneck is the recommended primary starting point, followed by the Enquiry-to-Service-Start Planner and AI Guardrails Check. Each pathway has one dominant action. The six approved PDF and Excel files remain ungated, unchanged and available as contextual supporting downloads rather than equivalent top-level choices.

**5 September follow-up — mock submission:** Janith requested integrated mock requests. Explicit test submissions now go to a same-origin endpoint that validates and discards the payload, returning a labelled demo reference. No contact is stored, no email/referral is delivered and no call is booked. This supersedes the earlier draft-only interaction, not the requirement for a verified production destination.

## Current branding

The 16 September 2026 brand refresh updates the three workbooks, three PDF guides and matching local website downloads. Use the same paths above. The [release manifest](RELEASE-MANIFEST.md#brand-refresh--16-september-2026) records current hashes. The business content remains version 1.0; deployment evidence above describes the earlier public release.

# Recommended setup: implementation comparison

This compares the implemented workspace with the earlier recommendation for a launch-focused Heutrix folder and Codex setup.

## Founder collaboration update — 5 September 2026

The seven folder working guides, changes indexes, shared workflow/dependency map, native-file reservations, templates and Sales source relocation are implemented locally. Janith coordinates merges; permanent folder assignments remain unassigned by instruction. This is distinct from publishing a shared Git baseline or configuring remote protections, which remain open in [COLLABORATION-SETUP.md](../../00-control/COLLABORATION-SETUP.md). Earlier “implemented” folder entries below describe filesystem placement, not committed or remotely available content.

## Folder and governance setup

| Recommendation | Status | Notes |
|---|---|---|
| One root README and launch navigation | Implemented | `README.md` links to the working control records and each operating area. |
| Root `AGENTS.md` for business facts, guardrails and file placement | Implemented | Applies across the main repository; nested overrides can be added only when a workstream genuinely needs different instructions. |
| Expanded `.gitignore` | Implemented | Covers nested JavaScript builds, Python runtimes, caches, secrets and generated bundles. |
| `00-control` for launch board, decisions, facts, risks and map | Implemented | Includes a move manifest and this comparison. |
| Separate company, offer, sales, delivery, legal, marketing and finance areas | Implemented | Existing assets were placed in their relevant areas. |
| Reusable client project template without real client data | Implemented | Six-stage template created with handling rules. |
| Website under `apps/website` | Implemented | Source, config, dependencies and current build output moved together. |
| Internal reports separated from the public website | Implemented | Both report applications moved under `apps/internal-reports`. |
| Research and archive separated from current truth | Implemented | Legacy context, launch review and release archive are no longer loose at the root. |
| Permanent original-to-new path list | Implemented | See `MOVE-MANIFEST.md`. |

## Codex project and sidebar setup

| Recommendation | Current state | Still required |
|---|---|---|
| Use the Heutrix repository root as the primary Codex project. | Implemented | The saved **Heutrix Main Project** points to this Git root. |
| Maintain a dedicated Heutrix sidebar section. | Partly implemented | A **Heutrix** section exists and contains the main and legacy website projects. |
| Avoid two active Heutrix project roots. | Not implemented | The separate **Heutrix Website** project still points to the former website repository location. Decide whether to archive, retain only for history or consolidate its remaining work. |
| Keep tasks attached to the main project and organised by outcome. | Partly implemented | This restructuring task uses the main project, but many earlier Heutrix tasks and pinned tasks remain attached to the legacy website project. |
| Use one task per distinct outcome rather than one long mixed task. | Not yet established | Create tasks only when work begins: Launch Control; Website Conversion; Sales and CRM; Legal, Privacy and Risk; Delivery System; Marketing and Proof; Finance and Capacity. |
| Archive completed or superseded work after decisions/assets are captured. | Not implemented | Review old website, forecast, naming and audit tasks after their durable outputs are linked here. |

## Business readiness still outstanding

The folder setup is complete, but structure alone does not make the business launch-ready. The following earlier recommendations still require operational work:

- connect and test the website lead form;
- configure the scheduler, pipeline/CRM and analytics/consent path;
- approve business identity, public contact, founder trust layer and accountable roles;
- verify insurance, approved systems and data-handling procedures;
- obtain legal review and mark approved contractual/privacy masters;
- approve price bands, costs, margin floor and payment rules;
- reissue the pre–3 September legal/operations native packs; current controls, active text sources and the local website are reconciled, while historical reports remain explicitly superseded;
- approve delivery capacity, acceptance, defect, change and stabilisation rules;
- approve and publish one permissioned Heutrix case study or create an honest synthetic/sample proof asset, set the LinkedIn activation date and approve its first four weeks; and
- run a synthetic onboarding rehearsal and a complete website launch QA.

Use `LAUNCH-BOARD.md` as the execution queue and `RISKS-AND-BLOCKERS.md` as the release gate.

# Heutrix working instructions

## Read only what the task needs
Start with this file, the relevant workstream README and the target file or section. If already present in context, do not reread unchanged guidance. Use root README only to locate a workstream. Check git status and preserve unrelated changes.

For a routine edit, do not load every control register, linked source, historical report or task prompt. For scope, price, timeline, claim, identity, contract or data changes, search the relevant entries in `00-control/DECISIONS.md`, `VERIFIED-FACTS.md` and the workstream sources. Use `DEPENDENCIES.md` for affected-area review. Read launch/risk records for readiness or release decisions, and `COLLABORATION.md` for coordination or merging.

Search the smallest relevant directory; return filenames or matching lines before reading whole files. Ordinary `rg` honours `.rgignore`; use explicit paths or `--no-ignore` only when archived/generated evidence is needed. Do not dump recursive inventories or open native files together with every PDF/render of the same asset.

## Shared boundaries
- Workflow first, technology second. Launch audience: Australian disability support providers first, allied health second; GP clinics are future.
- Products: Heutrix Diagnostics, Heutrix Workflow Transformation (primary implementation product), Heutrix AI Guardrails.
- No public prices, starting ranges, pricing page or pricing CTA. Private written-scope quoting still needs approved commercial rules.
- No invented clients, credentials, business particulars, capabilities, results or legal/clinical/regulatory assurances. Synthetic examples must be labelled. Case-study attribution and publication permission are separate; use the current evidence and approval registers.
- No real client, participant, worker, health, payment, credential or other sensitive information in this repository. Keep secrets in approved credential systems. Live client work belongs outside Git; `08-client-project-template/` is only a reusable template.
- Legal and legacy Diagnostics native packs remain drafts until their review/reissue gates are satisfied. Existence, a successful build or a merge is not business approval.
- Australian English; direct, practical, privacy-aware voice.

## Authority and collaboration
Direct dated owner decisions take precedence, then verified current assets, approved strategy, historical evidence, AI recommendations and unadopted external results. Do not turn a proposal into a fact; record material conflicts in the relevant decision/risk register.

Janith coordinates merges; folder owners remain unassigned in `01-company/founders-and-roles/ROLE-REGISTER.md`. Proceed with already-authorised work. Use one review request or task handoff as the work record; create an additional dated brief only for multi-founder, multi-day or cross-folder coordination. Do not duplicate the same plan in several files.

For concurrent Office editing use `00-control/FILE-EDIT-REGISTER.md`: one acknowledged editor per native master. Shared-policy changes require affected-person review. Preserve the existing uncommitted migration and nested histories in `apps/internal-reports/`; do not silently flatten, reset or publish them.

## Verify the affected result
Keep source, draft, approved and issued states distinct. Update only the registers affected by new evidence or decisions. Check changed links and navigation after moves.
- Website: edit `apps/website/`; build with `npm.cmd run build`. Test affected routes/forms when behaviour changes; align affected public copy.
- Native documents/models: inspect the changed master and relevant export; run the applicable model audit, not an unrelated older report check.
- Folder/guidance changes: run `tools/collaboration/verify-structure.ps1`.
Report what changed, checks and remaining decisions. Do not generate extra reports or repeat successful checks without a new reason.

# Folder and context-efficiency audit
**Date:** 5 September 2026. **Scope:** the Heutrix workspace, including hidden prompt/configuration folders, seven business areas, client template, applications, tools, generated files and historical material. Other businesses in the parent directory were not changed.

## Result
The main avoidable reading cost was the mandatory instruction chain, not simply the number of files on disk. Before this refinement, a routine task was told to read nine shared files, then its folder guide and source. That shared set contained **55,421 characters**. The previous collaboration setup unnecessarily added full-register reading and a new brief for every small edit.

Routine work now starts with **AGENTS.md, one workstream README and the target file/section**. Shared policy, readiness and integration records are consulted when the task actually affects them. Important evidence and approval gates are retained.

| Workstream | Previous background characters | Refined background characters | Reduction |
|---|---:|---:|---:|
| Company | 57,503 | 4,887 | 92% |
| Market and offers | 57,649 | 5,208 | 91% |
| Sales | 57,418 | 4,969 | 91% |
| Delivery | 57,276 | 5,049 | 91% |
| Legal/privacy/risk | 57,295 | 4,999 | 91% |
| Marketing | 60,090 | 5,128 | 91% |
| Finance | 58,667 | 5,327 | 91% |

These are reproducible character counts of the prescribed repository background, excluding the task source. They are **not billed-token measurements or a promise of 91% lower total usage**. Conversation history, system instructions, skills, tool output, source reading and reasoning also affect usage. Policy or release tasks still need the applicable wider evidence.

## Coverage and findings
The initial inventory enumerated **96,874 files** with no traversal errors. It classified all paths and sizes and hashed non-runtime/non-Git/non-metadata files. Markdown sizes and headings, current source routes, duplicated content, prompt read instructions and cross-folder dependencies were inspected. This was a structural/context audit, not a new legal, financial or factual approval audit of every document.

| Area | Finding and treatment |
|---|---|
| Root and control | Long repeated startup instructions and a 19,502-character historical recommendation in active control. Shortened startup and collaboration guidance; moved the old recommendation and implementation comparison to historical reference with pointers. Kept distinct decision, fact, risk and launch records because they answer different questions. |
| Company | Small useful identity/system/insurance registers; repeated collaboration text in the guide. Condensed the guide and preserved the role register. Janith still coordinates merges; all seven folder owners remain unassigned. |
| Market and offers | Current specifications, policy and validation records are useful; market-fit research and website-ready strategy copy are supporting references. Added direct task routes rather than requiring the entire offer/research pack. Preserved assumptions and decision evidence. |
| Sales | One 56,422-character specification mixed calls, CRM, messaging and release gates. Split into 14 sections behind a 1,818-character index. Kept the small lead/pipeline/proposal entry files as useful task routes. |
| Delivery | Useful methods and draft native packs coexist with temporary unpacked/build content and QA renders. Preserved drafts and evidence, excluded generated material from ordinary search, and shortened the entry guide. Native pack reissue remains a separate open task. |
| Legal/privacy/risk | Useful review/data registers and draft contracts coexist with a large temporary document-build tree. Kept masters and approval evidence; excluded temporary/generated material from search. No document acquired legal approval through this cleanup. |
| Marketing | Largest working Markdown concentration. Split the 74,392-character visual library into 30 sections and the 41,482-character founder pack into nine sections. Separated shared website/release copy from the page index. Changed LinkedIn startup from a whole-library reading sequence to task selection. Archived the superseded case-study directory; retained the current 15 cases and evidence gates. |
| Finance | Current integrated workbook is clearly selected; older model/report outputs are already superseded. Kept them as evidence but removed the need to open them for current model work. Preserved workbook and audit-tool distinctions. |
| Client template | Small, useful stage guides; retained. Remains an empty structure for use outside Git with live clients. |
| Applications | Preserved website source, distribution assets and nested historical repositories. Excluded historical report apps and build/dependency trees from ordinary search. |
| Tools and generated files | Initial runtime/build classification held 90,172 files; a further 3,108 entries were temporary/build-pack contents. These are not business reading sources. Retained them to avoid breaking working environments; search rules exclude them. |
| Prompt library | Corrected the legacy website-project route and broad startup wording in eight prompt/index files. Historical complete-release prompts are explicitly reference-only for small edits. Current source and requested scope control reuse. |
| OS metadata | 143 AppleDouble/OS metadata files contribute no business context. Excluded from search; left untouched because deleting them would not materially reduce reading beyond exclusion. |
| History and archives | Retained evidence and prior work. Historical narratives do not belong in the default task-reading sequence. Original text snapshots of refinements are available here for traceability and are excluded from ordinary search. |

## Redundancy versus necessary copies
The inventory found **73 exact duplicate-content groups**. Six groups are the approved lead-magnet outputs and matching website download copies. Another is the historical launch audit and its report application's data source. The remaining groups are non-Markdown/non-Office/non-PDF duplicates in supporting/generated content. These are not seven competing operating masters.

The six website copies were retained because the deployed application needs them; the release manifest already verifies the relationship. Native files, exported PDFs and visual QA are different representations with different purposes, not automatically redundant records to delete. Ordinary tasks should read the source and inspect only the relevant export when validation requires it.

Avoidable duplication was removed from active guides and task recording. A small edit now uses its existing review/task handoff. A separate brief is reserved for sustained or shared coordination. Small navigation pointers remain intentionally so prior links still lead to the current material.

## Preservation and verification
The three split documents can be reconstructed exactly from their saved sections after reversing necessary relative-link rebasing. Their largest sections are 9,116, 12,754 and 7,845 characters respectively; they are selected on demand rather than read together. No source section was discarded.

Checks cover active Markdown paths, required founder guides, referenced headings, current assignments, source reconstruction, and hashes of **217 pre-existing native/export/QA/application files**. Their contents were unchanged. The archived case studies and nested Git histories are retained. Remote accounts, branches, access controls, deployment and publishing were not changed.

The current check results, including any failure details, are in [verification.json](verification.json). Re-run from the Heutrix root:

Final checkpoint: **227 active Markdown files and 491 local path links checked, no broken paths; 34 archived source files preserved; 217 protected assets unchanged; all three source reconstructions passed.** The founder structure check also passed its 42 required files and 269 local links/referenced headings. Default search returned 229 working paths with none of the tested generated, metadata or historical noise patterns. These counts describe the audit checkpoint, not a permanent target file count.

```powershell
& ./tools/collaboration/verify-structure.ps1
node tools/collaboration/verify-context.mjs
```

## Using the refined structure
1. Open the relevant folder README and selected source. Do not follow every link as a mandatory reading list.
2. For a large pack, open its index, the shared context once, and the required section only.
3. Search a narrow folder first. Normal `rg` searches use `.rgignore` to omit history and generated noise; explicitly open those paths when evidence is needed. Positive include globs can override file exclusions, so avoid indiscriminate `-g '*.md'` scans.
4. For changes to promises, prices, contracts, data or readiness, consult the relevant authoritative entries and affected people. Reduced reading does not remove these reviews.
5. Preserve one working master and one work record. Do not recreate a whole model, campaign or process because an old prompt asks for the original deliverable.

OpenAI documents that applicable `AGENTS.md` files are included as repository instructions; they should contain concise working rules. Ordinary library files are not all automatically included merely because they exist. Existing long conversations also retain earlier context, so a fresh task for a distinct new outcome can make use of the shorter starting path. [Official instruction discovery documentation](https://learn.chatgpt.com/docs/agent-configuration/agents-md).

## Evidence files
- [Initial inventory](before/inventory.json) and [summary](before/summary.json).
- [Structural changes and split manifest](changes.json).
- [Exact prompt edits](prompt-guidance-review.json).
- [Original text snapshots](original-text/) — historical recovery material, not current instructions.
- [Verification and reading comparison](verification.json).

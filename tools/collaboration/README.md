# Collaboration structure check

From the Heutrix root, run:

```powershell
& ./tools/collaboration/verify-structure.ps1
```

The check verifies required collaboration files, seven folder guides/change indexes, local Markdown link destinations (and heading anchors when present), central ownership status, and the single Sales process location. It exits with an error if a check fails. It is read-only.

It does not check external URLs, remote permissions, actual reviewer approval, business truth, Office contents or a successful multi-founder merge. Those require the evidence listed in the [rollout checklist](../../00-control/COLLABORATION-SETUP.md). Deliberately unassigned owners are permitted and reported as pending assignments.

For the 5 September context audit, `node tools/collaboration/verify-context.mjs` checks the active Markdown paths, preserved section text, unchanged native/application assets and before/after background-reading sizes. `audit-workspace.mjs OUTPUT_DIRECTORY` is a full inventory tool; run it only for an explicit whole-workspace audit, not a routine task.

The context check compares against the dated audit baseline. Later intentional content changes may differ from that baseline; they require their own review rather than blindly restoring the old text. The structure check is the routine navigation check.

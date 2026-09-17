---
asset_type: case_study
proof_type: anonymised_founder_delivery
source_status: artefact_reviewed
publication_status: editorial_draft_permission_required
audience: Australian disability support providers
product: Heutrix Workflow Transformation
last_updated: 2026-09-04
---

# Invoice discrepancies gained an exception path instead of an email debate

> **Anonymised founder-delivery experience.** This story is drawn from operational work completed by Heutrix founders in a prior care-provider role, before Heutrix began formal operations. It is not a Heutrix client engagement. The organisation is withheld pending publication approval.

An invoice could look complete and still disagree with the hours or kilometres captured in QuickBooks. Finding the mismatch was only half the job; the team also needed a consistent way to investigate, return and resolve it.

| Starting point | Founder-built intervention | Operating effect |
|---|---|---|
| Differences were found through manual comparison and resolved through ad hoc contact | A defined discrepancy decision, worker-notification route and reconciliation view | Normal invoices and exceptions could follow different, visible paths |

## The real constraint

A variance is not automatically an error. It may reflect timing, coding, missing data or a legitimate difference that requires context. An automated comparison can surface the exception, but a person still needs to decide what it means and what happens next.

## What the founders built

The future-state process placed a discrepancy decision between submission and payment:

1. compare submitted invoice hours and kilometres with QuickBooks time records;
2. surface the relevant variance rather than asking accounts to inspect every line equally;
3. if clarification or correction is required, notify the worker and reopen the invoice sheet;
4. retain the normal path for items that pass review; and
5. lock the relevant sheet after payment is processed.

The related Power BI report included dedicated variance fields and views for submitted hours, submitted kilometres and QuickBooks totals. This connected the process decision to a practical investigation surface.

## The operating result

Reconciliation became an exception-led workflow. The system helped accounts find where attention was needed, while the resolution remained a human-owned decision. Workers had a defined correction route instead of an informal request detached from the source file.

## Evidence and limits

The process map, invoice workbooks and Power BI report definitions were reviewed directly. They support the comparison and exception workflow. This case does not claim that every variance was resolved correctly, that the sources were complete or that the solution guaranteed payment accuracy.

## How Heutrix would deliver this today

Heutrix would agree the authoritative sources, join keys, tolerance rules, exception owner, correction path and closure evidence. Synthetic cases would cover an exact match, hours variance, kilometre variance, missing source record, duplicate invoice and approved exception before the workflow was handed over.

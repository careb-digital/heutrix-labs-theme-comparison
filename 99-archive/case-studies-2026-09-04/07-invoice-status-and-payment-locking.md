---
asset_type: case_study
proof_type: anonymised_founder_delivery
source_status: process_artefact_reviewed_implementation_owner_attested
publication_status: editorial_draft_permission_required
audience: Australian disability support providers
product: Heutrix Workflow Transformation
last_updated: 2026-09-04
---

# A submitted invoice became a controlled state—not a mutable attachment

> **Anonymised founder-delivery experience.** This story is drawn from operational work completed by Heutrix founders in a prior care-provider role, before Heutrix began formal operations. It is not a Heutrix client engagement. The organisation is withheld pending publication approval.

Email can prove that a file was sent. It does not automatically prove which version was reviewed, whether it changed afterwards or when it should stop being editable.

| Starting point | Founder-built intervention | Operating effect |
|---|---|---|
| “Submitted” lived in an email while the source workbook could continue changing | Status automation, post-submission change notification and locking after payment | Review and edit rights followed the invoice’s operating state |

## The real constraint

The source workbook was useful precisely because it remained editable during preparation. That flexibility became a control problem once accounts began reviewing it.

The workflow needed separate states for preparation, submission, discrepancy correction and payment—not one broad “done” label.

## What the founders built

The mapped solution introduced state around the file:

- the worker completed the assigned pay-cycle sheet;
- submission triggered a “done” state for the invoice sheet;
- a later edit generated a notification;
- accounts reviewed the submitted version and either progressed it or opened a discrepancy path;
- a worker could regain editing access when correction was required; and
- after payment, the pay-cycle sheet was locked against further edits.

The design treated the workbook as the working record and the workflow state as the control layer around it.

## The operating result

Accounts could distinguish an invoice being prepared from one submitted for review, reopened for correction or closed after payment. Workers had a defined route for legitimate changes. The process made version risk visible instead of relying on someone to notice that a file had changed.

## Evidence and limits

The process board records the status, notification, reopening and locking design. The owner confirms that the founders implemented the solution, but no flow export or operational event log was available for independent review. The case makes no claim about payment accuracy, fraud prevention, system uptime or error reduction.

## How Heutrix would deliver this today

Heutrix would define the state model, edit permissions, event history, exception authority, failure alerts and retention rules before configuration. Acceptance would test submit, post-submit edit, discrepancy reopening, corrected resubmission, payment lock and attempted unauthorised change using synthetic invoices.

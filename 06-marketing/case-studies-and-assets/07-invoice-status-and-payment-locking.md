---
asset_type: case_study
proof_type: anonymised_heutrix_delivery
source_status: process_artefact_reviewed_client_feedback_supported
publication_status: owner_approved_for_publication_2026_09_05
metric_status: approximate_operating_estimate
audience: Australian disability support providers
product: Heutrix Workflow Transformation
last_updated: 2026-09-05
---

# A submitted invoice became a controlled state—not a mutable attachment

> **Anonymised Heutrix case study.** Heutrix delivered this solution for an Australian disability support provider. The organisation is not named, and no identifying source material is included.

Email can prove that a file was sent. It does not automatically prove which version was reviewed, whether it changed afterwards or when it should stop being editable.

| Starting point | Heutrix delivery | Operating effect |
|---|---|---|
| “Submitted” lived in an email while the source workbook could continue changing | Status automation, post-submission change notification and locking after payment | Review and edit rights followed the invoice’s operating state |

## The real constraint

The source workbook was useful precisely because it remained editable during preparation. That flexibility became a control problem once accounts began reviewing it.

The workflow needed separate states for preparation, submission, discrepancy correction and payment—not one broad “done” label.

## What Heutrix delivered

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

## Approximate operating impact

- **Operational coverage:** 4 explicit invoice states: preparation, submitted review, discrepancy correction and post-payment closure.
- **Indicative efficiency:** Approximately 10–20 minutes less version checking and corrective administration for each invoice requiring follow-up.

The efficiency range is an estimate based on the status checks and version-reconstruction steps replaced by the delivered state model. Client feedback supports that the status and locking controls operated as intended.

## Evidence and limits

The process board records the status, notification, reopening and locking design, and client feedback supports its practical operation. No flow export or operational event log was independently reviewed. The case therefore makes no claim about payment accuracy, fraud prevention, system uptime or a measured error-reduction rate.

## Related Heutrix offering

This delivery is an example of [Heutrix Workflow Transformation](../website-copy/services.md#heutrix-workflow-transformation): Heutrix added an explicit state model, permissions and exception path around an existing workbook. Current scopes define state, edit rights, event history, exception authority, failure alerts, retention and acceptance tests.

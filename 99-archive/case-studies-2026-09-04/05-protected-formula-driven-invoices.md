---
asset_type: case_study
proof_type: anonymised_founder_delivery
source_status: artefact_reviewed
publication_status: editorial_draft_permission_required
audience: Australian disability support providers
product: Heutrix Workflow Transformation
last_updated: 2026-09-04
---

# Formula-driven invoices protected the numbers that should not be free-typed

> **Anonymised founder-delivery experience.** This story is drawn from operational work completed by Heutrix founders in a prior care-provider role, before Heutrix began formal operations. It is not a Heutrix client engagement. The organisation is withheld pending publication approval.

An invoice workbook needs two things that pull in opposite directions: workers must be able to enter legitimate shift information, while calculation and reference fields need protection from accidental changes.

| Starting point | Founder-built intervention | Operating effect |
|---|---|---|
| Users needed flexibility, but free-form editing could alter key totals and references | Formula-driven invoice sheets with validation, named fields and protected calculation areas | Editable inputs and controlled outputs were separated inside the same familiar workbook |

## The real constraint

Lock the whole file and the worker cannot complete the invoice. Leave every cell open and a small edit can change a total, invoice number or rate calculation without being obvious.

The solution needed a clear boundary between information the user should supply and logic the workbook should control.

## What the founders built

The workbook used formula cells, validated inputs and reusable named fields for items such as the pay cycle, invoice number, contractor details, claimed hours, reimbursements and totals. The process design also called out:

- protected template and rate areas;
- protected total cells;
- hidden invoice-number references;
- formula-driven weekend-rate calculations;
- guidance on editable and non-editable fields; and
- a final workbook-protection step before release.

The inspected master files contain multiple protected sheets, data-validation rules and formula-heavy invoice tabs. The controls were embedded in the tool staff already used rather than requiring a separate application for every entry.

## The operating result

Workers retained a practical way to enter their invoice information. Accounts retained a more consistent structure for totals and reference fields. The workbook made the intended editing boundary visible and technically enforceable in the areas that had been configured.

## Evidence and limits

Two master workbooks and the source process map were reviewed. They verify the formula, validation and sheet-protection design. They do not prove every rate was correct, prevent all user error or establish payroll, tax or award compliance. Those decisions require authoritative rules, controlled testing and accountable review.

## How Heutrix would deliver this today

Heutrix would document the calculation owner, authoritative rate source, editable cells, protected cells, change process and acceptance cases. A synthetic test pack would cover ordinary hours, weekend entries, kilometres, reimbursements, blank inputs, altered formulas and attempted edits to locked areas before handover.

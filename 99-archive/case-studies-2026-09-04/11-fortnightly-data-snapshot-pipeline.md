---
asset_type: case_study
proof_type: anonymised_founder_delivery
source_status: operating_artefacts_reviewed
publication_status: editorial_draft_permission_required
audience: Australian disability support providers
product: Heutrix Workflow Transformation
last_updated: 2026-09-04
---

# A year of fortnightly snapshots made reconciliation repeatable

> **Anonymised founder-delivery experience.** This story is drawn from operational work completed by Heutrix founders in a prior care-provider role, before Heutrix began formal operations. It is not a Heutrix client engagement. The organisation is withheld pending publication approval.

A useful dashboard needs more than good visuals. It needs the same source process to run again at the next pay cycle—and the cycle after that—without quietly changing the shape of the data.

| Starting point | Founder-built intervention | Operating effect |
|---|---|---|
| Reconciliation risked becoming a one-off report-building exercise | A pay-period structure with recurring timesheet and payroll snapshots feeding the reporting model | Each fortnight entered the analysis through a repeatable evidence trail |

## The real constraint

Operational reporting often fails between refreshes. A local export is renamed, a period boundary changes, a field moves or the new file is stored somewhere the report cannot find it.

The workflow therefore needed to define not only the dashboard, but also how each pay period was identified, extracted and retained.

## What the founders built

The reviewed source library contained:

- a pay-period reference extract;
- recurring QuickBooks timesheet snapshots;
- recurring payroll snapshots;
- a user snapshot; and
- a cloud-connected Power BI report using aligned pay-cycle, worker and reconciliation entities.

Twenty-six timesheet snapshots and twenty-six payroll snapshots were present across approximately one operating year. The report model used those recurring inputs to support invoice, hours, kilometre and variance analysis.

## The operating result

The reporting solution had a repeatable source trail rather than only a finished dashboard file. A reviewer could identify the relevant cycle and the associated snapshots. The structure also made it possible to investigate refresh or period issues without starting from an undifferentiated folder of exports.

## Evidence and limits

The snapshot directories, file sequence and Power BI package were inspected without copying worker, client or invoice records into this repository. Their presence supports repeated operation over the observed period. It does not prove that every cycle refreshed successfully, that the exports were complete or that the data was accurate.

## How Heutrix would deliver this today

Heutrix would document the authoritative source, extraction owner, period rule, naming convention, schema checks, failure alert, retention period and refresh responsibility. Synthetic snapshots would test missing files, changed columns, duplicate periods, partial extracts and failed refreshes before handover.

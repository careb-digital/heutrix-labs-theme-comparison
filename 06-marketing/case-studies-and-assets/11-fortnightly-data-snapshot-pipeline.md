---
asset_type: case_study
proof_type: anonymised_heutrix_delivery
source_status: operating_artefacts_reviewed_client_feedback_supported
publication_status: owner_approved_for_publication_2026_09_05
metric_status: approximate_operating_estimate
audience: Australian disability support providers
product: Heutrix Workflow Transformation
last_updated: 2026-09-05
---

# A year of fortnightly snapshots made reconciliation repeatable

> **Anonymised Heutrix case study.** Heutrix delivered this solution for an Australian disability support provider. The organisation is not named, and no identifying source material is included.

A useful dashboard needs more than good visuals. It needs the same source process to run again at the next pay cycle—and the cycle after that—without quietly changing the shape of the data.

| Starting point | Heutrix delivery | Operating effect |
|---|---|---|
| Reconciliation risked becoming a one-off report-building exercise | A pay-period structure with recurring timesheet and payroll snapshots feeding the reporting model | Each fortnight entered the analysis through a repeatable evidence trail |

## The real constraint

Operational reporting often fails between refreshes. A local export is renamed, a period boundary changes, a field moves or the new file is stored somewhere the report cannot find it.

The workflow therefore needed to define not only the dashboard, but also how each pay period was identified, extracted and retained.

## What Heutrix delivered

The reviewed source library contained:

- a pay-period reference extract;
- recurring QuickBooks timesheet snapshots;
- recurring payroll snapshots;
- a user snapshot; and
- a cloud-connected Power BI report using aligned pay-cycle, worker and reconciliation entities.

Twenty-six timesheet snapshots and twenty-six payroll snapshots were present across approximately one operating year. The report model used those recurring inputs to support invoice, hours, kilometre and variance analysis.

## The operating result

The reporting solution had a repeatable source trail rather than only a finished dashboard file. A reviewer could identify the relevant cycle and the associated snapshots. The structure also made it possible to investigate refresh or period issues without starting from an undifferentiated folder of exports.

## Approximate operating impact

- **Operational coverage:** 52 recurring source snapshots—26 timesheet and 26 payroll files—across approximately one operating year.
- **Indicative efficiency:** Approximately 1–2 hours less source preparation and historical reconstruction effort per fortnightly refresh.

The efficiency range is an estimate based on the recurring extraction, naming and period-alignment work standardised by the delivered pipeline. Client feedback confirms that the refresh process operated automatically.

## Evidence and limits

The snapshot directories, file sequence and Power BI package were inspected without copying worker, client or invoice records into this repository. Their presence supports repeated operation over the observed period, and client feedback confirms that refreshes occurred automatically. Refresh logs and record-level contents were not independently reviewed, so this case does not guarantee that every export was complete or that every source record was accurate.

## Related Heutrix offering

This is a [Heutrix Workflow Transformation](../website-copy/services.md#heutrix-workflow-transformation) case because the delivered result included the recurring source process as well as the report. Current scopes define the authoritative source, extraction owner, period rule, naming, schema checks, failure alerts, retention and refresh responsibility.

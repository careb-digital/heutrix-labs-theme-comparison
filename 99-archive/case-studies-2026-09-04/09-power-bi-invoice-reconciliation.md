---
asset_type: case_study
proof_type: anonymised_founder_delivery
source_status: built_artefact_reviewed
publication_status: editorial_draft_permission_required
audience: Australian disability support providers
product: Heutrix Workflow Transformation
last_updated: 2026-09-04
---

# One Power BI report brought invoices and QuickBooks time into the same conversation

> **Anonymised founder-delivery experience.** This story is drawn from operational work completed by Heutrix founders in a prior care-provider role, before Heutrix began formal operations. It is not a Heutrix client engagement. The organisation is withheld pending publication approval.

Accounts had two legitimate views of the same pay cycle: the hours and kilometres a contractor submitted, and the activity recorded in QuickBooks. Reviewing them separately made it difficult to see where the figures agreed and where investigation was needed.

| Starting point | Founder-built intervention | Operating effect |
|---|---|---|
| Invoice and time-record totals lived in separate sources | A cloud-connected Power BI reconciliation report with shared filters, comparison fields and variance views | Reviewers could move from the overall cycle to the specific worker, client or measure needing attention |

## The real constraint

A dashboard would have been decorative if the underlying fields were not aligned. The founders first needed a common model for pay cycle, worker, client, hours, kilometres, invoice amount and variance.

The management question was not “How many charts can we build?” It was “Where do submitted and recorded activity differ, and what should be investigated?”

## What the founders built

The Power BI report contained dedicated pages for:

- invoices compared with QuickBooks timesheets;
- variances between the two sources;
- invoice totals and superannuation components;
- hours and kilometres by client;
- hours and kilometres by worker; and
- fortnightly hours and kilometre trends.

Cards, slicers, tables and charts supported both a quick cycle-level view and a more detailed investigation. The current report package was connected to a cloud Power BI dataset rather than being only a static local visual.

## The operating result

The report created one review surface around the recurring reconciliation questions. Accounts could filter the same model instead of rebuilding comparisons in separate files. Leadership could see the shape of the cycle without receiving raw operational records by email.

## Evidence and limits

Multiple Power BI report versions were reviewed, including the current cloud-connected package. The page definitions, visuals, fields and data entities support the capabilities described here. No before-and-after timing, error-rate reduction or financial benefit was available, and the report does not itself validate the accuracy of either source system.

## How Heutrix would deliver this today

Heutrix would confirm the data owner, refresh path, measure definitions, access groups, exceptions and acceptance thresholds before build. A reconciled synthetic pay cycle would test filters, totals, missing records, duplicates, negative values and role-based access before operational use.

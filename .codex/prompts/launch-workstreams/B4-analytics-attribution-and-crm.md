# B4 — Install analytics, attribution and CRM stages

**Recommended environment:** Codex  
**Priority:** Launch blocker  
**Dependency:** B1 conversion flow and chosen analytics/CRM tools.

## Copy this prompt into a new chat

```text
Own measurement implementation for the Heutrix Labs website. Work in the current Heutrix repository. Read the control registers and current conversion implementation first; use Phase 18 of HEUTRIX-LABS-LAUNCH-REVIEW.md as historical context, and treat confirmed business outcomes—not button clicks—as conversions.

Goal: create a privacy-conscious measurement system that connects traffic source → website behaviour → lead → booked/attended fit call → proposal → customer → revenue/gross profit.

Tasks:
1. Write a concise measurement specification defining session, lead, qualified lead, booking, attended call, proposal, customer, revenue, CAC and gross profit.
2. Confirm the chosen analytics and CRM tools. If absent, present a minimal recommended stack and ask for the one decision needed before implementation.
3. Implement consistent events for primary CTA click, service/resource interaction, form start, validation error, submission success/failure, calendar view, confirmed booking, reschedule/cancel, email/phone click where used, and lead source capture.
4. Persist first-touch and last-touch source/medium/campaign plus landing page into the lead/CRM record. Handle UTMs without collecting sensitive care information.
5. Define CRM stages and reason codes for no-fit, no-show, lost proposal and closed project.
6. Prevent duplicate events and exclude internal/test traffic where feasible. Do not log form field values or patient/participant information to analytics.
7. Add a production verification method and a simple owner-facing weekly scorecard for the five initial metrics in Phase 18.
8. Document consent/cookie implications for the exact tools selected and flag them for the privacy workstream.

Do not fabricate baseline conversion rates, targets or historical data. Do not add advertising pixels before approval and privacy review. Preserve unrelated changes.

Deliverables:
- Event and metric dictionary.
- Implemented tracking and tests/debug verification.
- CRM stage/source mapping.
- A 30-day scorecard template with formulas.
- Production QA checklist and data-quality caveats.

Definition of done: the owner can trace a confirmed lead and booking back to a source and landing page, distinguish qualified from unqualified leads, monitor show/close outcomes, and calculate qualified CPL/CAC without counting mere clicks as customers.
```

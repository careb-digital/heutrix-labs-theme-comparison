# B1 — Build a real lead-submission and booking path

**Recommended environment:** Codex  
**Priority:** Launch blocker  
**Dependency:** Decide which CRM, email service and scheduler Heutrix will use.

## Copy this prompt into a new chat

```text
Act as the implementation owner for the Heutrix Labs website conversion path. Work in the current Heutrix repository and inspect only the applicable control entries, current application and live website before changing anything; treat HEUTRIX-LABS-LAUNCH-REVIEW.md as historical evidence. The local form now truthfully reports that it cannot send; connecting and verifying the real lead path remains the highest-priority launch blocker.

Goal: implement and verify a truthful, production-ready path from website CTA → form or scheduler → server acknowledgement → CRM/lead record → internal notification → visitor confirmation → fit-call booking/follow-up.

Requirements:
1. First document the current flow and confirm the failure in the source. Do not submit real patient, participant or sensitive care information.
2. Identify the smallest appropriate architecture using the owner's chosen CRM/email/scheduler. If that choice is missing and materially changes the build, ask one concise decision question with 2–3 viable options and a recommendation.
3. Make CTA language match the action. “Book” must open a real scheduling flow; otherwise use “Request a workflow fit call.”
4. Minimise fields. Collect business contact and workflow-fit information only; explicitly tell visitors not to enter patient or participant information.
5. Add server-side validation, secure configuration through environment variables, duplicate/spam controls, rate limiting where appropriate, and useful internal logging without exposing form data.
6. Show success only after confirmed server receipt. Preserve entered data on recoverable failure and provide a monitored email fallback.
7. Carry service/sector selection and source/UTM data into the lead record.
8. Add confirmation messaging that states response time, what happens next, caller identity if verified, and rescheduling/booking expectations.
9. Test the complete path in proportion to risk, including success, validation failure, network/backend failure, duplicate submission, mobile behaviour and keyboard use. Do not send external test messages or mutate production systems without explicit authority.

Do not invent vendor accounts, response SLAs, phone numbers, team identities or availability. Preserve unrelated user changes.

Deliverables:
- Working implementation and relevant automated tests.
- A short conversion-flow diagram and configuration checklist.
- A production test script covering lead receipt, CRM creation, alerts, confirmation and booking.
- A list of manual account/vendor steps the owner must complete.
- Final handoff stating files changed, tests run, verified behaviour, remaining risks and whether this blocker is cleared.

Definition of done: a test lead can be submitted without sensitive information; receipt is confirmed by the server; the lead reaches its intended destination; the visitor gets accurate next-step messaging; failures are visible and recoverable; and no false success state remains.
```

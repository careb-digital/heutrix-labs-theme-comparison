# 9. CRM and analytics specification

## 9.1 Keep three concepts separate

1. **Lead lifecycle** records the person's journey from request to outcome.
2. **Opportunity stage** begins only when a paid next step is genuinely being considered.
3. **Activity/event status** records bookings, reminders, attendance and messages without distorting pipeline stage.

## 9.2 Lead lifecycle statuses

| Status | Entry definition | Required next action |
|---|---|---|
| New Request | Server-confirmed form receipt; no time booked. | Owner review and response deadline. |
| Booking Pending | Fit appears plausible and scheduling is offered, or visitor opened calendar without confirming. | Booking link/task; do not call this booked. |
| Booked | Scheduler-confirmed event and booking ID exist. | Send confirmation/reminders. |
| Rescheduled | Existing event moved; current booking remains active. | Update CRM booking fields and reminders. |
| No Show — Rebook Pending | Caller attended but prospect did not. | Send rebook message and close task. |
| Attended — Outcome Pending | Call completed; outcome not yet recorded. | Set route before end of business day where practical. |
| Information Needed | One bounded fact set is required to determine route. | Await facts; close or reroute on due date. |
| Nurture | Valid potential need; not ready. | Set reason, consent basis and review date. |
| No Fit | No paid Heutrix path is recommended. | Set reason and close the lead. |
| Converted | A genuine paid opportunity exists. | Link opportunity and preserve source. |

## 9.3 Opportunity stages

| Stage | Definition | Exit evidence |
|---|---|---|
| Qualified — Heutrix Diagnostics | Diagnostics is the recommended paid path. | Proposal issued or decision not to proceed. |
| Qualified — Workflow Transformation | Workflow Transformation scoping is supported. | Proposal issued, rerouted to Diagnostics or no-go. |
| Qualified — AI Guardrails | AI Guardrails scoping is supported. | Proposal issued or no-go. |
| Proposal Preparing | Heutrix is producing a written commercial scope. | Proposal sent date and version. |
| Proposal Sent | Prospect received the proposal. | Review outcome or agreed next date. |
| Decision Pending | Proposal is accurate and buyer-side decision remains. | Signed/accepted, declined or closed after the agreed process. |
| Closed Won | Written agreement and required commencement condition are met. | Record value, expected gross profit and start condition/date. |
| Closed Lost | Buyer declined or process closed without agreement. | Primary loss reason and close note. |

Do not place every attended call into an opportunity. No-fit, nurture and information-needed leads remain outside the paid pipeline until a real commercial path exists.

## 9.4 Minimum CRM fields

### Identity and contact

- `lead_id`
- `created_at`
- `contact_name`
- `work_email`
- `phone` — only when needed for an approved phone path
- `organisation_name`
- `sector`
- `contact_role_group`
- `contact_consent_at`
- `marketing_consent_at` — nullable and separate

### Qualification

- `workflow_summary`
- `workflow_category` — intake/referral; reporting; evidence/documents; visibility; AI guardrails; other
- `workflow_participant_band`
- `current_tools_summary`
- `urgency_band`
- `decision_context`
- `workflow_owner_status` — named; can involve; absent; unknown
- `decision_maker_status` — attendee; involved; can involve; absent; unknown
- `commercial_range_fit` — yes; possible; no; not asked
- `problem_fit_gate`
- `boundary_gate`
- `operational_value_gate`
- `people_decision_gate`
- `access_feasibility_gate`
- `commercial_timing_gate`
- `qualification_confidence` — high; medium; low

### Safety and handling

- `sensitive_data_confirmation_at`
- `sensitive_data_incident_flag`
- `sensitive_data_remediation_status`
- `privacy_owner_task_id`

Never copy sensitive content into notes to explain the flag.

### Attribution

- `first_touch_source`, `first_touch_medium`, `first_touch_campaign`
- `first_touch_landing_page`
- `last_touch_source`, `last_touch_medium`, `last_touch_campaign`
- `last_touch_landing_page`
- `referrer`
- `selected_starting_point`
- `cta_location`

### Booking and call

- `booking_id`
- `booking_created_at`
- `scheduled_start_at`
- `booking_timezone`
- `call_channel`
- `caller_owner`
- `reschedule_count`
- `cancelled_at`
- `attended_at`
- `no_show_at`
- `help_call_outcome`
- `outcome_set_at`
- `follow_up_due_at`
- `follow_up_sent_at`
- `nurture_review_date`

### Commercial

- `recommended_route`
- `opportunity_id`
- `offer_type`
- `proposal_sent_at`
- `proposal_value_ex_gst`
- `proposal_version`
- `decision_due_at`
- `closed_at`
- `closed_reason_primary`
- `closed_reason_secondary`
- `contracted_revenue_ex_gst`
- `expected_gross_profit`
- `actual_revenue_ex_gst`
- `actual_gross_profit`

## 9.5 Reason-code dictionary

Use one primary reason and, where useful, one secondary reason. Keep the display label stable even if explanatory notes change.

### No-fit / no-build

| Code | Display label |
|---|---|
| `NF_SECTOR` | Sector outside current focus |
| `NF_ADVISORY` | Legal, clinical, audit, registration or regulatory advice required |
| `NF_PLATFORM_REPLACEMENT` | Whole-platform replacement required |
| `NF_ACCOUNTABLE_DECISION` | Request would remove accountable human judgement |
| `NF_NO_OWNER` | No workflow owner or approval path |
| `NF_ACCESS` | Required access or participation unavailable |
| `NF_TOO_SMALL` | Insufficient recurring value for paid work |
| `NF_TOO_BROAD` | Scope exceeds a bounded first engagement |
| `NF_ENTERPRISE_CAPABILITY` | Enterprise procurement, security, rollout or support need not evidenced |
| `NF_TECH_CAPABILITY` | Tool, integration or technical capability outside verified scope |
| `NF_GEOGRAPHY` | Service geography or onsite need outside approved coverage |
| `NF_NO_BUILD` | Process/tool clarification is more appropriate than a build |
| `NF_SENSITIVE_HANDLING` | Required information-handling approach cannot be supported |
| `NF_OTHER` | Other — note required |

### Nurture

| Code | Display label |
|---|---|
| `NU_TIMING` | Priority is later |
| `NU_BUDGET_CYCLE` | Budget cycle not ready |
| `NU_INTERNAL_ALIGNMENT` | Internal alignment needed |
| `NU_DECISION_MAKER` | Decision-maker not yet involved |
| `NU_OWNER` | Workflow owner not yet assigned |
| `NU_ACCESS` | Access or vendor prerequisite pending |
| `NU_CHANGE_DEPENDENCY` | Another internal change must happen first |

### No-show / cancellation

| Code | Display label |
|---|---|
| `NS_UNKNOWN` | No response / unknown |
| `NS_CONFLICT` | Timing conflict |
| `NS_TECH` | Join or phone failure |
| `NS_NO_LONGER_PRIORITY` | No longer a priority |
| `NS_BAD_CONTACT` | Invalid or unreachable contact |
| `NS_INTERNAL_ERROR` | Heutrix scheduling or reminder failure |

### Closed lost

| Code | Display label |
|---|---|
| `CL_BUDGET` | Budget unavailable |
| `CL_PRICE_VALUE` | Price/value did not support decision |
| `CL_PRIORITY` | Priority changed |
| `CL_INTERNAL` | Chose internal solution |
| `CL_COMPETITOR` | Chose another provider |
| `CL_SCOPE` | Scope did not match need |
| `CL_TIMELINE` | Timing could not align |
| `CL_PROCUREMENT` | Procurement, security or legal path blocked |
| `CL_PROOF_TRUST` | Proof or trust was insufficient |
| `CL_NO_DECISION` | No decision / no response |
| `CL_REROUTED_NO_GO` | Feasibility or Diagnostics produced a no-go |
| `CL_OTHER` | Other — note required |

## 9.6 Analytics events

| Event | Fire only when | Key non-sensitive parameters |
|---|---|---|
| `help_call_cta_click` | Primary CTA is activated. | page, CTA location, selected starting point |
| `help_call_form_start` | First field interaction occurs. | page, source category |
| `help_call_form_validation_error` | Validation visibly blocks progress. | field name, error category; never the value |
| `help_call_form_submit_success` | Backend confirms lead creation. | lead ID hash/reference, mode |
| `help_call_form_submit_failure` | Submission fails. | error category, mode |
| `help_call_calendar_view` | Real scheduler is shown after lead creation. | scheduler mode, timezone |
| `help_call_booking_confirmed` | Scheduler returns a confirmed booking ID. | booking reference, caller, channel |
| `help_call_rescheduled` | Scheduler confirms a changed time. | booking reference, reschedule count |
| `help_call_cancelled` | Scheduler confirms cancellation. | booking reference |
| `help_call_attended` | Caller records attendance. | route pending/known |
| `help_call_no_show` | Caller records no-show. | reason when known |
| `help_call_outcome_set` | One route is recorded. | route, primary reason code |
| `proposal_sent` | Proposal delivery is recorded. | offer type, value band if approved |
| `closed_won` | Written win condition is met. | offer type, source, revenue/gross-profit fields in CRM |
| `closed_lost` | Opportunity is formally closed. | primary reason code |

Analytics must not receive form field values, free-text summaries, email addresses, organisation names, sensitive-data notes or proposal documents.

---


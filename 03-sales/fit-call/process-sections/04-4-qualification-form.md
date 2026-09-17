# 4. Qualification form

Use a two-step layout so the form feels short. Keep the progress state if the scheduler fails. Do not ask prospects to choose among six old service names.

## Step 1 — Who the call is for

| Field | Required | Suggested control and options | CRM field |
|---|---:|---|---|
| Name | Yes | Single line | `contact_name` |
| Work email | Yes | Email | `work_email` |
| Organisation | Yes | Single line | `organisation_name` |
| Sector | Yes | Disability support provider; allied health practice; other | `sector` |

## Step 2 — One workflow and the buying context

| Field | Required | Website-ready question / options | CRM field |
|---|---:|---|---|
| Role and relationship to the decision | Yes | **Which best describes your role?** Owner/CEO; operations/general manager; workflow owner/team lead; practitioner/frontline staff; technology/data role; adviser/referral partner; other | `contact_role_group` |
| Team context | Yes | **How many people or roles regularly touch this workflow?** 1; 2–3; 4–6; 7+; not sure | `workflow_participant_band` |
| Workflow problem | Yes | **Which one workflow should we discuss?** Briefly describe what starts it, where it becomes hard to track, hand over or report, and what a useful improvement would change. Maximum 600 characters. | `workflow_summary` |
| Current tools | No | **What tools are involved at a high level?** For example: email, spreadsheets, shared drive, forms, practice/care system. Do not include account names, links, files or credentials. Maximum 250 characters. | `current_tools_summary` |
| Timing | Yes | **When would this need to improve?** Within 1–3 months; within 3–6 months; later than 6 months; exploring/no date | `urgency_band` |
| Decision context | Yes | **What is the decision context?** I can approve a paid next step; I will recommend it to a decision-maker; a decision-maker is already involved; we are exploring only; not sure | `decision_context` |
| Sensitive-data confirmation | Yes | Exact checkbox in section 3.4 | `sensitive_data_confirmation_at` |
| Direct-contact permission | Yes | Exact checkbox in section 3.4 | `contact_consent_at` |
| Resource/nurture permission | No | Separate checkbox only | `marketing_consent_at` |

## Form behaviour

- Accept a general workflow description, not uploaded files.
- Do not add phone as a required field. Collect it only when a phone call is selected or the prospect asks for phone contact.
- Do not ask for exact revenue, participant numbers, diagnoses, plan details, record examples or other care information.
- Do not ask the visitor to diagnose the solution or choose among the three products. Recommending the right route is part of the 20-minute call.
- Carry source, landing page, selected starting point and UTMs invisibly into the CRM record; never place form answers in analytics event parameters.
- If prohibited information is detected or noticed, restrict visibility, notify the privacy owner and follow the approved deletion/remediation procedure. Do not copy it into call notes.

---


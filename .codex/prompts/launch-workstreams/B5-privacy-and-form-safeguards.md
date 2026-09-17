# B5 — Privacy, collection notices and form safeguards

**Recommended environment:** Codex with Australian legal/privacy review  
**Priority:** Launch blocker  
**Dependency:** Exact form, CRM, scheduler, email, analytics and hosting vendors must be known.

## Copy this prompt into a new chat

```text
Act as the implementation lead for privacy-aware website data collection at Heutrix Labs. Work in the current Heutrix repository. Read the control registers first, use HEUTRIX-LABS-LAUNCH-REVIEW.md as historical context, and inspect the actual code, forms, vendors and data flows. This is implementation and risk analysis, not legal advice; clearly identify decisions that require an Australian privacy/legal professional.

Goal: make website collection transparent, minimal, secure and operationally accurate, especially for prospects in health and disability services.

Tasks:
1. Map every website data flow: field/event collected, purpose, legal/business basis to confirm, receiving vendor, storage location if known, access, retention, deletion, cross-border handling and failure/logging path.
2. Identify unnecessary or risky fields. The public website must not solicit patient, participant, clinical or other sensitive care information.
3. Draft an accurate just-in-time collection notice beside submit and update the privacy/data-handling page so it matches the real tools and practices. Use placeholders only where facts are missing; never present guesses as policy.
4. Implement clear privacy links, validation, safe error handling and any consent controls actually required by the chosen technologies and reviewed policy. Do not add a generic cookie banner without a reason.
5. Add privacy-preserving spam protection, server-side rate limiting, monitoring and retention controls where the architecture supports them.
6. Ensure analytics and logs do not capture form contents, URLs with sensitive query values, or unnecessary identifiers.
7. Create a vendor/fact questionnaire and a legal-review checklist covering Australian Privacy Principles, collection notice, direct marketing, overseas disclosure, retention and data-subject requests as applicable.
8. Test keyboard/screen-reader access to notices, errors and consent controls.

Do not claim legal compliance, NDIS compliance, healthcare compliance, data residency or security certification unless independently verified. Do not include secrets or real prospect data in tests.

Deliverables:
- Data-flow inventory.
- Draft collection notice and privacy-page changes with assumptions labelled.
- Implemented safeguards and tests.
- Retention/deletion operating checklist.
- Items requiring legal review and owner confirmation.

Definition of done: every collected item has a documented purpose and destination; the form warns against sensitive care data; success/failure handling is safe; public copy matches actual vendors; spam/rate-limit controls work; and unresolved legal questions are explicit rather than hidden.
```

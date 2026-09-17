# Google enquiry connection — implementation contract

Status: reserved architecture, intentionally not connected. The website currently prepares an email draft. It never represents a draft as a delivered request or confirmed booking.

## Planned journey

Visitor reviews enquiry → same-origin POST /api/requests → Cloudflare Worker validates and forwards → Google Apps Script records the request in Google Sheets and sends the configured notification → Worker returns a verified receipt.

The existing `createEnquiry` function defines version 1 of the payload. Keep the Google deployment URL and shared secret in Worker secrets (`GOOGLE_ENQUIRY_URL` and `GOOGLE_ENQUIRY_SECRET`), never in the browser bundle. The Google script must check that secret before writing to the sheet. Use an explicit sheet ID and notification recipient configured in Google Script Properties.

## Connection requirements

- Reuse the size, origin, content-type, field and permission checks in `server/mockRequests.js`; its mock success response must never be used as delivery evidence.
- Add a visitor request ID and deduplicate it in the Google script with a lock before appending rows or sending notifications. A retry must reuse the ID.
- Treat visitor values as text in Sheets; prevent spreadsheet formula execution.
- Send only the approved contact fields, general workflow description and explicitly selected diagnostic summary. Never log the request body.
- The Google response contract must identify the same request ID and distinguish saved, notification-pending and notified states. A Google HTML error page or HTTP 200 alone is not success.
- Apply bounded timeouts and request sizes, rate limiting and appropriate spam protection. Keep the draft on failures and offer email fallback. Explain an uncertain delivery state instead of encouraging blind repeated submissions.
- A received enquiry is not a confirmed appointment. Agree the time separately unless a verified booking system is subsequently added.
- Confirm retention, access and privacy copy against the real Google setup before enabling the connection.

## Activation gate

Implement the adapter behind `server/googleRequests.js`, then connect the review screen to it. Test validation, unavailable configuration, Google rejection, timeout, malformed response, duplicate retries, saved-but-not-notified state and successful notification using synthetic data. Verify the actual Sheet row and notification with an authorised end-to-end test before changing the public email fallback.

No Google URL, recipient or successful delivery is assumed by this scaffold.

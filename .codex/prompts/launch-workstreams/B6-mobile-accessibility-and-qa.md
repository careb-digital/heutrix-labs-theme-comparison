# B6 — Real-device, accessibility and end-to-end launch QA

**Recommended environment:** Codex  
**Priority:** Launch blocker  
**Dependency:** Run after the conversion, tracking, privacy and technical SEO changes are integrated.

## Copy this prompt into a new chat

```text
Act as the final launch QA owner for the Heutrix Labs website. Work in the current Heutrix repository. Read the control registers first, use HEUTRIX-LABS-LAUNCH-REVIEW.md as historical context, inspect the current source and production candidate, and diagnose before editing. Verify the mobile drawer, keyboard/focus behaviour, reduced motion, form errors and calendar journey against current behaviour.

Goal: verify that qualified visitors can understand, navigate and complete the full conversion journey on representative mobile and desktop devices, with accessibility basics working.

Create a risk-based test matrix covering:
- Current Chrome, Safari and Edge where available.
- At least representative iPhone and Android viewport/device testing; distinguish emulation from real-device checks.
- Keyboard-only navigation, visible focus, logical tab order, skip/navigation behaviour and focus trapping/restoration in the mobile drawer.
- Screen-reader-friendly names, landmarks, headings, form labels, instructions, errors, success messages and dynamic state announcements.
- Colour contrast, 200% zoom/reflow, touch target sizing and content without horizontal overflow except intentionally scrollable tables.
- prefers-reduced-motion and pause/control for nonessential animation.
- Form validation, server failure, success, duplicate submit, scheduler/calendar, timezone, confirmation and rescheduling.
- CTA, email, phone, privacy, external and internal links.
- Performance indicators and layout stability on slower mobile conditions.

Fix confirmed defects within the website scope. Add or improve automated checks where useful, but do not treat automated accessibility output as proof of accessibility. Preserve unrelated changes and do not claim to have tested physical devices you did not use.

Deliverables:
- Test matrix with Verified / Appears Correct / Needs Verification / Problem Found.
- Implemented fixes with focused tests.
- Reproduction steps and evidence for remaining defects.
- A short manual real-device checklist for the owner.
- Final go/no-go recommendation limited to mobile, accessibility and conversion QA.

Definition of done: no critical or serious barrier blocks navigation or lead completion; the mobile menu and form/calendar flows work with touch and keyboard; error/success states are perceivable; reduced-motion is respected; and any device/browser not actually tested is clearly named.
```

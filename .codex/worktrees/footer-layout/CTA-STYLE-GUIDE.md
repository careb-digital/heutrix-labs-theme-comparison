# Heutrix CTA Style Guide

CTAs should be short, professional, low-pressure and outcome-oriented. Buttons normally contain 2–4 words, start with a clear verb and describe the next action. Surrounding copy explains the benefit. Avoid urgency, exaggerated promises and aggressive sales language.

## Approved actions

| Context | CTA | Destination or behaviour |
| --- | --- | --- |
| Navigation, hero, About, FAQ endings, high-intent and final sections, general consultation | Talk to Heutrix | `/contact` |
| Homepage hero secondary action | See How It Works | `/#heutrix-method` |
| Service discovery | Explore Services | `/services` |
| Methodology and educational discovery | See the Process / See What’s Included / See How We Help | Match the destination |
| Scorecard promotions, resources, landing pages and footer | Start the Scorecard | `/resources/workflow-bottleneck-scorecard` |
| Scorecard workbook download | Download the Excel Workbook | Direct `.xlsx` download; compare up to 12 workflows |
| Assessment result conversation | Discuss My Result | Contact form; summary sharing remains optional |
| Other resources | Get the Guide / Get the Checklist / Get the Template / Take the Assessment | Match the named asset or tool |
| Diagnostics introduction | View Diagnostics | `/services#heutrix-diagnostics` |
| Transformation introduction | View Transformations | `/services#heutrix-workflow-transformation` |
| Diagnostics enquiry | Discuss Diagnostics | `/contact?service=heutrix-diagnostics` |
| Transformation enquiry | Discuss Transformations | `/contact?service=heutrix-workflow-transformation` |
| Service selection help | Find the Right Fit | `/contact?service=not-sure` |
| Existing AI Guardrails service discovery / enquiry | View AI Guardrails / Discuss AI Guardrails | AI Guardrails details / preselected enquiry |
| Lead-magnet delivery form | Send My Scorecard | Sends the requested scorecard |
| General enquiry submission | Send Enquiry | Sends the enquiry |
| Calendar | Choose a Time | Opens the connected calendar |
| Multi-step booking | Continue to Booking | Advances to booking |

## Hierarchy and footer

All internal CTAs use the shared navigation behaviour. Assessment, enquiry and referral links scroll to and focus the starting panel below the fixed header. An assessment already in progress resumes its retained step or result. Context selections and answers are preserved. Repeated clicks on the current destination behave the same way. Named-section links scroll to and focus that section; informational page links open at the page start. Downloads, email links and external destinations retain their native behaviour. No navigation action submits a form.

Assessment Continue, Back and Edit actions also scroll to and focus the relevant question panel; See My Result lands at the result. Enquiry review and confirmation panels are retained destinations when the same enquiry CTA is clicked again.

1. **Talk to Heutrix** — primary commercial conversion.
2. **Start the Scorecard** — primary lead-generation conversion.
3. **Explore / View / See** — information discovery.
4. **Discuss [Service]** — evaluation of a particular service.

The footer has no more than two conversion actions: **Talk to Heutrix** and **Start the Scorecard**. Ordinary informational and legal navigation remains available.

## Form accuracy on the current website

The local Formspree integration retains **Review My Enquiry** or **Review My Referral**, followed by **Send Enquiry** or **Send Referral**. Review does not transmit details; only the explicit send action does. Receipt is shown only after a successful provider response. This change is not yet deployed; see [integration verification and account follow-up](FORMSPREE.md). Do not label draft preparation as sending or imply a confirmed booking.

Resources remain ungated. **Start the Scorecard** opens the scorecard; it does not promise email delivery. Use **Send My Scorecard** only if an actual delivery form is introduced. Assessment steps use **Continue Assessment** and **See My Result**. The online headline is **See what is slowing this workflow down**. State **10 required questions across 3 steps**, followed by an immediate result. Do not attach a completion-time claim to the online tool. Use **Download the Excel Workbook** for the separate comparison workbook (up to 12 workflows). Keep results and all six downloads ungated. Make **Save My Action Plan** prominent before the optional **Discuss My Result** action.

Utility controls describe their operation, such as **Save My Action Plan** and **Copy My Summary**.

## Avoid

Do not use **Get Started**, **Learn More**, **Click Here**, **Submit**, **Send**, **Next**, **Discover More**, **Book a Fit Call**, **Start Your Journey**, **Unlock Your Potential**, **Transform Your Business**, **Scale Now**, **Get in Touch**, or generic **Download Now**. Name the asset and the actual next step.

## Default rule

Commercial conversation → **Talk to Heutrix**. Lead magnet → **Start the Scorecard**. Service overview → **View [Service]**. Service enquiry → **Discuss [Service]**. Educational navigation → **See / Explore + destination**.

This guide governs the canonical implementation in `apps/website/` and future copy. Historical release notes and reference implementations do not override it.

## Visual states

Use the shared primary and outlined secondary treatments, surface pairings and accessible states in [design.md](design.md) and the [brand design guide](BRAND-DESIGN.md). Labels and destinations remain governed by this guide.


---
created: 2026-09-03
last_updated: 2026-09-09
business: Heutrix
status: production_prompts_owner_review_required
coverage: 52_posts_reviewed
primary_generated_assets: 26
optional_poll_fallbacks: 2
prompt_packs: 28
native_polls: 2
text_only: 24
generator_targets: [ChatGPT Images, Gemini Nano Banana Pro]
---

# LinkedIn visual-generation prompt library

This library records the visual decision for every campaign post. Every generation prompt is standalone: it contains the business context, audience, purpose, format, visual system, exact copy, information hierarchy and exclusions required for either ChatGPT Images or Gemini Nano Banana Pro.

The prompts do not make an asset approved. Every output still needs word-for-word text review, source checks, accessibility review, brand approval and the human publishing checklist.

## Current content alignment — 9 September 2026

P07 presents independent entry points. P08 uses the four-stage public method Diagnose → Triage → Build → Handover; its original filename is retained. P35 uses Talk to Heutrix and visitor-sent email wording. P16/P34 rely on the recorded 5 September narrative permission, with normal post/asset review still required. Use the [campaign review](../README.md#review-against-current-heutrix-material--9-september-2026) for source decisions and route checks. Do not add proposed delivery-package commitments to artwork.

## Compatibility basis

The prompt structure was checked on 3 September 2026 against:

- [OpenAI's current image-generation guidance](https://learn.chatgpt.com/docs/image-generation), which recommends stating purpose or audience, subject, composition, style, dimensions and exclusions, and warns that dense production typography still needs review; and
- [Google's current Gemini image guidance](https://support.google.com/gemini/answer/14286560?hl=en), which describes prompt-led image creation and Nano Banana Pro's stronger detail, instruction following, text rendering and infographic capability.

Availability, quotas and interface labels depend on the user's account and may change. These prompts are model-neutral and do not depend on a tool-specific command.

## How to use the prompt packs

1. Find the post in the coverage matrix.
2. Copy the entire fenced prompt for that post into ChatGPT Images or Gemini Nano Banana Pro. Do not prepend a shared style prompt; all required context is already inside the block.
3. For a document post, set `TARGET PAGE` to one page number and submit the full prompt once per page. Each request must produce exactly one image, never a contact sheet.
4. If the interface does not honour exact pixels, request the stated 4:5 portrait ratio and crop or export the approved result to 1080 × 1350 px.
5. Check every visible word against the prompt. Regenerate or correct the asset in a design tool if any word, number or label is wrong.
6. Add the supplied layered Heutrix logo from `06-marketing/brand/logo-2026-09/` manually, preserving its proportions and clear space. The prompts intentionally prohibit the model from inventing or redrawing it.
7. Combine approved document pages in order as an accessible LinkedIn PDF and add the reviewed alt text.

## Production rules after generation

- The owner selected the layered logo and Navy + Teal palette on 15 September 2026. Use the current brand pack; earlier logo proposals are excluded.
- Keep meaningful text at least 60 px from the edge, with phone-readable type and strong contrast.
- Never use colour alone to communicate status; pair it with a word, icon or shape.
- Keep every required **Synthetic example**, **Synthetic sample**, **Illustrative application** or **Illustrative operating view** label visible on every relevant page.
- Never upload real participant, patient, worker, client, credential, clinical, payment or confidential information as a model reference.
- Do not use generated people as founders, clients, participants, patients, clinicians or disability-support workers.
- Do not treat a generated interface, statistic, diagram or process as evidence that a system exists or a result has been achieved.

## Coverage matrix: all 52 posts

| Post | Visual decision | Format or reason |
|---|---|---|
| P01 | Generate | Single launch graphic |
| P02 | Generate | Five-page framework document; one standalone request per page |
| P03 | Text only | Numbered copy already scans well |
| P04 | Text only | Operator story is stronger without a generic intake illustration |
| P05 | Generate | Two-panel readiness comparison |
| P06 | Generate after approval | Four-page illustrative no-build document; one standalone request per page |
| P07 | Generate | Four-page product-choice document; one standalone request per page |
| P08 | Generate | Four-page delivery-method document; one standalone request per page |
| P09 | Text only | Handover checklist works as a saveable text post after two documents |
| P10 | Text only | Five-question copy is concise; P11 carries the week's visual |
| P11 | Generate | Six-page AI decision-path document; one standalone request per page |
| P12 | Text only | Let the authoritative OAIC source lead; avoid decorative privacy imagery |
| P13 | Generate | Single seven-step Diagnostics process graphic |
| P14 | Generate | Six-page workflow-mapping document; one standalone request per page |
| P15 | Text only | The “do not automate yet” opening should stand on its own |
| P16 | Text only | Do not create or use a dashboard screenshot; the post adapts an approved anonymised narrative and still needs normal post review |
| P17 | Generate | Single four-field operating card |
| P18 | Native format | LinkedIn poll; optional generated question-card fallback supplied below |
| P19 | Generate | Five-page allied-health field guide; one standalone request per page |
| P20 | Text only | Keep the ownership argument conversational |
| P21 | Generate | Single synthetic before/after diagram |
| P22 | Generate | Six-page disability-provider field guide; one standalone request per page |
| P23 | Text only | Date-to-workflow contrast is clear in copy |
| P24 | Generate | Single synthetic before/after diagram |
| P25 | Text only | Source-led risk-screening post; P27 supplies the data visual |
| P26 | Text only | Who/what/when/what-if structure scans well without a graphic |
| P27 | Generate after source check | Single three-statistic OAIC graphic |
| P28 | Text only | Preserve nuance; avoid making spreadsheets look universally good or bad |
| P29 | Generate | Single form-to-close architecture diagram |
| P30 | Text only | Build-threshold criteria need the nuance of the written list |
| P31 | Text only | The handover question is designed for discussion |
| P32 | Generate | Six-page definition-of-done checklist; one standalone request per page |
| P33 | Text only | “Workflow debt” is a strong standalone concept post |
| P34 | Generate | Single workflow-first method graphic linked to approved anonymised delivery; no founder, client or source-material dependency |
| P35 | Generate | Five-page fit-call explainer; replaces the native-video dependency |
| P36 | Text only | Service boundaries should remain direct and easy to quote |
| P37 | Generate | Eight-page synthetic referral walkthrough; one standalone request per page |
| P38 | Text only | Baseline examples are more credible as plain text |
| P39 | Generate | Four-page synthetic Diagnostics sample; one standalone request per page |
| P40 | Generate | Three-page AI use-case register template; one standalone request per page |
| P41 | Text only | Tool/use/information/reviewer distinction works as text |
| P42 | Generate | Three-page human-review checklist; one standalone request per page |
| P43 | Text only | Start a consistent three-post objection series without stock quote cards |
| P44 | Text only | Continue the conversational objection series |
| P45 | Text only | Complete the conversational objection series |
| P46 | Generate | Single Heutrix Diagnostics offer card without price |
| P47 | Text only | Self-qualification copy should feel direct, not promotional |
| P48 | Generate | Single 30-day experiment template |
| P49 | Text only | Ten-question planning post is already structured to save |
| P50 | Native format | LinkedIn poll; optional generated question-card fallback supplied below |
| P51 | Text only | Leave-coverage checklist is clear without decoration |
| P52 | Generate only after campaign data exists | Conditional four-page campaign-review document; one standalone request per page |

# Standalone generation prompts


## Current asset authority

Use the [selected logo pack](../../../brand/logo-2026-09/README.md) and [visual design guide](../../../brand/DESIGN.md). Normal text and links on light surfaces use navy or deep teal #01647C. Bright teal #01989C is decorative; status colours retain their semantic meaning. The [current launch package](../../../outreach/launch-2026-09-14/README.md) contains branded P01–P12 artwork. The original image-generation reference remains historical source material.

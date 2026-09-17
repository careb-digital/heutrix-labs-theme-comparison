from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    Image,
    KeepTogether,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "output" / "pdf"
QA_DIR = ROOT / "_qa" / "pdf"

NAVY = colors.HexColor("#033862")
NAVY_DARK = colors.HexColor("#033862")
MINT = colors.HexColor("#8DE4E0")
MINT_DARK = colors.HexColor("#01647C")
TEAL = colors.HexColor("#01989C")
INK = colors.HexColor("#033862")
MUTED = colors.HexColor("#5B6675")
SURFACE = colors.HexColor("#F8FAFC")
PALE = colors.HexColor("#EFFAFA")
LINE = colors.HexColor("#CBD5E1")
WARNING = colors.HexColor("#FFE4E6")
WHITE = colors.white

PAGE_WIDTH, PAGE_HEIGHT = A4

styles = getSampleStyleSheet()
styles.add(
    ParagraphStyle(
        name="H1Brand",
        parent=styles["Heading1"],
        fontName="Helvetica-Bold",
        fontSize=23,
        leading=28,
        textColor=NAVY_DARK,
        spaceAfter=10,
    )
)
styles.add(
    ParagraphStyle(
        name="H2Brand",
        parent=styles["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=15,
        leading=19,
        textColor=NAVY,
        spaceBefore=5,
        spaceAfter=8,
    )
)
styles.add(
    ParagraphStyle(
        name="H3Brand",
        parent=styles["Heading3"],
        fontName="Helvetica-Bold",
        fontSize=10.5,
        leading=14,
        textColor=MINT_DARK,
        spaceBefore=4,
        spaceAfter=4,
    )
)
styles.add(
    ParagraphStyle(
        name="BodyBrand",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=9.4,
        leading=13.2,
        textColor=INK,
        spaceAfter=6,
    )
)
styles.add(
    ParagraphStyle(
        name="SmallBrand",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=7.6,
        leading=10.2,
        textColor=MUTED,
    )
)
styles.add(
    ParagraphStyle(
        name="TableHead",
        parent=styles["BodyText"],
        fontName="Helvetica-Bold",
        fontSize=7.5,
        leading=9.2,
        textColor=WHITE,
    )
)
styles.add(
    ParagraphStyle(
        name="TableBody",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=7.2,
        leading=9.4,
        textColor=INK,
    )
)
styles.add(
    ParagraphStyle(
        name="Callout",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=8.7,
        leading=12.2,
        textColor=INK,
    )
)
styles.add(
    ParagraphStyle(
        name="CoverTitle",
        parent=styles["Heading1"],
        fontName="Helvetica-Bold",
        fontSize=28,
        leading=33,
        textColor=WHITE,
        spaceAfter=12,
    )
)
styles.add(
    ParagraphStyle(
        name="CoverBody",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=12,
        leading=17,
        textColor=WHITE,
    )
)
styles.add(
    ParagraphStyle(
        name="Label",
        parent=styles["BodyText"],
        fontName="Helvetica-Bold",
        fontSize=7.8,
        leading=10,
        textColor=MINT_DARK,
        spaceAfter=5,
    )
)


def para(text, style="BodyBrand"):
    return Paragraph(text, styles[style])


def heading(text, level=2):
    return Paragraph(text, styles["H2Brand" if level == 2 else "H3Brand"])


def bullet_list(items):
    rows = []
    for item in items:
        rows.append(
            [
                Paragraph("<b>+</b>", styles["BodyBrand"]),
                Paragraph(item, styles["BodyBrand"]),
            ]
        )
    table = Table(rows, colWidths=[6 * mm, 166 * mm], hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("TEXTCOLOR", (0, 0), (0, -1), MINT_DARK),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 2),
                ("TOPPADDING", (0, 0), (-1, -1), 1),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
            ]
        )
    )
    return table


def numbered_steps(items):
    rows = []
    for index, (label, text) in enumerate(items, start=1):
        rows.append(
            [
                Paragraph(str(index), ParagraphStyle("StepNo", parent=styles["BodyBrand"], fontName="Helvetica-Bold", fontSize=12, textColor=NAVY_DARK, alignment=TA_CENTER)),
                Paragraph(f"<b>{label}</b><br/>{text}", styles["BodyBrand"]),
            ]
        )
    table = Table(rows, colWidths=[12 * mm, 160 * mm], hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (0, -1), MINT),
                ("BOX", (0, 0), (-1, -1), 0.5, LINE),
                ("INNERGRID", (0, 0), (-1, -1), 0.35, LINE),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 7),
                ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
            ]
        )
    )
    return table


def data_table(headers, rows, widths, font_size=7.2):
    head_style = styles["TableHead"]
    body_style = ParagraphStyle("DynamicTableBody", parent=styles["TableBody"], fontSize=font_size, leading=font_size + 2.1)
    data = [[Paragraph(h, head_style) for h in headers]]
    data += [[Paragraph(str(cell), body_style) for cell in row] for row in rows]
    table = Table(data, colWidths=widths, repeatRows=1, hAlign="LEFT")
    commands = [
        ("BACKGROUND", (0, 0), (-1, 0), NAVY),
        ("BOX", (0, 0), (-1, -1), 0.55, LINE),
        ("INNERGRID", (0, 0), (-1, -1), 0.3, LINE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]
    for row_index in range(1, len(data)):
        if row_index % 2 == 0:
            commands.append(("BACKGROUND", (0, row_index), (-1, row_index), SURFACE))
    table.setStyle(TableStyle(commands))
    return table


def callout(title, text, tone="info"):
    fill = PALE if tone == "info" else WARNING if tone == "warning" else colors.HexColor("#E8F8EF")
    accent = TEAL if tone == "info" else colors.HexColor("#BA1A1A") if tone == "warning" else MINT_DARK
    table = Table(
        [[Paragraph(f"<b>{title}</b><br/>{text}", styles["Callout"])]],
        colWidths=[172 * mm],
        hAlign="LEFT",
    )
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), fill),
                ("LINEBEFORE", (0, 0), (0, -1), 4, accent),
                ("BOX", (0, 0), (-1, -1), 0.45, LINE),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 9),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
            ]
        )
    )
    return table


def cover(title, subtitle, outcome, workbook_name):
    hero = Table(
        [
            [Image(str(ROOT.parent / "brand/logo-2026-09/heutrix-logo-reversed.png"), width=48*mm, height=48*653/2400*mm, hAlign="LEFT")],
            [Paragraph(title, styles["CoverTitle"])],
            [Paragraph(subtitle, styles["CoverBody"])],
        ],
        colWidths=[172 * mm],
        rowHeights=[27 * mm, None, None],
    )
    hero.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), NAVY),
                ("LEFTPADDING", (0, 0), (-1, -1), 14 * mm),
                ("RIGHTPADDING", (0, 0), (-1, -1), 14 * mm),
                ("TOPPADDING", (0, 0), (-1, 0), 10 * mm),
                ("TOPPADDING", (0, 1), (-1, -1), 6 * mm),
                ("BOTTOMPADDING", (0, 2), (-1, 2), 12 * mm),
                ("TEXTCOLOR", (0, 0), (-1, 0), MINT),
            ]
        )
    )
    return [
        hero,
        Spacer(1, 12 * mm),
        heading("What this helps you do", 2),
        para(outcome),
        Spacer(1, 4 * mm),
        callout(
            "Companion workbook",
            f"Open <b>{workbook_name}</b> to enter ratings, use formulas and keep a working copy in an approved location.",
            "success",
        ),
        Spacer(1, 5 * mm),
        callout(
            "Information boundary",
            "Use general, synthetic or appropriately de-identified examples. Do not enter participant, patient, worker, clinical, credential or other personal or sensitive information into a public download or unapproved system.",
            "warning",
        ),
        Spacer(1, 7 * mm),
        para("Content version 1.0 | Brand refresh 15 September 2026 | Australian English", "SmallBrand"),
        PageBreak(),
    ]


def page_title(title, kicker):
    return [
        Paragraph(kicker.upper(), styles["Label"]),
        Paragraph(title, styles["H1Brand"]),
        Spacer(1, 2 * mm),
    ]


def draw_first_page(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(NAVY)
    canvas.rect(0, PAGE_HEIGHT - 7 * mm, PAGE_WIDTH, 7 * mm, fill=1, stroke=0)
    canvas.setFillColor(MINT)
    canvas.rect(0, PAGE_HEIGHT - 7 * mm, 42 * mm, 7 * mm, fill=1, stroke=0)
    draw_footer(canvas, doc)
    canvas.restoreState()


def draw_later_page(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(NAVY)
    canvas.rect(0, PAGE_HEIGHT - 10 * mm, PAGE_WIDTH, 10 * mm, fill=1, stroke=0)
    canvas.setFont("Helvetica-Bold", 8)
    canvas.setFillColor(WHITE)
    canvas.drawImage(str(ROOT.parent / "brand/logo-2026-09/heutrix-mark-reversed.png"), 19*mm, PAGE_HEIGHT-8.5*mm, width=6*mm, height=6*mm, preserveAspectRatio=True, mask="auto")
    canvas.setFillColor(MINT)
    canvas.drawRightString(PAGE_WIDTH - 19 * mm, PAGE_HEIGHT - 6.6 * mm, "WORKFLOW FIRST. TECHNOLOGY SECOND.")
    draw_footer(canvas, doc)
    canvas.restoreState()


def draw_footer(canvas, doc):
    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(0.4)
    canvas.line(19 * mm, 14 * mm, PAGE_WIDTH - 19 * mm, 14 * mm)
    canvas.setFont("Helvetica", 7)
    canvas.setFillColor(MUTED)
    canvas.drawString(19 * mm, 9 * mm, "General operational resource - not legal, privacy, clinical, audit, registration or regulatory advice")
    canvas.drawRightString(PAGE_WIDTH - 19 * mm, 9 * mm, f"Page {doc.page}")


def build_doc(filename, story, title):
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    QA_DIR.mkdir(parents=True, exist_ok=True)
    path = OUTPUT_DIR / filename
    doc = SimpleDocTemplate(
        str(path),
        pagesize=A4,
        rightMargin=19 * mm,
        leftMargin=19 * mm,
        topMargin=18 * mm,
        bottomMargin=20 * mm,
        title=title,
        author="Heutrix",
        subject="Public workflow starter resource",
    )
    doc.build(story, onFirstPage=draw_first_page, onLaterPages=draw_later_page)
    return path


def scorecard_story():
    story = cover(
        "20-Minute Workflow Bottleneck Scorecard",
        "Compare recurring operational workflows, surface control issues and choose one evidence-backed starting point.",
        "Use a consistent set of factors to separate the loudest problem from the best bounded workflow to review next. A valid result can be to simplify, gather evidence or not proceed.",
        "workflow-bottleneck-scorecard.xlsx",
    )
    story += page_title("Run the scorecard in 20 minutes", "Quick start")
    story.append(
        numbered_steps(
            [
                ("0-3 minutes: choose the list", "Write up to 12 recurring non-clinical workflows. Name the work, not the tool: for example, service commencement action tracking or monthly reporting preparation."),
                ("3-8 minutes: agree evidence", "Use direct observation, records and staff input where available. Separate verified facts from assumptions and opinions."),
                ("8-16 minutes: rate consistently", "Rate frequency, effort, handoffs, delay, rework, visibility, feasibility and evidence confidence from 1 to 5 using the same definitions."),
                ("16-20 minutes: apply the control gate", "Do not treat a high score as ready if sensitive information, high-stakes decisions, unclear authority or other controls need review."),
            ]
        )
    )
    story += [Spacer(1, 6 * mm), heading("Four scoring rules"), bullet_list([
        "Score the current workflow, not the hoped-for future state.",
        "Use one workflow boundary with a clear start and end.",
        "Do not assume automation is the answer; process, ownership or status design may be enough.",
        "Record uncertainty. Evidence confidence is deliberately part of the score.",
    ]), Spacer(1, 5 * mm), callout("Strong result", "You leave with one workflow to examine next, the reason it matters, the evidence still needed and any control issue that must be resolved first.", "success"), PageBreak()]

    story += page_title("Rate each factor from 1 to 5", "Scoring model")
    rows = [
        ["Frequency", "15%", "Monthly or less", "Several times a week", "Daily or many times a day"],
        ["Staff effort", "15%", "A few minutes", "Noticeable manual work", "Large repeated effort across roles"],
        ["Handoffs", "10%", "One owner", "Several roles or systems", "Many transfers; ownership unclear"],
        ["Delay impact", "15%", "Minor and recoverable", "Affects planning or follow-up", "Materially disrupts operations"],
        ["Error / rework", "10%", "Rare or easy to correct", "Regular checking or re-entry", "Frequent or material correction"],
        ["Visibility gap", "15%", "Status and next action clear", "Manual checking needed", "Owner, status or next action unclear"],
        ["Change feasibility", "15%", "Near-term change difficult", "Some approvals or redesign", "Bounded change appears practical"],
        ["Evidence confidence", "5%", "Mostly assumption", "Some corroboration", "Strong direct evidence"],
    ]
    story.append(data_table(["Factor", "Weight", "1 - lower", "3 - moderate", "5 - higher"], rows, [29*mm, 14*mm, 41*mm, 43*mm, 45*mm], 6.8))
    story += [Spacer(1, 5 * mm), callout("Formula", "Weighted score = each 1-5 rating multiplied by its visible weight, divided by 5 and rounded to a score out of 100. The weights support comparison; they are not an industry benchmark or predicted return.", "info"), Spacer(1, 4 * mm), callout("Evidence confidence matters", "A high-friction workflow based mainly on assumption should usually move into evidence gathering before solution design.", "warning"), PageBreak()]

    story += page_title("Read the result through a control gate", "Decision guide")
    story.append(data_table(
        ["Signal", "Meaning", "Practical next action"],
        [
            ["75-100, no control flag", "Strong candidate for a bounded review.", "Validate the boundary, evidence, owner and desired result."],
            ["55-74, no control flag", "Potential candidate with unresolved scope or feasibility.", "Clarify the process and collect evidence before committing."],
            ["Below 55", "Lower relative priority or weak evidence.", "Keep watching, simplify first or choose a stronger workflow."],
            ["Any control flag", "Sensitive information, high-stakes decisions or uncertainty may change what is safe and feasible.", "Do not treat as implementation-ready. Review information, authority and controls."],
        ],
        [37*mm, 60*mm, 75*mm],
        7.3,
    ))
    story += [Spacer(1, 6 * mm), heading("A high score is not a business case"), para("Before changing a workflow, confirm the current-state evidence, accountable owner, desired operating result, dependencies, information boundary, affected people and how acceptance will be tested."), callout("No-build is a valid outcome", "Keep an existing tool when it works. Remove unnecessary steps before automating. Use a process-only change when ownership or rules are the real constraint.", "success"), PageBreak()]

    story += page_title("Choose the smallest useful next step", "Service bridge")
    story.append(data_table(
        ["What the scorecard reveals", "Possible route", "Important boundary"],
        [
            ["The priority, root cause, workflow boundary or feasible option is still unclear.", "Heutrix Diagnostics may help create a decision-ready implementation brief.", "Diagnostics is a paid, standalone decision product and may recommend no build."],
            ["One bounded workflow and desired result are already clear and feasible.", "A Heutrix Workflow Transformation scope may be worth discussing.", "Scope, systems, access, acceptance, timing and price are confirmed in writing."],
            ["The issue is workplace AI use, information boundaries or accountable review.", "Use the AI Guardrails Staff Starter Pack, then assess whether Heutrix AI Guardrails is needed.", "The starter pack is not organisational approval or professional advice."],
            ["Evidence or ownership is too weak.", "Gather evidence, clarify ownership or simplify before buying anything.", "A no-project outcome is acceptable."],
        ],
        [55*mm, 61*mm, 56*mm],
        7.1,
    ))
    story += [Spacer(1, 6 * mm), heading("Use it without giving up your email"), para("The workbook provides the full scoring method and immediate result. If you later want to discuss one high-level, non-sensitive workflow, the website route is 'See where Heutrix can help' for a 20-minute, no-obligation workflow fit call."), callout("Do not send sensitive detail", "A general description of what starts the work, which roles are involved, where status or handover becomes unclear and what a useful result would look like is enough for an initial conversation.", "warning")]
    return story


def visibility_story():
    story = cover(
        "Enquiry-to-Service-Start Visibility Starter Kit",
        "Make owner, status, next action, due date, exception and readiness decisions visible across one operational workflow.",
        "Start with a disability-provider enquiry-to-service-start path. Selected allied health practices can adapt the same fields for referral and appointment workflows without treating the template as a client-data store.",
        "enquiry-to-service-start-starter-kit.xlsx",
    )
    story += page_title("Build a minimum operational view", "Workflow design")
    story.append(para("A useful tracker exists to support decisions and handovers. It should not become a duplicate record of participant, patient or clinical detail."))
    fields = [
        ["Anonymous reference ID", "Find the record without using a name or identifier in this starter file."],
        ["Stage", "Show where the work is within the agreed start-to-end boundary."],
        ["Status", "Use a small consistent set: New, In progress, Waiting, Ready for decision, Closed."],
        ["Owner role", "Name one accountable role, not a team or inbox."],
        ["Next action", "Write the next observable step, not 'follow up'."],
        ["Due date", "Make ageing and delay visible using a real date."],
        ["Waiting on", "Separate blocked work from active work without storing sensitive detail."],
        ["Readiness decision", "Record Not assessed, Ready, Not ready or Not proceeding."],
        ["Decision owner", "Name the authorised role that makes the relevant operational decision."],
        ["Exception and last update", "Surface work outside the normal path and stale records."],
    ]
    story.append(data_table(["Minimum field", "Decision it supports"], fields, [52*mm, 120*mm], 7.5))
    story += [Spacer(1, 5 * mm), callout("Data-minimisation rule", "If a field does not support an agreed decision, action, handover, control or measure, remove it. Store required source information only in the organisation's approved system.", "success"), PageBreak()]

    story += page_title("Agree status definitions before launch", "Status guide")
    stages = [
        ["New enquiry", "A high-level request entered the workflow.", "Owner assigned and first review due."],
        ["Initial review", "The request is checked against the approved process.", "Safe next action and required high-level information are clear."],
        ["Information requested", "The organisation is waiting for agreed information.", "Receipt recorded or a closure or escalation decision made."],
        ["Options review", "Operational options or fit are being considered.", "Named decision and decision owner recorded."],
        ["Decision pending", "An authorised person needs to decide the next route.", "Decision and rationale recorded in the approved place."],
        ["Ready to commence", "The organisation's own readiness condition is met.", "Decision owner and commencement action recorded."],
        ["Commenced", "The workflow moved into the agreed next stage.", "Start recorded and remaining actions routed."],
        ["Closed / not proceeding", "The record has a deliberate closure outcome.", "Reason, owner and onward action recorded."],
    ]
    story.append(data_table(["Stage", "Operational meaning", "Minimum exit condition"], stages, [38*mm, 65*mm, 69*mm], 7.0))
    story += [Spacer(1, 5 * mm), callout("Readiness boundary", "'Ready to commence' is an organisation-owned operational decision. This kit does not verify service, clinical, registration, audit, legal, privacy or regulatory readiness.", "warning"), PageBreak()]

    story += page_title("Set up the view, then test it", "Implementation guide")
    story.append(numbered_steps([
        ("Define one boundary", "Name what starts the workflow, what closes it and which downstream activities are excluded."),
        ("Name the decisions", "For each stage, identify the decision, authorised owner, minimum evidence and next action."),
        ("Adapt the fields", "Remove fields that do not support a decision. Keep source and sensitive information in approved systems."),
        ("Create five synthetic records", "Test normal, waiting, overdue, exception and closed paths without using real client information."),
        ("Run one review", "Ask what is waiting, who owns it, what is due, which decision is blocked and what should close."),
        ("Choose the approved home", "Before real use, confirm purpose, access, storage, retention, deletion, support and backup ownership."),
    ]))
    story += [Spacer(1, 6 * mm), heading("Review rhythm"), bullet_list([
        "Daily or event-driven: update owner, status, next action and due date when the work changes.",
        "Weekly: review waiting, overdue, exception and decision-pending items.",
        "Monthly: remove unused fields, check status consistency and review whether the view still supports the intended decisions.",
    ]), PageBreak()]

    story += page_title("Use synthetic records to test the design", "Worked example")
    examples = [
        ["SYN-001", "New enquiry", "New", "Intake coordinator", "Complete high-level review", "On track"],
        ["SYN-002", "Information requested", "Waiting", "Intake coordinator", "Check agreed information", "Attention"],
        ["SYN-003", "Decision pending", "Ready for decision", "Operations lead", "Record authorised route", "Attention"],
        ["SYN-004", "Ready to commence", "In progress", "Service coordinator", "Confirm commencement action", "On track"],
        ["SYN-005", "Closed / not proceeding", "Closed", "Intake coordinator", "None - outcome recorded", "On track"],
    ]
    story.append(callout("Synthetic example - not a client tracker", "The records below are fictional and contain no identifying or sensitive information. They demonstrate field use only.", "info"))
    story += [Spacer(1, 4 * mm), data_table(["Reference", "Stage", "Status", "Owner role", "Next action", "Attention"], examples, [20*mm, 34*mm, 27*mm, 29*mm, 44*mm, 18*mm], 6.6), Spacer(1, 6 * mm), heading("Five review questions"), bullet_list([
        "What is waiting, blocked, overdue or exceptional?",
        "Does every open record have one owner and one next action?",
        "Which decision is due, who can make it and what evidence is missing?",
        "Are status definitions being applied consistently?",
        "What should close, be corrected or be escalated before the next review?",
    ]), PageBreak()]

    story += page_title("Know when a template is no longer enough", "Service bridge")
    story.append(data_table(
        ["What you learn", "Possible next step", "Boundary"],
        [
            ["The workflow boundary, root cause, measures or feasible design are still unclear.", "Heutrix Diagnostics may help define the problem and produce a decision-ready implementation brief.", "A paid Diagnostic can still recommend no build."],
            ["The tracker exposes recurring integration, permission, handover or adoption gaps in one bounded workflow.", "A Heutrix Workflow Transformation scope may be worth discussing.", "No integration, system, timing or outcome is promised before feasibility and written scope."],
            ["The template works in the approved existing system.", "Keep it, document ownership and review it periodically.", "A custom build is not required."],
            ["Real information handling is not approved.", "Stop before use and confirm purpose, access, storage, retention, deletion and incidents.", "The template is not an approved client-data store."],
        ],
        [52*mm, 68*mm, 52*mm],
        7.0,
    ))
    story += [Spacer(1, 6 * mm), callout("Initial conversation", "If you want to discuss one high-level, non-sensitive workflow, use 'See where Heutrix can help'. The 20-minute fit call assesses fit and the smallest useful next step; it is not unpaid workflow design.", "success")]
    return story


def ai_story():
    story = cover(
        "AI Guardrails Staff Starter Pack",
        "Classify proposed administrative AI uses, set information boundaries and make accountable human review visible.",
        "Give staff a usable first screen for routine AI-assisted work while keeping tool approval, sensitive information, high-stakes decisions and escalation with the organisation's authorised owners.",
        "ai-guardrails-staff-starter-pack.xlsx",
    )
    story += page_title("Use a five-step decision path", "Before any prompt")
    story.append(numbered_steps([
        ("Tool and use", "Is this tool and this specific use case approved by the organisation? Tool approval alone is not use-case approval."),
        ("Information", "Can the task be completed without personal, sensitive, confidential, credential or client information? If no or unsure, stop before entering anything."),
        ("Decision boundary", "Is this a low-risk assistive task rather than a clinical, legal, employment, safety or other high-stakes decision or recommendation?"),
        ("Human review", "Is a qualified human reviewer named, with clear checks and authority to edit or reject the output?"),
        ("Control and record", "Is there an escalation path, approved storage location, recorded decision and review date?"),
    ]))
    story += [Spacer(1, 6 * mm), callout("When uncertain", "Stop before entering information. Use an approved non-AI process or ask the organisation's authorised AI, privacy, security, clinical, legal or other qualified owner as applicable.", "warning"), Spacer(1, 5 * mm), callout("Screening is not approval", "The workbook can identify a candidate, conditional or prohibited-pending-review path. An authorised person still records the actual decision and conditions.", "info"), PageBreak()]

    story += page_title("Turn principles into staff rules", "Starter rules")
    story.append(data_table(
        ["Rule", "Staff action", "Owner evidence"],
        [
            ["Approved tool and use case", "Use only the tool and task that the organisation has approved.", "Approval source, owner and review date."],
            ["Minimum permitted information", "Enter only what is necessary and allowed for the approved purpose.", "Information boundary and examples."],
            ["No high-stakes delegation", "Do not let AI make clinical, legal, employment, safety or other material decisions.", "Named accountable decision-maker."],
            ["Human review", "Check facts, omissions, sources, uncertainty, tone and context before use.", "Reviewer role and acceptance criteria."],
            ["Escalation", "Stop and escalate errors, unsafe outputs, uncertainty or out-of-scope uses.", "Named escalation path and response owner."],
            ["Approved storage", "Store prompts, drafts and final outputs only under the organisation's rule.", "Approved location, access and retention rule."],
            ["Ongoing review", "Reassess when the tool, model, data, purpose, risk or process changes.", "Next review date and change trigger."],
        ],
        [41*mm, 70*mm, 61*mm],
        7.0,
    ))
    story += [Spacer(1, 6 * mm), heading("Typical screening examples"), bullet_list([
        "Candidate for approval: first draft of a generic internal checklist, using an approved tool, no sensitive information and a named reviewer.",
        "Conditional: generic procedure wording where the use is suitable but the tool approval, storage rule or reviewer is still unclear.",
        "Prohibited pending review: sensitive information in an unapproved tool, or AI making or substituting for a high-stakes decision.",
    ]), PageBreak()]

    story += page_title("Check before you prompt", "Staff checklist")
    checks = [
        ["[ ]", "The task and expected output are clear."],
        ["[ ]", "The tool and this use case are approved for this purpose."],
        ["[ ]", "Only the minimum permitted information will be entered."],
        ["[ ]", "No personal, sensitive, confidential or credential information is included."],
        ["[ ]", "Reliable source material is available and permitted for this use."],
        ["[ ]", "A qualified human reviewer is named and can reject the output."],
        ["[ ]", "The escalation path and approved storage location are known."],
    ]
    story.append(data_table(["Check", "Before entering anything"], checks, [18*mm, 154*mm], 8.2))
    story += [Spacer(1, 7 * mm), heading("Prompting discipline"), bullet_list([
        "State the task, audience, permitted source material and required format.",
        "Do not ask the model to invent missing facts, authority or evidence.",
        "Require uncertainty to be visible and important claims to be checked against approved sources.",
        "Keep the qualified person responsible for the decision and final use.",
    ]), Spacer(1, 5 * mm), callout("Public tools", "Do not enter personal or sensitive information into a publicly available or unapproved AI tool. Your organisation must complete its own due diligence and approve the tool, use, information and controls.", "warning"), PageBreak()]

    story += page_title("Review the output and close the task", "Human review")
    output_checks = [
        ["[ ]", "Facts, names, dates, amounts and references are checked."],
        ["[ ]", "Important omissions, contradictions and uncertainty are addressed."],
        ["[ ]", "Claims are supported by approved source material."],
        ["[ ]", "Tone, audience and context are appropriate."],
        ["[ ]", "The output does not imply certainty or authority it does not have."],
        ["[ ]", "The qualified reviewer accepts, edits or rejects the output."],
        ["[ ]", "Any error, unsafe output or near miss is escalated as required."],
    ]
    story.append(data_table(["Check", "Before using the output"], output_checks, [18*mm, 154*mm], 8.0))
    story += [Spacer(1, 6 * mm), heading("Close the task"), bullet_list([
        "Record the final version and reviewer decision.",
        "Store the final material only in the approved location.",
        "Retain or delete prompts, drafts and working files under the approved rule.",
        "Keep conditions, exceptions and the next review date visible.",
        "Route lessons, incidents or near misses to the responsible owner.",
    ]), Spacer(1, 5 * mm), callout("Reviewer authority", "Human review is meaningful only when the reviewer is qualified for the decision, has enough evidence and is allowed to reject the output.", "success"), PageBreak()]

    story += page_title("Maintain a simple use-case register", "Operating control")
    fields = [
        ["Use case and purpose", "What staff want AI to assist with and why."],
        ["Tool approval", "Yes, No or Unsure, with the approval source."],
        ["Information type", "Whether personal, sensitive, confidential or credential information is involved."],
        ["Decision risk", "Whether the output affects a high-stakes or qualified decision."],
        ["Human reviewer", "Named qualified role, checks and authority to reject."],
        ["Escalation and storage", "Where uncertainty goes and where permitted material is stored."],
        ["Classification", "Candidate for approval, Conditional - review required, or Prohibited pending review."],
        ["Decision and review", "Authorised outcome, conditions, owner, date and next review trigger."],
    ]
    story.append(data_table(["Register field", "What to record"], fields, [54*mm, 118*mm], 7.5))
    story += [Spacer(1, 6 * mm), callout("Not enough for every use case", "This pack is a starter operating template. It does not replace legal, privacy, clinical, employment, security, regulatory or other qualified review, and it does not transfer accountability away from the organisation.", "warning"), PageBreak()]

    story += page_title("Choose the next level of work", "Service bridge")
    story.append(data_table(
        ["What the starter pack reveals", "Possible next step", "Boundary"],
        [
            ["A few low-risk administrative uses are clear, with approved tools, information boundaries and accountable review.", "Record formal organisational approval and train staff on the final rules.", "The starter pack does not itself approve the use."],
            ["Many uses are already happening, ownership is unclear or staff cannot apply the rules to real tasks.", "Heutrix AI Guardrails may help create a usable register, boundaries, review, escalation and staff guidance.", "It is an operational service, not legal, privacy, clinical or compliance advice."],
            ["The issue is a wider workflow problem rather than AI use.", "Use the Workflow Bottleneck Scorecard or discuss Heutrix Diagnostics / Workflow Transformation as appropriate.", "Start with the workflow, not with AI."],
            ["A use involves sensitive information or high-stakes decisions.", "Stop and use qualified organisational review and an approved non-AI path unless explicitly authorised.", "Do not use a public or unapproved tool."],
        ],
        [53*mm, 69*mm, 50*mm],
        7.0,
    ))
    story += [Spacer(1, 6 * mm), callout("Initial conversation", "If you want to discuss high-level, non-sensitive AI-use patterns, use 'See where Heutrix can help' for a 20-minute, no-obligation workflow fit call. Do not send prompts, screenshots or records containing sensitive information.", "success")]
    return story


if __name__ == "__main__":
    outputs = [
        build_doc("workflow-bottleneck-scorecard-guide.pdf", scorecard_story(), "20-Minute Workflow Bottleneck Scorecard"),
        build_doc("enquiry-to-service-start-starter-kit-guide.pdf", visibility_story(), "Enquiry-to-Service-Start Visibility Starter Kit"),
        build_doc("ai-guardrails-staff-starter-pack-guide.pdf", ai_story(), "AI Guardrails Staff Starter Pack"),
    ]
    for output in outputs:
        print(output)

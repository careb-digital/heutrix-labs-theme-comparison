"""Build the local publication package from controlled copy and explicit artwork text.
Requires reportlab, PyMuPDF, Pillow, fonttools and brotli. No external service calls.
The generated P01 illustration is copied unchanged before this script runs.
"""
from pathlib import Path
import sys, re, json, html, io, shutil, hashlib
from datetime import date, timedelta
ROOT = Path(__file__).resolve().parents[1]
# Reviewed captions and the calendar are maintained separately.
if len(sys.argv) < 2 or sys.argv[1] != '--artwork-only':
    raise SystemExit('Use --artwork-only [P02 ... P12]. Refresh reviewed copy with publishing_desk.py; legacy caption generation is disabled.')
selected = set(sys.argv[2:])
sys.path.insert(0, str(ROOT / 'source/.deps'))
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor
from fontTools.ttLib import TTFont as FontFile
from fontTools.varLib.instancer import instantiateVariableFont
import fitz
from PIL import Image, ImageDraw

MARKETING = ROOT.parents[1]
SITE = MARKETING.parents[1] / 'heutrix-website'
BANK = MARKETING / 'linkedin/2026-launch'
ORIGIN = 'https://heutrix-website.heutrix.workers.dev'
CONTACT = ORIGIN + '/contact'
SCORE = ORIGIN + '/resources/workflow-bottleneck-scorecard'
INTAKE = ORIGIN + '/resources/enquiry-to-service-start-starter-kit'
AI = ORIGIN + '/resources/ai-guardrails-staff-starter-pack'
OAIC = 'https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/guidance-on-privacy-and-the-use-of-commercially-available-ai-products'
for folder in ['captions','founder','images','documents','document-pages','source/.fonts','source/scratch']:
    (ROOT / folder).mkdir(parents=True, exist_ok=True)

def font(family, weight, label):
    dest = ROOT / f'source/.fonts/{label}.ttf'
    if not dest.exists():
        original = SITE / f'node_modules/@fontsource-variable/{family}/files/{family}-latin-wght-normal.woff2'
        f = FontFile(original)
        f = instantiateVariableFont(f, {'wght': weight}, inplace=True)
        f.flavor = None
        f.save(dest)
    pdfmetrics.registerFont(TTFont(label, str(dest)))
font('plus-jakarta-sans', 750, 'Jakarta')
font('inter', 400, 'Inter')
font('inter', 600, 'InterSemi')

# These are the final artwork instructions. Layout is deterministic and editable.
specs = {
 'P02': ('Before another tool,\nfive questions.', [('Trigger','What starts the work?'),('Owner','Who acts next?'),('Information','What is needed, and where?'),('Exception','What happens when the path breaks?'),('Finish','Who confirms it is done?')], 'FIELD NOTES / WORKFLOW', 'Start with one workflow.'),
 'P03': ('Does the work\nlive in memory?', [('Updates need chasing','People reconstruct the story.'),('One person is away','The next action becomes unclear.'),('Done means different things','Closure depends on who you ask.')], 'FIELD NOTES / VISIBILITY', 'Check one workflow this week.'),
 'P04': ('Make intake\nhandover visible.', [('Owner','Who is accountable?'),('Status','What is happening now?'),('Waiting for','What is missing?'),('Next action','What happens next?'),('Review date','When will someone check again?')], 'DISABILITY PROVIDER OPERATIONS', 'Keep sensitive records in approved systems.'),
 'P05': ('Starting soon\nis not a status.', [('Vague','Almost ready. Starting soon.'),('Useful','Owner, status, next action, review date.'),('Accountable','A named person confirms readiness.')], 'ILLUSTRATIVE OPERATING VIEW', 'Not compliance or service-readiness assurance.'),
 'P06': ('Sometimes the answer\nis no build.', [('Clarify the rule','What does complete mean?'),('Name the owner','Who decides exceptions?'),('Check the baseline','Is the rule stable enough to automate?')], 'ILLUSTRATIVE / NOT A CLIENT RESULT', 'The value is the decision.'),
 'P07': ('Three problems.\nThree starting points.', [('Heutrix Diagnostics','Paid clarity on what to fix first.'),('Heutrix Workflow Transformation','One workflow needs to work better.'),('Heutrix AI Guardrails','AI boundaries and review are unclear.')], 'HOW HEUTRIX HELPS', 'Independent entry points. No mandatory sequence.'),
 'P08': ('Go live is not\nthe finish line.', [('Diagnose','Map the workflow and baseline.'),('Triage','Design responsibilities and acceptance.'),('Build','Implement and test the improvement.'),('Handover','Guide the team and transfer ownership.')], 'HEUTRIX WORKFLOW TRANSFORMATION', 'One bounded workflow. Written scope.'),
 'P09': ('Handover means\nthe team can run it.', [('Operate','Normal steps and exceptions.'),('Own','Access, responsibilities and dependencies.'),('Maintain','Testing, limitations and change rules.')], 'FIELD NOTES / HANDOVER', 'What can the team run, explain and maintain?'),
 'P10': ('Five questions\nbefore workplace AI.', [('Use','What exact task is approved?'),('Information','What may enter the tool?'),('Tool','Which account and settings?'),('Review','Who checks the output?'),('Record','Where does the final version belong?')], 'ADMINISTRATIVE AI', 'Use non-sensitive or synthetic inputs for assessment.'),
 'P11': ('Can I use AI\nfor this task?', [('Approved','Assessed, recorded and bounded.'),('Prohibited','Outside the organisation’s boundaries.'),('Conditional / review required','Resolve the open questions before use.')], 'ILLUSTRATIVE DECISION FRAMEWORK', 'Unassessed use stays in review.'),
 'P12': ('Removing a name\nis not a privacy check.', [('Context matters','Details may still identify a person.'),('Check the use','Purpose, information, tool and reviewer.'),('Start with safe inputs','Use non-sensitive or synthetic information.')], 'RESPONSIBLE ADMINISTRATIVE AI', 'Read the OAIC guidance linked in the caption.')
}

docs = {
 'P02': [
  ('Before buying another tool,\nanswer five questions.', [('Start here','Choose one recurring workflow.'),('Then ask','Trigger. Owner. Information. Exception. Finish.')]),
  ('How does work start?\nWho acts next?', [('1. Trigger','What starts the work?'),('2. Owner','Who is accountable for the next action?')]),
  ('What is needed?\nWhat if it breaks?', [('3. Information','What is needed, and where should it live?'),('4. Exception','What happens when the normal path breaks?')]),
  ('What does\ndone mean?', [('5. Finish','What closes the item?'),('Accountability','Who confirms it is done?')]),
  ('A clearer workflow\ncomes first.', [('Consider the options','Simplify. Clarify. Track. Automate. Build. No build.'),('A useful starting point','Try the free Workflow Bottleneck Scorecard. Link in the caption. No email required.')])],
 'P06': [
  ('When not building\nis the useful decision.', [('The request','Can we automate reminders for missing information?')]),
  ('First, inspect\nthe rule.', [('The problem','Teams disagree about complete.'),('The missing control','Nobody owns the exception decision.'),('The trigger','Required data is recorded inconsistently.')]),
  ('Clarify before\nautomating.', [('Agree the decision rule','Define complete and who approves exceptions.'),('Check a baseline','Use non-sensitive operational information.'),('Reassess','Is automation now justified?')]),
  ('The value is\nthe decision.', [('Heutrix Diagnostics','Compare feasible options, including no build.'),('Ask','Is the rule stable enough to automate?')])],
 'P07': [
  ('Three problems.\nThree starting points.', [('Heutrix Diagnostics','What should we fix first?'),('Heutrix Workflow Transformation','How do we improve this workflow?'),('Heutrix AI Guardrails','What are our AI-use boundaries?')]),
  ('Not sure what\nto fix first?', [('Heutrix Diagnostics','A paid, standalone investigation of one boundary and practical options.'),('Useful result','A decision-ready implementation brief, including no build when appropriate.')]),
  ('One workflow needs\nto work better?', [('Heutrix Workflow Transformation','Redesign, implement, test and hand over one bounded non-clinical workflow.'),('Primary implementation offer','A process improvement, existing-system change or scoped build may be appropriate.')]),
  ('AI rules\nare unclear?', [('Heutrix AI Guardrails','Information boundaries, approved uses and accountable human review.'),('Talk to Heutrix','Request a free, 20-minute fit conversation. Paid work is scoped separately. Link in the caption.')])],
 'P08': [
  ('01 / Diagnose', [('Understand the workflow','Agree its boundary, users and current state.'),('Establish the baseline','Record what is known and what needs measuring.'),('Within implementation','This does not require a separate Diagnostics purchase.')]),
  ('02 / Triage', [('Design the future state','Clarify responsibilities, dependencies and controls.'),('Agree acceptance','State what the workflow must do and how it will be checked.')]),
  ('03 / Build', [('Implement the smallest useful change','A process change or existing-system configuration may be enough.'),('Test with users','Check the agreed workflow before acceptance.')]),
  ('04 / Handover', [('Guide the team','Make normal steps and exceptions understandable.'),('Transfer ownership','Agree access, documentation, maintenance and limitations.')])],
 'P11': [
  ('Can I use AI\nfor this task?', [('Three pathways','Approved. Prohibited. Conditional / review required.'),('Start with the task','A tool account alone does not approve a use case.')]),
  ('Approved', [('Assessed and recorded','The task, tool, information and intended output are defined.'),('Human review','A responsible person checks the output before use.')]),
  ('Prohibited', [('Outside the boundary','For example: personal or sensitive information in an unapproved public AI tool.'),('Accountability remains','AI must not quietly take over an important decision.')]),
  ('Conditional /\nreview required', [('An open question remains','Purpose, information, settings, access, retention or reviewer.'),('Before use','State and resolve the required conditions. Unassessed use stays in review.')]),
  ('Make the\ndecision usable.', [('Record the context','Owner, tool, information and intended output.'),('Record the decision','Reviewer, outcome, decision date and next review date.')]),
  ('A practical next step', [('Test one proposed task','Use non-sensitive or synthetic information while assessing it.'),('Keep a person accountable','A register supports decisions; it does not grant automatic approval.')])]
}

facebook = [
 'Important work can become hard to see one handover at a time.\n\nHeutrix helps Australian disability support providers improve recurring non-clinical workflows, with allied health as a secondary focus. We begin with ownership, status, exceptions and the next action, then assess the smallest useful improvement.\n\nWorkflow first. Technology second.\n\nFollow for practical notes on intake, document follow-up, handovers and responsible administrative AI. Keep any comments general and free of personal or confidential information.',
 'Before choosing another tool, ask five questions: what starts the work, who acts next, what information is needed, what happens when the normal path breaks, and who confirms it is done?\n\nThe free Workflow Bottleneck Scorecard helps you examine one workflow at a time. No email is required. A self-assessment is a starting point, not a verified business case.\n\n' + SCORE,
 'Does the workflow rely on someone remembering the next step?\n\nUpdates that need chasing, side spreadsheets and work that stalls when one person is away are useful signs to inspect.\n\nChoose one recent item. Can the responsible person see its owner, status, next action and review date without asking for the backstory?\n\nA clearer handover may be a useful first step. Keep examples general and free of personal information.',
 'An intake can move through several people while its next action stays unclear.\n\nAt each handover, make five things visible at an appropriate level: owner, status, what is missing, next action and review date. Sensitive records can remain in the approved source system.\n\nWhere does someone have to reconstruct the story? Use only general examples in the comments.',
 'Illustrative operating view — not compliance or service-readiness assurance.\n\n“Starting soon” leaves too much unanswered. A practical commencement view shows the owner, what is complete, what is waiting and who makes the readiness decision under the provider’s process.\n\nA green cell does not make that decision. A named person does.\n\nReady means ______, and ______ confirms it.',
 'Illustrative application — not a client result.\n\nA request to automate reminders may first need a clearer rule. If teams disagree about complete, exceptions have no owner and trigger data is inconsistent, automation can repeat the confusion.\n\nA useful first step is to agree the rule, name the decision owner and check a non-sensitive baseline. Then reassess whether to build.\n\nIs the rule stable enough to automate?',
 'Three problems. Three independent Heutrix starting points.\n\nHeutrix Diagnostics: you are unsure what to fix first.\nHeutrix Workflow Transformation: one defined workflow needs implementation, testing and handover.\nHeutrix AI Guardrails: administrative AI-use boundaries and review are unclear.\n\nA free, 20-minute fit conversation helps identify the next step. No sensitive information or technical brief is needed.\n\nTalk to Heutrix: ' + CONTACT,
 'Go live is not the finish line.\n\nHeutrix Workflow Transformation follows Diagnose, Triage, Build and Handover: understand the workflow, design responsibilities and acceptance, implement and test, then guide the team and transfer ownership.\n\nThe improvement may use a clearer process or existing systems. New software is only one option.\n\nOne bounded non-clinical workflow, within a written scope.',
 'Before a project closes, the team should know how to operate the workflow, handle exceptions, manage access and understand its limitations.\n\nUseful handover helps the next responsible person run and maintain the work without reconstructing the project from memory.\n\nAsk: what can our team run, explain and maintain when the project ends?',
 'Before AI supports an administrative task, make five things clear: the approved use, information boundaries, tool and settings, human reviewer, and where the final version belongs.\n\nAn approved account alone does not answer all five. Start narrow and use non-sensitive or synthetic inputs while assessing an idea.\n\nKeep a person accountable for the final output and the decision it supports.',
 'Illustrative decision framework.\n\nA practical administrative AI policy needs three pathways: approved, prohibited, and conditional / review required.\n\nAn unassessed use stays in review. Conditional use must state what needs resolving before it can proceed.\n\nFor one proposed task, record who decided, what the information boundary is and when the decision will be reviewed. This is general operational guidance, not legal or privacy advice.',
 'Removing a name does not automatically remove identification risk. The remaining context can still point to a person.\n\nThe OAIC recommends avoiding personal information, especially sensitive information, in publicly available generative AI tools as a matter of best practice.\n\nUse non-sensitive or synthetic information while assessing an administrative use case. Read the guidance: ' + OAIC
]
founder_texts = [
 'I’m introducing Heutrix: practical workflow improvement for Australian disability support providers, with allied health as a secondary focus.\n\nOur starting point is a simple question: can the next responsible person see what needs to happen without rebuilding the story from inboxes and memory?\n\nSometimes the answer is a clearer process. Sometimes it is better use of existing systems or a scoped build. A useful recommendation can also be no build.\n\nWorkflow first. Technology second.\n\nOver the next few weeks, I’ll share practical questions about intake, handovers and responsible administrative AI. If you work in provider operations, I would welcome your general perspective. Please leave personal and confidential details out.\n\n#DisabilitySupport #WorkflowImprovement',
 'A useful question for the next intake handover: what does the next person need to act without asking for the backstory?\n\nOwner. Current status. What is missing. Next action. Review date.\n\nThese fields do not replace a provider’s approved records or decisions. They make the operational handover easier to examine.\n\nAt Heutrix, this is why we begin with the workflow before talking about tools. If the ownership or exception rule is unclear, a new reminder may simply repeat the ambiguity.\n\nWhat would you check first? Please keep examples general.\n\n#DisabilityProviders #ServiceOperations',
 'A clear workflow problem does not need to pass through a compulsory ladder of products.\n\nAt Heutrix, the starting point depends on the decision.\n\nUnclear priority or feasibility can call for Heutrix Diagnostics. A defined workflow may be ready for Heutrix Workflow Transformation. Unclear administrative AI boundaries may call for Heutrix AI Guardrails.\n\nThe first fit conversation can also lead to no project. That is a useful outcome if the problem is small, the timing is wrong or another discipline is needed.\n\nTalk to Heutrix about one high-level problem: ' + CONTACT + '\n\n#WorkflowImprovement #DisabilitySupport',
 '“Can I use AI for this?” is a task-level question.\n\nA useful answer needs more than the name of an approved product. It needs the information boundary, intended output, settings, reviewer and decision about whether that use is allowed.\n\nAt Heutrix, we treat accountable human review as part of the workflow. An unassessed idea stays in review while the open questions are resolved.\n\nUse non-sensitive or synthetic information during assessment. Keep professional decisions with the people accountable for them.\n\n#ResponsibleAI #DisabilitySupport'
]

def wrap(text, face, size, width):
    out=[]
    for p in text.split('\n'):
        line=''
        for word in p.split():
            nxt=(line+' '+word).strip()
            if line and pdfmetrics.stringWidth(nxt,face,size)>width:
                out.append(line); line=word
            else: line=nxt
        out.append(line)
    return out

def block(c, text, x, top, width, size, face, color, leading=1.22):
    lines=wrap(text,face,size,width)
    c.setFillColor(HexColor(color)); c.setFont(face,size)
    for ln in lines:
        c.drawString(x,1350-top-size,ln); top+=size*leading
    return top

def draw_page(c,title,rows,kicker,foot,number='',dark=False,numbered=True):
    bg='#033862' if dark else '#F8FAFC'
    fg='#FFFFFF' if dark else '#033862'
    subtle='#CBD5E1' if dark else '#334155'
    accent='#8DE4E0' if dark else '#01647C'
    c.setFillColor(HexColor(bg)); c.rect(0,0,1080,1350,fill=1,stroke=0)
    c.drawImage(str(MARKETING / ('brand/logo-2026-09/heutrix-logo-reversed.png' if dark else 'brand/logo-2026-09/heutrix-logo-colour.png')),72,1230,width=205,height=60,preserveAspectRatio=True,mask='auto')
    c.setStrokeColor(HexColor('#01989C')); c.setLineWidth(5); c.line(72,1207,1008,1207)
    block(c,kicker,72,174,936,24,'InterSemi',accent)
    title_size=68
    end=block(c,title,72,236,936,title_size,'Jakarta',fg,1.13)
    top=max(end+44,478)
    # A shared scale prevents neighbouring slides from changing type size.
    # Document explanation cards are unnumbered; explicit question numbers
    # occupy the number column once, without an additional automatic index.
    size, body_size = 34, 30
    prepared=[]
    for idx,(label,body) in enumerate(rows,1):
        explicit=re.match(r'^(\d+)\.\s+(.+)$',label)
        numeral=f'{idx:02}' if numbered else ''
        if explicit:
            numeral=f'{int(explicit[1]):02}'
            label=explicit[2]
        prepared.append((numeral,label,body))
    text_x=170 if any(n for n,_,_ in prepared) else 100
    text_width=980-text_x
    height=max(128,max(len(wrap(label,'Jakarta',size,text_width))*size*1.16
        +10+len(wrap(body,'Inter',body_size,text_width))*body_size*1.24+40
        for _,label,body in prepared))
    if top+len(rows)*height+(len(rows)-1)*16>1194:
        raise ValueError(('Artwork overflow',title,height))
    for numeral,label,body in prepared:
        c.setFillColor(HexColor('#18243B' if dark else '#FFFFFF'))
        c.setStrokeColor(HexColor('#334155' if dark else '#E2E8F0'))
        c.setLineWidth(1.5)
        c.roundRect(72,1350-top-height,936,height,14,fill=1,stroke=1)
        # Fixed digit cells give every index equal width, in the heading face
        # and size, on exactly the same first-line baseline.
        c.setFont('Jakarta',size); c.setFillColor(HexColor(accent))
        for digit_index,digit in enumerate(numeral):
            c.drawCentredString(105+digit_index*23,1350-top-22-size,digit)
        y=block(c,label,text_x,top+22,text_width,size,'Jakarta',fg,1.16)
        block(c,body,text_x,y+10,text_width,body_size,'Inter',subtle,1.24)
        top+=height+16
    footlines=wrap(foot,'Inter',25,820)
    assert len(footlines)<=2,(title,foot)
    block(c,foot,72,1241,820,25,'Inter',subtle,1.2)
    if number:
        c.setFont('InterSemi',24);c.setFillColor(HexColor(accent));c.drawRightString(1008,57,number)

def render_pdf(data, path, page_dir=None):
    doc=fitz.open(stream=data,filetype='pdf')
    for i,p in enumerate(doc):
        png=p.get_pixmap(matrix=fitz.Matrix(1,1),alpha=False).tobytes('png')
        if page_dir: (page_dir / f'{path.stem}-{i+1:02}.png').write_bytes(png)
        elif i==0:path.write_bytes(png)
    return doc

art_text=[]
for pid,(title,rows,kicker,foot) in specs.items():
    if selected and pid not in selected:
        art_text.append({'id':pid,'headline':title,'rows':rows,'label':kicker,'footer':foot})
        continue
    buf=io.BytesIO();c=canvas.Canvas(buf,pagesize=(1080,1350));c.setTitle(title.replace('\n',' '));c.setAuthor('Heutrix')
    draw_page(c,title,rows,kicker,foot,dark=pid in ['P07','P08','P11'])
    c.showPage();c.save();render_pdf(buf.getvalue(),ROOT/f'images/{pid}.png')
    art_text.append({'id':pid,'headline':title,'rows':rows,'label':kicker,'footer':foot})

transcript=['# LinkedIn document transcripts','Plain-text companions to the finished PDFs. These also provide the full reading order when the publishing surface does not support page-level alt text.']
for pid,pages in docs.items():
    dest=ROOT/f'documents/{pid}.pdf'
    c = canvas.Canvas(str(dest),pagesize=(1080,1350)) if not selected or pid in selected else None
    if c:
        c.setTitle(specs[pid][0].replace('\n',' '));c.setAuthor('Heutrix');c.setSubject('Practical non-clinical workflow field notes')
    transcript.append(f'\n## {pid}\n')
    for i,(title,rows) in enumerate(pages):
        label='ILLUSTRATIVE / NOT A CLIENT RESULT' if pid=='P06' else ('ILLUSTRATIVE DECISION FRAMEWORK' if pid=='P11' else specs[pid][2])
        footer='Illustrative application. Not a client result.' if pid=='P06' else ('General operational guidance. Not legal or privacy advice.' if pid=='P11' else ('Independent starting points, not mandatory stages.' if pid=='P07' else specs[pid][3]))
        if c:
            draw_page(c,title,rows,label,footer,f'{i+1}/{len(pages)}',dark=(i==0 or (pid=='P08' and i==3)),numbered=False)
            c.showPage()
        transcript.append(f'### Page {i+1}: '+title.replace('\n',' ')+'\n\n'+label+'\n\n'+'\n\n'.join(a+': '+b for a,b in rows)+'\n\n'+footer)
    if c:
        c.save()
        render_pdf(dest.read_bytes(),dest,ROOT/'document-pages')
(ROOT/'DOCUMENT-TRANSCRIPTS.md').write_text('\n\n'.join(transcript),encoding='utf-8')
(ROOT/'source/artwork-text.json').write_text(json.dumps(art_text,ensure_ascii=False,indent=2),encoding='utf-8')

# Preserve reviewed captions, calendar, founder copy and account decisions.
posts=json.loads((ROOT/'source/campaign.json').read_text(encoding='utf-8'))
for p in posts:
    if p['id'] in specs and (not selected or p['id'] in selected):
        title,rows,label,foot=specs[p['id']]
        p['alt']=label+'. '+title.replace('\n',' ')+' '+' '.join(a+': '+b for a,b in rows)+' '+foot
(ROOT/'source/campaign.json').write_text(json.dumps(posts,ensure_ascii=False,indent=2),encoding='utf-8')
print('Artwork refreshed: '+', '.join(sorted(selected or specs)))
raise SystemExit(0)

# Historical first-build logic below is retained for provenance; it is not run.
# Text-only banner: existing business name, not a newly drawn symbol or logo.
b=io.BytesIO();c=canvas.Canvas(b,pagesize=(1584,396));c.setFillColor(HexColor('#033862'));c.rect(0,0,1584,396,stroke=0,fill=1)
c.setFillColor(HexColor('#FFFFFF'));c.setFont('Jakarta',56);c.drawString(450,244,'Workflow first.')
c.setFillColor(HexColor('#8DE4E0'));c.drawString(450,171,'Technology second.')
c.setFillColor(HexColor('#CBD5E1'));c.setFont('Inter',26);c.drawString(450,100,'Heutrix  /  Practical non-clinical workflow improvement')
c.showPage();c.save();render_pdf(b.getvalue(),ROOT/'images/Heutrix-banner.png')

posts=[]
for n in range(1,13):
    pid=f'P{n:02}';week=(n-1)//3+1
    file=next(BANK.glob(f'Week_{week:02}_*.md'))
    full=file.read_text(encoding='utf-8-sig')
    section=re.search(rf'^## {pid} — (.*?)(?=^## P\d+|\Z)',full,re.M|re.S).group(1)
    title=section.splitlines()[0].strip()
    caption=section.split('### Post copy',1)[1].split('\n### ',1)[0].strip()
    caption=re.sub(r'\n---\s*$','',caption).strip()
    caption=caption.replace('**','')
    if pid=='P02':
        caption=caption.replace('No email address is required.','No email address is required.\n\nGet the Scorecard: '+SCORE)
    if pid=='P04':
        caption=caption.replace('\n\n#DisabilitySupport', '\n\nUse the free Enquiry-to-Service-Start Visibility Starter Kit to examine one handover. No email is required. Keep completed working documents in your approved systems.\n'+INTAKE+'\n\n#DisabilitySupport')
    if pid=='P06':
        caption=caption.replace('Then Heutrix Diagnostics finds three problems:','In this illustrative scenario, Heutrix Diagnostics identifies three problems:')
    if pid=='P07':caption=caption.replace('Talk to Heutrix.','Talk to Heutrix: '+CONTACT)
    if pid=='P11':caption=caption.replace('Your AI policy fails at the moment a staff member asks:','Illustrative decision framework.\n\nYour AI policy is tested when a staff member asks:')
    if pid=='P12':
        caption='Removing the name does not automatically remove identification risk.\n\nIn a small team or unusual situation, the remaining context may still identify a person.\n\nThe OAIC recommends avoiding personal information, particularly sensitive information, in publicly available generative AI tools as a matter of best practice.\n\nBefore an administrative AI use proceeds, check its purpose, information, approved tool and settings, access, retention and accountable reviewer.\n\nUse non-sensitive or synthetic information while assessing an idea, and obtain qualified advice where needed.\n\nRead the OAIC guidance: '+OAIC+'\n\n#PrivacyAware #ResponsibleAI #DisabilitySupport'
    caption=re.sub(r'\n{3,}','\n\n',caption)
    dt=date(2026,9,14)+timedelta(days=(week-1)*7+((n-1)%3)*2)
    tz='AEDT' if dt>=date(2026,10,4) else 'AEST'
    baseformat='document' if pid in docs else ('image' if pid in ['P01','P05'] else 'text')
    alt='Heutrix launch graphic: Workflow first. Technology second. Make the next action clear. A conceptual illustration shows disconnected blank cards joining a clear teal path.' if pid=='P01' else (specs[pid][2]+'. '+specs[pid][0].replace('\n',' ')+' '+ ' '.join(a+': '+b for a,b in specs[pid][1])+' '+specs[pid][3])
    fb=facebook[n-1]+'\n\n#DisabilitySupport #WorkflowImprovement' if n!=12 else facebook[n-1]+'\n\n#ResponsibleAI #DisabilitySupport'
    if pid=='P04':
        fb=fb.replace('\n\n#DisabilitySupport', '\n\nTry the free Enquiry-to-Service-Start Visibility Starter Kit. No email required:\n'+INTAKE+'\n\n#DisabilitySupport')
    (ROOT/f'captions/{pid}-linkedin.txt').write_text(caption+'\n',encoding='utf-8')
    (ROOT/f'captions/{pid}-facebook.txt').write_text(fb+'\n',encoding='utf-8')
    posts.append({'id':pid,'week':week,'date':dt.isoformat(),'day':dt.strftime('%A'),'timezone':tz,'linkedin_time':'08:15','facebook_time':'12:15','format':baseformat,'title':title,'linkedin':caption,'facebook':fb,'image':f'images/{pid}.png','pdf':f'documents/{pid}.pdf' if pid in docs else None,'pages':len(docs.get(pid,[])),'alt':alt,'status':'prepared; not scheduled','source':str(file.relative_to(MARKETING))})
for i,body in enumerate(founder_texts,1):(ROOT/f'founder/F{i:02}.txt').write_text(body+'\n',encoding='utf-8')
(ROOT/'source/campaign.json').write_text(json.dumps(posts,ensure_ascii=False,indent=2),encoding='utf-8')

calendar=['# Publishing calendar','Target dates, not scheduled posts. All times are Australia/Sydney. Page: 08:15; Facebook: 12:15. 14 September–2 October is AEST (UTC+10); 5–9 October is AEDT (UTC+11). Confirm coverage for 25 September and 5 October; shift to a covered day if required.','| Date | Day | ID | LinkedIn format | Topic | Asset |','|---|---|---|---|---|---|']
for p in posts:
    asset=f'[PDF]({p["pdf"]})' if p['pdf'] else (f'[Image]({p["image"]})' if p['format']=='image' else 'Text; optional Facebook image supplied')
    calendar.append(f'| {p["date"]} | {p["day"]} | {p["id"]} | {p["format"]} | {p["title"]} | {asset} |')
calendar += ['\n## Founder posts','| Date | Time | File |','|---|---|---|']
for i in range(1,5):calendar.append(f'| {(date(2026,9,15)+timedelta(days=(i-1)*7)).isoformat()} | 08:15 Sydney | [F{i:02}](founder/F{i:02}.txt) |')
calendar += ['\n## Publishing controls','Use the single PDF file for a LinkedIn document post, not a scheduled multi-photo upload. Native LinkedIn Page scheduling is available to the relevant Page admins, and supports dates up to three months ahead; multiple-photo posts and reshares cannot be scheduled that way. Confirm the actual composer preview, time and queue entry. If document scheduling is unavailable in that account, publish the PDF manually at the listed time or use the supplied single-image version with the same caption. [LinkedIn Help](https://www.linkedin.com/help/linkedin/answer/a548192/scheduled-posts-for-linkedin-pages?lang=en), checked 12 September 2026.','Record the actual post URL and publication time only after it exists. Add image alt text using the composer where available. For document posts, the caption and [transcript](DOCUMENT-TRANSCRIPTS.md) carry the substantive reading order; do not claim the PDFs are fully tagged accessible documents.','At 9 October review the first four weeks before adapting the remaining content bank.']
(ROOT/'CALENDAR.md').write_text(re.sub(r'(?<=\|)\n\n(?=\|)', '\n', '\n\n'.join(calendar)),encoding='utf-8')

# Portable local review document; no hosting, accounts, network or analytics.
cards=[]
for p in posts:
    esc=html.escape
    pdf=f'<a href="{p["pdf"]}">Open {p["pages"]}-page PDF</a> · ' if p['pdf'] else ''
    cards.append(f'''<article id="{p['id']}" data-week="{p['week']}"><div class="preview"><a href="{p['image']}"><img loading="lazy" src="{p['image']}" alt="{esc(p['alt'])}"></a></div><div class="copy"><p class="eyebrow">{p['id']} · {p['date']} · {p['timezone']} · {p['format'].upper()}</p><h2>{esc(p['title'])}</h2><p>{pdf}<a href="{p['image']}">Open image</a></p><details open><summary>LinkedIn · 08:15</summary><button data-copy="{p['id']}-li">Copy caption</button><pre id="{p['id']}-li">{esc(p['linkedin'])}</pre></details><details><summary>Facebook · 12:15</summary><button data-copy="{p['id']}-fb">Copy caption</button><pre id="{p['id']}-fb">{esc(p['facebook'])}</pre></details><details><summary>Image alt text</summary><button data-copy="{p['id']}-alt">Copy alt text</button><pre id="{p['id']}-alt">{esc(p['alt'])}</pre></details></div></article>''')
page='''<!doctype html><html lang="en-AU"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Heutrix · September launch desk</title><style>@font-face{font-family:Jakarta;src:url(source/.fonts/Jakarta.ttf)}@font-face{font-family:Inter;src:url(source/.fonts/Inter.ttf)}*{box-sizing:border-box}[hidden]{display:none!important}body{margin:0;background:#f8fafc;color:#033862;font:16px Inter,Arial,sans-serif}header{background:#033862;color:white;padding:64px max(5vw,24px)}header p{color:#cbd5e1;max-width:850px;line-height:1.65}h1,h2{font-family:Jakarta,Arial,sans-serif}h1{font-size:clamp(32px,5vw,64px);max-width:900px;line-height:1.1}h2{font-size:25px;line-height:1.3}.eyebrow{font-size:12px;letter-spacing:.08em;font-weight:bold;color:#01647C}header .eyebrow{color:#8DE4E0}nav{position:sticky;top:0;background:#fff;border-bottom:1px solid #e2e8f0;padding:16px 5vw;z-index:2;display:flex;gap:10px;flex-wrap:wrap}button,select{font:inherit;padding:10px 16px;border:1px solid #01647C;border-radius:5px;color:#01647C;background:white;cursor:pointer}button:hover{background:#EFFAFA}a{color:#01647C}header a{color:#8DE4E0}main{max-width:1440px;margin:auto;padding:32px 5vw}article{display:grid;grid-template-columns:minmax(230px,360px) minmax(0,1fr);gap:32px;background:white;border:1px solid #e2e8f0;border-radius:12px;padding:24px;margin-bottom:28px}.preview img{width:100%;height:auto;border-radius:6px;border:1px solid #e2e8f0}.copy{min-width:0}pre{font:15px/1.65 Inter,Arial,sans-serif;white-space:pre-wrap;overflow-wrap:anywhere}summary{font-weight:bold;cursor:pointer;padding:15px 0}details{border-top:1px solid #e2e8f0}details button{font-size:13px}footer{padding:32px 5vw;color:#334155}#status{color:#01647C;padding:10px;min-width:140px}.note{background:#EFFAFA;padding:20px;line-height:1.6;border-left:4px solid #01647C;margin-bottom:24px}@media(max-width:760px){article{grid-template-columns:1fr}.preview{max-width:350px;margin:auto}header{padding:36px 24px}main{padding:20px 16px}}</style><header><p class="eyebrow">HEUTRIX / ACQUISITION LAUNCH / 14 SEPTEMBER–9 OCTOBER 2026</p><h1>One clear workflow.<br>One useful next conversation.</h1><p>12 LinkedIn posts. 12 Facebook adaptations. 4 founder posts. 5 swipe documents. A complete four-week publishing package, prepared for review and manual activation.</p><p><a href="STRATEGY.md">Strategy</a> · <a href="OUTREACH-AND-REPLIES.md">Outreach & replies</a> · <a href="PROFILE-COPY.md">Profiles</a> · <a href="READINESS.md">Readiness & evidence</a> · <a href="CALENDAR.md">Calendar</a> · <a href="DOCUMENT-TRANSCRIPTS.md">Document transcripts</a></p></header><nav><label for="week">Show </label><select id="week"><option value="all">All four weeks</option><option value="1">Week 1</option><option value="2">Week 2</option><option value="3">Week 3</option><option value="4">Week 4</option></select><span role="status" aria-live="polite" id="status"></span></nav><main><div class="note"><strong>Prepared, not scheduled.</strong> LinkedIn Page posts: 08:15 Sydney. Facebook: 12:15. Confirm publisher, backup and launch decisions in Readiness. Use the verified website address in these captions; the custom domain is a holding redirect. Text-first LinkedIn posts have optional graphics for Facebook.</div>'''+''.join(cards)+'''<section class="note"><h2>Founder posts</h2><p>One authorised founder, Tuesdays at 08:15 Sydney. Review first-person wording before use.</p><p><a href="founder/F01.txt">15 Sep · Introduction</a> · <a href="founder/F02.txt">22 Sep · Intake handovers</a> · <a href="founder/F03.txt">29 Sep · Starting points</a> · <a href="founder/F04.txt">6 Oct · Administrative AI</a></p></section></main><footer>Heutrix · Workflow first. Technology second.<br>Local review document. No external tracking, publication or scheduling.</footer><script>document.getElementById('week').addEventListener('change',e=>{document.querySelectorAll('article').forEach(a=>a.hidden=e.target.value!=='all'&&a.dataset.week!==e.target.value)});document.querySelectorAll('[data-copy]').forEach(b=>b.addEventListener('click',async()=>{const text=document.getElementById(b.dataset.copy).innerText;let ok=false;try{await navigator.clipboard.writeText(text);ok=true}catch{const t=document.createElement('textarea');t.value=text;document.body.append(t);t.select();ok=document.execCommand('copy');t.remove()}document.getElementById('status').textContent=ok?'Copied.':'Select the caption and copy it.'}));</script></html>'''
(ROOT/'publishing-desk.html').write_text(page,encoding='utf-8')
from publishing_desk import refresh_desk
refresh_desk(ROOT)

# Assertions target release mistakes rather than mirroring implementation.
assert len(posts)==12 and sum(p['pages'] for p in posts)==23
for p in posts:
    assert len(p['linkedin'])<3000,(p['id'],'caption too long')
    assert len(p['facebook'])<2200
    assert '###' not in p['linkedin'] and 'Publisher' not in p['linkedin']
    assert (ROOT/p['image']).exists(),p['image']
    if p['pdf']:
        d=fitz.open(ROOT/p['pdf']);assert len(d)==p['pages']
        assert all(len(pg.get_text().strip())>80 for pg in d)
for i in range(1,5): assert (ROOT/f'founder/F{i:02}.txt').exists()

# Review contact sheets are only QA; do not upload them as carousel pages.
for name,files in [('social-contact-sheet',sorted((ROOT/'images').glob('P*.png'))),('document-contact-sheet',sorted((ROOT/'document-pages').glob('*.png')))]:
    cols=4;thumbw=270;thumbh=365
    sheet=Image.new('RGB',(cols*thumbw,((len(files)+cols-1)//cols)*thumbh),'#E2E8F0');dr=ImageDraw.Draw(sheet)
    for i,f in enumerate(files):
        im=Image.open(f).convert('RGB');im.thumbnail((254,326))
        x=(i%cols)*thumbw+8;y=(i//cols)*thumbh+25;sheet.paste(im,(x,y));dr.text((x,y-18),f.stem,fill='#033862')
    sheet.save(ROOT/f'source/scratch/{name}.jpg',quality=94)
print(json.dumps({'posts':len(posts),'facebook':len(posts),'founder_posts':4,'post_images':12,'documents':5,'document_pages':23,'longest_linkedin_caption':max(len(p['linkedin']) for p in posts)},indent=2))

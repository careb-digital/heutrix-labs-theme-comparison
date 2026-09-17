"""Refresh the publishing interface from the finished caption and message files.
No account access, scheduling, external requests or artwork regeneration.
"""
from pathlib import Path
from datetime import date, timedelta
import html
import json
import re

def refresh_desk(root):
    esc = html.escape
    posts = json.loads((root/'source/campaign.json').read_text(encoding='utf-8'))
    for p in posts:
        for channel in ('linkedin', 'facebook'):
            p[channel] = (root/f'captions/{p["id"]}-{channel}.txt').read_text(encoding='utf-8').strip()
    (root/'source/campaign.json').write_text(json.dumps(posts, ensure_ascii=False, indent=2), encoding='utf-8')
    def copy_panel(label, key, body, opened=False):
        return f'<details{" open" if opened else ""}><summary>{esc(label)}</summary><button type="button" data-copy="{key}">Copy {esc(label)}</button><pre id="{key}">{esc(body)}</pre></details>'

    founder_names={1:'Sachin',2:'Rochelle',3:'Janith',4:'Reserve - author to be chosen'}
    cards=[]
    for p in posts:
        pid=p['id']
        asset=f'<a href="{p["pdf"]}" download>Download {p["pages"]}-page PDF</a> · ' if p['pdf'] else ''
        if p['pdf']:
            asset += f'<details><summary>Document pages</summary><div class="pages">'+''.join(f'<a href="document-pages/{pid}-{i:02}.png"><img loading="lazy" src="document-pages/{pid}-{i:02}.png" alt="{pid}, page {i} of {p["pages"]}. Full text is in Document transcripts."></a>' for i in range(1,p['pages']+1))+'</div></details>'
        document_title=copy_panel('LinkedIn document title',pid+'-title',p['document_title']) if p['pdf'] else ''
        upload='Upload the single PDF and paste the document title below.' if p['pdf'] else ('Upload the supplied image and add its alt text.' if p['format']=='image' else 'Paste the caption as a text post. The image is optional.')
        cards.append(f'''<article data-week="{p['week']}"><div class="preview"><img loading="lazy" src="{p['image']}" alt="{esc(p['alt'])}"><p><a href="{p['image']}" download>Download image</a></p>{asset}</div><div class="copy"><p class="eyebrow">WEEK {p['week']} / {pid} / {p['date']} · {p['linkedin_time']} {p['timezone']}</p><h2>{esc(p['title'])}</h2><p class="meta"><strong>LinkedIn Page · {p['linkedin_time']} {p['timezone']} scheduled.</strong> {upload} {esc(p['content_review'])}. {esc(p['status'])}.</p>{document_title}{copy_panel('LinkedIn caption', pid+'-li', p['linkedin'], True)}{copy_panel('Image alt text',pid+'-alt',p['alt'])}<p class="meta"><strong>Facebook · deferred.</strong> When activated, use the image with this shorter caption and supplied image alt text. {p['facebook_time']} {p['timezone']} is an optional reuse time; set a new covered date. The LinkedIn PDF is not the Facebook attachment.</p>{copy_panel('Facebook reserve',pid+'-fb',p['facebook'])}</div></article>''')

    founder=[]
    for i in range(1,5):
        body=(root/f'founder/F{i:02}.txt').read_text(encoding='utf-8').strip()
        founder.append(copy_panel(f'F{i:02} · {founder_names[i]} · Week {i}',f'founder-{i}',body))
    outreach=[]
    raw=(root/'OUTREACH-AND-REPLIES.md').read_text(encoding='utf-8')
    for heading, body in re.findall(r'^## ([^\n]+)\n(.*?)(?=^## |\Z)',raw,re.M|re.S):
        key=re.match(r'([A-Z]\d+[a-z]?)',heading).group(1)
        # Operator guidance is separate from copyable messages.
        chunks=re.split(r'^### (.+)\n',body,flags=re.M)
        for index in range(0,len(chunks),2):
            title=heading if index==0 else chunks[index-1]
            text=chunks[index]
            notes=[]
            clean=[]
            for paragraph in text.strip().split('\n\n'):
                if paragraph.startswith(('Operator:', '**Use only')):
                    notes.append(paragraph.replace('**',''))
                else:
                    clean.append(paragraph)
            itemkey=key if index==0 else re.match(r'([A-Z]\d+[a-z]?)',title).group(1)
            outreach.append('<div class="message">'+''.join(f'<p class="meta">{esc(n)}</p>' for n in notes)+copy_panel(title,'msg-'+itemkey,'\n\n'.join(clean))+'</div>')
    profiles=[]
    raw=(root/'PROFILE-COPY.md').read_text(encoding='utf-8')
    for n,(heading,body) in enumerate(re.findall(r'^## ([^\n]+)\n(.*?)(?=^## |\Z)',raw,re.M|re.S)):
        if heading=='Account setup':continue
        profiles.append(copy_panel(heading,f'profile-{n}',body.strip()))
    style='''@font-face{font-family:Jakarta;src:url(source/.fonts/Jakarta.ttf)}@font-face{font-family:Inter;src:url(source/.fonts/Inter.ttf)}*{box-sizing:border-box}[hidden]{display:none!important}body{margin:0;background:#f8fafc;color:#033862;font:16px/1.6 Inter,Arial,sans-serif}header{background:#033862;color:#fff;padding:52px max(5vw,24px)}header p{max-width:900px;color:#cbd5e1}h1,h2,h3{font-family:Jakarta,Arial,sans-serif;line-height:1.18}h1{font-size:clamp(32px,5vw,62px);max-width:950px}h2{font-size:26px}.eyebrow{font-size:12px;letter-spacing:.07em;font-weight:bold;color:#01647C}header .eyebrow{color:#8DE4E0}a{color:#01647C;text-underline-offset:3px}header a{color:#8DE4E0}nav{position:sticky;top:0;background:#fff;padding:14px 5vw;z-index:2;border-bottom:1px solid #e2e8f0;display:flex;gap:12px;align-items:center;flex-wrap:wrap}button,select{font:inherit;padding:9px 13px;border:1px solid #01647C;border-radius:5px;color:#01647C;background:#fff;cursor:pointer}button:hover{background:#EFFAFA}a:focus-visible,button:focus-visible,select:focus-visible,summary:focus-visible{outline:3px solid #01647C;outline-offset:4px}header a:focus-visible{outline-color:#8DE4E0}main{max-width:1440px;margin:auto;padding:30px 5vw}article{display:grid;grid-template-columns:minmax(220px,340px) minmax(0,1fr);gap:30px;background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:24px;margin-bottom:28px}.preview img{width:100%;height:auto;border-radius:5px;border:1px solid #e2e8f0}.copy{min-width:0}pre{font:15px/1.65 Inter,Arial,sans-serif;white-space:pre-wrap;overflow-wrap:anywhere}details{border-top:1px solid #e2e8f0}summary{font-weight:bold;cursor:pointer;padding:14px 0}details button{font-size:13px}.meta{color:#334155;font-size:14px}.note{background:#EFFAFA;border-left:4px solid #01647C;padding:20px;margin-bottom:28px}.library{background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:24px;margin:28px 0;scroll-margin-top:100px}.pages{display:grid;grid-template-columns:1fr 1fr;gap:8px}footer{padding:24px 5vw;color:#334155}#status{color:#01647C;font-size:14px}.message{margin-bottom:14px}#posts{scroll-margin-top:100px}@media(max-width:760px){article{grid-template-columns:1fr}.preview{max-width:350px;margin:auto}main{padding:18px 14px}header{padding:30px 22px}article,.library{padding:18px}nav{padding:10px 14px;gap:8px}nav a{font-size:13px}}'''
    page=f'''<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Heutrix · Monday publishing desk</title><style>{style}</style></head><body><header><img src="images/heutrix-logo-reversed.svg" alt="Heutrix" width="210" style="height:auto;padding:12px"><p class="eyebrow">HEUTRIX / 21 SEPTEMBER–16 OCTOBER 2026</p><h1>One clear workflow.<br>One useful next conversation.</h1><p>Twelve company Page posts are scheduled for four weeks, Monday/Wednesday/Friday at 08:15 Australia/Sydney. Janith’s account scheduled the Heutrix Labs Page series. The earlier P01 copy on 18 September is retained by owner instruction. Founder profile drafts remain separate; Facebook remains deferred.</p><p><a href="STRATEGY.md">Acquisition strategy</a> · <a href="CALENDAR.md">Calendar</a> · <a href="READINESS.md">Launch handoff</a> · <a href="DOCUMENT-TRANSCRIPTS.md">Document transcripts</a></p></header><nav aria-label="Publishing desk"><label for="week">Page posts</label><select id="week"><option value="all">All four weeks</option>{''.join(f'<option value="{i}">Week {i}</option>' for i in range(1,5))}</select><a href="#posts">Posts</a><a href="#outreach">Messages & replies</a><a href="#founder">Founder posts</a><a href="#profiles">Profiles</a><span id="status" role="status" aria-live="polite"></span></nav><main><div class="note"><strong>Scheduled: P01–P12 · Heutrix Labs · 08:15 Sydney.</strong><br>Queue verified 15 September: 12 entries from 21 September to 16 October, plus the existing P01 on 18 September retained by the owner. <a href="https://www.linkedin.com/company/123474001/admin?share=true&amp;view=management&amp;actorCompanyId=123474001">Open the scheduled queue</a>. AEST applies through 2 October; AEDT from 5 October. Scheduling is complete; publication remains future. Website/email enquiries: Shashane; backup: Rochelle. Janith’s fit-call windows: weekdays 3–5 pm and Saturday 9 am–1 pm; Rochelle backup weekdays 1–5 pm. Agree actual appointments individually. Founder drafts and Facebook remain outside this Page queue.</div><section id="posts" aria-label="LinkedIn campaign posts">{''.join(cards)}</section><section id="outreach" class="library"><h2>Messages, replies and community posts</h2><p>Use real context and a recorded permission basis for direct marketing. Complete bracketed fields before sending. A connection, public address or resource download alone does not qualify. Keep contact and suppression records in the approved system outside Git. <a href="OUTREACH-AND-REPLIES.md">Full operator guidance</a>.</p>{''.join(outreach)}</section><section id="founder" class="library"><h2>Founder posts</h2><p>Owner-confirmed order: F01 Sachin, F02 Rochelle, F03 Janith. These are original profile posts, separate from the company Page posts. Review the wording in each founder’s own account before use. F04 is an optional reserve with no author assigned. Dates can move.</p>{''.join(founder)}</section><section id="profiles" class="library"><h2>Profile copy</h2><p>LinkedIn Page first; founder order is recorded above. Facebook text remains a reserve. Use profile text only after the relevant account owner reviews it. Preserve the existing approved account identity and use the verified website address. The supplied 1584 × 396 banner is a personal-profile reserve; preview cropping before use.</p>{''.join(profiles)}</section></main><footer>Heutrix · Workflow first. Technology second.<br>Local publishing pack. No external tracking, account access, scheduling or sending.</footer><script>document.getElementById('week').addEventListener('change',e=>{{document.querySelectorAll('article[data-week]').forEach(a=>a.hidden=e.target.value!=='all'&&a.dataset.week!==e.target.value)}});document.querySelectorAll('[data-copy]').forEach(b=>b.addEventListener('click',async()=>{{const text=document.getElementById(b.dataset.copy).innerText;let ok=false;try{{await navigator.clipboard.writeText(text);ok=true}}catch{{const t=document.createElement('textarea');t.value=text;document.body.append(t);t.select();ok=document.execCommand('copy');t.remove()}}document.getElementById('status').textContent=ok?'Copied. Complete any bracketed fields before use.':'Select the text and copy it.'}}));</script></body></html>'''
    page=page.replace('<a href="STRATEGY.md">Acquisition strategy</a>', '<a href="CHANNEL-ANALYSIS.md">Channel comparison</a> · <a href="STRATEGY.md">Acquisition strategy</a>')
    page=page.replace('Use real context and a recorded permission basis for direct marketing.', 'Prioritise welcomed founder introductions and one relevant workflow conversation. Use the scenario selector in the full guidance to choose a script. Use real context and a recorded permission basis for direct marketing.')
    (root/'publishing-desk.html').write_text(page, encoding='utf-8')
    # Markdown table rows must be contiguous to render as tables.
    cal=(root/'CALENDAR.md').read_text(encoding='utf-8')
    cal=re.sub(r'(?<=\|)\n\n(?=\|)','\n',cal)
    # Owner-confirmed founder assignments are maintained in CALENDAR.md.
    (root/'CALENDAR.md').write_text(cal, encoding='utf-8')
    return posts

if __name__=='__main__':
    root=Path(__file__).resolve().parents[1]
    print(f'Refreshed {len(refresh_desk(root))} posts and the complete copy library.')

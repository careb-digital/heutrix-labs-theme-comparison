import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const root = process.cwd();
const audit = '90-research-and-audits/folder-audit-2026-09-05';
const log = [];
function absolute(p) { const a=path.resolve(root,p); if(!a.startsWith(root+path.sep)) throw Error('Outside workspace: '+p); return a; }
function read(p){return fs.readFileSync(absolute(p),'utf8');}
function save(p,text){const a=absolute(p);fs.mkdirSync(path.dirname(a),{recursive:true});fs.writeFileSync(a,text);}
function change(p,text){
  if(p.startsWith('.codex/')) throw Error('Protected configuration is handled separately');
  if(fs.existsSync(absolute(p))){ const before=read(p); if(before===text)return; save(audit+'/original-text/'+p+'.original.txt',before); }
  save(p,text);log.push({action:'refine',path:p});
}
const replacements=JSON.parse(read(audit+'/refinements.json'));
for(const[p,text]of Object.entries(replacements))change(p,text);
const domains=[
 ['01-company','Company readiness','Verify identity, roles, cover and approved systems.',[
 ['Identity','identity-and-registrations/IDENTITY-CHECKLIST.md'],['Roles','founders-and-roles/ROLE-REGISTER.md'],['Systems','approved-systems/APPROVED-SYSTEMS.md'],['Insurance','insurance/INSURANCE-REGISTER.md']],
 'Review changed identity with Legal/Finance, public particulars with Marketing and system access with Privacy.','Evidence resolves; placeholders stay unverified; affected assets agree.'],
 ['02-market-and-offers','Market and offers','Maintain market choice and bounded offers; research remains a proposal until adopted.',[
 ['Ideal client','ideal-client/IDEAL-CLIENT-PROFILE.md'],['Positioning','positioning/POSITIONING.md'],['Offer specification','offers/offer-strategy-2026-09/02-flagship-offer-specification.md'],['Offer decisions','offers/offer-strategy-2026-09/01-offer-decision-document.md'],['Validation','offers/offer-strategy-2026-09/05-owner-validation-register.md'],['Pricing policy','pricing/PRICING-POLICY.md'],['Market-fit research (optional)','ideal-client/MARKET-FIT-EVALUATION-2026-09-05.md']],
 'Coordinate scope/pricing with Sales, Delivery, Finance and Legal; public positioning with Marketing.','Current offers and consumer assets agree; new research and prices retain their approval status.'],
 ['03-sales','Sales','Maintain qualification, calls, pipeline, proposals and follow-up within approved rules.',[
 ['Sales process — section index','fit-call/SALES-PROCESS-SPECIFICATION.md'],['Lead handling','lead-capture/LEAD-HANDLING.md'],['Pipeline summary','crm-and-pipeline/PIPELINE.md'],['Proposal requirements','proposals/README.md']],
 'Coordinate promises with Delivery, prices with Finance/Offers, terms/data with Legal, and the public journey with Marketing/app maintenance.','Synthetic journey checks pass where affected; proposed systems are not called live.'],
 ['04-delivery','Delivery','Maintain methods and reusable templates. The legacy Diagnostics native pack remains quarantined pending reissue.',[
 ['Diagnostics and pack status','diagnostics/README.md'],['Transformation','workflow-transformation/README.md'],['AI Guardrails','ai-guardrails/README.md'],['Acceptance','quality-and-acceptance/DELIVERY-STANDARDS.md'],['Templates','templates/README.md'],['Client structure','../08-client-project-template/README.md']],
 'Coordinate scope/timelines with Sales/Offers, effort with Finance, and acceptance/IP/data with Legal.','Affected synthetic walkthroughs pass; approved terms and native/export versions agree.'],
 ['05-legal-privacy-risk','Legal, privacy and risk','Maintain controlled drafts and review evidence. A folder or file does not establish legal approval.',[
 ['Review status','review-register/LEGAL-REVIEW-REGISTER.md'],['Legal masters','legal-masters/README.md'],['Data standard','data-handling/DATA-HANDLING-STANDARD.md'],['Website policies','website-policies/README.md']],
 'Review affected operating areas and involve the adviser required by existing gates; coordinate public notices with Marketing/app maintenance.','Versions, approval evidence and changed exports agree; missing particulars remain unresolved.'],
 ['06-marketing','Marketing','Maintain public copy, brand, proof and campaigns within approved positioning and publication permissions.',[
 ['Page copy','website-copy/README.md'],['Brand voice','brand/VOICE.md'],['Case study selection','case-studies-and-assets/README.md'],['Claim approval','case-studies-and-assets/PROOF-ASSET-REGISTER.md'],['Resource release','lead-magnets/README.md'],['LinkedIn — select a week or asset','linkedin/2026-launch/README.md'],['Outreach','outreach/OUTREACH-PLAN.md']],
 'Review claims with the evidence source, offers with Offers, collection with Sales/Privacy, and website changes with the app maintainer.','Claim limits and gates are preserved; affected public source, application and downloads agree.'],
 ['07-finance','Finance and capacity','Work from the current integrated model below; older forecast/pricing outputs are historical, not quoting masters.',[
 ['Current integrated workbook','outputs/01a064fc-3a18-7ef1-acac-173f1f26e409/Heutrix-Integrated-Forecast-Budget-and-Margin-Plan.xlsx'],['Pricing policy','../02-market-and-offers/pricing/PRICING-POLICY.md'],['Operating budget','operating-budget/README.md']],
 'Confirm effort with Delivery, price rules with Offers/Sales and entity/tax/payment assumptions with the relevant company/adviser owner.','Reserve the shared workbook; check changed formulas, assumptions and exports. An old report audit does not validate this different model.']
];
for(const[dir,title,scope,links,deps,done]of domains){
 let text=`# ${title}\n\n## Founder working guide\n**Working scope:** ${scope}\n\n**Current sources — choose the relevant one:**\n${links.map(([label,p])=>`- [${label}](${p})`).join('\n')}\n\n**Dependencies and review:** ${deps}\n\n**Complete when:** ${done}\n\n[Central folder ownership register](../01-company/founders-and-roles/ROLE-REGISTER.md#folder-ownership): Janith coordinates; folder owners unassigned. Use [changes](changes/README.md) only when a durable shared brief is needed. Routine work follows [AGENTS.md](../AGENTS.md); coordination details are [on demand](../00-control/COLLABORATION.md).\n`;
 if(dir==='07-finance')text+='\nThe 3 September model separates consultant and offshore-developer costs. Costs, scope hours, volumes, margin rules and tax/contractor assumptions remain provisional. Approval permits private quoting only; public prices remain excluded.\n';
 change(dir+'/README.md',text);
 const old=read(dir+'/changes/README.md');
 const rows=old.split(/\r?\n/).filter(l=>l.startsWith('|')&&!l.includes('No work allocated'));
 change(dir+'/changes/README.md',`# ${title} change records\n\nUse a [brief](../../00-control/templates/CHANGE-BRIEF.md) for multi-founder, multi-day or cross-folder coordination. A small edit needs only its review/task handoff. Do not duplicate plans or store client data.\n\n${rows.join('\n')}\n`);
}
// Preserve exact source slices; only rebase local hyperlinks for their new directory.
function rebaseLinks(text,oldFile,newFile){return text.replace(/\]\(([^)]+)\)/g,(whole,link)=>{
 if(/^[a-zA-Z][\w+.-]*:/.test(link)||link.startsWith('#'))return whole;
 const [file,...anchor]=link.split('#');
 let rel=path.relative(path.dirname(absolute(newFile)),path.resolve(path.dirname(absolute(oldFile)),file)).split(path.sep).join('/');
 return ']('+rel+(anchor.length?'#'+anchor.join('#'):'')+')';
});}
function split(source,folder,pattern,title){
 const original=read(source), hits=[...original.matchAll(pattern)], starts=[0,...hits.map(m=>m.index)];
 const records=[];
 for(let i=0;i<starts.length;i++){
  const raw=original.slice(starts[i],starts[i+1]??original.length);
  const heading=i===0?'Context and status':hits[i-1][0].replace(/^#+\s*/,'').trim();
  const name=String(i).padStart(2,'0')+'-'+heading.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,70)+'.md';
  const target=folder+'/'+name, content=rebaseLinks(raw,source,target);
  save(target,content);records.push({path:target,heading,raw,characters:content.length});
 }
 if(records.map(r=>r.raw).join('')!==original)throw Error('Split lost text');
 let index=`# ${title}\n\nSection index: read the context/status once, then only the section needed for your task. Source wording and approval gates were preserved during the 5 September 2026 split. These drafts are not approval to publish, quote or activate a system.\n\n`;
 for(const r of records){const rel=path.relative(path.dirname(source),r.path).split(path.sep).join('/');index+=`## ${r.heading}\n[Open this section](${rel})\n\n`;}
 change(source,index);
 log.push({action:'split',source,originalCharacters:original.length,originalHash:crypto.createHash('sha256').update(original).digest('hex'),indexCharacters:index.length,sections:records.map(({path,heading,characters})=>({path,heading,characters})),textPreserved:true});
}
split('03-sales/fit-call/SALES-PROCESS-SPECIFICATION.md','03-sales/fit-call/process-sections',/^# \d+\. .+$/gm,'Sales process specification');
split('06-marketing/website-copy/founder-trust-layer.md','06-marketing/website-copy/founder-trust-sections',/^# (?:\d+\. .+|Release recommendation)\r?$/gm,'Founder and delivery trust layer');
split('06-marketing/linkedin/2026-launch/06_Visual_Generation_Prompts.md','06-marketing/linkedin/2026-launch/visual-prompts',/^## (?:P\d+ .+|Final prompt and asset verification)\r?$/gm,'LinkedIn visual prompts — select one asset');
// Long historical setup explanations no longer belong in the active control reading path.
for(const name of ['FOUNDER-COLLABORATION-RECOMMENDATION-2026-09-05.md','IMPLEMENTATION-COMPARISON.md']){
 const old='00-control/'+name,dest='90-research-and-audits/workspace-history/'+name;
 save(dest,rebaseLinks(read(old),old,dest));
 change(old,`# Historical workspace reference\n\nThe [original document](../${dest}) is preserved for background. For current work use [collaboration](COLLABORATION.md) and [rollout status](COLLABORATION-SETUP.md). This historical explanation is not required for routine tasks.\n`);
 log.push({action:'archive-reference',source:old,destination:dest});
}
// Reversible directory move, validated against the resolved workspace before mutation.
const legacy='06-marketing/case-studies-and-assets/.superseded-2026-09-04', archived='99-archive/case-studies-2026-09-04';
const from=fs.realpathSync(absolute(legacy)),to=absolute(archived);
if(!from.startsWith(fs.realpathSync(root)+path.sep)||fs.existsSync(to))throw Error('Unsafe or occupied archive destination');
fs.renameSync(from,to);
log.push({action:'archive-directory',source:legacy,destination:archived});
// Relative links inside the moved historical library must still resolve in their new location.
for(const e of fs.readdirSync(to,{withFileTypes:true})){if(e.isFile()&&e.name.endsWith('.md')){
 const old=legacy+'/'+e.name,p=archived+'/'+e.name;
 let text=read(p).replace(/\]\(([^)]+)\)/g,(whole,link)=>{
  if(/^[a-zA-Z][\w+.-]*:/.test(link)||link.startsWith('#'))return whole;
  const [file,...anchor]=link.split('#');let target=path.resolve(path.dirname(absolute(old)),file);
  if(target.startsWith(from+path.sep))target=path.join(to,path.relative(from,target));
  return ']('+path.relative(path.dirname(absolute(p)),target).split(path.sep).join('/')+(anchor.length?'#'+anchor.join('#'):'')+')';
 });save(p,text);
}}
save(audit+'/changes.json',JSON.stringify(log,null,2));
console.log(JSON.stringify({refined:log.filter(x=>x.action==='refine').length,split:log.filter(x=>x.action==='split').map(({source,originalCharacters,indexCharacters,sections})=>({source,originalCharacters,indexCharacters,sections:sections.length})),archiveActions:log.filter(x=>x.action.startsWith('archive'))},null,2));

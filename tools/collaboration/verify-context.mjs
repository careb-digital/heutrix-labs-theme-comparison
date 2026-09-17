import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const root=process.cwd(), audit='90-research-and-audits/folder-audit-2026-09-05';
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const sha=p=>crypto.createHash('sha256').update(fs.readFileSync(path.join(root,p))).digest('hex');
const before=JSON.parse(read(audit+'/before/inventory.json'));
const changes=JSON.parse(read(audit+'/changes.json'));
const files=[],broken=[],failures=[];
const excluded=new Set(['.git','node_modules','.python-libs','.python-packages','.notebook-deps','__pycache__','tmp','_build','_qa','QA','analysis-output','.next','.wrangler','.cache','dist','.vinext','90-research-and-audits','99-archive','internal-reports']);
function walk(dir){for(const e of fs.readdirSync(path.join(root,dir),{withFileTypes:true})){
 const p=path.posix.join(dir,e.name);
 if(excluded.has(e.name)||e.name.startsWith('._')||e.name.startsWith('.superseded-')||e.isSymbolicLink())continue;
 if(e.isDirectory())walk(p);else if(e.name.endsWith('.md'))files.push(p);
}}
walk('');
let links=0;
for(const p of files){
 const text=read(p).replace(/^```[^\n]*\n[\s\S]*?^```[^\n]*/gm,'');
 for(const m of text.matchAll(/\]\(([^)]+)\)/g)){
  const link=m[1];if(/^[a-zA-Z][\w+.-]*:/.test(link)||link.startsWith('#'))continue;
  const target=path.resolve(root,path.dirname(p),decodeURIComponent(link.split('#')[0]));links++;
  if(!fs.existsSync(target))broken.push({file:p,link});
 }
}
if(broken.length)failures.push('Broken local paths in active Markdown');
// Reconstruct each original document from the actual saved sections, reversing relative-link rebasing.
const splits=[];
for(const c of changes.filter(x=>x.action==='split')){
 let reconstructed='';
 for(const section of c.sections){
  reconstructed+=read(section.path).replace(/\]\(([^)]+)\)/g,(whole,link)=>{
   if(/^[a-zA-Z][\w+.-]*:/.test(link)||link.startsWith('#'))return whole;
   const [file,...anchor]=link.split('#');
   const target=path.resolve(root,path.dirname(section.path),file);
   return ']('+path.relative(path.resolve(root,path.dirname(c.source)),target).split(path.sep).join('/')+(anchor.length?'#'+anchor.join('#'):'')+')';
  });
 }
 const original=read(audit+'/original-text/'+c.source+'.original.txt');
 const ok=reconstructed===original;
 if(!ok)failures.push('Split reconstruction differs: '+c.source);
 splits.push({source:c.source,sections:c.sections.length,exactReconstruction:ok,indexCharacters:read(c.source).length,originalCharacters:original.length,maxSectionCharacters:Math.max(...c.sections.map(s=>read(s.path).length))});
}
// All native assets, exports, QA evidence and active website source present before the audit must be unchanged.
const protectedRows=before.filter(r=>r.sha256 && (/\.(docx|xlsx|pptx|pdf|png|webp|jpg|jpeg|zip)$/i.test(r.path)||r.path.startsWith('apps/website/')) && !r.path.includes('/tmp/')&&!r.path.includes('/_build/'));
const modifiedAssets=[];
for(const r of protectedRows){if(!fs.existsSync(path.join(root,r.path))||sha(r.path)!==r.sha256)modifiedAssets.push(r.path);}
// Website README is intentionally a guide; application source and public assets must remain unchanged.
if(modifiedAssets.length)failures.push('Protected business/application assets changed');
const archiveMove=changes.find(c=>c.action==='archive-directory');
const archivedRows=before.filter(r=>r.path.startsWith(archiveMove.source+'/')&&r.sha256);
const archiveFailures=[];
for(const row of archivedRows){
 const moved=archiveMove.destination+row.path.slice(archiveMove.source.length);
 if(!fs.existsSync(path.join(root,moved))){archiveFailures.push(row.path);continue;}
 let digest;
 if(row.path.endsWith('.md')){
  const original=read(moved).replace(/\]\(([^)]+)\)/g,(whole,link)=>{
   if(/^[a-zA-Z][\w+.-]*:/.test(link)||link.startsWith('#'))return whole;
   const [file,...anchor]=link.split('#');let target=path.resolve(root,path.dirname(moved),file);
   const newBase=path.resolve(root,archiveMove.destination),oldBase=path.resolve(root,archiveMove.source);
   if(target.startsWith(newBase+path.sep))target=path.join(oldBase,path.relative(newBase,target));
   return ']('+path.relative(path.resolve(root,path.dirname(row.path)),target).split(path.sep).join('/')+(anchor.length?'#'+anchor.join('#'):'')+')';
  });digest=crypto.createHash('sha256').update(original).digest('hex');
 }else digest=sha(moved);
 if(digest!==row.sha256)archiveFailures.push(row.path);
}
if(archiveFailures.length)failures.push('Archived source preservation failed');
const common=['AGENTS.md','README.md','00-control/LAUNCH-BOARD.md','00-control/DECISIONS.md','00-control/VERIFIED-FACTS.md','00-control/RISKS-AND-BLOCKERS.md','00-control/COLLABORATION.md','00-control/DEPENDENCIES.md','01-company/founders-and-roles/ROLE-REGISTER.md'];
const baseChars=before.filter(r=>common.includes(r.path)).reduce((n,r)=>n+r.characters,0);
const reading=fs.readdirSync(root).filter(x=>/^0[1-7]-/.test(x)).map(folder=>{
 const old=baseChars+before.find(r=>r.path===folder+'/README.md').characters;
 const current=read('AGENTS.md').length+read(folder+'/README.md').length;
 return {folder,beforeBackgroundCharacters:old,afterBackgroundCharacters:current,reductionPercent:Math.round(100*(1-current/old))};
});
const result={activeMarkdownFiles:files.length,localPathLinksChecked:links,broken,splitPreservation:splits,protectedAssetsChecked:protectedRows.length,modifiedAssets,archivedSourcesChecked:archivedRows.length,archiveFailures,reading,failures,scope:'Character counts measure required repository background only, not billed tokens; target content, conversation, tools, skills and reasoning are excluded.'};
fs.writeFileSync(path.join(root,audit,'verification.json'),JSON.stringify(result,null,2));
console.log(JSON.stringify(result,null,2));
if(failures.length)process.exitCode=1;

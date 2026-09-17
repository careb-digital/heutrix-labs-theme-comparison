import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd(), audit='90-research-and-audits/folder-audit-2026-09-05';
const apply=process.argv.includes('--apply');
const updates={};
function read(p){return fs.readFileSync(path.join(root,p),'utf8');}
updates['.codex/README.md']='# Task prompts — optional\n\nRoot `AGENTS.md` controls current working rules. Open only the prompt selected for the task; this library is not routine startup context. Work in the Heutrix repository root, not the former website project.\n\nSee [prompt index](prompts/README.md). Newer decisions and completed work supersede older prompt assumptions.\n';
updates['.codex/prompts/README.md']='# Optional task prompts\n\nUse these only when their outcome is requested. Start from root `AGENTS.md`, the relevant workstream guide and the current source. Read only applicable decision/risk entries; do not load every register or the full historical audit. Reuse current assets instead of generating a second model, process or copy pack.\n\n- [Launch workstreams](launch-workstreams/README.md): select one bounded remaining outcome.\n- [September website refresh](website-refresh-2026-09/README.md): historical release prompts; check completed work before reuse.\n- [Acquisition refinement](website-acquisition-refinement-2026-09/README.md): reference for the locally prepared candidate; verify current state before reusing.\n';
let index=read('.codex/prompts/launch-workstreams/README.md');
index=index.replace('Start one fresh chat per prompt inside the **Heutrix Website** project. Each prompt is self-contained, but the project should include the repository and the audit file.','Use a task inside the current **Heutrix repository root**. Select only a remaining outcome; the historical audit is optional evidence, not required context. Follow root AGENTS.md task-scoped reading and inspect the existing source before creating an asset.');
index=index.replace('## Recommended sequence','## Historical sequence — verify current status first\n\nThe order and “Now” labels below describe the original launch plan, not today\'s task status. Consult only the relevant launch-board row when selecting work.');
updates['.codex/prompts/launch-workstreams/README.md']=index;
for(const filename of fs.readdirSync(path.join(root,'.codex/prompts/launch-workstreams'))){
 if(!filename.endsWith('.md')||filename==='README.md')continue;
 const p='.codex/prompts/launch-workstreams/'+filename;
 let text=read(p);
 text=text.replace(/Read the current control registers,/g,'Follow AGENTS.md task-scoped reading; read the relevant decision/fact entries,');
 text=text.replace(/inspect the control registers,/g,'inspect only the applicable control entries,');
 if(text!==read(p))updates[p]=text;
}
for(const p of ['.codex/prompts/website-refresh-2026-09/README.md','.codex/prompts/website-acquisition-refinement-2026-09/README.md']){
 const old=read(p);
 updates[p]=old.replace(/(^# .+\r?\n)/,'$1\n**Reference only:** do not run this entire earlier work package for a small edit. Follow root AGENTS.md and the current workstream guide; reuse completed assets and read only the sections needed for the requested change. Earlier exhaustive read lists apply only when deliberately repeating that complete audit/release exercise.\n');
}
fs.writeFileSync(path.join(root,audit,'prompt-guidance-review.json'),JSON.stringify(updates,null,2));
if(apply)for(const[p,text]of Object.entries(updates)){
 const target=path.resolve(root,p);
 if(!target.startsWith(path.resolve(root,'.codex/prompts')+path.sep)&&p!=='.codex/README.md')throw Error('Unapproved target');
 const backup=path.join(root,audit,'original-text',p+'.original.txt');fs.mkdirSync(path.dirname(backup),{recursive:true});fs.writeFileSync(backup,read(p));fs.writeFileSync(target,text);
}
console.log(JSON.stringify({mode:apply?'applied':'review-prepared',files:Object.keys(updates)},null,2));

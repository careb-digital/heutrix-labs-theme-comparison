// Read-only inventory; writes only the explicitly requested audit output directory.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const root = process.cwd();
const output = process.argv[2];
if (!output) throw new Error('Usage: node tools/collaboration/audit-workspace.mjs OUTPUT_DIRECTORY');
const out = path.resolve(output);
if (!out.startsWith(root + path.sep)) throw new Error('Audit output must be inside this workspace');
const rows = [], errors = [], groups = new Map();
function category(p) {
  const bits = p.split('/');
  if (bits.includes('.git')) return 'git-history';
  if (bits.some(b => ['node_modules','.python-libs','.python-packages','.notebook-deps','__pycache__','.next','.wrangler','.cache','dist','.vinext','tmp','_build'].includes(b))) return 'runtime-or-build';
  if (bits.at(-1).startsWith('._') || bits.at(-1) === '.DS_Store') return 'os-metadata';
  if (p.startsWith('90-research-and-audits/') || p.startsWith('99-archive/') || p.startsWith('apps/internal-reports/') || bits.some(b=>b.startsWith('.superseded-'))) return 'historical-reference';
  if (bits.some(b => ['_qa','QA','analysis-output'].includes(b))) return 'generated-evidence';
  if (/\.(pdf|zip|png|webp|jpg|jpeg|tar\.gz)$/i.test(p)) return 'export-or-media';
  if (/\.(docx|xlsx|pptx)$/i.test(p)) return 'native-master';
  if (p.startsWith('.codex/')) return 'task-prompt';
  if (/\.md$/i.test(p)) return 'working-markdown';
  return 'code-or-config';
}
function walk(dir) {
  let entries;
  try { entries = fs.readdirSync(dir, {withFileTypes:true}); } catch(e) { errors.push({path:path.relative(root,dir),error:e.code}); return; }
  for (const e of entries) {
    const absolute = path.join(dir,e.name), p = path.relative(root,absolute).split(path.sep).join('/');
    if (absolute === out || p.startsWith('90-research-and-audits/folder-audit-2026-09-05/')) continue;
    if (e.isSymbolicLink()) { errors.push({path:p,error:'symlink-not-followed'}); continue; }
    if (e.isDirectory()) { walk(absolute); continue; }
    try {
      const stat = fs.statSync(absolute), cat = category(p), row = {path:p,category:cat,bytes:stat.size};
      if (!['git-history','runtime-or-build','os-metadata'].includes(cat)) {
        const data = fs.readFileSync(absolute);
        row.sha256 = crypto.createHash('sha256').update(data).digest('hex');
        const key = stat.size + ':' + row.sha256;
        if (!groups.has(key)) groups.set(key,[]);
        groups.get(key).push(p);
        if (/\.md$/i.test(p)) {
          const text = data.toString('utf8'); row.characters = text.length; row.words = text.trim().split(/\s+/).length;
          row.headings = [...text.matchAll(/^#{1,3}\s+(.+)$/gm)].map(m=>m[1]);
        }
      }
      rows.push(row);
    } catch(e) { errors.push({path:p,error:e.code}); }
  }
}
walk(root);
const byCategory = {}, byFolder = {};
for (const r of rows) for (const [obj,key] of [[byCategory,r.category],[byFolder,r.path.includes('/') ? r.path.split('/')[0] : '(root)']]) {
  obj[key] ??= {files:0,bytes:0,markdownCharacters:0}; obj[key].files++; obj[key].bytes+=r.bytes; obj[key].markdownCharacters+=r.characters||0;
}
const startup = ['AGENTS.md','README.md','00-control/LAUNCH-BOARD.md','00-control/DECISIONS.md','00-control/VERIFIED-FACTS.md','00-control/RISKS-AND-BLOCKERS.md','00-control/COLLABORATION.md','00-control/DEPENDENCIES.md','01-company/founders-and-roles/ROLE-REGISTER.md'];
const startupRows = rows.filter(r=>startup.includes(r.path));
const summary = {files:rows.length,byCategory,byFolder,errors,mandatoryReadingBeforeAudit:{paths:startup,characters:startupRows.reduce((n,r)=>n+(r.characters||0),0)},duplicateGroups:[...groups.values()].filter(g=>g.length>1),largestMarkdown:rows.filter(r=>r.characters).sort((a,b)=>b.characters-a.characters).slice(0,35)};
fs.mkdirSync(out,{recursive:true});
fs.writeFileSync(path.join(out,'inventory.json'),JSON.stringify(rows,null,2));
fs.writeFileSync(path.join(out,'summary.json'),JSON.stringify(summary,null,2));
console.log(JSON.stringify({files:summary.files,byCategory,byFolder,errors,mandatoryReadingBeforeAudit:summary.mandatoryReadingBeforeAudit,duplicateGroups:summary.duplicateGroups.length,largestMarkdown:summary.largestMarkdown.slice(0,12).map(({path,characters,words})=>({path,characters,words}))},null,2));

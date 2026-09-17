import fs from 'node:fs/promises';
import path from 'node:path';
import {FileBlob,SpreadsheetFile} from 'file:///C:/Users/CareBest/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/@oai/artifact-tool/dist/artifact_tool.mjs';
const here=import.meta.dirname;
const root=path.resolve(here,'../..');
const specs=JSON.parse(await fs.readFile(path.join(here,'workbooks.json'),'utf8'));
const colours={'1E293B':'033862','091426':'033862','6FFBBE':'8DE4E0','006C49':'01647C','14B8A6':'01989C','0B1C30':'033862','EFF4FF':'EFFAFA','0F172A':'033862','0F766E':'01647C','99F6E4':'8DE4E0','0B1F3A':'033862','17375E':'01647C','8DE2C1':'8DE4E0','E9F8F2':'EFFAFA','EAF2FB':'EFFAFA'};
for(const spec of specs){
 const stem=path.basename(spec.output,'.xlsx');
 const wb=await SpreadsheetFile.importXlsx(await FileBlob.load(spec.input));
 const first=wb.worksheets.getItem(spec.sheets[0].name);
 const render=async(label)=>{
  const blob=await wb.render({sheetName:first.name,range:'A1:L18',scale:1,format:'png'});
  await fs.writeFile(path.join(here,`${stem}-${label}.png`),new Uint8Array(await blob.arrayBuffer()));
 };
 await render('before');
 await fs.writeFile(path.join(here,`${stem}-before-inspect.json`),JSON.stringify(await wb.inspect({kind:'table',range:`'${first.name}'!A1:L10`,include:'values,formulas',maxChars:2000})));
 for(const ss of spec.sheets){
  const s=wb.worksheets.getItem(ss.name);
  for(const c of ss.cells){
   const fill=colours[c.fill?.slice(-6)];const font=colours[c.font?.slice(-6)];
   if(fill)s.getRange(c.cell).format.fill='#'+fill;
   if(font)s.getRange(c.cell).format.font.color='#'+font;
  }
 }
 const sales=stem==='Heutrix-Outreach-Operations';
 const logo=await fs.readFile(path.join(root,'06-marketing/brand/logo-2026-09',`heutrix-logo-${sales?'colour':'reversed'}.png`));
 first.getRange('A1:L1').format.rowHeight=sales?44:85;
 if(!sales)first.getRange('A1').format.verticalAlignment='bottom';
 first.images.add({dataUrl:'data:image/png;base64,'+logo.toString('base64'),anchor:{from:{row:0,col:sales?1:0,rowOffsetPx:8,colOffsetPx:8},extent:{widthPx:160,heightPx:160*653/2400}}});
 wb.recalculate();
 await render('after');
 const errors=await wb.inspect({kind:'match',searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME\\?|#NUM!|#NULL!',options:{useRegex:true,maxResults:20},maxChars:2500});
 await fs.writeFile(path.join(here,`${stem}-errors.json`),JSON.stringify(errors));
 const out=await SpreadsheetFile.exportXlsx(wb);await out.save(path.join(here,stem+'.xlsx'));
 console.log(stem+' staged and rendered');
}

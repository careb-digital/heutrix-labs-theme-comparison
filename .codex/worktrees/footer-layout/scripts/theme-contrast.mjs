// Rendered solid-background text audit; images/gradients still need visual review.
export async function inspectTextContrast(page,label){
 const result=await page.evaluate(()=>{
  const parse=s=>(s.match(/[\d.]+/g)||[]).map(Number);
  const lum=rgb=>rgb.slice(0,3).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4;}).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);
  const mix=(fg,bg)=>fg.slice(0,3).map((v,i)=>v*(fg[3]??1)+bg[i]*(1-(fg[3]??1)));
  const out=[];
  for(const el of document.querySelectorAll('body *')){
   const own=[...el.childNodes].filter(n=>n.nodeType===3).map(n=>n.textContent.trim()).join(' ').trim();
   if(!own||!el.checkVisibility({checkOpacity:true,checkVisibilityCSS:true})||el.closest('[aria-hidden=true], [inert]')||el.classList.contains('material-symbols-outlined'))continue;
   const rect=el.getBoundingClientRect();if(!rect.width||!rect.height)continue;
   let bg=[255,255,255],chain=[],skip=false;
   for(let p=el;p;p=p.parentElement){const s=getComputedStyle(p);if(s.backgroundImage!=='none'||Number(s.opacity)<1){skip=true;break;}chain.unshift(parse(s.backgroundColor));}
   if(skip)continue;for(const c of chain)bg=mix(c,bg);
   const s=getComputedStyle(el),fg=mix(parse(s.color),bg),a=lum(fg),b=lum(bg),ratio=(Math.max(a,b)+.05)/(Math.min(a,b)+.05);
   const large=parseFloat(s.fontSize)>=24||(parseFloat(s.fontSize)>=18.66&&parseInt(s.fontWeight)>=700);
   if(ratio<(large?3:4.5))out.push({text:own.slice(0,65),class:el.className,foreground:s.color,background:bg,ratio:+ratio.toFixed(2),required:large?3:4.5});
  }return out;
 });
 return result.map(x=>({page:label,...x}));
}

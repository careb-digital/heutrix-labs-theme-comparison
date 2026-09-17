import {routes} from './src/siteContent.js';
import cases from './src/caseStudies.json';
const pages=new Map(routes.map(p=>[p.path,p]));
for(const c of cases) pages.set('/case-studies/'+c.slug,{seoTitle:c.title+' | Heutrix Labs',metaDescription:'Anonymised Heutrix delivery for an Australian disability support provider. '+c.metric});
const redirects=new Map([['/pricing','/services#how-engagements-are-agreed'],['/safe-ai','/ai-guardrails']]);
const security={
 'X-Content-Type-Options':'nosniff',
 'X-Frame-Options':'DENY',
 'Referrer-Policy':'strict-origin-when-cross-origin',
 'Permissions-Policy':'camera=(), geolocation=(), microphone=(), payment=(), usb=()',
 'X-Robots-Tag':'noindex, nofollow',
 'Content-Security-Policy':"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; frame-ancestors 'none'; base-uri 'self'; form-action 'none'"
};
function withHeaders(response){const result=new Response(response.body,response);for(const[k,v]of Object.entries(security))result.headers.set(k,v);return result;}
export default {async fetch(request,env){
 const url=new URL(request.url);let path=url.pathname;
 if(request.method!=='GET'&&request.method!=='HEAD')return withHeaders(new Response('Method not allowed',{status:405,headers:{Allow:'GET, HEAD'}}));
 if(path!=='/'&&path.endsWith('/'))return withHeaders(Response.redirect(new URL(path.slice(0,-1)+url.search,url),308));
 if(redirects.has(path))return withHeaders(Response.redirect(new URL(redirects.get(path),url),301));
 if(path==='/robots.txt')return withHeaders(new Response('User-agent: *\nDisallow: /\n',{headers:{'Content-Type':'text/plain; charset=utf-8'}}));
 const isAsset=path.startsWith('/assets/')||path.startsWith('/images/')||path.startsWith('/downloads/')||path==='/favicon.svg';
 if(isAsset){const response=await env.ASSETS.fetch(request);const result=withHeaders(response);if(response.ok&&path.startsWith('/assets/'))result.headers.set('Cache-Control','public,max-age=31536000,immutable');return result;}
 const page=pages.get(path);const shell=await env.ASSETS.fetch(new Request(new URL('/index.html',url),request));
 const rewritten=new HTMLRewriter().on('title',{element(e){e.setInnerContent(page?.seoTitle||'Page Not Found | Heutrix Labs')}}).on('meta[name="description"]',{element(e){e.setAttribute('content',page?.metaDescription||'The requested Heutrix page could not be found.')}}).on('head',{element(e){e.append(`<meta property="og:type" content="website"><meta property="og:image" content="${url.origin}/images/workflow-team.webp"><meta name="twitter:card" content="summary_large_image">`,{html:true})}}).transform(shell);
 return withHeaders(new Response(request.method==='HEAD'?null:rewritten.body,{status:page?200:404,headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-cache'}}));
}};

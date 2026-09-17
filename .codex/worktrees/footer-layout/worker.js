import {isInformationalPath, prerenderAsset} from './src/prerenderRoutes.js';
import {handleGoogleRequest} from './server/googleRequests.js';
import {routes} from './src/siteContent.js';
import cases from './src/caseStudies.json';
import legacyCases from './src/legacyCasePaths.json';
import { canonicalOrigin, canonicalUrlForPath, normalizePath } from './src/siteUrl.js';
const escapeHtml=value=>String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const pages=new Map(routes.map(p=>[p.path,p]));
for(const c of cases) pages.set('/case-studies/'+c.slug,{seoTitle:c.title+' | Heutrix',metaDescription:'Illustrative provider workflow. '+c.metric});
const redirects=new Map([['/pricing','/services#how-engagements-are-agreed'],['/safe-ai','/ai-guardrails']]);
for (const path of legacyCases) redirects.set(path, '/case-studies');
const security={
 'X-Content-Type-Options':'nosniff',
 'X-Frame-Options':'DENY',
 'Strict-Transport-Security':'max-age=31536000',
 'Referrer-Policy':'strict-origin-when-cross-origin',
 'Permissions-Policy':'camera=(), geolocation=(), microphone=(), payment=(), usb=()',
 'Content-Security-Policy':"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self' https://formspree.io/f/maeyavnk; object-src 'none'; frame-ancestors 'none'; base-uri 'self'; form-action 'none'"
};
function withHeaders(response){const result=new Response(response.body,response);for(const[k,v]of Object.entries(security))result.headers.set(k,v);if(response.status>=400)result.headers.set('X-Robots-Tag','noindex, nofollow');return result;}
export default {async fetch(request,env){
 const url=new URL(request.url);let path=url.pathname;
 if(path==='/api/requests')return withHeaders(await handleGoogleRequest(request));
 if(request.method!=='GET'&&request.method!=='HEAD')return withHeaders(new Response('Method not allowed',{status:405,headers:{Allow:'GET, HEAD'}}));
 if(path!=='/'&&path.endsWith('/')){const target=new URL(url);target.pathname=normalizePath(path);return withHeaders(Response.redirect(target,308));}
 if(redirects.has(path))return withHeaders(Response.redirect(new URL(redirects.get(path),url),301));
 if(path==='/robots.txt')return withHeaders(new Response('User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: '+canonicalOrigin+'/sitemap.xml\n',{headers:{'Content-Type':'text/plain; charset=utf-8'}}));
 if(path==='/sitemap.xml')return withHeaders(new Response('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+[...pages.keys()].map(p=>'<url><loc>'+canonicalOrigin+p+'</loc></url>').join('')+'</urlset>',{headers:{'Content-Type':'application/xml; charset=utf-8'}}));
 const isAsset=path.startsWith('/assets/')||path.startsWith('/images/')||path.startsWith('/downloads/')||path==='/favicon.svg'||path==='/favicon.ico';
 if(isAsset){const response=await env.ASSETS.fetch(request);const result=withHeaders(response);if(response.ok&&path.startsWith('/assets/'))result.headers.set('Cache-Control','public,max-age=31536000,immutable');return result;}
 const page=pages.get(path);
 const htmlPath = !page ? prerenderAsset('/404') : isInformationalPath(path) ? prerenderAsset(path) : '/index.html';
 const shell=await env.ASSETS.fetch(new Request(new URL(htmlPath,url),request));
 const rewritten=new HTMLRewriter().on('title',{element(e){e.setInnerContent(page?.seoTitle||'Page Not Found | Heutrix')}}).on('meta[name="description"]',{element(e){e.setAttribute('content',page?.metaDescription||'The requested Heutrix page could not be found.')}}).on('head',{element(e){e.append(`<link rel="canonical" href="${escapeHtml(canonicalUrlForPath(path))}"><meta property="og:title" content="${escapeHtml(page?.seoTitle || 'Page Not Found | Heutrix')}"><meta property="og:description" content="${escapeHtml(page?.metaDescription || 'The requested Heutrix page could not be found.')}"><meta property="og:url" content="${escapeHtml(canonicalUrlForPath(path))}"><meta name="twitter:title" content="${escapeHtml(page?.seoTitle || 'Page Not Found | Heutrix')}"><meta name="twitter:description" content="${escapeHtml(page?.metaDescription || 'The requested Heutrix page could not be found.')}"><meta property="og:type" content="website"><meta name="twitter:card" content="summary_large_image"><meta property="og:image" content="${canonicalOrigin}/images/brand/heutrix-social-share.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:type" content="image/png"><meta property="og:image:alt" content="Heutrix layered logo in navy and teal"><meta name="twitter:image" content="${canonicalOrigin}/images/brand/heutrix-social-share.png"><meta name="twitter:image:alt" content="Heutrix layered logo in navy and teal">`,{html:true})}}).transform(shell);
 return withHeaders(new Response(request.method==='HEAD'?null:rewritten.body,{status:page?200:404,headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-cache'}}));
}};

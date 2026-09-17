import {build} from 'vite';
import {mkdir, readFile, writeFile} from 'node:fs/promises';
import {dirname, resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {informationalPaths, prerenderAsset} from '../src/prerenderRoutes.js';

const cases = JSON.parse(await readFile(new URL('../src/caseStudies.json', import.meta.url)));
// Keep the temporary server bundle outside the public asset directory.
const outDir = 'node_modules/.prerender';
await build({build: {ssr: 'src/entry-server.jsx', outDir, rollupOptions: {output: {entryFileNames: 'entry-server.mjs'}}}});
const {render} = await import(pathToFileURL(resolve(outDir, 'entry-server.mjs')));
const shell = await readFile('dist/index.html', 'utf8');
if (!shell.includes('<div id="root"></div>')) throw new Error('Missing prerender insertion point');
const paths = [...informationalPaths, ...cases.map(c => `/case-studies/${c.slug}`), '/404'];
for (const path of paths) {
  const html = await render(path);
  if (!html.includes('<h1') || !html.includes('<p') || !html.includes('href=')) throw new Error(`Incomplete render: ${path}`);
  const target = resolve('dist', '.' + prerenderAsset(path));
  await mkdir(dirname(target), {recursive: true});
  await writeFile(target, shell.replace('<div id="root"></div>', () => `<div id="root">${html}</div>`));
}
console.log(`Prerendered ${paths.length - 1} informational pages and the 404 page.`);

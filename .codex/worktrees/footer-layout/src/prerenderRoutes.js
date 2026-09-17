import {routes} from './siteContent.js';

// Forms and assessments depend on query parameters and in-memory answers.
// All other public pages use the same React tree at build time and in the browser.
export function isInformationalPath(path) {
  return path !== '/contact' && path !== '/refer' && !path.startsWith('/resources/');
}

export function prerenderAsset(path) {
  return `/prerender${path === '/' ? '/home' : path}.html`;
}

export const informationalPaths = routes.map(route => route.path).filter(isInformationalPath);

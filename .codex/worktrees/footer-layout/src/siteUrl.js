// Shared by the Worker and React. Preview hosts must not become canonical origins.
export const canonicalOrigin = 'https://heutrix-website.heutrix.workers.dev';

export function normalizePath(pathname) {
  return pathname.replace(/\/+$/, '') || '/';
}

export function canonicalUrlForPath(pathname) {
  return canonicalOrigin + normalizePath(pathname.split(/[?#]/, 1)[0]);
}

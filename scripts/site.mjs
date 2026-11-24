// Shared by dev and build: loads src/render.tsx through Vite's SSR loader.
import { createServer } from 'vite';

export const FONT = 'node_modules/@fontsource-variable/instrument-sans/files/instrument-sans-latin-wght-normal.woff2';

export async function loadSite(options = {}) {
  const vite = await createServer({
    configFile: false,
    appType: 'custom',
    logLevel: 'warn',
    server: { middlewareMode: true, hmr: false, ws: false },
    ...options,
  });
  return { vite, load: () => vite.ssrLoadModule('/src/render.tsx') };
}

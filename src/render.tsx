// Build-time only: React renders the pages to static HTML, and no JavaScript
// reaches the browser.
import { renderToStaticMarkup } from 'react-dom/server';
import { Document } from './Page';
import { SITE_URL, content, type Lang } from './content';
import css from './styles.css?inline';

export { renderTopo } from './topo';

export const routes: { lang: Lang; path: string; file: string }[] = [
  { lang: 'en', path: '/', file: 'index.html' },
  { lang: 'fr', path: '/fr/', file: 'fr/index.html' },
];

export function render(lang: Lang): string {
  return '<!doctype html>' + renderToStaticMarkup(<Document lang={lang} css={minify(css)} />);
}

function minify(source: string): string {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{};])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim();
}

export function sitemap(): string {
  const alternates = (['en', 'fr'] as const)
    .map((l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${SITE_URL}${content[l].path}"/>`)
    .join('');
  const urls = routes
    .map((r) => `<url><loc>${SITE_URL}${r.path}</loc>${alternates}<xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/"/></url>`)
    .join('');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>\n`;
}

export function robots(): string {
  return `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
}

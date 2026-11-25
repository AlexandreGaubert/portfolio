// Build-time only: React renders the pages to static HTML, and no JavaScript
// reaches the browser.
import { renderToStaticMarkup } from 'react-dom/server';
import { Document, pathOf, type PageId } from './Page';
import { SITE_URL, type Lang } from './content';
import css from './styles.css?inline';

export { renderTopo } from './topo';

// One HTML file per page and language: /fr/freelance/ is written to fr/freelance/index.html.
export const routes: { page: PageId; lang: Lang; path: string; file: string }[] = (['home', 'freelance'] as const).flatMap((page) =>
  (['en', 'fr'] as const).map((lang) => ({ page, lang, path: pathOf(page, lang), file: pathOf(page, lang).slice(1) + 'index.html' })),
);

export function render(page: PageId, lang: Lang): string {
  return '<!doctype html>' + renderToStaticMarkup(<Document page={page} lang={lang} css={minify(css)} />);
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
  const alternates = (page: PageId) =>
    (['en', 'fr'] as const).map((l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${SITE_URL}${pathOf(page, l)}"/>`).join('') +
    `<xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${pathOf(page, 'en')}"/>`;
  const urls = routes.map((r) => `<url><loc>${SITE_URL}${r.path}</loc>${alternates(r.page)}</url>`).join('');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>\n`;
}

export function robots(): string {
  return `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
}

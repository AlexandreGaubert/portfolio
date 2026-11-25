// Renders the pages again on every request, so a save shows on reload.
import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';
import { FONT, loadSite } from './site.mjs';

const types = { '.html': 'text/html; charset=utf-8', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.png': 'image/png', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain' };
const { vite, load } = await loadSite();

const server = createServer(async (req, res) => {
  try {
    const path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    const site = await load();
    const route = site.routes.find((r) => r.path === path || r.path === path + '/');
    const generated = route
      ? site.render(route.page, route.lang)
      : { '/topo.svg': site.renderTopo, '/sitemap.xml': site.sitemap, '/robots.txt': site.robots }[path]?.();
    if (generated) {
      res.writeHead(200, { 'content-type': types[route ? '.html' : extname(path)] });
      return res.end(generated);
    }
    const file = path === '/fonts/instrument-sans.woff2' ? FONT : join('public', normalize(path).replace(/^(\.\.[/\\])+/, ''));
    if (existsSync(file) && statSync(file).isFile()) {
      res.writeHead(200, { 'content-type': types[extname(file)] ?? 'application/octet-stream' });
      return createReadStream(file).pipe(res);
    }
    res.writeHead(404).end('Not found');
  } catch (error) {
    vite.ssrFixStacktrace(error);
    console.error(error);
    res.writeHead(500, { 'content-type': 'text/plain' }).end(String(error.stack ?? error));
  }
});

// Port 0 lets the OS pick a free one: never take another session's port.
server.listen(Number(process.env.PORT ?? 0), '127.0.0.1', () => {
  console.log(`http://127.0.0.1:${server.address().port}/  (pid ${process.pid})`);
});

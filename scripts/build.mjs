import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { FONT, loadSite } from './site.mjs';

const out = 'dist';
const { vite, load } = await loadSite();
try {
  const site = await load();
  await rm(out, { recursive: true, force: true });
  await cp('public', out, { recursive: true });
  await mkdir(join(out, 'fonts'), { recursive: true });
  await cp(FONT, join(out, 'fonts/instrument-sans.woff2'));
  const files = {
    'topo.svg': site.renderTopo(),
    'sitemap.xml': site.sitemap(),
    'robots.txt': site.robots(),
  };
  for (const r of site.routes) files[r.file] = site.render(r.page, r.lang);
  for (const [file, body] of Object.entries(files)) {
    await mkdir(dirname(join(out, file)), { recursive: true });
    await writeFile(join(out, file), body);
  }
  console.log(`built ${Object.keys(files).length} files into ${out}/`);
} finally {
  await vite.close();
}

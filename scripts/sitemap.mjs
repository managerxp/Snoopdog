// Runs after `npm run build` (npm "postbuild"). Writes dist/sitemap.xml and adds it to
// dist/robots.txt, but only when VITE_SITE_URL is set (in the environment or .env.production).
import { appendFileSync, readdirSync, writeFileSync } from 'node:fs';

try {
  process.loadEnvFile('.env.production');
} catch {
  // no .env.production; the environment may still carry VITE_SITE_URL
}
const base = (process.env.VITE_SITE_URL || '').replace(/\/$/, '');
if (!base) {
  console.log('sitemap: VITE_SITE_URL not set, skipping sitemap.xml');
  process.exit(0);
}

const pages = readdirSync('dist')
  .filter((f) => f.endsWith('.html') && f !== '404.html')
  .map((f) => (f === 'index.html' ? '/' : `/${f.slice(0, -5)}`))
  .sort();
const urls = pages.map((p) => `  <url><loc>${base}${p}</loc></url>`).join('\n');
writeFileSync('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
appendFileSync('dist/robots.txt', `\nSitemap: ${base}/sitemap.xml\n`);
console.log(`sitemap: wrote ${pages.length} urls for ${base}`);

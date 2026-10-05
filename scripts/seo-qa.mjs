import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { routes } from '../src/routes.ts';

const expectedOrigin = process.env.QA_SITE_ORIGIN;
for (const [page, route] of Object.entries(routes)) {
  const path = route.path === '/' ? 'dist/index.html' : `dist${route.path}/index.html`;
  const html = await readFile(path, 'utf8');
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${page}: one prerendered H1`);
  assert.ok(html.includes(route.title.replaceAll('&', '&amp;')), `${page}: unique static title`);
  assert.ok(html.includes('property="og:title"'), `${page}: social metadata`);
  assert.ok(html.includes('href="/contact"'), `${page}: crawlable navigation`);
  assert.ok(html.includes('id="main-content"'), `${page}: semantic main`);
  if (route.noindex) assert.ok(html.includes('content="noindex, follow"'));
  if (expectedOrigin && page !== 'notfound') assert.ok(html.includes(`rel="canonical" href="${expectedOrigin}${route.path}"`));
}
const sitemap = await readFile('dist/sitemap.xml', 'utf8');
const robots = await readFile('dist/robots.txt', 'utf8');
assert.ok((await readFile('dist/404.html', 'utf8')).includes('Page Not Found'));
if (expectedOrigin) {
  assert.equal((sitemap.match(/<loc>/g) || []).length, Object.values(routes).filter(route => !route.noindex).length);
  assert.ok(robots.includes(`Sitemap: ${expectedOrigin}/sitemap.xml`));
} else assert.equal((sitemap.match(/<loc>/g) || []).length, 0);
console.log(`Static SEO checks passed: ${Object.keys(routes).length} real page renders, unique titles, crawlable links, social tags, 404, robots and ${expectedOrigin ? 'configured' : 'unconfigured'} sitemap.`);

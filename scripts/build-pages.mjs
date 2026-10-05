import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer, loadEnv } from 'vite';

// Run after `vite build`. Vite transpiles the route registry and page modules.
// These are real page renders, replaced by createRoot when the client starts.
const root = process.cwd();
const dist = resolve(root, 'dist');
const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';
const env = loadEnv(mode, root, 'VITE_');
const server = await createServer({ root, mode, appType: 'custom', server: { middlewareMode: true, hmr: false, watch: null } });
const { routes, validatedSiteOrigin } = await server.ssrLoadModule('/src/routes.ts');
const configuredUrl = process.env.VITE_SITE_URL ?? env.VITE_SITE_URL;
const origin = validatedSiteOrigin(configuredUrl);
if (configuredUrl && !origin) { await server.close(); throw new Error('VITE_SITE_URL must be an http(s) URL without credentials.'); }

const template = await readFile(join(dist, 'index.html'), 'utf8');
const modules = {
  home: 'HomePage', about: 'AboutPage', services: 'ServicesPage', rakshak: 'RakshakAIPage',
  products: 'ProductsPage', approach: 'ApproachPage', pricing: 'PricingPage', licensing: 'LicensingContactPage',
  disclosure: 'ResponsibleDisclosurePage', capabilities: 'CapabilitiesPage', solutions: 'SolutionsPage',
  ecosystem: 'EcosystemPage', threatlab: 'ThreatLabPage', notfound: 'NotFoundPage',
  privacy: 'LegalPage', terms: 'LegalPage', cookies: 'LegalPage',
};
const navigation = [['home', 'Platform'], ['rakshak', 'Rakshak AI'], ['services', 'Services'], ['approach', 'Approach'], ['products', 'Products'], ['pricing', 'Pricing'], ['about', 'About'], ['licensing', 'Contact']];
const escape = (value) => String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);

async function cssAssets(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const paths = await Promise.all(entries.map(async (entry) => {
    const relative = join(directory, entry.name);
    if (entry.isDirectory()) return cssAssets(relative);
    return entry.name.endsWith('.css') ? [relative] : [];
  }));
  return paths.flat();
}
const styleLinks = (await cssAssets(join(dist, 'assets')))
  .map((file) => `/${file.slice(dist.length + 1).replaceAll('\\', '/')}`)
  .filter((href) => !template.includes(`href="${href}"`))
  .map((href) => `<link rel="stylesheet" href="${escape(href)}" />`).join('\n');

function metadataHead(html, page) {
  const metadata = routes[page];
  const canonical = origin ? new URL(metadata.path, origin).href : undefined;
  const stripped = html.replace(/<title>[\s\S]*?<\/title>/gi, '')
    .replace(/<meta\b[^>]*(?:name=["'](?:description|robots|twitter:[^"']*)["']|property=["']og:[^"']*["'])[^>]*>/gi, '')
    .replace(/<link\b[^>]*rel=["']canonical["'][^>]*>/gi, '');
  const tags = [
    `<title>${escape(metadata.title)}</title>`,
    `<meta name="description" content="${escape(metadata.description)}" />`,
    `<meta name="robots" content="${metadata.noindex ? 'noindex, follow' : 'index, follow'}" />`,
    '<meta property="og:type" content="website" />',
    '<meta property="og:site_name" content="CyberHiveX Technologies" />',
    `<meta property="og:title" content="${escape(metadata.title)}" />`,
    `<meta property="og:description" content="${escape(metadata.description)}" />`,
    '<meta name="twitter:card" content="summary" />',
    `<meta name="twitter:title" content="${escape(metadata.title)}" />`,
    `<meta name="twitter:description" content="${escape(metadata.description)}" />`,
    styleLinks,
  ];
  if (canonical) {
    tags.push(`<meta property="og:url" content="${escape(canonical)}" />`);
    tags.push(`<meta property="og:image" content="${escape(new URL('/cyberhivex-full-clean.png', origin).href)}" />`);
    tags.push('<meta property="og:image:alt" content="CyberHiveX Technologies" />');
    tags.push(`<meta name="twitter:image" content="${escape(new URL('/cyberhivex-full-clean.png', origin).href)}" />`);
    if (page !== 'notfound') tags.push(`<link rel="canonical" href="${escape(canonical)}" />`);
  }
  return stripped.replace('</head>', `${tags.join('\n')}\n</head>`);
}

function header(page) {
  return `<header class="shell-navbar"><div class="shell-navbar-inner"><a class="shell-brand" href="/" aria-label="CyberHiveX Technologies — home"><img src="/cyberhivex-brand-mark.png" width="36" height="36" alt="" /><span class="shell-brand-type"><span>CyberHiveX</span><small>TECHNOLOGIES</small></span></a><nav class="shell-desktop-nav" aria-label="Main navigation">${navigation.map(([id, label]) => `<a class="shell-nav-link" href="${routes[id].path}"${id === page ? ' aria-current="page"' : ''}>${label}</a>`).join('')}</nav><div class="shell-navbar-actions"><a class="btn-cyber-primary shell-assessment-link" href="/contact">Request Security Assessment</a></div></div></header>`;
}

function replaceRoot(html, shell) {
  const opening = /<div\b[^>]*\bid=["']root["'][^>]*>/i.exec(html);
  if (!opening) throw new Error('Built index.html is missing the React root.');
  const tags = /<\/?div\b[^>]*>/gi;
  tags.lastIndex = opening.index + opening[0].length;
  let depth = 1;
  for (let tag = tags.exec(html); tag; tag = tags.exec(html)) {
    depth += /^<\//.test(tag[0]) ? -1 : 1;
    if (depth === 0) return html.slice(0, opening.index) + `<div id="root">${shell}</div>` + html.slice(tags.lastIndex);
  }
  throw new Error('Built index.html has an unclosed React root.');
}

let renderedCount = 0;
try {
  const { default: Footer } = await server.ssrLoadModule('/src/components/Footer.tsx');
  for (const [page, metadata] of Object.entries(routes)) {
    const { default: Page } = await server.ssrLoadModule(`/src/pages/${modules[page]}.tsx`);
    const props = { setActivePage: () => {} };
    if (['privacy', 'terms', 'cookies'].includes(page)) props.document = page;
    const content = renderToStaticMarkup(createElement(Page, props));
    const footer = renderToStaticMarkup(createElement(Footer, { setActivePage: () => {} }));
    const shell = `<div class="site-app"><a href="#main-content" class="skip-link">Skip to main content</a>${header(page)}<main id="main-content" tabindex="-1">${content}</main>${footer}</div>`;
    const html = replaceRoot(metadataHead(template, page), shell);
    const directory = metadata.path === '/' ? dist : join(dist, metadata.path.slice(1));
    await mkdir(directory, { recursive: true });
    await writeFile(join(directory, 'index.html'), html);
    if (page === 'notfound') await writeFile(join(dist, '404.html'), html);
    renderedCount++;
  }
} finally {
  await server.close();
}

const sitemapEntries = origin ? Object.values(routes).filter((route) => !route.noindex).map((route) => `  <url><loc>${escape(new URL(route.path, origin).href)}</loc></url>`).join('\n') : '';
await writeFile(join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`);
await writeFile(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n${origin ? `Sitemap: ${origin}/sitemap.xml\n` : ''}`);
console.log(`Prerendered ${renderedCount} routes; generated 404.html, robots.txt, and sitemap.xml.`);
if (!origin) console.log('VITE_SITE_URL is unset: build-time canonicals and sitemap URLs omitted. Browser metadata uses the current origin. Set the deployment URL for a populated sitemap.');
console.log('Static hosting must serve route directories and configure 404.html with a 404 HTTP status for unknown paths.');

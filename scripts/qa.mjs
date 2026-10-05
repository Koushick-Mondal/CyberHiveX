// Local UI regression checks. QA packages are external to the application.
// QA_TOOL_DIR points to an installation of playwright-core and @axe-core/playwright.
import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
import { routes as siteRoutes } from '../src/routes.ts';
import { MODULES } from '../src/components/rakshak/fixtures.ts';
const tools = process.env.QA_TOOL_DIR;
if (!tools) throw new Error('Set QA_TOOL_DIR to the external QA tool installation.');
const { chromium } = await import(pathToFileURL(`${tools}/node_modules/playwright-core/index.mjs`));
const { default: AxeBuilder } = await import(pathToFileURL(`${tools}/node_modules/@axe-core/playwright/dist/index.mjs`));
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const context = await browser.newContext({ reducedMotion: 'reduce' });
const page = await context.newPage();
const errors = [];
page.on('pageerror', error => errors.push(error.message));
page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
const base = process.env.QA_URL || 'http://localhost:5173';
const routes = Object.keys(siteRoutes);
const dismissModeOnboarding = async () => {
  const onboarding = page.locator('dialog.mode-onboarding');
  if (await onboarding.count()) {
    await onboarding.locator('.mode-card--business').click();
    await onboarding.waitFor({ state: 'hidden' });
  }
};
const goto = async (route) => { await page.goto(`${base}${siteRoutes[route].path}`); await page.locator('.route-view h1').waitFor(); await dismissModeOnboarding(); };
const widths = [375, 390, 430, 768, 1024, 1280, 1440, 1920];
const results = { layouts: [], accessibility: [], interactions: [] };
await mkdir('reports', { recursive: true });
try {
  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await goto(route);
      await page.waitForTimeout(120);
      assert.equal(await page.locator('main h1').count(), 1, `${route}: single primary heading`);
      const sizes = await page.evaluate(() => ({ client: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
      assert.ok(sizes.scroll <= sizes.client + 1, `${route}@${width}: page overflow ${JSON.stringify(sizes)}`);
      results.layouts.push(`${route}@${width}: no page overflow`);
    }
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  for (const route of routes) {
    await goto(route);
    assert.equal(await page.title(), siteRoutes[route].title);
    assert.equal(await page.locator('meta[name="description"]').getAttribute('content'), siteRoutes[route].description);
    if (route !== 'notfound') assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), `${base}${siteRoutes[route].path}`);
    const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    results.accessibility.push({ route, violations: audit.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.map(n => ({ target: n.target, failure: n.failureSummary })) })) });
  }
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of routes) {
    await goto(route);
    const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    results.accessibility.push({ route: `${route}@390`, violations: audit.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.map(n => ({ target: n.target, failure: n.failureSummary })) })) });
  }
  await page.setViewportSize({ width: 1024, height: 1000 });
  await page.goto(`${base}/#home`);
  await page.locator('.route-view h1').waitFor();
  await dismissModeOnboarding();
  const menu = page.getByRole('button', { name: 'Open navigation menu' });
  await menu.click();
  await page.getByRole('dialog').waitFor({ state: 'visible' });
  assert.equal(await page.evaluate(() => document.activeElement?.textContent.includes('Platform')), true);
  for (let i = 0; i < 14; i++) await page.keyboard.press('Tab');
  assert.equal(await page.evaluate(() => document.activeElement?.closest('dialog') !== null), true);
  await page.keyboard.press('Escape');
  await page.getByRole('dialog').waitFor({ state: 'hidden' });
  await assert.equal(await menu.getAttribute('aria-expanded'), 'false');
  assert.equal(await page.evaluate(() => document.activeElement?.getAttribute('aria-label')), 'Open navigation menu');
  results.interactions.push('Menu opens, traps focus, Escape closes and restores focus');
  await page.setViewportSize({ width: 1440, height: 1000 });
  const scene = page.getByRole('region', { name: 'Rakshak AI security intelligence visualization' });
  if (await scene.count()) {
    await scene.getByRole('button', { name: /Inspect NETWORK-09/ }).click();
    assert.match(await scene.locator('.sc-node-inspector').textContent(), /gateway.example.com/);
    await scene.getByRole('button', { name: 'Next simulation stage' }).click();
    await scene.getByRole('button', { name: 'Next simulation stage' }).click();
    await scene.getByText('Event detected · fixture', { exact: true }).waitFor();
    await scene.getByRole('button', { name: 'Reset hero simulation' }).click();
    results.interactions.push('Hero node inspection and reduced-motion static stage progression/reset');
  }
  const compact = page.getByRole('region', { name: 'Rakshak AI compact interactive demo' });
  await compact.getByRole('button', { name: /12:04:31/ }).click();
  await compact.getByText('Evidence', { exact: true }).waitFor();
  const dashboard = page.getByRole('region', { name: 'Rakshak AI interactive command center demo' });
  const search = dashboard.getByRole('searchbox');
  await search.fill('no-matching-fixture');
  await dashboard.getByRole('heading', { name: 'No matching events' }).waitFor();
  await dashboard.getByRole('button', { name: 'Clear filters' }).click();
  await dashboard.getByRole('button', { name: 'Show extended columns' }).click();
  await dashboard.getByRole('columnheader', { name: 'Risk rationale' }).waitFor();
  await dashboard.getByRole('button', { name: 'Hide extended columns' }).click();
  await dashboard.getByRole('button', { name: '+ Simulate event' }).click();
  await dashboard.getByRole('button', { name: 'Add demo event' }).click();
  await dashboard.getByText('EVT-DEMO-007', { exact: true }).waitFor();
  for (const label of ['Dashboard', 'Asset Discovery', 'Threat Intelligence', 'Risk Analysis', 'Vulnerability Intelligence', 'OSINT', 'Digital Forensics', 'Incident Timeline', 'AI Security Analyst', 'AI Recommendations', 'Security Reports', 'Response / Automation']) {
    await dashboard.getByRole('button', { name: label, exact: true }).click();
    await dashboard.getByRole('heading', { name: label, exact: true }).waitFor();
    const moduleAudit = await new AxeBuilder({ page }).include('.rk-dashboard:not(.rk-dashboard--compact)').withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    results.accessibility.push({ route: `module:${label}`, violations: moduleAudit.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) })) });
  }
  await dashboard.getByRole('button', { name: 'Security Reports', exact: true }).click();
  const reportDownload = page.waitForEvent('download');
  await dashboard.getByRole('button', { name: 'Download demo report' }).click();
  assert.ok((await reportDownload).suggestedFilename().endsWith('.txt'));
  results.interactions.push('Compact evidence, empty search, filter reset, simulated event, thirteen modules and report download');
  await dashboard.getByRole('button', { name: 'Threat Intelligence', exact: true }).click();
  await dashboard.getByLabel('Severity', { exact: true }).selectOption('Critical');
  await dashboard.getByText('1 of 4 prepared indicators', { exact: true }).waitFor();
  await dashboard.getByRole('button', { name: 'Clear filters', exact: true }).click();
  await dashboard.getByRole('button', { name: 'OSINT', exact: true }).click();
  for (let i = 0; i < 5; i++) await dashboard.getByRole('button', { name: 'Reveal next prepared node' }).click();
  await dashboard.getByText('6 of 6 prepared nodes visible', { exact: true }).waitFor();
  await dashboard.getByRole('button', { name: 'Reset OSINT demo' }).click();
  await dashboard.getByText('1 of 6 prepared nodes visible', { exact: true }).waitFor();
  await dashboard.getByRole('button', { name: 'AI Security Analyst', exact: true }).click();
  await dashboard.getByRole('button', { name: 'Is compromise confirmed?' }).click();
  await dashboard.getByRole('log', { name: 'Local analyst conversation' }).getByText(/None of these fictional records establishes compromise/).waitFor();
  await dashboard.getByRole('button', { name: 'Response / Automation', exact: true }).click();
  await dashboard.getByRole('button', { name: 'Advance local simulation' }).click();
  await dashboard.getByRole('button', { name: 'Advance local simulation' }).click();
  assert.equal(await dashboard.getByRole('button', { name: 'Advance local simulation' }).isDisabled(), true);
  await dashboard.getByLabel('Approve local containment illustration').check();
  for (let i = 0; i < 4; i++) await dashboard.getByRole('button', { name: 'Advance local simulation' }).click();
  await dashboard.getByRole('button', { name: 'Complete local simulation' }).click();
  await dashboard.getByText('Seven-stage simulation complete. No real response action performed.').waitFor();
  await dashboard.getByRole('button', { name: 'Reset response demo' }).click();
  results.interactions.push('Threat severity filtering, six-node OSINT progression/reset, prepared analyst explanation and approval-gated seven-stage response');
  await dashboard.getByRole('button', { name: 'Asset Discovery', exact: true }).click();
  await dashboard.getByRole('button', { name: 'auth.example.com', exact: true }).first().click();
  await dashboard.getByRole('region', { name: 'Selected asset details' }).getByRole('heading', { name: 'auth.example.com' }).waitFor();
  await dashboard.getByRole('button', { name: 'View related events' }).click();
  assert.equal(await dashboard.getByRole('searchbox').inputValue(), 'auth.example.com');
  await dashboard.getByRole('button', { name: 'Vulnerability Intelligence', exact: true }).click();
  await dashboard.getByLabel('Sort findings').selectOption('ID ascending');
  const findingIds = await dashboard.locator('tbody tr td:first-child > .rk-mono').allTextContents();
  assert.deepEqual(findingIds, [...findingIds].sort());
  await dashboard.getByLabel('Search findings, IDs or assets').fill('nonexistent-fixture');
  await dashboard.getByRole('heading', { name: 'No matching records' }).waitFor();
  await dashboard.getByRole('button', { name: 'Clear filters', exact: true }).first().click();
  results.interactions.push('Asset inspection and related event lookup; finding sorting and empty-state recovery');
  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    for (const module of MODULES) {
      const picker = dashboard.getByLabel('Command center module', { exact: true });
      if (await picker.isVisible()) await picker.selectOption(module.id);
      else await dashboard.getByRole('button', { name: module.label, exact: true }).click();
      await dashboard.getByRole('heading', { name: module.label, exact: true }).waitFor();
      await dashboard.getByRole('heading', { name: 'Loading module', exact: true }).waitFor({ state: 'hidden' });
      const size = await page.evaluate(() => ({ client: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
      assert.ok(size.scroll <= size.client + 1, `${module.label}@${width}: page overflow`);
      results.layouts.push(`module:${module.id}@${width}: no page overflow`);
      if (width === 390) {
        const audit = await new AxeBuilder({ page }).include('.rk-dashboard:not(.rk-dashboard--compact)').withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
        results.accessibility.push({ route: `module:${module.label}@390`, violations: audit.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) })) });
      }
    }
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await goto('services');
  await page.getByLabel('Search services', { exact: true }).fill('nonexistent-fixture');
  await page.getByRole('heading', { name: 'No services match these filters.' }).waitFor();
  await page.getByRole('button', { name: 'Reset filters', exact: true }).click();
  assert.equal(await page.locator('.pg-service-list > li').count(), 12);
  results.interactions.push('Service catalogue search, empty state and filter reset');
  await goto('pricing');
  assert.equal(/\$\d|₹\d/.test(await page.locator('main').textContent()), false);
  await page.getByRole('tab').last().click();
  await page.getByRole('tabpanel').getByRole('heading', { name: 'Define the work before the quote.' }).waitFor();
  results.interactions.push('Custom quote chooser with no invented prices');
  await page.goto(`${base}/#capabilities`);
  await page.getByRole('tab', { name: 'External exposure & OSINT' }).click();
  await page.getByLabel('Fictional domain (.example only)').fill('real.invalid');
  await page.getByRole('button', { name: 'Run local demo' }).click();
  await page.getByText(/Use a fictional .example domain/).waitFor();
  await page.getByLabel('Fictional domain (.example only)').fill('acme.example');
  await page.getByRole('button', { name: 'Run local demo' }).click();
  await page.getByRole('heading', { name: 'Sample report: acme.example' }).waitFor();
  results.interactions.push('OSINT rejects real domain input and produces labelled fictional result');
  await page.goto(`${base}/#contact`);
  await page.getByRole('button', { name: 'Prepare local request' }).click();
  await page.getByText('Enter your full name (at least 2 characters).').waitFor();
  await page.getByLabel('Full name').fill('QA Example');
  await page.getByLabel('Email address').fill('qa@example.com');
  await page.getByLabel(/Organization/).fill('Example organization');
  await page.getByLabel('Requirements & context').fill('Review the fictional test environment.');
  await page.getByRole('button', { name: 'Prepare local request' }).click();
  await page.getByRole('heading', { name: 'Review your local draft' }).waitFor();
  assert.ok((await page.locator('.pg-request-preview').textContent()).includes('not sent'));
  results.interactions.push('Contact validation and honest unsent local draft');
  await page.goto(`${base}/#threatlab`);
  await page.getByRole('button', { name: 'Run simulation' }).click();
  await page.waitForTimeout(700);
  await page.getByRole('button', { name: 'Reset', exact: true }).click();
  await page.waitForTimeout(800);
  assert.equal(await page.locator('.pg-console li').count(), 0);
  await page.getByRole('button', { name: 'Run simulation' }).click();
  await page.getByText(/Demo complete · 7 of 7/).waitFor();
  assert.equal(await page.locator('.pg-console li').count(), 7);
  results.interactions.push('Threat simulation reset cancels pending events and complete run shows seven records');
  await page.goto(`${base}/#home`);
  await page.getByRole('navigation', { name: 'Main navigation', exact: true }).getByRole('link', { name: 'About', exact: true }).click();
  await page.getByRole('heading', { name: 'Building a more resilient digital future.' }).waitFor();
  await page.goBack();
  await page.getByRole('heading', { name: /AI-POWERED/ }).waitFor();
  await page.goForward();
  await page.getByRole('heading', { name: 'Building a more resilient digital future.' }).waitFor();
  results.interactions.push('Crawlable navigation and browser back/forward restore the correct page');
  for (const alias of ['services', 'security', 'licensing', 'cyber-intelligence']) {
    await page.goto(`${base}/#${alias}`);
    await page.locator('.route-view h1').waitFor();
    // Alias support is checked against the same route content, not URL rewriting.
    results.interactions.push(`Legacy #${alias}: ${(await page.locator('main h1').textContent()).trim()}`);
  }
  await page.goto(`${base}/this-page-does-not-exist`);
  await page.locator('.route-view h1').waitFor();
  assert.equal(await page.title(), siteRoutes.notfound.title);
  assert.match(await page.locator('meta[name="robots"]').getAttribute('content'), /noindex/);
  assert.equal(await page.locator('link[rel="canonical"]').count(), 0);
  results.interactions.push('Unknown clean path renders professional noindex 404 view');
  await goto('home');
  const assetPaths = await page.evaluate(() => performance.getEntriesByType('resource').map(entry => new URL(entry.name).pathname).filter(path => /^\/assets\/[^/]+\.js$/.test(path)));
  const bundles = await Promise.all([...new Set(assetPaths)].map(async path => { const bytes = await readFile(`dist${path}`); return { path, bytes: bytes.length, gzipBytes: gzipSync(bytes).length }; }));
  results.performance = { homeJavaScript: bundles, bytes: bundles.reduce((sum, file) => sum + file.bytes, 0), gzipBytes: bundles.reduce((sum, file) => sum + file.gzipBytes, 0) };
  await page.mouse.move(1430, 990);
  await page.screenshot({ path: 'reports/home-desktop.png', fullPage: false });
  await page.getByRole('region', { name: 'Rakshak AI interactive command center demo' }).screenshot({ path: 'reports/product-desktop.png', style: '.shell-navbar, .skip-link { visibility: hidden; }' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.screenshot({ path: 'reports/home-mobile.png', fullPage: false });
  results.consoleErrors = errors;
  await writeFile('reports/qa-results.json', JSON.stringify(results, null, 2));
  const violations = results.accessibility.reduce((sum, item) => sum + item.violations.length, 0);
  console.log(JSON.stringify({ layouts: results.layouts.length, interactions: results.interactions.length, accessibilityViolations: violations, consoleErrors: errors }, null, 2));
  assert.equal(errors.length, 0, 'No browser console errors');
  assert.equal(violations, 0, 'No automated WCAG A/AA violations');
} finally { await writeFile('reports/qa-results.json', JSON.stringify({ ...results, consoleErrors: errors }, null, 2)); await browser.close(); }

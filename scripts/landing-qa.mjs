// Homepage-only checks. Browser tooling stays outside application dependencies.
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
const tools = process.env.QA_TOOL_DIR;
if (!tools) throw new Error('Set QA_TOOL_DIR to external Playwright and axe tooling.');
const { chromium } = await import(pathToFileURL(`${tools}/node_modules/playwright-core/index.mjs`));
const { default: AxeBuilder } = await import(pathToFileURL(`${tools}/node_modules/@axe-core/playwright/dist/index.mjs`));
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const base = process.env.QA_URL || 'http://localhost:4186';
const results = { layouts: [], accessibility: [], interactions: [], errors: [] };
await mkdir('reports', { recursive: true });
try {
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await context.newPage();
  page.setDefaultTimeout(10000);
  page.on('pageerror', error => results.errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') results.errors.push(message.text()); });
  for (const width of [375, 390, 430, 768, 1024, 1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(base);
    await page.locator('.ch-home--dark h1').waitFor();
    await page.waitForTimeout(100);
    assert.equal(await page.locator('main h1').count(), 1);
    const geometry = await page.evaluate(() => ({ width: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
    assert.ok(geometry.scroll <= geometry.width + 1, `${width}: page overflow`);
    const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    results.accessibility.push({ width, violations: audit.violations.map(item => ({ id: item.id, nodes: item.nodes.map(node => ({ target: node.target, failure: node.failureSummary })) })) });
    results.layouts.push(`${width}: single H1 and no page overflow`);
    const onboarding = page.locator('dialog.mode-onboarding');
    if (await onboarding.count()) { await onboarding.locator('.mode-card--business').click(); await onboarding.waitFor({ state: 'hidden' }); }
    if (width === 1440 || width === 390) await page.screenshot({ path: `reports/landing-${width}.png`, fullPage: false });
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(base);
  await page.locator('.ch-home--dark h1').waitFor();
  await page.getByRole('button', { name: 'Explore Rakshak AI', exact: true }).click();
  assert.equal(await page.evaluate(() => document.activeElement?.id), 'rakshak-section');
  const workspace = page.getByRole('region', { name: 'Rakshak AI interactive command center demo', exact: true });
  await workspace.getByRole('searchbox').fill('nonexistent-fixture');
  await workspace.getByRole('heading', { name: 'No matching events' }).waitFor();
  await workspace.getByRole('button', { name: 'Clear filters' }).click();
  await workspace.getByRole('button', { name: '+ Simulate event' }).click();
  await workspace.getByRole('button', { name: 'Add demo event' }).click();
  await workspace.getByText('EVT-DEMO-007', { exact: true }).waitFor();
  const compact = page.getByRole('region', { name: 'Rakshak AI compact interactive demo', exact: true });
  await compact.getByRole('button', { name: /12:04:31/ }).click();
  await compact.getByText('Evidence', { exact: true }).waitFor();
  results.interactions.push('Explore CTA focus; product search/empty/reset/simulation; compact evidence preserved');
  await page.locator('.ch-hero-actions').getByRole('button', { name: 'Request Security Assessment', exact: true }).click();
  await page.locator('.pg-contact h1').waitFor();
  assert.equal(await page.evaluate(() => document.body.classList.contains('home-dark-mode')), false);
  assert.equal(await page.locator('.shell-navbar').evaluate(el => getComputedStyle(el).backgroundColor), 'rgb(255, 255, 255)');
  await page.goBack();
  await page.locator('.ch-home--dark').waitFor();
  assert.equal(await page.evaluate(() => document.body.classList.contains('home-dark-mode')), true);
  results.interactions.push('Contact CTA works; dark shell removed on leaving home and restored with history');
  await page.setViewportSize({ width: 390, height: 844 });
  const menu = page.getByRole('button', { name: 'Open navigation menu' });
  await menu.click();
  await page.getByRole('dialog').waitFor({ state: 'visible' });
  const menuAudit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  results.accessibility.push({ width: '390 menu', violations: menuAudit.violations.map(item => ({ id: item.id, nodes: item.nodes.map(node => ({ target: node.target, failure: node.failureSummary })) })) });
  for (let index = 0; index < 12; index++) await page.keyboard.press('Tab');
  assert.equal(await page.evaluate(() => Boolean(document.activeElement?.closest('dialog'))), true);
  await page.keyboard.press('Escape');
  assert.equal(await menu.getAttribute('aria-expanded'), 'false');
  assert.equal(await menu.evaluate(el => el === document.activeElement), true);
  results.interactions.push('Dark mobile menu focus containment, Escape and focus restoration');
  for (const route of ['/about', '/services', '/pricing', '/rakshak-ai', '/products', '/approach', '/responsible-disclosure']) {
    await page.goto(`${base}${route}`);
    await page.locator('.route-view h1').waitFor();
    assert.equal(await page.evaluate(() => document.body.classList.contains('home-dark-mode')), false);
    assert.equal(await page.locator('.shell-navbar').evaluate(el => getComputedStyle(el).backgroundColor), 'rgb(255, 255, 255)');
  }
  results.interactions.push('Unrelated routes retain their light navigation and no homepage theme');
  await page.goto(base);
  await page.locator('.ch-home--dark h1').waitFor();
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.screenshot({ path: 'reports/landing-full.png', fullPage: true });
  const violations = results.accessibility.reduce((sum, audit) => sum + audit.violations.length, 0);
  console.log(JSON.stringify({ layouts: results.layouts.length, audits: results.accessibility.length, violations, errors: results.errors }, null, 2));
  assert.equal(violations, 0, 'No automated accessibility violations');
  assert.equal(results.errors.length, 0, 'No console errors');
} finally { await writeFile('reports/landing-qa.json', JSON.stringify(results, null, 2)); await browser.close(); }

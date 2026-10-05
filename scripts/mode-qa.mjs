// User mode feature checks. Browser tooling stays outside application dependencies.
import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
const tools = process.env.QA_TOOL_DIR;
if (!tools) throw new Error('Set QA_TOOL_DIR to external Playwright and axe tooling.');
const { chromium } = await import(pathToFileURL(`${tools}/node_modules/playwright-core/index.mjs`));
const { default: AxeBuilder } = await import(pathToFileURL(`${tools}/node_modules/@axe-core/playwright/dist/index.mjs`));
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const base = process.env.QA_URL || 'http://localhost:4186';
const errors = [];

async function expectNoOverflow(page, label) {
  const size = await page.evaluate(() => ({ client: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
  assert.ok(size.scroll <= size.client + 1, `${label}: horizontal overflow ${JSON.stringify(size)}`);
}

async function freshContext(reducedMotion = false, viewport = { width: 1440, height: 1000 }) {
  const context = await browser.newContext({ reducedMotion: reducedMotion ? 'reduce' : 'no-preference', viewport });
  const page = await context.newPage();
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  return { context, page };
}

try {
  const first = await freshContext();
  await first.page.goto(base);
  const dialog = first.page.getByRole('dialog');
  await dialog.waitFor();
  assert.equal(await dialog.getByRole('heading', { name: 'How will you use CyberHiveX?' }).count(), 1);
  assert.equal(await dialog.locator('.mode-card').count(), 2);
  const audit = await new AxeBuilder({ page: first.page }).include('dialog.mode-onboarding').withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  assert.deepEqual(audit.violations, []);
  const business = dialog.locator('.mode-card--business');
  await business.focus();
  assert.equal(await first.page.evaluate(() => document.activeElement?.classList.contains('mode-card--business')), true);
  await first.page.keyboard.press('Enter');
  await dialog.waitFor({ state: 'hidden' });
  assert.equal(await first.page.locator('html').getAttribute('data-mode'), 'business');
  assert.equal(await first.page.evaluate(() => window.localStorage.getItem('cyberhivex-user-mode')), 'business');
  assert.equal(await first.page.evaluate(() => document.body.classList.contains('home-dark-mode')), false);
  await expectNoOverflow(first.page, 'business desktop');
  await first.page.reload();
  assert.equal(await first.page.getByRole('dialog').count(), 0, 'stored business mode skips onboarding');
  const businessModeSummary = first.page.locator('.shell-footer .mode-control > summary');
  await businessModeSummary.scrollIntoViewIfNeeded();
  await businessModeSummary.click();
  await first.page.getByRole('button', { name: /Developer \/ Security Engineer/ }).click();
  await first.page.waitForFunction(() => document.documentElement.dataset.mode === 'technical');
  assert.equal(await first.page.evaluate(() => window.localStorage.getItem('cyberhivex-user-mode')), 'technical');
  assert.equal(await first.page.evaluate(() => document.body.classList.contains('home-dark-mode')), true);
  await expectNoOverflow(first.page, 'technical desktop');
  await first.context.close();

  const technical = await freshContext(true, { width: 390, height: 844 });
  await technical.page.goto(base);
  await technical.page.evaluate(() => window.localStorage.clear());
  await technical.page.reload();
  const technicalDialog = technical.page.getByRole('dialog');
  await technicalDialog.waitFor();
  const cards = technicalDialog.locator('.mode-card');
  assert.equal(await cards.count(), 2);
  const firstBox = await cards.nth(0).boundingBox();
  const secondBox = await cards.nth(1).boundingBox();
  assert.ok(firstBox && secondBox && secondBox.y > firstBox.y, 'mobile mode cards stack vertically');
  await technical.page.keyboard.press('Escape');
  await technicalDialog.waitFor({ state: 'hidden' });
  assert.equal(await technical.page.getByRole('dialog').count(), 0);
  await technical.page.reload();
  await technical.page.getByRole('dialog').waitFor();
  await technical.page.getByRole('button', { name: /Developer \/ Security Engineer/ }).focus();
  await technical.page.keyboard.press('Enter');
  await technical.page.waitForFunction(() => document.documentElement.dataset.mode === 'technical');
  assert.equal(await technical.page.evaluate(() => document.body.classList.contains('home-dark-mode')), true);
  await expectNoOverflow(technical.page, 'technical mobile');
  await technical.context.close();

  const technicalA11y = await freshContext(true);
  await technicalA11y.page.goto(base);
  await technicalA11y.page.evaluate(() => window.localStorage.setItem('cyberhivex-user-mode', 'technical'));
  await technicalA11y.page.reload();
  await technicalA11y.page.goto(`${base}/about`);
  await technicalA11y.page.locator('.route-view h1').waitFor();
  assert.equal(await technicalA11y.page.locator('html').getAttribute('data-mode'), 'technical');
  assert.equal(await technicalA11y.page.locator('.shell-navbar').evaluate(element => getComputedStyle(element).backgroundColor), 'rgb(6, 17, 27)');
  const technicalModeSummary = technicalA11y.page.locator('.shell-footer .mode-control > summary');
  await technicalModeSummary.scrollIntoViewIfNeeded();
  await technicalModeSummary.click();
  await technicalA11y.page.getByRole('button', { name: /Business mode/ }).click();
  await technicalA11y.page.waitForFunction(() => document.documentElement.dataset.mode === 'business');
  assert.equal(await technicalA11y.page.evaluate(() => window.localStorage.getItem('cyberhivex-user-mode')), 'business');
  await technicalA11y.context.close();

  assert.deepEqual(errors, []);
  console.log(JSON.stringify({ firstVisit: 'passed', persistence: 'passed', switching: 'passed', mobile: 'passed', keyboard: 'passed', reducedMotion: 'passed', accessibility: 'passed', consoleErrors: errors }, null, 2));
} finally {
  await browser.close();
}

// Checks user-visible motion outcomes and fallbacks. Dependencies remain in external QA tooling.
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
const tools = process.env.QA_TOOL_DIR;
if (!tools) throw new Error('Set QA_TOOL_DIR to an external playwright-core installation.');
const { chromium } = await import(pathToFileURL(`${tools}/node_modules/playwright-core/index.mjs`));
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const base = process.env.QA_URL || 'http://localhost:5173';
const results = { interactions: [], responsive: [], errors: [] };
await mkdir('reports', { recursive: true });
try {
  const context = await browser.newContext({ reducedMotion: 'no-preference', viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  page.setDefaultTimeout(15000);
  page.on('pageerror', error => results.errors.push(error.message));
  await page.goto(base);
  const onboarding = page.locator('dialog.mode-onboarding');
  if (await onboarding.count()) { await onboarding.locator('.mode-card--technical').click(); await onboarding.waitFor({ state: 'hidden' }); }
  const scene = page.getByRole('region', { name: 'Rakshak AI security intelligence visualization', exact: true });
  await scene.waitFor();
  await scene.getByRole('button', { name: 'Reset hero simulation' }).click();
  await page.waitForTimeout(900);

  const cta = page.locator('.ch-hero-actions .btn-cyber-primary');
  await cta.hover();
  await page.waitForTimeout(100);
  const bounds = await cta.boundingBox();
  await page.mouse.move(bounds.x + bounds.width * .8, bounds.y + bounds.height * .65);
  await page.waitForTimeout(450);
  const magnetic = await cta.evaluate(element => ({ x: parseFloat(element.style.getPropertyValue('--motion-mx')), y: parseFloat(element.style.getPropertyValue('--motion-my')) }));
  assert.ok(magnetic.x > 0 && magnetic.x <= 3.5 && Math.abs(magnetic.y) <= 3.5, `Magnetic displacement: ${JSON.stringify(magnetic)}`);
  await page.mouse.move(40, 100);
  await page.waitForTimeout(400);
  assert.equal(await cta.evaluate(element => element.style.getPropertyValue('--motion-mx')), '0px');
  await page.keyboard.press('Tab');
  await cta.focus();
  assert.equal(await cta.evaluate(element => getComputedStyle(element).outlineStyle), 'solid');
  results.interactions.push('CTA attraction is bounded; pointer leave restores position; keyboard focus stays visible.');

  await scene.getByRole('button', { name: 'Play demo sequence' }).click();
  await scene.getByRole('status').getByText('Event detected · fixture', { exact: true }).waitFor();
  assert.equal(await scene.locator('.sc-network-desktop .sc-packet').count(), 1);
  await scene.getByRole('status').getByText('Correlating · prepared', { exact: true }).waitFor();
  assert.equal(await scene.locator('.sc-network-desktop .sc-packet').count(), 3);
  assert.equal(await scene.evaluate(element => element.getAnimations({ subtree: true }).some(animation => animation.effect?.getTiming().iterations === Infinity)), false);
  await scene.getByRole('button', { name: 'Pause demo sequence' }).click();
  await page.waitForTimeout(500);
  assert.equal(await scene.evaluate(element => element.getAnimations({ subtree: true }).length), 0);
  results.interactions.push('Selected stage connections receive staggered packets; core activity is finite and stops when paused.');

  const evidence = page.locator('.ch-evidence-layout > div').first();
  await evidence.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  assert.equal(await evidence.getAttribute('data-motion-seen'), 'true');
  assert.equal(await evidence.evaluate(element => element.getAnimations().length), 0);
  await scene.scrollIntoViewIfNeeded();
  await evidence.scrollIntoViewIfNeeded();
  assert.equal(await evidence.evaluate(element => element.getAnimations().length), 0);
  results.interactions.push('Meaningful groups reveal once; rescrolling does not replay entrances or hide content.');

  const full = page.getByRole('region', { name: 'Rakshak AI interactive command center demo', exact: true });
  const module = label => full.getByRole('navigation', { name: 'Command center modules' }).getByRole('button', { name: label, exact: true }).click();
  await module('Dashboard');
  await full.locator('.rk-animated-metric').first().waitFor();
  await full.locator('.rk-overview-cards').scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  assert.equal(await full.locator('.rk-animated-metric [aria-hidden="true"]').first().innerText(), '6');
  assert.equal(await full.locator('.rk-animated-metric .rk-sr-only').first().innerText(), '6');
  await full.locator('.rk-risk-chart').scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);
  assert.equal(await full.locator('.rk-bar').first().getAttribute('data-motion-seen'), 'true');
  assert.equal(await full.locator('.rk-bar').first().evaluate(element => element.getAnimations().length), 0);
  await full.getByRole('button', { name: '+ Simulate event' }).click();
  await full.getByRole('button', { name: 'Add demo event' }).click();
  await full.getByText('EVT-DEMO-007', { exact: true }).waitFor();
  await module('Dashboard');
  await full.locator('.rk-overview-cards').scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  assert.equal(await full.locator('.rk-animated-metric [aria-hidden="true"]').first().innerText(), '7');
  assert.equal(await full.locator('.rk-animated-metric .rk-sr-only').first().innerText(), '7');
  results.interactions.push('Metric animation reaches actual fixture counts, updates after local simulation, and exposes true values to assistive technology; bars settle.');

  const lifecycle = page.locator('.ch-lifecycle');
  await lifecycle.getByRole('button', { name: /\bLearn$/ }).hover();
  await lifecycle.getByRole('heading', { name: 'Understand what happened and why.' }).waitFor();
  assert.equal(await lifecycle.getByRole('button', { name: /\bLearn$/ }).getAttribute('aria-pressed'), 'true');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForTimeout(150);
  await lifecycle.getByRole('button', { name: /\bDiscover$/ }).hover();
  assert.equal(await lifecycle.getByRole('button', { name: /\bLearn$/ }).getAttribute('aria-pressed'), 'true');
  await lifecycle.getByRole('button', { name: /\bDiscover$/ }).click();
  await lifecycle.getByRole('heading', { name: 'Know what needs protecting.' }).waitFor();
  await scene.scrollIntoViewIfNeeded();
  assert.equal(await scene.evaluate(element => element.getAnimations({ subtree: true }).length), 0);
  assert.equal(await page.locator('[data-magnetic]').count(), 0);
  results.interactions.push('Lifecycle hover previews context; switching to reduced motion cancels motion and magnetic targets while clicks still work.');
  await context.close();

  const touch = await browser.newContext({ isMobile: true, hasTouch: true, reducedMotion: 'no-preference', viewport: { width: 390, height: 844 } });
  const touchPage = await touch.newPage();
  touchPage.on('pageerror', error => results.errors.push(error.message));
  await touchPage.goto(base);
  const touchOnboarding = touchPage.locator('dialog.mode-onboarding');
  if (await touchOnboarding.count()) { await touchOnboarding.locator('.mode-card--technical').click(); await touchOnboarding.waitFor({ state: 'hidden' }); }
  const touchScene = touchPage.getByRole('region', { name: 'Rakshak AI security intelligence visualization', exact: true });
  await touchScene.getByRole('button', { name: /^Inspect ASSET-042/ }).tap();
  await touchScene.getByRole('region', { name: 'Selected fictional network node' }).getByText('ASSET-042', { exact: true }).waitFor();
  assert.equal(await touchScene.getByRole('button', { name: /^Inspect / }).count(), 4);
  assert.equal(await touchPage.locator('[data-magnetic]').count(), 0);
  const touchFull = touchPage.getByRole('region', { name: 'Rakshak AI interactive command center demo', exact: true });
  await touchFull.getByLabel('Command center module', { exact: true }).selectOption('dashboard');
  await touchFull.locator('.rk-overview-cards').scrollIntoViewIfNeeded();
  await touchPage.waitForTimeout(800);
  assert.equal(await touchFull.locator('.rk-animated-metric [aria-hidden="true"]').first().innerText(), '6');
  const touchLifecycle = touchPage.locator('.ch-lifecycle');
  await touchLifecycle.getByRole('button', { name: /\bRespond$/ }).tap();
  await touchLifecycle.getByRole('heading', { name: 'Handle incidents with a clear plan.' }).waitFor();
  results.interactions.push('Touch uses four nodes with no magnetic targets; tap inspection, mobile module selection, metrics and lifecycle work.');
  await touch.close();

  const widths = await browser.newContext({ reducedMotion: 'no-preference' });
  const widthPage = await widths.newPage();
  widthPage.on('pageerror', error => results.errors.push(error.message));
  for (const width of [375, 390, 430, 768, 1024, 1280, 1440, 1920]) {
    await widthPage.setViewportSize({ width, height: 1000 });
    await widthPage.goto(base);
    const widthScene = widthPage.getByRole('region', { name: 'Rakshak AI security intelligence visualization', exact: true });
    await widthScene.waitFor();
    await widthScene.scrollIntoViewIfNeeded();
    const layout = await widthScene.evaluate(element => {
      const nodes = [...element.querySelectorAll('.sc-node')].filter(node => getComputedStyle(node).display !== 'none').map(node => node.getBoundingClientRect());
      return { overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth, nodes: nodes.length, overlap: nodes.some((a, i) => nodes.slice(i + 1).some(b => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top)) };
    });
    assert.ok(layout.overflow <= 1); assert.equal(layout.overlap, false); results.responsive.push({ width, ...layout });
  }
  assert.deepEqual(results.errors, []);
  console.log(JSON.stringify({ interactionGroups: results.interactions.length, responsiveWidths: results.responsive.length, errors: results.errors }, null, 2));
} finally {
  await writeFile('reports/motion-qa.json', JSON.stringify(results, null, 2));
  await browser.close();
}

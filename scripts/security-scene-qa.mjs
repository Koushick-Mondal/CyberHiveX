// Feature checks for the SVG security core. QA tooling stays outside application dependencies.
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

const tools = process.env.QA_TOOL_DIR;
if (!tools) throw new Error('Set QA_TOOL_DIR to an external playwright-core and @axe-core/playwright installation.');
const { chromium } = await import(pathToFileURL(`${tools}/node_modules/playwright-core/index.mjs`));
const { default: AxeBuilder } = await import(pathToFileURL(`${tools}/node_modules/@axe-core/playwright/dist/index.mjs`));
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const base = process.env.QA_URL || 'http://localhost:5173';
const results = { layouts: [], interactions: [], accessibility: [], frameSample: null, pageErrors: [] };
await mkdir('reports', { recursive: true });

try {
  const context = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  page.on('pageerror', error => results.pageErrors.push(error.message));
  await page.goto(base);
  const onboarding = page.locator('dialog.mode-onboarding');
  if (await onboarding.count()) { await onboarding.locator('.mode-card--technical').click(); await onboarding.waitFor({ state: 'hidden' }); }
  const scene = page.getByRole('region', { name: 'Rakshak AI security intelligence visualization', exact: true });
  await scene.waitFor();
  assert.equal(await scene.getByRole('button', { name: /Play demo sequence/ }).count(), 0);
  assert.equal(await scene.evaluate(element => element.getAnimations({ subtree: true }).length), 0);
  await scene.getByRole('button', { name: /^Inspect ASSET-042/ }).focus();
  await page.keyboard.press('Enter');
  await scene.getByRole('region', { name: 'Selected fictional network node' }).getByText('ASSET-042', { exact: true }).waitFor();
  const expected = ['Monitoring · simulated', 'Event detected · fixture', 'Analyzing · prepared', 'Correlating · prepared', 'Risk assessment · High', 'Recommendation ready', 'Review recorded · demo', 'Monitoring · simulated'];
  for (const label of expected) {
    await scene.getByRole('button', { name: 'Next simulation stage' }).click();
    await scene.getByRole('status').getByText(label, { exact: true }).waitFor();
  }
  await scene.getByRole('button', { name: 'Reset hero simulation' }).click();
  await scene.getByRole('status').getByText('Ready', { exact: true }).waitFor();
  results.interactions.push('Keyboard node inspection; all eight manual stages; local review; reset; static reduced-motion mode.');

  for (const width of [375, 390, 430, 768, 1024, 1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    assert.equal(await scene.getByRole('button', { name: /^Inspect / }).count(), width <= 580 ? 4 : 8);
    const metrics = await scene.evaluate(element => {
      const sceneBounds = element.getBoundingClientRect();
      const nodes = [...element.querySelectorAll('.sc-node')].filter(node => getComputedStyle(node).display !== 'none').map(node => node.getBoundingClientRect());
      const overlap = nodes.some((a, index) => nodes.slice(index + 1).some(b => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top));
      return { overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth, overlap, clipped: nodes.some(node => node.left < sceneBounds.left || node.right > sceneBounds.right), targets: nodes.every(node => node.width >= 44 && node.height >= 44) };
    });
    assert.ok(metrics.overflow <= 1, `${width}: page overflow`);
    assert.equal(metrics.overlap, false, `${width}: overlapping nodes`);
    assert.equal(metrics.clipped, false, `${width}: clipped nodes`);
    assert.equal(metrics.targets, true, `${width}: touch targets`);
    const audit = await new AxeBuilder({ page }).include('.sc-scene').withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    results.accessibility.push({ width, violations: audit.violations.map(item => ({ id: item.id, targets: item.nodes.map(node => node.target) })) });
    assert.equal(audit.violations.length, 0, `${width}: accessibility violations`);
    results.layouts.push(`${width}: simplified mobile / desktop nodes; no overlap, clipping or overflow; 44px targets`);
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.screenshot({ path: 'reports/security-core-desktop.png', fullPage: false });
  await page.setViewportSize({ width: 390, height: 844 });
  await scene.screenshot({ path: 'reports/security-core-mobile.png' });
  await context.close();

  const motionContext = await browser.newContext({ reducedMotion: 'no-preference', viewport: { width: 1440, height: 1000 } });
  const motionPage = await motionContext.newPage();
  motionPage.on('pageerror', error => results.pageErrors.push(error.message));
  await motionPage.goto(base);
  const motionOnboarding = motionPage.locator('dialog.mode-onboarding');
  if (await motionOnboarding.count()) { await motionOnboarding.locator('.mode-card--technical').click(); await motionOnboarding.waitFor({ state: 'hidden' }); }
  const motionScene = motionPage.getByRole('region', { name: 'Rakshak AI security intelligence visualization', exact: true });
  await motionScene.getByRole('button', { name: 'Pause demo sequence' }).waitFor();
  await motionScene.getByRole('button', { name: 'Reset hero simulation' }).click();
  await motionScene.getByRole('button', { name: 'Play demo sequence' }).click();
  await motionScene.getByRole('status').getByText('Monitoring · simulated', { exact: true }).waitFor();
  await motionPage.locator('#rakshak-section').scrollIntoViewIfNeeded();
  await motionPage.waitForTimeout(150);
  const offscreenStage = await motionScene.getByRole('status').innerText();
  assert.equal(await motionScene.evaluate(element => element.classList.contains('sc-scene--playing')), false);
  await motionPage.waitForTimeout(3200);
  assert.equal(await motionScene.getByRole('status').innerText(), offscreenStage);
  await motionScene.scrollIntoViewIfNeeded();
  await motionScene.getByRole('button', { name: 'Pause demo sequence' }).click();
  await motionScene.getByRole('button', { name: 'Reset hero simulation' }).click();
  await motionScene.getByRole('button', { name: 'Play demo sequence' }).click();
  for (const label of expected.slice(0, -1)) await motionScene.getByRole('status').getByText(label, { exact: true }).waitFor();
  await motionScene.getByRole('button', { name: 'Replay demo sequence' }).waitFor();
  assert.equal(await motionScene.evaluate(element => element.classList.contains('sc-scene--playing')), false);
  results.interactions.push('One automatic scripted cycle; offscreen timer/animation suspension; pause; replay; reset.');

  await motionScene.getByRole('button', { name: 'Replay demo sequence' }).click();
  await motionPage.mouse.move(1080, 360);
  results.frameSample = await motionPage.evaluate(() => new Promise(resolve => {
    const samples = []; let last = performance.now(); const until = last + 3000;
    function frame(now) { samples.push(now - last); last = now; if (now < until) requestAnimationFrame(frame); else { const intervals = samples.slice(1).sort((a, b) => a - b); resolve({ environment: 'Local headless Chrome; three-second active scene sample, not a device guarantee', frames: intervals.length, medianFrameMs: Number(intervals[Math.floor(intervals.length / 2)].toFixed(2)), framesOver33ms: intervals.filter(value => value > 33).length }); } }
    requestAnimationFrame(frame);
  }));
  assert.equal(await motionScene.evaluate(element => element.querySelectorAll('*').length < 200), true);
  assert.deepEqual(results.pageErrors, []);
  console.log(JSON.stringify(results, null, 2));
} finally {
  await writeFile('reports/security-scene-qa.json', JSON.stringify(results, null, 2));
  await browser.close();
}

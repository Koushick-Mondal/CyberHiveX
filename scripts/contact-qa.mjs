// Test the configurable contact adapter against browser-intercepted local fixtures only.
import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
const tools = process.env.QA_TOOL_DIR;
if (!tools) throw new Error('Set QA_TOOL_DIR to the external playwright-core installation.');
const { chromium } = await import(pathToFileURL(`${tools}/node_modules/playwright-core/index.mjs`));
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const context = await browser.newContext();
const page = await context.newPage();
const base = process.env.QA_CONTACT_URL || 'http://localhost:5186';
try {
  await page.goto(`${base}/#contact`);
  await page.getByLabel('Full name').fill('QA Example');
  await page.getByLabel('Email address').fill('qa@example.com');
  await page.getByLabel(/Organization/).fill('Example organization');
  await page.getByLabel('Requirements & context').fill('Fictional local delivery-adapter check.');
  await page.getByRole('button', { name: 'Prepare local request' }).click();
  await context.setOffline(true);
  await page.getByRole('button', { name: 'Send request', exact: true }).click();
  await page.getByText(/You appear to be offline/).waitFor();
  await context.setOffline(false);
  let calls = 0;
  await page.route('**/api/contact', async route => {
    calls++;
    assert.equal(route.request().method(), 'POST');
    assert.equal(JSON.parse(route.request().postData()).email, 'qa@example.com');
    await new Promise(resolve => setTimeout(resolve, 250));
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: false }) });
  });
  await page.getByRole('button', { name: 'Send request', exact: true }).click();
  await page.getByRole('button', { name: 'Sending…' }).waitFor();
  assert.equal(await page.getByLabel('Full name').isDisabled(), true);
  await page.getByText(/Receipt could not be confirmed/).waitFor();
  assert.equal(calls, 1, 'No automatic retry of unconfirmed receipt');
  await page.unroute('**/api/contact');
  await page.route('**/api/contact', route => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: true }) }));
  await page.getByRole('button', { name: 'Send request', exact: true }).click();
  await page.getByText(/The server confirmed receipt/).waitFor();
  assert.equal(await page.getByRole('button', { name: 'Receipt confirmed' }).isDisabled(), true);
  console.log('Contact adapter passed: offline, loading/disabled fields, unconfirmed receipt without retry, confirmed receipt, duplicate-send prevention. Mock fixtures only.');
} finally { await browser.close(); }

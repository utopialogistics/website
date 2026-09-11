import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

const origin = 'http://localhost:4321';
const routes = [
  '/',
  '/services/',
  '/services/ftl/',
  '/services/ltl/',
  '/services/cross-border/',
  '/services/long-haul/',
  '/coverage/',
  '/about/',
  '/contact/',
  '/request-quote/',
  '/quote-received/',
  '/faq/',
  '/privacy/',
  '/404/',
];
await mkdir('.qa/revamp', { recursive: true });
const browser = await chromium.launch({ headless: true });
const results = [];
const failures = [];
try {
  await Promise.all(
    [
      ['desktop', 1440, 1000],
      ['tablet', 768, 1024],
      ['mobile', 390, 844],
      ['small-mobile', 320, 740],
    ].map(async ([name, width, height]) => {
      const context = await browser.newContext({
        viewport: { width, height },
        reducedMotion: 'reduce',
      });
      const page = await context.newPage();
      const pageErrors = [];
      page.on('pageerror', (error) => pageErrors.push(error.message));
      for (const route of routes) {
        const label = `${name} ${route}`;
        try {
          const response = await page.goto(origin + route, {
            waitUntil: 'networkidle',
          });
          assert.ok(
            response.status() === 200 ||
              (route === '/404/' && response.status() === 404),
            `${label} status ${response.status()}`,
          );
          await page.evaluate(() => document.fonts.ready);
          await page.locator('footer').scrollIntoViewIfNeeded();
          await page.evaluate(async () => {
            document
              .querySelectorAll('img[loading="lazy"]')
              .forEach((img) => (img.loading = 'eager'));
            await Promise.all([...document.images].map((img) => img.decode()));
            window.scrollTo(0, 0);
          });
          const checks = await page.evaluate(() => ({
            overflow: document.documentElement.scrollWidth > innerWidth,
            h1s: document.querySelectorAll('h1').length,
            description: document
              .querySelector('meta[name="description"]')
              ?.getAttribute('content'),
            brokenImages: [...document.images]
              .filter((img) => !img.complete || !img.naturalWidth)
              .map((img) => img.src),
            anchors: [...document.querySelectorAll('a[href^="#"]')]
              .filter((a) => !document.getElementById(a.hash.slice(1)))
              .map((a) => a.hash),
            localLinks: [...document.querySelectorAll('a[href^="/"]')].map(
              (a) => new URL(a.href).pathname,
            ),
            phones: [...document.querySelectorAll('a[href^="tel:"]')].map((a) =>
              a.getAttribute('href'),
            ),
            emails: [...document.querySelectorAll('a[href^="mailto:"]')].map(
              (a) => a.getAttribute('href').split('?')[0],
            ),
          }));
          assert.equal(checks.overflow, false, `${label} horizontal overflow`);
          assert.equal(checks.h1s, 1, `${label} needs one h1`);
          assert.ok(
            checks.description?.length > 40,
            `${label} metadata missing`,
          );
          assert.deepEqual(checks.brokenImages, []);
          assert.deepEqual(checks.anchors, []);
          assert.ok(
            checks.localLinks.every((path) => routes.includes(path)),
            `${label} unknown local link`,
          );
          assert.ok(
            checks.phones.length &&
              checks.phones.every((link) => link === 'tel:+19054861738'),
          );
          assert.ok(
            checks.emails.length &&
              checks.emails.every(
                (link) => link === 'mailto:dispatch@utopialogistics.ca',
              ),
          );
          assert.deepEqual(pageErrors, [], `${label} runtime errors`);
          const slug =
            route === '/'
              ? 'home'
              : route.replaceAll('/', '-').replace(/^-|-$/g, '');
          await page.screenshot({
            path: `.qa/revamp/${name}-${slug}.png`,
            fullPage: true,
          });
          const axe = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
            .analyze();
          const violations = axe.violations.map((v) => ({
            id: v.id,
            nodes: v.nodes.map((node) => ({
              html: node.html,
              issue: node.failureSummary,
            })),
          }));
          if (violations.length) failures.push({ label, violations });
          results.push({
            viewport: name,
            route,
            overflow: checks.overflow,
            violations: violations.length,
          });
        } catch (error) {
          failures.push({ label, error: error.message });
        }
      }
      if (width <= 980) {
        await page.goto(origin, { waitUntil: 'networkidle' });
        const menu = page.locator('.menu-toggle');
        assert.equal(await page.locator('.menu-close-icon').isVisible(), false);
        await menu.click();
        assert.equal(await menu.getAttribute('aria-expanded'), 'true');
        assert.equal(await page.locator('.menu-open-icon').isVisible(), false);
        await page.keyboard.press('Escape');
        assert.equal(await menu.getAttribute('aria-expanded'), 'false');
        assert.equal(
          await menu.evaluate((el) => el === document.activeElement),
          true,
        );
        await menu.click();
        await page
          .getByRole('navigation', { name: 'Mobile navigation' })
          .getByRole('link', { name: 'Coverage', exact: true })
          .click();
        await page.waitForURL('**/coverage/');
        assert.equal(
          await page.locator('.menu-toggle').getAttribute('aria-expanded'),
          'false',
        );
        assert.equal(
          await page
            .locator('#mobile-nav a[href="/coverage/"]')
            .getAttribute('aria-current'),
          'page',
        );
      }
      await context.close();
    }),
  );

  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  const posts = [];
  page.on('request', (request) => {
    if (request.method() === 'POST') posts.push(request.url());
  });
  await page.goto(origin, { waitUntil: 'networkidle' });
  await page.getByLabel('PICKUP CITY', { exact: true }).fill('Milton');
  await page.getByLabel('DELIVERY CITY', { exact: true }).fill('Chicago');
  await page.getByRole('button', { name: 'Plan my shipment' }).click();
  await page.waitForURL('**/request-quote/**');
  assert.equal(
    await page.locator('[name="pickup_city"]').inputValue(),
    'Milton',
  );
  assert.equal(
    await page.locator('[name="delivery_city"]').inputValue(),
    'Chicago',
  );
  await page.getByRole('button', { name: 'Review Quote Request' }).click();
  assert.equal(await page.locator('[data-error-summary]').isVisible(), true);
  assert.equal(
    await page
      .locator('[data-error-summary]')
      .evaluate((el) => el === document.activeElement),
    true,
  );
  const values = {
    name: 'Alex Example',
    company: 'Example Freight',
    email: 'alex@example.com',
    phone: '437-555-0100',
    pickup_region: 'ON',
    pickup_postal: 'L9T 6R1',
    pickup_country: 'Canada',
    delivery_region: 'IL',
    delivery_postal: '60601',
    delivery_country: 'United States',
    commodity: '4 pallets of packaged paper',
    piece_count: '4',
    dimensions: '48 x 40 x 48',
    weight: '1250',
    equipment: 'Standard trailer if available',
    details: 'Please discuss delivery arrangements.',
  };
  for (const [name, value] of Object.entries(values))
    await page.locator(`[name="${name}"]`).fill(value);
  await page.locator('[name="liftgate"]').check();
  await page.locator('[name="appointment"]').check();
  await page.locator('[name="pickup_date"]').fill('2000-01-01');
  await page.locator('[name="weight"]').fill('-5');
  await page.locator('[name="piece_count"]').fill('0');
  await page.locator('[name="email"]').fill('not-an-email');
  await page.getByRole('button', { name: 'Review Quote Request' }).click();
  for (const field of ['pickup_date', 'weight', 'piece_count', 'email'])
    assert.equal(
      await page.locator(`[name="${field}"]`).getAttribute('aria-invalid'),
      'true',
      `${field} should be flagged invalid`,
    );
  const today = await page.locator('[name="pickup_date"]').getAttribute('min');
  await page.locator('[name="pickup_date"]').fill(today);
  await page.locator('[name="delivery_date"]').fill('2000-01-02');
  await page.getByRole('button', { name: 'Review Quote Request' }).click();
  assert.equal(
    await page.locator('[name="delivery_date"]').getAttribute('aria-invalid'),
    'true',
    'a delivery date before the pickup date should be flagged',
  );
  await page.locator('[name="delivery_date"]').fill(today);
  await page.locator('[name="weight"]').fill('1250');
  await page.locator('[name="piece_count"]').fill('4');
  await page.locator('[name="email"]').fill('alex@example.com');
  await page.locator('[name="route_type"]').selectOption('cross-border');
  await page.locator('[name="stackable"]').selectOption('no');
  await page.locator('[name="weight_unit"]').selectOption('kg');
  await page.locator('[name="dimension_unit"]').selectOption('cm');
  await page.getByRole('button', { name: 'Review Quote Request' }).click();
  assert.equal(await page.locator('[data-review]').isVisible(), true);
  assert.match(
    await page.locator('.review-notice').textContent(),
    /not been sent/,
  );
  assert.equal(
    await page
      .locator('[data-review-heading]')
      .evaluate((el) => el === document.activeElement),
    true,
  );
  // Reviewing must never post on its own.
  assert.deepEqual(posts, [], 'reviewing must not submit the form');
  // The prepared text still carries every entered detail, for the visitor's records.
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download request' }).click();
  const download = await downloadPromise;
  const text = await readFile(await download.path(), 'utf8');
  assert.match(text, /NOT SENT/);
  for (const fragment of [
    'Milton, ON, L9T 6R1, Canada',
    'Chicago, IL, 60601, United States',
    '1250 kg',
    '48 x 40 x 48 cm',
    'Between Canada and the United States',
    'No, do not stack',
    'Liftgate requested; Delivery appointment required',
    'alex@example.com',
    'Please discuss delivery arrangements.',
  ])
    assert.ok(text.includes(fragment), `download missing ${fragment}`);
  const reviewAxe = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  if (reviewAxe.violations.length)
    failures.push({
      label: 'Quote review accessibility',
      violations: reviewAxe.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.failureSummary),
      })),
    });
  // Editing returns every value untouched.
  await page.getByRole('button', { name: 'Edit details' }).click();
  assert.equal(
    await page.locator('[name="pickup_city"]').inputValue(),
    'Milton',
  );
  assert.equal(await page.locator('[name="weight_unit"]').inputValue(), 'kg');
  assert.equal(
    await page.locator('[name="liftgate"]').isChecked(),
    true,
    'ticked requirements must survive an edit',
  );
  // Each service CTA prefills the field it is about, and nothing else.
  for (const [cta, field, expected] of [
    ['Request an FTL Quote', 'shipment_type', 'ftl'],
    ['Request an LTL Quote', 'shipment_type', 'ltl'],
    ['Discuss a Cross-Border Shipment', 'route_type', 'cross-border'],
  ]) {
    await page.goto(origin + '/services/', { waitUntil: 'networkidle' });
    await page
      .locator('main')
      .getByRole('link', { name: cta, exact: true })
      .first()
      .click();
    await page.waitForURL('**/request-quote/**');
    if (field === 'shipment_type')
      assert.equal(
        await page
          .locator(`[name="shipment_type"][value="${expected}"]`)
          .isChecked(),
        true,
        `${cta} should preselect ${expected}`,
      );
    else
      assert.equal(
        await page.locator(`[name="${field}"]`).inputValue(),
        expected,
        `${cta} should preselect ${expected}`,
      );
  }
  // Combined prefill keeps every supplied value, and leaves the rest untouched.
  await page.goto(
    origin +
      '/request-quote/?shipment_type=ltl&pickup_city=Milton&delivery_city=Chicago',
    { waitUntil: 'networkidle' },
  );
  assert.equal(
    await page.locator('[name="shipment_type"][value="ltl"]').isChecked(),
    true,
  );
  assert.equal(
    await page.locator('[name="pickup_city"]').inputValue(),
    'Milton',
  );
  assert.equal(
    await page.locator('[name="delivery_city"]').inputValue(),
    'Chicago',
  );
  assert.equal(
    await page.locator('[name="route_type"]').inputValue(),
    'not-sure',
    'an unrelated field must keep its default',
  );
  // A confirmed request posts once, to Netlify, carrying every field.
  await page.goto(origin + '/request-quote/?shipment_type=ftl', {
    waitUntil: 'networkidle',
  });
  let submittedBody = null;
  await page.route('**/quote-received/', async (route) => {
    if (route.request().method() !== 'POST') return route.continue();
    submittedBody = route.request().postData();
    await route.fulfill({
      status: 200,
      contentType: 'text/html',
      body: '<!doctype html><title>stub</title><h1>Netlify stub</h1>',
    });
  });
  for (const [name, value] of Object.entries({
    pickup_city: 'Milton',
    pickup_country: 'Canada',
    delivery_city: 'Chicago',
    delivery_country: 'United States',
    commodity: 'Palletised packaged goods',
    name: 'Alex Example',
    company: 'Example Freight',
    email: 'alex@example.com',
  }))
    await page.locator(`[name="${name}"]`).fill(value);
  await page
    .locator('[name="pickup_date"]')
    .fill(await page.locator('[name="pickup_date"]').getAttribute('min'));
  await page.locator('[name="liftgate"]').check();
  await page.getByRole('button', { name: 'Review Quote Request' }).click();
  assert.equal(await page.locator('[data-review]').isVisible(), true);
  assert.equal(submittedBody, null, 'reaching review must not post');
  await page.getByRole('button', { name: 'Send Request to Dispatch' }).click();
  await page.waitForURL('**/quote-received/');
  assert.ok(submittedBody, 'confirming the request must post the form');
  const sent = new URLSearchParams(submittedBody);
  for (const [field, expected] of [
    ['form-name', 'quote-request'],
    ['shipment_type', 'ftl'],
    ['pickup_city', 'Milton'],
    ['delivery_country', 'United States'],
    ['commodity', 'Palletised packaged goods'],
    ['email', 'alex@example.com'],
    ['liftgate', 'yes'],
    ['bot-field', ''],
  ])
    assert.equal(sent.get(field), expected, `posted ${field} mismatch`);
  assert.equal(
    posts.filter((url) => url.includes('/quote-received/')).length,
    1,
    'the form must post exactly once',
  );
  await page.unroute('**/quote-received/');
  // The real success page stands on its own.
  await page.goto(origin + '/quote-received/', { waitUntil: 'networkidle' });
  assert.match(await page.locator('h1').textContent(), /Thank you/);
  assert.equal(
    await page
      .locator('meta[name="robots"]')
      .getAttribute('content', { timeout: 2000 }),
    'noindex, follow',
  );
  // The long-haul CTA opens the coverage route planner.
  await page.goto(origin + '/services/', { waitUntil: 'networkidle' });
  await page
    .locator('main')
    .getByRole('link', { name: 'Check Your Route', exact: true })
    .first()
    .click();
  await page.waitForURL('**/coverage/**');
  assert.equal(await page.locator('#plan-your-route').isVisible(), true);
  await page.goto(origin + '/faq/');
  const faq = page.locator('.faq-list details').first();
  await faq.locator('summary').focus();
  await page.keyboard.press('Enter');
  assert.equal(await faq.getAttribute('open'), '');
  const missingResponse = await page.goto(
    origin + '/this-page-does-not-exist/',
  );
  assert.equal(missingResponse.status(), 404);
  assert.match(await page.locator('h1').textContent(), /This road/);
  await context.close();

  const noJs = await browser.newContext({ javaScriptEnabled: false });
  const noJsPage = await noJs.newPage();
  await noJsPage.goto(origin + '/request-quote/');
  // With a real endpoint the form must work without JavaScript.
  assert.equal(
    await noJsPage.locator('[name="name"]').isDisabled(),
    false,
    'fields must stay usable without JavaScript',
  );
  assert.equal(
    await noJsPage.locator('form[name="quote-request"]').getAttribute('action'),
    '/quote-received/',
  );
  assert.equal(
    await noJsPage.locator('[name="form-name"]').getAttribute('value'),
    'quote-request',
  );
  assert.equal(
    await noJsPage
      .locator('form[name="quote-request"]')
      .getAttribute('novalidate'),
    null,
    'the browser must validate when scripted validation is unavailable',
  );
  assert.equal(await noJsPage.locator('.no-script').isVisible(), true);
  assert.match(
    await noJsPage.locator('.no-script').textContent(),
    /straight to Utopia Logistics dispatch/,
  );
  await noJs.close();
  results.push({
    interactions:
      'Route planner, four service-CTA prefills, combined prefill without clearing, coverage route anchor, mobile menu, active links, required/email/date/weight/count validation, delivery-before-pickup validation, review focus without posting, confirmed Netlify submission posting once with form-name/honeypot/all fields, success page, download, edit, FAQ keyboard interaction, 404, no-JS form usability passed.',
  });
} catch (error) {
  failures.push({ error: error.stack });
} finally {
  await browser.close();
}
await writeFile(
  '.qa/revamp/results.json',
  JSON.stringify({ results, failures }, null, 2),
);
console.log(
  JSON.stringify(
    {
      pagesChecked: results.filter((r) => r.route).length,
      interactions: results.find((r) => r.interactions),
      failures,
    },
    null,
    2,
  ),
);
if (failures.length) process.exitCode = 1;

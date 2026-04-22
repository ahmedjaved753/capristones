// @ts-check
import { test, expect } from '@playwright/test';

const routes = [
  { name: 'home-hero',            path: '/',                      scroll: 0 },
  { name: 'home-collections',     path: '/',                      scroll: 900 },
  { name: 'home-cta',             path: '/',                      scroll: 2000 },
  { name: 'natural-stone-hero',   path: '/#/natural-stone',       scroll: 0 },
  { name: 'natural-stone-grid',   path: '/#/natural-stone',       scroll: 800 },
  { name: 'product-detail-hero', path: '/#/natural-stone/1',     scroll: 0 },
  { name: 'product-detail-specs', path: '/#/natural-stone/1',     scroll: 700 },
  { name: 'quartz-hero',          path: '/#/quartz',              scroll: 0 },
  { name: 'quartz-grid',          path: '/#/quartz',              scroll: 800 },
  { name: 'shower-panels-hero',   path: '/#/shower-panels',       scroll: 0 },
  { name: 'shower-panels-grid',   path: '/#/shower-panels',       scroll: 800 },
  { name: 'shower-panel-detail-hero',  path: '/#/shower-panels/1', scroll: 0 },
  { name: 'shower-panel-detail-specs', path: '/#/shower-panels/1', scroll: 700 },
  { name: 'cabinets-hero',        path: '/#/cabinets',            scroll: 0 },
  { name: 'cabinets-grid',        path: '/#/cabinets',            scroll: 800 },
  { name: 'cabinet-detail-hero',  path: '/#/cabinets/1',          scroll: 0 },
  { name: 'cabinet-detail-specs', path: '/#/cabinets/1',          scroll: 700 },
  { name: 'appointments-hero',    path: '/#/appointments',        scroll: 0 },
  { name: 'appointments-form',    path: '/#/appointments',        scroll: 900 },
  { name: 'contact',              path: '/#/contact',             scroll: 0 },
];

for (const { name, path, scroll } of routes) {
  test(`visual: ${name}`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState('networkidle');

    if (scroll > 0) {
      await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), scroll);
    }

    await page.waitForTimeout(1200);

    await expect(page).toHaveScreenshot(`${name}.png`, {
      mask: [page.locator('img')],
      fullPage: false,
    });
  });
}

// @ts-check
import { test, expect } from '@playwright/test';

const routes = [
  { name: 'home-hero',            path: '/',                      scroll: 0 },
  { name: 'home-about',           path: '/',                      scroll: 750 },
  { name: 'home-collections',     path: '/',                      scroll: 1400 },
  { name: 'home-cta',             path: '/',                      scroll: 2300 },
  { name: 'natural-stone-hero',   path: '/#/natural-stone',       scroll: 0 },
  { name: 'natural-stone-grid',   path: '/#/natural-stone',       scroll: 800 },
  { name: 'product-detail-hero', path: '/#/natural-stone/mustang', scroll: 0 },
  { name: 'product-detail-specs', path: '/#/natural-stone/mustang', scroll: 700 },
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
  { name: 'contact',              path: '/#/contact',             scroll: 0 },
];

for (const { name, path, scroll } of routes) {
  test(`visual: ${name}`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState('networkidle');

    if (scroll > 0) {
      await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), scroll);
    }

    // Pin the home-hero carousel to slide 0 + paused, so auto-advance can't
    // race the screenshot (otherwise slide 1 is sometimes active when the
    // shot is taken, depending on page-load timing). Selectors come from
    // HeroCarousel's accessible labels.
    if (path === '/') {
      const slideOneButton = page.getByRole('button', { name: /Show slide 1 of/ });
      const pauseButton = page.getByRole('button', { name: 'Pause slideshow' });
      if (await slideOneButton.first().isVisible().catch(() => false)) {
        await slideOneButton.first().click();
      }
      if (await pauseButton.isVisible().catch(() => false)) {
        await pauseButton.click();
      }
    }

    await page.waitForTimeout(1200);

    // Mask all imagery EXCEPT hero-slide imgs. The carousel images are
    // bundled locally (public/hero/) so they're deterministic and safe to
    // include in the snapshot — and the hero IS imagery, so masking it
    // would defeat the test.
    await expect(page).toHaveScreenshot(`${name}.png`, {
      mask: [page.locator('img:not(.hero-slide-img)')],
      fullPage: false,
    });
  });
}

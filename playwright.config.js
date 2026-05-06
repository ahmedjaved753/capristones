// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,

  expect: {
    // 60000 px ~= 5% of a 1440x900 viewport. Generous on purpose: the hero
    // carousel renders real lifestyle photography (high-frequency details —
    // pendant lights, chair backs, marble veining) plus a 6%-opacity SVG
    // noise grain overlay that re-renders with sub-pixel jitter across runs
    // even when the design is unchanged. Per-pixel `threshold` is bumped too.
    // Real design changes (palette, type, layout) shift far more pixels than
    // this and will still fail the diff.
    toHaveScreenshot: { maxDiffPixels: 60000, threshold: 0.3 },
  },

  use: {
    baseURL: 'http://localhost:5173',
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce',
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
});

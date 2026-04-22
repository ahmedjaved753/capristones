// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,

  expect: {
    toHaveScreenshot: { maxDiffPixels: 200 },
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

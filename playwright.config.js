// @ts-check
import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env.CI;
const storybookServerOnly = process.env.PW_STORYBOOK_ONLY === '1';

const webpackServer = {
  command: 'npm run start:webpack',
  url: 'http://127.0.0.1:8080/my-weather-app/',
  reuseExistingServer: !isCI,
  timeout: isCI ? 300_000 : 120_000,
};

const storybookServer = {
  command: 'npm run storybook -- --host 127.0.0.1 --ci',
  url: 'http://127.0.0.1:6006',
  reuseExistingServer: !isCI,
  timeout: isCI ? 300_000 : 180_000,
};

/**
 * In CI, starting webpack + Storybook together often exceeds timeouts (two cold compiles).
 * GitHub Actions runs E2E first (webpack only), then Storybook tests with PW_STORYBOOK_ONLY=1.
 * Locally, both start unless you set PW_STORYBOOK_ONLY=1 for a Storybook-only run.
 */
let webServer;
if (storybookServerOnly) {
  webServer = [storybookServer];
} else if (isCI) {
  webServer = [webpackServer];
} else {
  webServer = [webpackServer, storybookServer];
}

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './pw',
  testMatch: ['tests/**/*.spec.js', 'wick-a11y/**/*.spec.js'],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://127.0.0.1:8080/my-weather-app',
    trace: 'on-first-retry',
  },
  webServer,
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testIgnore: [
        '**/a11y-storybook.spec.js',
        '**/wick-a11y/example-4-storybook.spec.js',
      ],
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      testIgnore: [
        '**/a11y-storybook.spec.js',
        '**/wick-a11y/example-4-storybook.spec.js',
      ],
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      testIgnore: [
        '**/a11y-storybook.spec.js',
        '**/wick-a11y/example-4-storybook.spec.js',
      ],
    },
    {
      name: 'chromium-storybook',
      testMatch: [
        '**/a11y-storybook.spec.js',
        '**/wick-a11y/example-4-storybook.spec.js',
      ],
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://127.0.0.1:6006',
      },
    },
  ],
});

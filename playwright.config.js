// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './pw/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://127.0.0.1:8080/my-weather-app',
    trace: 'on-first-retry',
  },
  webServer: [
    {
      command: 'npm run start:webpack',
      url: 'http://127.0.0.1:8080/my-weather-app',
      reuseExistingServer: !process.env.CI,
      timeout: 120 * 1000,
    },
    {
      command: 'npm run storybook',
      url: 'http://127.0.0.1:6006',
      reuseExistingServer: !process.env.CI,
      timeout: 180 * 1000,
    },
  ],
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testIgnore: '**/a11y-storybook.spec.js',
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      testIgnore: '**/a11y-storybook.spec.js',
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      testIgnore: '**/a11y-storybook.spec.js',
    },
    {
      name: 'chromium-storybook',
      testMatch: '**/a11y-storybook.spec.js',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://127.0.0.1:6006',
      },
    },
  ],
});

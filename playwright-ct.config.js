// @ts-check
import { defineConfig, devices } from '@playwright/experimental-ct-react';

export default defineConfig({
  testDir: './pw',
  testMatch: ['ct/**/*.spec.jsx', 'wick-a11y/example-5-component.spec.jsx'],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
    ctViteConfig: {
      define: {
        'process.env.API_URL': JSON.stringify(
          process.env.API_URL || 'https://pure-sea-84829.herokuapp.com'
        ),
        'process.env.REACT_APP_API_KEY': JSON.stringify(
          process.env.REACT_APP_API_KEY || ''
        ),
      },
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});

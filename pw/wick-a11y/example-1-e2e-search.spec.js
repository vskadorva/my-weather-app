// @ts-check
/**
 * Parity with wick-a11y Example 1 (Cypress). Playwright uses @axe-core/playwright;
 * wick-a11y HTML reports are Cypress-only.
 */
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { assertCheckAccessibilityParity } from './helpers/checkAccessibilityParity.js';

test.describe('E2E: city search + accessibility', () => {
  test('checks accessibility after a search', async ({ page }) => {
    await page.goto('/');

    const searchPromise = page.waitForResponse(
      (resp) => resp.url().includes('/search?q=') && resp.status() === 200
    );
    await page.locator('#city-input').fill('Toronto');
    await searchPromise;

    const weatherPromise = page.waitForResponse(
      (resp) => resp.url().includes('/weather?') && resp.status() === 200
    );
    await page.locator('#city-select').selectOption({ index: 1 });
    const weatherResponse = await weatherPromise;
    const weatherData = await weatherResponse.json();

    await expect(page.locator('[data-cy="weather-display"]')).toContainText(
      weatherData.name
    );

    const results = await new AxeBuilder({ page }).analyze();
    assertCheckAccessibilityParity(results, {
      onlyWarnImpacts: ['moderate', 'minor'],
    });
  });
});

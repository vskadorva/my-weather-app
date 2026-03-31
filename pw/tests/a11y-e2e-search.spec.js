// @ts-check
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { assertA11yViolations } from '../helpers/logViolations.js';

test.describe('E2E: city search + accessibility', () => {
  test('checks accessibility after a search', async ({ page }) => {
    await page.goto('/');

    const searchResponsePromise = page.waitForResponse(
      (resp) => resp.url().includes('/search?q=') && resp.status() === 200
    );
    await page.locator('#city-input').fill('Toronto');
    await searchResponsePromise;

    const weatherResponsePromise = page.waitForResponse(
      (resp) => resp.url().includes('/weather?') && resp.status() === 200
    );
    await page.locator('#city-select').selectOption({ index: 1 });
    const weatherResponse = await weatherResponsePromise;
    const weatherData = await weatherResponse.json();

    await expect(page.locator('[data-cy="weather-display"]')).toContainText(
      weatherData.name
    );

    const results = await new AxeBuilder({ page }).analyze();
    assertA11yViolations(results);
  });
});

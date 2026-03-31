// @ts-check
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { assertCheckAccessibilityParity } from './helpers/checkAccessibilityParity.js';

test.describe('Weather app modal', () => {
  test('checks modal accessibility', async ({ page }) => {
    await page.goto('http://127.0.0.1:8080/my-weather-app/');

    await page.getByRole('button', { name: 'Open Modal' }).click();
    const results = await new AxeBuilder({ page })
      .include('[data-cy="modal-overlay"]')
      .analyze();

    assertCheckAccessibilityParity(results, {
      onlyWarnImpacts: ['moderate', 'minor'],
    });
    await expect(page.locator('[data-cy="modal-overlay"]')).toBeVisible();
  });
});

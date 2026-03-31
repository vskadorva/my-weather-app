// @ts-check
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { assertCheckAccessibilityParity } from './helpers/checkAccessibilityParity.js';

test.describe('Modal keyboard navigation', () => {
  test('traps focus inside the modal and closes on Escape', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Open Modal' }).click();
    await expect(page.locator('[data-cy="modal-overlay"]')).toBeVisible();

    await expect(
      page.locator('[data-cy="modal-close-btn"], button.modal-close')
    ).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(
      page.locator('[data-cy="modal-overlay"]').locator(':focus')
    ).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.locator('[data-cy="modal-overlay"]')).toHaveCount(0);

    await expect(
      page.getByRole('button', { name: 'Open Modal' })
    ).toBeFocused();

    const results = await new AxeBuilder({ page }).analyze();
    assertCheckAccessibilityParity(results, {
      onlyWarnImpacts: ['moderate', 'minor'],
    });
  });
});

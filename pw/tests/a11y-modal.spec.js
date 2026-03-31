// @ts-check
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { assertA11yViolations } from '../helpers/logViolations.js';

test('checks modal accessibility', async ({ page }) => {
  await page.goto('/');

  await page.locator('[data-cy="modal-open-trigger"]').click();
  await expect(page.locator('[data-cy="modal-overlay"]')).toBeVisible();

  const results = await new AxeBuilder({ page })
    .include('[data-cy="modal-overlay"]')
    .analyze();

  assertA11yViolations(results);
});

test('modal traps focus and closes on Escape', async ({ page }) => {
  await page.goto('/');

  await page.locator('[data-cy="modal-open-trigger"]').click();
  await expect(page.locator('[data-cy="modal-overlay"]')).toBeVisible();

  await expect(page.locator('[data-cy="modal-close-btn"]')).toBeFocused();

  await page.keyboard.press('Tab');
  await expect(
    page.locator('[data-cy="modal-overlay"]').locator(':focus')
  ).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(page.locator('[data-cy="modal-overlay"]')).toHaveCount(0);

  await expect(page.locator('[data-cy="modal-open-trigger"]')).toBeFocused();

  const results = await new AxeBuilder({ page }).analyze();
  assertA11yViolations(results);
});

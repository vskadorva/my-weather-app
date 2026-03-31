// @ts-check
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { assertA11yViolations } from '../helpers/logViolations.js';

test('checks modal accessibility', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'Open Modal' }).click();
  await expect(page.locator('[data-cy="modal-overlay"]')).toBeVisible();

  const results = await new AxeBuilder({ page })
    .include('[data-cy="modal-overlay"]')
    .analyze();

  assertA11yViolations(results);
});

test.fixme('modal traps focus and closes on Escape', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'Open Modal' }).click();
  await expect(page.locator('[data-cy="modal-overlay"]')).toBeVisible();

  await expect(page.locator('.modal-close')).toBeFocused();

  await page.keyboard.press('Tab');
  const focused = page.locator(':focus');
  await expect(focused).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(page.locator('[data-cy="modal-overlay"]')).not.toBeVisible();

  await expect(
    page.getByRole('button', { name: 'Open Modal' })
  ).toBeFocused();

  const results = await new AxeBuilder({ page }).analyze();
  assertA11yViolations(results);
});

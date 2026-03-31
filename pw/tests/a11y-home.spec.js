// @ts-check
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { assertA11yViolations } from '../helpers/logViolations.js';

test('home page has no detectable violations', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page }).analyze();
  assertA11yViolations(results);
});

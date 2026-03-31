// @ts-check
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { assertA11yViolations } from '../helpers/logViolations.js';

test.describe('Storybook: CitySelector', () => {
  test('has no accessibility violations', async ({ page }) => {
    await page.goto(
      '/iframe.html?id=components-cityselector--default'
    );

    await page.locator('[data-cy="city-selector"]').waitFor();

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    assertA11yViolations(results);
  });
});

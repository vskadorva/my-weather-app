import { test, expect } from '@playwright/experimental-ct-react';
import AxeBuilder from '@axe-core/playwright';
import CitySelector from '../../src/components/CitySelector';
import { assertCheckAccessibilityParity } from './helpers/checkAccessibilityParity.js';

test.describe('<CitySelector />', () => {
  test('renders with no critical violations', async ({ mount, page }) => {
    await mount(<CitySelector />);

    const results = await new AxeBuilder({ page }).analyze();
    assertCheckAccessibilityParity(results, {
      includedImpacts: ['serious', 'critical'],
    });
    await expect(page.locator('[data-cy="city-selector"]')).toBeVisible();
  });
});

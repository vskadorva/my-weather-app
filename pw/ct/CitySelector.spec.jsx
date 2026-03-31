import { test, expect } from '@playwright/experimental-ct-react';
import AxeBuilder from '@axe-core/playwright';
import CitySelector from '../../src/components/CitySelector';

test('<CitySelector /> has no critical violations', async ({ mount, page }) => {
  await mount(<CitySelector />);

  const results = await new AxeBuilder({ page }).analyze();
  const critical = results.violations.filter(
    (v) => v.impact === 'critical' || v.impact === 'serious'
  );

  expect(critical).toEqual([]);
  await expect(page.locator('[data-cy="city-selector"]')).toBeVisible();
});

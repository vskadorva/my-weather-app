import { expect } from '@playwright/test';
import { logViolations } from '../../helpers/logViolations.js';

/**
 * Approximates wick-a11y / cypress-axe impact options. There is no wick-a11y for Playwright;
 * HTML reports are Cypress-only via wick-a11y.
 *
 * @param {import('axe-core').AxeResults} results
 * @param {{
 *   includedImpacts?: string[];
 *   onlyWarnImpacts?: string[];
 *   runOnly?: { type?: string; values: string[] };
 * }} [options]
 */
export function assertCheckAccessibilityParity(results, options = {}) {
  const {
    includedImpacts = ['critical', 'serious'],
    onlyWarnImpacts = [],
    runOnly,
  } = options;

  let { violations } = results;

  if (runOnly?.values?.length) {
    const tagSet = new Set(runOnly.values);
    violations = violations.filter((v) =>
      v.tags?.some((t) => tagSet.has(t))
    );
  }

  const warnSet = new Set(onlyWarnImpacts);
  const failSet = new Set(includedImpacts);

  const blocking = violations.filter((v) => {
    const imp = v.impact;
    if (!imp) return true;
    if (failSet.has(imp) && warnSet.has(imp)) return true;
    if (failSet.has(imp)) return true;
    return false;
  });

  logViolations({ ...results, violations: blocking });
  expect(
    blocking,
    `expected no blocking a11y violations, got ${blocking.length}`
  ).toEqual([]);
}

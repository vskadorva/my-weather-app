import { expect } from '@playwright/test';

/**
 * When `PW_STRICT_A11Y=false`, only logs violations (same idea as Cypress
 * `cy.checkA11y(..., terminalLog, true)` — fourth argument skips failures).
 * Default is strict: empty violations required.
 */
export const isStrictA11y = process.env.PW_STRICT_A11Y !== 'false';

/**
 * @param {import('axe-core').AxeResults} results
 */
export function logViolations(results) {
  const { violations } = results;
  if (violations.length === 0) return;

  console.log(
    `${violations.length} accessibility violation${
      violations.length === 1 ? '' : 's'
    } detected`
  );

  console.table(
    violations.map(({ id, impact, description, nodes }) => ({
      id,
      impact,
      description,
      nodes: nodes.length,
    }))
  );
}

/**
 * @param {import('axe-core').AxeResults} results
 */
export function assertA11yViolations(results) {
  logViolations(results);
  if (isStrictA11y) {
    expect(results.violations).toEqual([]);
  }
}

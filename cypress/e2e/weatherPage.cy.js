import { terminalLog } from '../utils/axeLogging'
describe('My weather app spec', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.injectAxe();
  })
  it('loads page', () => {

    cy.get('[data-cy="my-weather-app"]')
        .should('be.visible')

  /**
     * Runs accessibility checks using axe-core
     * Parameters:
     * - context: null (tests entire page) or CSS selector for specific element
     * - options: null (uses defaults) or object with specific axe-core rules
     * - terminalLog: callback function to format and display violations
     * - true: continues test execution even if violations are found
     * 
     * Common violations checked:
     * - WCAG 2.1 compliance
     * - Color contrast
     * - ARIA attributes
     * - Keyboard navigation
     * - Screen reader compatibility
  */
    cy.checkA11y(null, null, terminalLog, true);
  })
it('should validate accessibility based on European requirements', () => {
  /**
    * Parameters configured for WCAG 2.2 Level AA compliance
  */
 cy.checkA11y(null, {
   runOnly: {
     type: 'tag',
     values: ['wcag2a', 'wcag2aa', 'wcag22a', 'wcag22aa']
   },
   rules: {
     'color-contrast': { enabled: true },
     'target-size': { enabled: true }, // WCAG 2.2 specific
     'focus-order-semantics': { enabled: true }
   }
 }, terminalLog, true);
})  
  it('shows correct header', () => {
    cy.get('[data-cy="header"]')
        .should('have.text', 'City Weather')
  })
  it('shows city selector component', () => {
    cy.get('[data-cy="city-selector"]')
        .should('be.visible')
  })
  it('shows correct footer', () => {
    cy.get('[data-cy="footer"]')
        .should('have.text', 'Contact us: info@qaapproved.ca')
  })
  it('should display city options after typing a search term', () => {
    // Intercept API calls
    cy.intercept('/search?q=*').as('search')
    cy.intercept('/weather?*').as('weather')
    // Type search term in city selector
    cy.get('[data-cy="city-selector"]')
      .type('Toronto')

    // Verify search term appears in selector
    cy.get('[data-cy="city-selector"]')
      .should('contain', 'Toronto')

    // Verify API response
    cy.wait('@search').then((interception) => {
      const { response } = interception

      // Check response status
      expect(response.statusCode).to.eq(200)

      // Verify each result contains search term
      response.body.forEach(city => {
        expect(city.name).to.include('Toronto')
      })
    })

    cy.get('#city-select').select(1)
    cy.wait('@weather').then((interception) => {
      const { response } = interception
      expect(response.statusCode).to.eq(200)
      // Store city name from response
      const cityName = response.body.name
      // Verify weather display shows correct city name
      cy.get('[data-cy="weather-display"]')
        .should('be.visible')
        .and('contain', cityName)
    })
    cy.checkA11y(null, null, terminalLog, true);
  })
})
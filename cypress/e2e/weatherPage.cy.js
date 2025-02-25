import { terminalLog } from '../utils/axeLogging'
describe('My weather app spec', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.injectAxe();
  })
  it('loads page', () => {
    cy.checkA11y(null, null, terminalLog, true);
    cy.get('[data-cy="my-weather-app"]')
        .should('be.visible')
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
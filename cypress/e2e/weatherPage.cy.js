describe('My weather app spec', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('loads page', () => {
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
})
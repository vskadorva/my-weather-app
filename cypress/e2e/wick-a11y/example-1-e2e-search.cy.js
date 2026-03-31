describe('E2E: city search + accessibility', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.injectAxe();
  });

  it('checks accessibility after a search', () => {
    cy.intercept('**/search?q=*').as('search');
    cy.intercept('**/weather?*').as('weather');

    cy.get('[data-cy="city-selector"]').find('input').type('Toronto');
    cy.wait('@search').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });

    cy.get('#city-select').select(1);
    cy.wait('@weather').then((interception) => {
      const cityName = interception.response.body.name;
      cy.get('[data-cy="weather-display"]')
        .should('be.visible')
        .and('contain', cityName);
    });

    cy.checkAccessibility(null, {
      onlyWarnImpacts: ['moderate', 'minor'],
    });
  });
});

describe('Weather app modal', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8080/my-weather-app/');
    cy.injectAxe();
  });

  it('checks modal accessibility', () => {
    cy.contains('button', 'Open Modal').click();
    cy.checkAccessibility('[data-cy="modal-overlay"]', {
      onlyWarnImpacts: ['moderate', 'minor'],
    });
    cy.get('[data-cy="modal-overlay"]').should('be.visible');
  });
});

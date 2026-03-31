describe('Modal keyboard navigation', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.injectAxe();
  });

  it('traps focus inside the modal and closes on Escape', () => {
    cy.contains('button', 'Open Modal').click();
    cy.get('[data-cy="modal-overlay"]').should('be.visible');

    cy.focused().should(($el) => {
      const close =
        $el.attr('data-cy') === 'modal-close-btn' ||
        $el.hasClass('modal-close');
      expect(close, 'focus on modal close control').to.be.true;
    });

    cy.press('Tab');
    cy.focused().closest('[data-cy="modal-overlay"]').should('exist');

    cy.press('Escape');
    cy.get('[data-cy="modal-overlay"]').should('not.exist');

    cy.focused().should('contain', 'Open Modal');

    cy.checkAccessibility(null, {
      onlyWarnImpacts: ['moderate', 'minor'],
    });
  });
});

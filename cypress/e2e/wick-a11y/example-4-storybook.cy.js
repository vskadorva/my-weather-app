describe('Storybook: CitySelector', () => {
  beforeEach(() => {
    cy.visit(
      'http://127.0.0.1:6006/iframe.html?id=components-cityselector--default'
    );
    cy.injectAxe();
  });

  it('has no accessibility violations', () => {
    cy.checkAccessibility(null, {
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa'],
      },
    });
  });
});

import CitySelector from '../../../src/components/CitySelector';

describe('<CitySelector />', () => {
  beforeEach(() => {
    cy.injectAxe();
  });

  it('renders with no critical violations', () => {
    cy.mount(<CitySelector />);
    cy.checkAccessibility(null, {
      includedImpacts: ['serious', 'critical'],
    });
    cy.get('[data-cy="city-selector"]').should('be.visible');
  });
});

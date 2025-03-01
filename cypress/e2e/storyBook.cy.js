import { terminalLog } from '../utils/axeLogging'
describe('Storybook: CitySelector Component', () => {
    beforeEach(() => {
        cy.visit('http://localhost:6006/iframe.html?id=components-cityselector--default');
        cy.injectAxe();
        cy.contains('[data-cy="city-selector"]', 'Select a city');
    })
    it('should pass accessibility tests for a CitySelector component', () => {
      cy.checkA11y(null, null, terminalLog, true);
    });
  });
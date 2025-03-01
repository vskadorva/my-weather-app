import { terminalLog } from '../utils/axeLogging'
describe('My weather app spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
    cy.injectAxe();
  })
  it('should validate accessibility of the entire page', () => {
    cy.checkA11y(null, null, terminalLog, true);
  })
  it('should display modal when button is clicked', () => {
    cy.contains('button', 'Open Modal').click();
    cy.checkA11y('[data-cy="modal-overlay"]', null, terminalLog, true);
    cy.get('[data-cy="modal-overlay"]').should('be.visible');
  })

  it('should validate accessibility of the entire page', () => {
    cy.contains('button', 'Open Modal').click();
    cy.checkA11y(null, null, terminalLog, true);
    cy.get('[data-cy="modal-overlay"]').should('be.visible');
  })
})


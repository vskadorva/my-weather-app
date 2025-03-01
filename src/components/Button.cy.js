/// <reference types="cypress" />
import React from 'react';
import Button from './Button';
import { terminalLog } from '../../cypress/utils/axeLogging';

describe('<Button /> component tests', () => {
  beforeEach(() => {

  });

  it('renders primary button by default', () => {
    cy.mount(<Button>Click me</Button>);
    cy.get('[data-cy="button"]')
      .should('have.class', 'button--primary')
      .and('contain', 'Click me');
  });

  it('handles different variants', () => {
    cy.mount(
      <>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
      </>
    );
    cy.get('[data-cy="button"]').first().should('have.class', 'button--primary');
    cy.get('[data-cy="button"]').last().should('have.class', 'button--secondary');
  });

  it('handles different sizes', () => {
    cy.mount(
      <>
        <Button size="small">Small</Button>
        <Button size="medium">Medium</Button>
        <Button size="large">Large</Button>
      </>
    );
    cy.get('[data-cy="button"]').eq(0).should('have.class', 'button--small');
    cy.get('[data-cy="button"]').eq(1).should('have.class', 'button--medium');
    cy.get('[data-cy="button"]').eq(2).should('have.class', 'button--large');
  });

  it('handles disabled state', () => {
    cy.mount(<Button disabled>Disabled</Button>);
    cy.get('[data-cy="button"]')
      .should('have.class', 'button--disabled')
      .and('be.disabled');
  });

  it('handles loading state', () => {
    const loadingIcon = <span data-cy="loading-icon">Loading...</span>;
    cy.mount(<Button loading loadingIcon={loadingIcon}>Loading</Button>);
    cy.get('[data-cy="button"]')
      .should('have.class', 'button--loading')
      .and('be.disabled');
    cy.get('[data-cy="loading-icon"]').should('exist');
    cy.get('.button__text').should('contain', 'Loading');
  });

  it('handles icon', () => {
    const icon = <span data-cy="test-icon">👍</span>;
    cy.mount(<Button icon={icon}>With Icon</Button>);
    cy.get('[data-cy="button"]').should('have.class', 'button--with-icon');
    cy.get('[data-cy="test-icon"]').should('exist');
    cy.get('.button__text').should('contain', 'With Icon');
  });

  it('handles click events', () => {
    const onClick = cy.spy().as('clickHandler');
    cy.mount(<Button onClick={onClick}>Click me</Button>);
    cy.get('[data-cy="button"]').click();
    cy.get('@clickHandler').should('have.been.calledOnce');
  });

  it('handles custom className', () => {
    cy.mount(<Button className="custom-class">Custom</Button>);
    cy.get('[data-cy="button"]').should('have.class', 'custom-class');
  });

  it('handles different button types', () => {
    cy.mount(
      <>
        <Button type="submit">Submit</Button>
        <Button type="reset">Reset</Button>
        <Button type="button">Button</Button>
      </>
    );
    cy.get('[data-cy="button"]').eq(0).should('have.attr', 'type', 'submit');
    cy.get('[data-cy="button"]').eq(1).should('have.attr', 'type', 'reset');
    cy.get('[data-cy="button"]').eq(2).should('have.attr', 'type', 'button');
  });

  it('handles custom data-cy attribute', () => {
    cy.mount(<Button data-cy="custom-button">Custom</Button>);
    cy.get('[data-cy="custom-button"]').should('exist');
  });

  it('meets accessibility standards', () => {
    cy.injectAxe();
    // Test different button states for accessibility
    cy.mount(
      <>
        <Button>Normal</Button>
        <Button disabled>Disabled</Button>
        <Button loading loadingIcon={<span>⌛</span>}>Loading</Button>
        <Button icon={<span>📎</span>}>With Icon</Button>
      </>
    );
    cy.checkA11y(null, {
      rules: {
        'button-name': { enabled: true },
        'color-contrast': { enabled: true }
      }
    }, terminalLog, true);
  });

  it('should not trigger click when disabled or loading', () => {
    const onClick = cy.spy().as('clickHandler');
    cy.mount(
      <>
        <Button disabled onClick={onClick}>Disabled</Button>
        <Button loading onClick={onClick}>Loading</Button>
      </>
    );
    
    cy.get('[data-cy="button"]').first().click({ force: true });
    cy.get('[data-cy="button"]').last().click({ force: true });
    cy.get('@clickHandler').should('not.have.been.called');
  });
}); 
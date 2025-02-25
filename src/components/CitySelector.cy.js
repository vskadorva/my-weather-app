import React from 'react'
import CitySelector from './CitySelector'
import { terminalLog } from '../../cypress/utils/axeLogging'

describe('<CitySelector />', () => {
  beforeEach(() => {
    // Mock the API environment variable
    cy.window().then((win) => {
      win.process = {
        env: {
          API_URL: Cypress.env('API_URL')
        }
      };
    });
    cy.injectAxe();
  });

  it('renders', () => {
    cy.mount(<CitySelector />)
    cy.checkA11y(null, {includedImpacts: ['serious', 'critical']}, terminalLog, true);
    cy.get('[data-cy="city-selector"]')
        .should('be.visible')
  })

  it('renders the component correctly', () => {
    cy.mount(<CitySelector onSelect={cy.spy().as('onSelect')} />);
    cy.checkA11y(null, {includedImpacts: ['serious', 'critical']}, terminalLog, true);
    
    cy.get('[data-cy="city-selector"]').should('exist');
    cy.get('label').should('contain', 'Select a city:');
    cy.get('#city-input').should('exist');
    cy.get('#city-select').should('exist');
  });

  it('handles user input and shows search results', () => {
    const mockCities = [
      { name: 'New York', state: 'NY', country: 'USA', lat: 40.7128, lon: -74.0060 },
      { name: 'Los Angeles', state: 'CA', country: 'USA', lat: 34.0522, lon: -118.2437 }
    ];

    cy.intercept(
      'GET',
      '/search?q=*',
      {
        statusCode: 200,
        body: mockCities
      }
    ).as('searchRequest');

    cy.mount(<CitySelector onSelect={cy.spy().as('onSelect')} />);
    cy.checkA11y(null, {includedImpacts: ['serious', 'critical']}, terminalLog, true);

    cy.get('#city-input').type('New York');
    cy.wait('@searchRequest', { timeout: 10000 });

    // Verify options are rendered
    cy.get('#city-select option').should('have.length', 3); // Including the default option
    cy.get('#city-select option').eq(1).should('contain', 'New York, NY, USA');
    
    // Check accessibility after results are loaded
    cy.checkA11y(null, {includedImpacts: ['serious', 'critical']}, terminalLog, true);
  });

  it('calls onSelect when a city is selected', () => {
    const mockCities = [
      { name: 'New York', state: 'NY', country: 'USA', lat: 40.7128, lon: -74.0060 }
    ];

    cy.intercept(
      'GET',
      '/search?q=new',
      {
        statusCode: 200,
        body: mockCities
      }
    ).as('searchRequest');

    cy.mount(<CitySelector onSelect={cy.spy().as('onSelect')} />);
    cy.checkA11y(null, {includedImpacts: ['serious', 'critical']}, terminalLog, true);

    cy.get('#city-input').type('new');
    cy.wait('@searchRequest');

    cy.get('#city-select').select('40.7128,-74.006');
    cy.get('@onSelect').should('have.been.calledWith', '40.7128,-74.006');
    
    // Check accessibility after selection
    cy.checkA11y(null, {includedImpacts: ['serious', 'critical']}, terminalLog, true);
  });

  it('handles empty search results', () => {
    cy.intercept(
      'GET',
      '/search?q=nonexistent',
      {
        statusCode: 200,
        body: []
      }
    ).as('searchRequest');

    cy.mount(<CitySelector onSelect={cy.spy().as('onSelect')} />);
    cy.checkA11y(null, {includedImpacts: ['serious', 'critical']}, terminalLog, true);

    cy.get('#city-input').type('nonexistent');
    cy.wait('@searchRequest');

    cy.get('#city-select option').should('have.length', 1); // Only the default option
    
    // Check accessibility with empty results
    cy.checkA11y(null, {includedImpacts: ['serious', 'critical']}, terminalLog, true);
  });

  it('debounces search requests', () => {
    const searchSpy = cy.spy().as('searchSpy');
    cy.intercept(
      'GET',
      '/search*',
      (req) => {
        searchSpy();
        req.reply([]);
      }
    ).as('searchRequest');

    cy.mount(<CitySelector onSelect={cy.spy().as('onSelect')} />);
    cy.checkA11y(null, {includedImpacts: ['serious', 'critical']}, terminalLog, true);

    // Type quickly
    cy.get('#city-input').type('new york', { delay: 100 });
    
    // Wait for debounce
    cy.wait(600);
    
    // Should only make one request after debounce
    cy.get('@searchSpy').should('have.been.calledOnce');
    
    // Check accessibility after debounced search
    cy.checkA11y(null, {includedImpacts: ['serious', 'critical']}, terminalLog, true);
  });
})
import React from 'react'
import CitySelector from './CitySelector'
import './../App.css'
import './../index.css'
import './CitySelector.css'
import { terminalLog } from '../../cypress/utils/axeLogging'

describe('<CitySelector />', () => {
  it('renders', () => {
    cy.injectAxe()
    cy.mount(<CitySelector />)
    cy.checkA11y(null, null, terminalLog);
    cy.get('[data-cy="city-selector"]')
        .should('be.visible')
  })
})
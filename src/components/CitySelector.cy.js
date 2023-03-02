import React from 'react'
import CitySelector from './CitySelector'

describe('<CitySelector />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<CitySelector />)
  })
})
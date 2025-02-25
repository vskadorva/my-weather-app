import React from 'react';
import CitySelector from './CitySelector';
import './../App.css'
import './../index.css'
import './CitySelector.css'

export default {
  title: 'Components/CitySelector',
  component: CitySelector,
  parameters: {
    layout: 'centered',
  },
};

// Mock fetch function for the stories
const mockFetch = (mockData) => {
  global.fetch = () =>
    Promise.resolve({
      json: () => Promise.resolve(mockData),
    });
};

const mockCities = [
  { name: 'New York', state: 'NY', country: 'USA', lat: 40.7128, lon: -74.0060 },
  { name: 'Los Angeles', state: 'CA', country: 'USA', lat: 34.0522, lon: -118.2437 },
  { name: 'Chicago', state: 'IL', country: 'USA', lat: 41.8781, lon: -87.6298 },
];

// Default story
export const Default = {
  args: {
    onSelect: (value) => console.log('Selected:', value),
  },
  parameters: {
    mockData: mockCities,
  },
  decorators: [
    (Story) => {
      mockFetch(mockCities);
      return <Story />;
    },
  ],
};

// Empty state
export const EmptyState = {
  args: {
    onSelect: (value) => console.log('Selected:', value),
  },
  parameters: {
    mockData: [],
  },
  decorators: [
    (Story) => {
      mockFetch([]);
      return <Story />;
    },
  ],
};

// Loading state with many results
export const WithManyResults = {
  args: {
    onSelect: (value) => console.log('Selected:', value),
  },
  parameters: {
    mockData: Array(20).fill().map((_, i) => ({
      name: `City ${i}`,
      state: `State ${i}`,
      country: 'Country',
      lat: Math.random() * 180 - 90,
      lon: Math.random() * 360 - 180,
    })),
  },
  decorators: [
    (Story) => {
      mockFetch(Array(20).fill().map((_, i) => ({
        name: `City ${i}`,
        state: `State ${i}`,
        country: 'Country',
        lat: Math.random() * 180 - 90,
        lon: Math.random() * 360 - 180,
      })));
      return <Story />;
    },
  ],
}; 
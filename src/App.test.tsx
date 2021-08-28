import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';

it('renders a 4x4 board', () => {
  render(<App />);
  const cells = screen.getAllByTestId('cell')
  expect(cells).toHaveLength(16);
});

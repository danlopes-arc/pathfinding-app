import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';

it('renders a 4x4 board', () => {
  render(<App />);
  const cells = screen.getAllByTestId('cell')
  expect(cells).toHaveLength(16);
});

it('can create wall on the board', () => {
  render(<App />)
  
  const cell = screen.getAllByTestId('cell')[0]
  fireEvent.click(cell)

  const wall = screen.getByTestId('wall')
  expect(wall).toBeInTheDocument()
})
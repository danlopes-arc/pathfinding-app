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

it('can revert a wall to a path', () => {
  render(<App />)
  
  const cell = screen.getAllByTestId('cell')[0]
  fireEvent.click(cell)
  fireEvent.click(cell)

  const wall = screen.queryByTestId('wall')
  expect(wall).not.toBeInTheDocument()
})

describe('starting point', () => {
  it('can add a starting point on the board', () => {
    render(<App />)

    const addStartButton = screen.getByTestId('add-start-button')
    fireEvent.click(addStartButton)
    
    const cell = screen.getAllByTestId('cell')[0]
    fireEvent.click(cell)

    const start = screen.getByTestId('start')
    expect(start).toBeInTheDocument()
  })

  it('cannot add a staritng point on a wall', () => {
    render(<App />)

    const cell = screen.getAllByTestId('cell')[0]
    fireEvent.click(cell)

    const addStartButton = screen.getByTestId('add-start-button')
    fireEvent.click(addStartButton)

    fireEvent.click(cell)

    const start = screen.queryByTestId('start')
    expect(start).not.toBeInTheDocument()
  })

  it('goes back to wall mode after adding a starting point', () => {
    render(<App />)

    const addStartButton = screen.getByTestId('add-start-button')
    fireEvent.click(addStartButton)
    
    const paths = screen.getAllByTestId('path')
    const path0 = paths[0]
    fireEvent.click(path0)

    const path1 = paths[1]
    fireEvent.click(path1)

    const start = screen.getByTestId('start')
    expect(start).toBe(path0)
  })

  it('switches start back to path when its clicked on', () => {
    render(<App />)

    const addStartButton = screen.getByTestId('add-start-button')
    fireEvent.click(addStartButton)

    const path = screen.getAllByTestId('path')[0]
    fireEvent.click(path)
    fireEvent.click(path)

    const start = screen.queryByTestId('start')
    expect(start).not.toBeInTheDocument()

    const paths = screen.getAllByTestId('path')

    expect(paths).toContain(path)
  })
})

describe('end point', () => {
  it('can add a end point on the board', () => {
    render(<App />)

    const addEndButton = screen.getByTestId('add-end-button')
    fireEvent.click(addEndButton)
    
    const cell = screen.getAllByTestId('cell')[0]
    fireEvent.click(cell)

    const end = screen.getByTestId('end')
    expect(end).toBeInTheDocument()
  })

  it('cannot add an end point on a wall', () => {
    render(<App />)

    const cell = screen.getAllByTestId('cell')[0]
    fireEvent.click(cell)

    const addEndButton = screen.getByTestId('add-end-button')
    fireEvent.click(addEndButton)

    fireEvent.click(cell)

    const end = screen.queryByTestId('end')
    expect(end).not.toBeInTheDocument()
  })
})

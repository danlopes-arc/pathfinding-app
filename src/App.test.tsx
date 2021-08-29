import { fireEvent, render, screen, within } from '@testing-library/react';
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

it('can revert a wall to a passage', () => {
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
    
    const passages = screen.getAllByTestId('passage')
    const passage0 = passages[0]
    fireEvent.click(passage0)

    const passage1 = passages[1]
    fireEvent.click(passage1)

    const start = screen.getByTestId('start')
    expect(start).toBe(passage0)
  })

  it('switches start back to passage when its clicked on', () => {
    render(<App />)

    const addStartButton = screen.getByTestId('add-start-button')
    fireEvent.click(addStartButton)

    const passage = screen.getAllByTestId('passage')[0]
    fireEvent.click(passage)
    fireEvent.click(passage)

    const start = screen.queryByTestId('start')
    expect(start).not.toBeInTheDocument()

    const passages = screen.getAllByTestId('passage')

    expect(passages).toContain(passage)
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
  
  it('goes back to wall mode after adding a end point', () => {
    render(<App />)

    const addEndButton = screen.getByTestId('add-end-button')
    fireEvent.click(addEndButton)
    
    const passages = screen.getAllByTestId('passage')
    const passage0 = passages[0]
    fireEvent.click(passage0)

    const passage1 = passages[1]
    fireEvent.click(passage1)

    const end = screen.getByTestId('end')
    expect(end).toBe(passage0)
  })
  
  it('switches end back to passage when its clicked on', () => {
    render(<App />)

    const addEndButton = screen.getByTestId('add-end-button')
    fireEvent.click(addEndButton)

    const passage = screen.getAllByTestId('passage')[0]
    fireEvent.click(passage)
    fireEvent.click(passage)

    const end = screen.queryByTestId('end')
    expect(end).not.toBeInTheDocument()

    const passages = screen.getAllByTestId('passage')

    expect(passages).toContain(passage)
  })
})

describe('auto sovle', () => {
  it('show solved path after start and end points are palce on the board', () => {
    render(<App />)

    const cells = screen.getAllByTestId('cell')
    const startCell = cells[0]
    const endCell = cells[3]

    const expectedPaths = [0,1,2,3].map(cellIndex => within(cells[cellIndex]).getByTestId('passage'))

    const addStartButton = screen.getByTestId('add-start-button')
    fireEvent.click(addStartButton)
    fireEvent.click(startCell)

    const addEndButton = screen.getByTestId('add-end-button')
    fireEvent.click(addEndButton)
    fireEvent.click(endCell)

    const actualPaths = screen.getAllByTestId('path')

    expect(expectedPaths).toEqual(actualPaths)

  })
})

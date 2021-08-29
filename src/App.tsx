import React, { useState } from 'react';
import { Cell, CellType } from './components/Cell';

type GameMode = 'idle' | 'start' | 'end'

function App() {
  const [walls, setWalls] = useState<number[]>([])
  const [mode, setMode] = useState<GameMode>('idle')
  const [startingCell, setStartingCell] = useState<number | null>(null)
  const [endCell, setEndCell] = useState<number | null>(null)

  const board = [...Array(4)].map((_, i) => [...Array(4)].map((_, j) => i * 4 + j))

  const getType = (row: number, col: number): CellType => {
    const index = row * 4 + col
    if (walls.includes(index)) {
      return 'wall'
    }
    if (startingCell === index) {
      return 'start'
    }
    if (endCell === index) {
      return 'end'
    }
    return 'path'
  }

  const onCellClick = (number: number) => () => {

    if (mode === 'start') {
      if (walls.includes(number)) {
        setMode('idle')
        return
      }
      setStartingCell(number)
      setMode('idle')
      return
    }

    if (mode === 'end') {
      if (walls.includes(number)) {
        setMode('idle')
        return
      }
      setEndCell(number)
      setMode('idle')
      return
    }

    if (startingCell === number) {
      setStartingCell(null)
      return
    }

    if (endCell === number) {
      setEndCell(null)
      return
    }

    if (walls.includes(number)) {
      setWalls(walls.filter(w => w !== number))
      return
    }

    setWalls([...walls, number])
  }

  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center'>
      <div className='flex flex-col gap-1'>
        {board.map((cells, i) => (
          <div className='flex gap-1' key={i}>
            {cells.map((number, j) => (
              <Cell type={getType(i, j)} onClick={onCellClick(number)}>
                {number}
              </Cell>
            ))}
          </div>
        ))}
      </div>
      <button data-testid='add-start-button' onClick={() => {
        if (mode === 'idle') {
          setMode('start')
          return
        }
        setMode('idle')
      }}
        className={mode === 'start'? 'bg-green-400' : ''}
      >
        Add starting point
      </button>
      <button data-testid='add-end-button' onClick={() => {
        if (mode === 'idle') {
          setMode('end')
          return
        }
        setMode('idle')
      }}
        className={mode === 'end'? 'bg-blue-400' : ''}
      >
        Add end point
      </button>
    </div>
  );
}

export default App;

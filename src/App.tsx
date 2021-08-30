import React, { useEffect, useState } from 'react';
import { Cell, CellType } from './components/Cell';
import { solvePath } from './utils/solvePath'

type GameMode = 'idle' | 'start' | 'end'

const BOARD_SIDE_SIZE = 4
const BOARD_CELL_SIZE = BOARD_SIDE_SIZE * BOARD_SIDE_SIZE

function App() {
  const [walls, setWalls] = useState<number[]>([])
  const [mode, setMode] = useState<GameMode>('idle')
  const [startingCell, setStartingCell] = useState<number | null>(null)
  const [endCell, setEndCell] = useState<number | null>(null)
  const [path, setPath] = useState<number[]>([])

  const board = [...Array(BOARD_SIDE_SIZE)].map((_, i) => [...Array(BOARD_SIDE_SIZE)].map((_, j) => i * BOARD_SIDE_SIZE + j))

  const getType = (row: number, col: number): CellType => {
    const index = row * BOARD_SIDE_SIZE + col
    if (walls.includes(index)) {
      return 'wall'
    }
    if (path.includes(index)) {
      return 'path'
    }
    if (startingCell === index) {
      return 'start'
    }
    if (endCell === index) {
      return 'end'
    }
    return 'passage'
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

  useEffect(() => {
    if (startingCell == null || endCell == null) {
      setPath([])
      return
    }

    const relativeCosts = [...Array(BOARD_CELL_SIZE)].map((_, fromCell) => [...Array(BOARD_CELL_SIZE)].map((_, toCell) => {
      const fromCellRow = Math.trunc(fromCell / BOARD_SIDE_SIZE)
      const fromCellCol = fromCell % BOARD_SIDE_SIZE

      const toCellRow = Math.trunc(toCell / BOARD_SIDE_SIZE)
      const toCellCol = toCell % BOARD_SIDE_SIZE
      
      if (walls.includes(fromCell) || walls.includes(toCell)) {
        return Infinity
      }

      // top
      if (fromCellRow - 1 === toCellRow && fromCellCol === toCellCol) {
        return 1
      }

      // bottom
      if (fromCellRow + 1 === toCellRow && fromCellCol === toCellCol) {
        return 1
      }

      // left
      if (fromCellRow  === toCellRow && fromCellCol - 1 === toCellCol) {
        return 1
      }

      // right
      if (fromCellRow  === toCellRow && fromCellCol + 1 === toCellCol) {
        return 1
      }

      return Infinity
    }))

    const solvedPath = solvePath(relativeCosts, startingCell, endCell)
    
    setPath(solvedPath ?? [])
  }, [walls, startingCell, endCell])

  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center'>
      <div className='flex flex-col gap-1'>
        {board.map((cells, i) => (
          <div className='flex gap-1' key={i}>
            {cells.map((number, j) => (
              <Cell type={getType(i, j)} onClick={onCellClick(number)} key={number}>
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

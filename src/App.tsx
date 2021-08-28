import React, { useState } from 'react';

type GameMode = 'idle' | 'start' | 'end'

function App() {
  const [walls, setWalls] = useState<number[]>([])
  const [mode, setMode] = useState<GameMode>('idle')
  const [startingCell, setStartingCell] = useState<number | null>(null)
  const [endCell, setEndCell] = useState<number | null>(null)

  const board = [...Array(4)].map((_, i) => [...Array(4)].map((_, j) => i * 4 + j))

  const wallClasses = 'bg-gray-700 hover:bg-gray-800 text-gray-300'
  const pathClasses = 'hover:bg-gray-200'
  const startClasses = 'bg-green-500 hover:bg-green-700 hover:text-gray-200'
  const endClasses = 'bg-blue-500 hover:bg-blue-700 hover:text-gray-200'

  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center'>
      <div className='flex flex-col gap-1'>
        {board.map((cells, i) => (
          <div className='flex gap-1' key={i}>
            {cells.map((number, j) => (
              <div
                data-testid='cell'
                key={j}
                className={'border border-black cursor-pointer w-10 h-10 pl-1 ' + 
                  (walls.includes(number) ? wallClasses :
                    (startingCell === number ? startClasses :
                      (endCell === number ? endClasses : pathClasses)))}
                onClick={() => {
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
                    setStartingCell(null)
                    return
                  }

                  if (walls.includes(number)) {
                    setWalls(walls.filter(w => w !== number))
                    return
                  }

                  setWalls([...walls, number])
                }}
              >
                <div data-testid={walls.includes(number) ? 'wall' : (startingCell === number ? 'start' : (endCell === number ? 'end' : 'path'))}>
                  {number}
                </div>
              </div>
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

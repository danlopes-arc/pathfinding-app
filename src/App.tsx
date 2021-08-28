import React, { useState } from 'react';

function App() {
  const [walls, setWalls] = useState<number[]>([])

  const board = [...Array(4)].map((_, i) => [...Array(4)].map((_, j) => i * 4 + j))

  const wallClasses = 'bg-gray-700 hover:bg-gray-800 text-gray-300'
  const pathClasses = 'hover:bg-gray-200'

  return (
    <div className='h-screen w-screen flex justify-center items-center'>
      <div className='flex flex-col gap-1'>
        {board.map((cells, i) => (
          <div className='flex gap-1' key={i}>
            {cells.map((number, j) => (
              <div data-testid='cell' key={j} className={'border border-black cursor-pointer w-10 h-10 pl-1 ' + (walls.includes(number) ? wallClasses : pathClasses)}
                onClick={() => {
                  if (walls.includes(number)) {
                    setWalls(walls.filter(w => w !== number))
                    return
                  }

                  setWalls([...walls, number])
                }}
              >
                <div data-testid={walls.includes(number) ? 'wall' : 'path'}>
                  {number}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

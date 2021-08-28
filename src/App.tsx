import React from 'react';

function App() {
  const board = [...Array(4)].map((_, i) => [...Array(4)].map((_, j) => i * 4 + j))
  return (
    <div className='h-screen w-screen flex justify-center items-center'>
      <div className='flex flex-col gap-1'>
        {board.map((cells, i) => (
          <div className='flex gap-1' key={i}>
            {cells.map((number, j) => (
              <div data-testid='cell' key={j} className='border border-black hover:bg-gray-200 cursor-pointer w-10 h-10 pl-1'>
                {number}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

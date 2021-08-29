import React from 'react'

export type CellType = 'path' | 'wall' | 'start' | 'end'

const cellTypeClasses: {[key in CellType]: string} = {
  path: 'hover:bg-gray-200',
  wall: 'bg-gray-700 hover:bg-gray-800 text-gray-300',
  start: 'bg-green-500 hover:bg-green-700 hover:text-gray-200',
  end: 'bg-blue-500 hover:bg-blue-700 hover:text-gray-200',
}

interface CellProps {
  type: CellType
  onClick: () => void
}

export const Cell: React.FC<CellProps> = ({type, onClick, children}) => {
  return (
    <div
      data-testid='cell'
      className={'border border-black cursor-pointer w-10 h-10 pl-1 ' + cellTypeClasses[type]}
      onClick={onClick}>
      <div data-testid={type}>
        {children}
      </div>
    </div>
  )
}

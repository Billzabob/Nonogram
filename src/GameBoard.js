import { useState } from 'react'
import Board from './Board.js'

export default function GameBoard({color, board, updateMove, blankColor, startMove}) {
  const [startSquare, setStartSquare] = useState(null)
  const [endSquare, setEndSquare] = useState(null)
  const [drawColor, setDrawColor] = useState(color)

  function handleSquareClick(row, column) {
    const paintColor = (board[row][column] === color) ? blankColor : color
    const painted = paintLine(board, [row, column], [row, column], paintColor)
    startMove(painted)
    setStartSquare([row, column])
    setEndSquare([row, column])
    setDrawColor(paintColor)
  }

  function handleSquareHover(row, column) {
    if (startSquare !== null) {
      const [startRow, startColumn] = startSquare
      const [endRow, endColumn] = endSquare

      if (startRow === endRow && column !== endColumn && board[endRow][column] !== drawColor) {
        const painted = paintLine(board, endSquare, [endRow, column], drawColor)
        updateMove(painted)
        setEndSquare([endRow, column])
      } else if (startColumn === endColumn && row !== endRow && board[row][endColumn] !== drawColor) {
        const painted = paintLine(board, endSquare, [row, endColumn], drawColor)
        updateMove(painted)
        setEndSquare([row, endColumn])
      }
    }
  }

  function paintLine(board, [startRow, startColumn], [endRow, endColumn], color) {
    return board.map((columns, row) => columns.map((oldColor, column) => {
      if (startRow === endRow && row === startRow && between(column, startColumn, endColumn)) {
        return color
      } else if (startColumn === endColumn && column === startColumn && between(row, startRow, endRow)) {
        return color
      } 
      return oldColor
    }))
  }

  function stopPainting() {
    setStartSquare(null)
    setEndSquare(null)
  }

  return (
    <div
      onMouseLeave={stopPainting}
      onMouseUp={stopPainting}
    >
      <Board
        board={board}
        handleSquareClick={handleSquareClick}
        handleSquareHover={handleSquareHover}
      />
    </div>
  )
}

function between(value, start, end) {
  return (value >= start && value <= end) || (value <= start && value >= end)
}

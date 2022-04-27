import { useState } from 'react'
import Board from './Board.js'

export default function GameBoard({fillColor, colors, setColors, unfilled}) {
  const [startSquare, setStartSquare] = useState(null)
  const [endSquare, setEndSquare] = useState(null)
  const [drawColor, setDrawColor] = useState(fillColor)

  function handleSquareClick(row, column) {
    const color = (colors[row][column] === fillColor) ? unfilled : fillColor
    const painted = paintLine(colors, [row, column], [row, column], color)
    setColors(painted)
    setStartSquare([row, column])
    setEndSquare([row, column])
    setDrawColor(color)
  }

  function handleSquareHover(row, column) {
    if (startSquare !== null) {
      const [startRow, startColumn] = startSquare
      const [endRow, endColumn] = endSquare

      if (startRow === endRow && column !== endColumn && colors[endRow][column] !== drawColor) {
        const painted = paintLine(colors, endSquare, [endRow, column], drawColor)
        setColors(painted)
        setEndSquare([endRow, column])
      } else if (startColumn === endColumn && row !== endRow && colors[row][endColumn] !== drawColor) {
        const painted = paintLine(colors, endSquare, [row, endColumn], drawColor)
        setColors(painted)
        setEndSquare([row, endColumn])
      }
    }
  }

  function paintLine(colors, [startRow, startColumn], [endRow, endColumn], color) {
    return colors.map((columns, row) => columns.map((oldColor, column) => {
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
        colors={colors}
        handleSquareClick={handleSquareClick}
        handleSquareHover={handleSquareHover}
      />
    </div>
  )
}

function between(value, start, end) {
  return (value >= start && value <= end) || (value <= start && value >= end)
}

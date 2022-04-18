import { useState } from 'react'
import Square from './Square.js'

const board = [...Array(10).keys()]
const filled = 'red'
const unfilled = 'grey'

export default function Board(props) {
  const [squareColors, setSquareColors] = useState(Array(board.length * board.length).fill(unfilled))
  const [startSquare, setStartSquare] = useState(null)
  const [endSquare, setEndSquare] = useState(null)
  const [drawColor, setDrawColor] = useState(filled)

  const handleSquareClick = (i) => {
    const color = (squareColors[i] === unfilled) ? filled : unfilled
    setDrawColor(color)
    fillSquare(i, color)
    setStartSquare(i)
    setEndSquare(i)
  }

  const handleSquareHover = (i) => {
    if (startSquare !== null) {
      const [hoveredRow, hoveredColumn] = squareIndexToRowColumn(i)
      const [startRow, startColumn] = squareIndexToRowColumn(startSquare)
      const [endRow, endColumn] = squareIndexToRowColumn(endSquare)

      if (startRow === endRow && hoveredColumn !== endColumn) {
        const i = squareRowColumnToIndex(endRow, hoveredColumn)
        if (squareColors[i] !== drawColor) {
          setEndSquare(i)
          fillSquare(i)
        }
      } else if (startColumn === endColumn && hoveredRow !== endRow) {
        const i = squareRowColumnToIndex(hoveredRow, endColumn)
        if (squareColors[i] !== drawColor) {
          setEndSquare(i)
          fillSquare(i)
        }
      }
    }
  }

  const handleMouseUp = () => {
    setStartSquare(null)
    setEndSquare(null)
  }

  const fillSquare = (i, color) => {
    const squaresSlice = squareColors.slice()
    squaresSlice[i] = color || drawColor
    setSquareColors(squaresSlice)
  }

  const squareRowColumnToIndex = (row, column) => row * board.length + column

  const squareIndexToRowColumn = (i) => {
    const row = Math.floor(i / board.length)
    const column = i % board.length
    return [row, column]
  }

  const renderSquare = (row, column) => {
    const i = squareRowColumnToIndex(row, column)

    return (
      <Square
        row={row}
        column={column}
        key={i}
        color={squareColors[i]}
        onMouseDown={() => handleSquareClick(i)}
        onMouseOver={() => handleSquareHover(i)}
      />
    )
  }

  const grid = board.map(row =>
    <div className="board-row" key={row}>
      {board.map(column => renderSquare(row, column))}
    </div>
  )

  return (
    <div
      className="game-board"
      onMouseUp={handleMouseUp}
    >
      {grid}
    </div>
  )
}

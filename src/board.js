import { useState } from 'react'
import { Square } from './square.js'

const board = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

export function Board(props) {
  const [squareColors, setSquareColors] = useState(Array(board.length * board.length).fill('grey'))
  const [clickedSquare, setClickedSquare] = useState(null)

  const handleSquareClick = (i) => {
    const squares_slice = squareColors.slice()
    squares_slice[i] = 'red'
    setSquareColors(squares_slice)
    setClickedSquare(i)
  }

  const handleSquareHover = (i) => {
    if (clickedSquare) {
      const [hoveredRow, hoveredColumn] = squareIndexToRowColumn(i)
      const [clickedRow, clickedColumn] = squareIndexToRowColumn(clickedSquare)

      if (hoveredRow === clickedRow) {
        const squares_slice = squareColors.slice()
        squares_slice[i] = 'red'
        setSquareColors(squares_slice)
      }

      if (hoveredColumn === clickedColumn) {
        const squares_slice = squareColors.slice()
        squares_slice[i] = 'red'
        setSquareColors(squares_slice)
      }
    } 
  }

  const handleMouseUp = (_e) => setClickedSquare(null)

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
        key = {i}
        color={squareColors[i]}
        onClick={() => handleSquareClick(i)}
        onHover={() => handleSquareHover(i)}
      />
    )
  }

  const grid = board.map(row =>
    <div className="board-row" key = {row}>
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

import { useState } from 'react'
import Square from './Square.js'

const board = [...Array(34).keys()]
const filled = 'black'
const unfilled = 'white'

export default function Board() {
  const [allState, setAllState] = useState({
    colors: Array(board.length * board.length).fill(unfilled),
    startSquare: null,
    endSquare: null,
    drawColor: filled
  })

  const handleSquareClick = (i) => 
    setAllState(prev => {
      const color = (prev.colors[i] === unfilled) ? filled : unfilled
      const squaresSlice = [...prev.colors]
      squaresSlice[i] = color
      return {startSquare: i, endSquare: i, drawColor: color, colors: squaresSlice}
    })

  // TODO: If you move the cursor fast enough you can miss squares.
  // Need to take into account the previous end square.
  const handleSquareHover = (i) =>
    setAllState(state => {
      const {startSquare, endSquare, colors, drawColor} = state

      if (startSquare !== null) {
        const [hoveredRow, hoveredColumn] = squareIndexToRowColumn(i)
        const [startRow, startColumn] = squareIndexToRowColumn(startSquare)
        const [endRow, endColumn] = squareIndexToRowColumn(endSquare)

        if (startRow === endRow && hoveredColumn !== endColumn) {
          const i = squareRowColumnToIndex(endRow, hoveredColumn)
          if (colors[i] !== drawColor) return colorSquare(state, i)
        } else if (startColumn === endColumn && hoveredRow !== endRow) {
          const i = squareRowColumnToIndex(hoveredRow, endColumn)
          if (colors[i] !== drawColor) return colorSquare(state, i)
        }
      }
      return state
    })

  const colorSquare = (state, i) => {
    const {colors} = state
    const color = (colors[i] === unfilled) ? filled : unfilled
    const squaresSlice = [...colors]
    squaresSlice[i] = color
    return {...state, endSquare: i, colors: squaresSlice}
  }

  const handleMouseUp = () => setAllState(prev => ({...prev, startSquare: null, endSquare: null}))

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
        key={i}
        color={allState.colors[i]}
        onMouseDown={() => handleSquareClick(i)}
        onMouseOver={() => handleSquareHover(i)}
        onMouseUp={() => handleMouseUp()}
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

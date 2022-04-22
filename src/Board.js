import { useState } from 'react'
import Square from './Square.js'

const board = [...Array(10).keys()]
const filled = 'black'
const unfilled = 'white'

export default function Board() {
  const [state, setState] = useState({
    colors: Array(board.length).fill(Array(board.length).fill(unfilled)),
    startSquare: null,
    endSquare: null,
    drawColor: filled
  })

  const handleSquareClick = (row, column) => 
    setState(({colors}) => {
      const color = (colors[row][column] === unfilled) ? filled : unfilled
      const painted = paintLine(colors, [row, column], [row, column], color)
      return {startSquare: [row, column], endSquare: [row, column], drawColor: color, colors: painted}
    })

  const handleSquareHover = (row, column) =>
    setState(state => {
      const {colors, startSquare, endSquare, drawColor} = state

      if (startSquare !== null) {
        const [startRow, startColumn] = startSquare
        const [endRow, endColumn] = endSquare

        if (startRow === endRow && column !== endColumn && colors[endRow][column] !== drawColor) {
          const painted = paintLine(colors, endSquare, [endRow, column], drawColor)
          return {...state, endSquare: [endRow, column], colors: painted}
        } else if (startColumn === endColumn && row !== endRow && colors[row][endColumn] !== drawColor) {
          const painted = paintLine(colors, endSquare, [row, endColumn], drawColor)
          return {...state, endSquare: [row, endColumn], colors: painted}
        }
      }
      return state
    })

  // I feel like this could be simplified
  const paintLine = (colors, [startRow, startColumn], [endRow, endColumn], color) => {
    const squaresSlice = colors.map(row => [...row])

    if (startRow > endRow) [startRow, endRow] = [endRow, startRow]
    if (startColumn > endColumn) [startColumn, endColumn] = [endColumn, startColumn]

    if (startRow === endRow) {
      for (let i = startColumn; i <= endColumn; i++) {
        squaresSlice[startRow][i] = color
      }
    } else if (startColumn === endColumn && startRow <= endRow) {
      for (let i = startRow; i <= endRow; i++) {
        squaresSlice[i][startColumn] = color
      }
    } 
    return squaresSlice
  }

  const stopPainting = () => setState(state => ({...state, startSquare: null, endSquare: null}))

  const renderSquare = (row, column) => {
    return (
      <Square
        key={row * board.length + column}
        color={state.colors[row][column]}
        onMouseDown={() => handleSquareClick(row, column)}
        onMouseOver={() => handleSquareHover(row, column)}
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
      onMouseUp={stopPainting}
      onMouseLeave={stopPainting}
    >
      {grid}
    </div>
  )
}

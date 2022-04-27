import { useState } from 'react'
import Board from './Board.js'

const board = [...Array(15).keys()]
const unfilled = 'white'

export default function GameBoard({fillColor}) {
  const [state, setState] = useState({
    colors: Array(board.length).fill(Array(board.length).fill(unfilled)),
    startSquare: null,
    endSquare: null,
    drawColor: fillColor
  })

  function handleSquareClick(row, column) {
    setState(({colors}) => {
      const color = (colors[row][column] === unfilled) ? fillColor : unfilled
      const painted = paintLine(colors, [row, column], [row, column], color)
      return {startSquare: [row, column], endSquare: [row, column], drawColor: color, colors: painted}
    })
  }

  function handleSquareHover(row, column) {
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
    setState(state => ({...state, startSquare: null, endSquare: null}))
  }

  return (
    <div
      onMouseLeave={stopPainting}
      onMouseUp={stopPainting}
    >
      <Board
        colors={state.colors}
        handleSquareClick={handleSquareClick}
        handleSquareHover={handleSquareHover}
      />
    </div>
  )
}

function between(value, start, end) {
  return (value >= start && value <= end) || (value <= start && value >= end)
}

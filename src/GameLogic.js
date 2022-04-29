const blankColor = "white"

export function reducer(state, action) {
  switch (action.type) {
    case "undo":
      return undo(state)
    case "click":
      return click(state, action.coordinate)
    case "hover":
      return hover(state, action.coordinate)
    case "release":
      return release(state)
    case "color":
      return color(state, action.color)
    default:
      throw new Error()
  }
}

function color(state, color) {
  return { ...state, color: color }
}

function click(state, coordinate) {
  const { boards, color } = state
  const [row, column] = coordinate
  const board = boards[0]

  const paintColor = board[row][column] === color ? blankColor : color
  const painted = paintLine(board, [row, column], [row, column], paintColor)
  const newBoards = [painted, ...boards]
  return {
    ...state,
    boards: newBoards,
    startSquare: coordinate,
    endSquare: coordinate,
    paintColor: paintColor,
  }
}

function hover(state, [row, column]) {
  const { startSquare, endSquare, boards, paintColor } = state
  const [board, ...rest] = boards

  if (startSquare !== null) {
    const [startRow, startColumn] = startSquare
    const [endRow, endColumn] = endSquare

    if (
      startRow === endRow &&
      column !== endColumn &&
      board[endRow][column] !== paintColor
    ) {
      const painted = paintLine(board, endSquare, [endRow, column], paintColor)
      return {
        ...state,
        boards: [painted, ...rest],
        endSquare: [endRow, column],
      }
    } else if (
      startColumn === endColumn &&
      row !== endRow &&
      board[row][endColumn] !== paintColor
    ) {
      const painted = paintLine(board, endSquare, [row, endColumn], paintColor)
      return {
        ...state,
        boards: [painted, ...rest],
        endSquare: [row, endColumn],
      }
    }
  }
  return state
}

function release(state) {
  return { ...state, startSquare: null, endSquare: null }
}

function undo(state) {
  const [, ...rest] = state.boards
  return { ...state, boards: rest }
}

function paintLine(board, [startRow, startColumn], [endRow, endColumn], color) {
  return board.map((columns, row) =>
    columns.map((oldColor, column) => {
      if (
        startRow === endRow &&
        row === startRow &&
        between(column, startColumn, endColumn)
      ) {
        return color
      } else if (
        startColumn === endColumn &&
        column === startColumn &&
        between(row, startRow, endRow)
      ) {
        return color
      }
      return oldColor
    })
  )
}

function between(value, start, end) {
  return (value >= start && value <= end) || (value <= start && value >= end)
}

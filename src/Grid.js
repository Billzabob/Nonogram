import Square from "./Square.js"

export default function Grid({ board, dispatch }) {
  function renderSquare(row, column) {
    return (
      <Square
        key={row * board.length + column}
        color={board[row][column]}
        row={row}
        column={column}
        dispatch={dispatch}
      />
    )
  }

  const grid = board.map((columns, row) => (
    <div className="grid-row" key={row}>
      {columns.map((_color, column) => renderSquare(row, column))}
    </div>
  ))

  return <div className="grid">{grid}</div>
}

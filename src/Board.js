import Square from './Square.js'

export default function Board({colors, handleSquareClick, handleSquareHover}) {

  function renderSquare(row, column) {
    return (
      <Square
        key={row * colors.length + column}
        color={colors[row][column]}
        row={row}
        column={column}
        handleSquareClick={handleSquareClick}
        handleSquareHover={handleSquareHover}
      />
    )
  }

  const grid = colors.map((columns, row) =>
    <div className="board-row" key={row}>
      {columns.map((_color, column) => renderSquare(row, column))}
    </div>
  )

  return (
    <div className="game-board">
      {grid}
    </div>
  )
}

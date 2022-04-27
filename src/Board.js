import Square from './Square.js'

export default function Board({colors, handleSquareClick, handleSquareHover}) {

  function renderSquare(row, column) {
    return (
      <Square
        key={row * colors.length + column}
        color={colors[row][column]}
        onMouseDown={() => handleSquareClick(row, column)}
        onMouseOver={() => handleSquareHover(row, column)}
      />
    )
  }

  const grid = colors.map((columns, row) =>
    <div className="board-row" key={row}>
      {columns.map((color, column) => renderSquare(row, column))}
    </div>
  )

  return (
    <div className="game-board">
      {grid}
    </div>
  )
}

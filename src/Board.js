import Square from './Square.js'

export default function Board({board, handleSquareClick, handleSquareHover}) {

  function renderSquare(row, column) {
    return (
      <Square
        key={row * board.length + column}
        color={board[row][column]}
        row={row}
        column={column}
        handleSquareClick={handleSquareClick}
        handleSquareHover={handleSquareHover}
      />
    )
  }

  const grid = board.map((columns, row) =>
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

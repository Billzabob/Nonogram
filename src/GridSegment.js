import Square from "./Square.js"

export default function GridSegment({ board, dispatch, segmentIndex, segmentSize }) {
  const segmentCountRow = board.length / segmentSize
  const segmentCountColumn = board[0].length / segmentSize

  function renderSquare(row, column) {
    const newRow = Math.floor(segmentIndex / segmentCountRow) * segmentSize + row
    const newColumn = segmentIndex % segmentCountColumn * segmentSize + column

    return (
      <Square
        key={newRow * board.length + newColumn}
        color={board[newRow][newColumn]}
        row={newRow}
        column={newColumn}
        dispatch={dispatch}
      />
    )
  }

  const template = [...Array(segmentSize).keys()]

  const gridSegment = template.map(row => (
    <div className="grid-segment-row" key={row}>
      {template.map(column => renderSquare(row, column))}
    </div>
  ))

  return <div className="grid-segment" id={segmentIndex}>{gridSegment}</div>
}
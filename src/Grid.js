import GridSegment from "./GridSegment.js"

export default function Grid({ board, dispatch, segmentSize }) {
  const numSegments = board.length / segmentSize
  const template = [...Array(numSegments).keys()]

  const grid = template.map((row) => (
    <div className="grid-row" key={row}>
      {template.map((column) => (
        <GridSegment
          key={row * numSegments + column}
          board={board}
          dispatch={dispatch}
          segmentIndex={numSegments * row + column}
          segmentSize={segmentSize}
        />
      ))}
    </div>
  ))

  return <div className="grid">{grid}</div>
}

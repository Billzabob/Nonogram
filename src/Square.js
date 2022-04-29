import React from "react"

const areEqual = (prev, next) => prev.color === next.color

export default React.memo(function Square({ color, row, column, dispatch }) {
  return (
    <button
      className="square"
      style={{ background: color }}
      onMouseDown={() => dispatch({ type: "click", coordinate: [row, column] })}
      onMouseOver={() => dispatch({ type: "hover", coordinate: [row, column] })}
    />
  )
}, areEqual)

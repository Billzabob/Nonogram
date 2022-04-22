import React from 'react'

const areEqual = (prev, next) => prev.color === next.color

export default React.memo(function Square({ color, ...rest}) {
  return (
    <button
      className="square"
      style={{ background: color }}
      {...rest}
    />
  )
}, areEqual)
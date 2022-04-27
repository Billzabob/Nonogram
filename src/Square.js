
export default function Square({ color, row, column, handleSquareClick, handleSquareHover}) {
  return (
    <button
      className="square"
      style={{ background: color }}
      onMouseDown={() => handleSquareClick(row, column)}
      onMouseOver={() => handleSquareHover(row, column)}
    />
  )
}
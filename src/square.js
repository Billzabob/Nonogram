export function Square({ color, onClick, onHover }) {
  return (
    <button
      className="square"
      onMouseDown={onClick}
      onMouseOver={onHover}
      style={{background: color}}
    />
  )
}
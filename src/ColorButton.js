export default function ColorButton({ color, setColor }) {
  return (
    <button
      className="color-button"
      style={{ background: color }}
      onClick={() => setColor(color)}
    />
  )
}

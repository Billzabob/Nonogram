export default function ColorPicker({ setColor }) {
  const buttons = ["red", "green", "blue"].map((color) => (
    <button
      className="color-button"
      style={{ background: color }}
      color={color}
      key={color}
      onClick={() => setColor(color)}
    />
  ))
  return <div className="color-picker">{buttons}</div>
}

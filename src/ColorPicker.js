export default function ColorPicker({ setColor, activeColor }) {
  const buttons = ["#FF2E63", "#252A34", "#08D9D6"].map((color) => {
    const className =
      color === activeColor ? "color-button-active" : "color-button-inactive"

    return (
      <button
        className={className}
        style={{ background: color }}
        color={color}
        key={color}
        onClick={() => setColor(color)}
      />
    )
  })
  return <div className="color-picker">{buttons}</div>
}

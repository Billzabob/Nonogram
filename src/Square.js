export default function Square({ row, column, color, ...rest}) {
  console.log(`${row}, ${column}`)

  return (
    <button
      className="square"
      style={{ background: color }}
      {...rest}
    />
  )
}
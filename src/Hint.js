export default function Hint({ numbers, direction }) {
  const hint = numbers.map((number, i) => <div key={i}>{number}</div>)
  return <div className={"hint-" + direction}>{hint}</div>
}

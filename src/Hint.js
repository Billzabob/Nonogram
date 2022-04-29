export default function Hint({numbers, direction}) {
  const hint = numbers.map(number => <div>{number}</div>)
  return (
    <div className={'hint-' + direction}>
      {hint}
    </div>
  )
}
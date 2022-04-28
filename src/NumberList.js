export default function NumberList({numbers, direction}) {
  const numberList = numbers.map(number => <div>{number}</div>)
  return (
    <div className={'number-list-' + direction}>
      {numberList}
    </div>
  )
}
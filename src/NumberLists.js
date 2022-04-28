import NumberList from "./NumberList"

export default function NumberLists({lists, direction}) {
  const values = lists.map((numbers, i) => {
    return (
      <NumberList
        key={i}
        numbers={numbers}
        direction={direction}
      />
    )
  })

  return (
    <div className={'number-lists-' + direction}>
      {values}
    </div>
  )
}
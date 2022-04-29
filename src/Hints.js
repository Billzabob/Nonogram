import Hint from "./Hint"

export default function Hints({ lists, direction }) {
  const values = lists.map((numbers, i) => {
    return <Hint key={i} numbers={numbers} direction={direction} />
  })

  return <div className={"hints-" + direction}>{values}</div>
}

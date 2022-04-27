export default function Undo({onClick, disabled}) {

  return (
    <button
      onClick={onClick}
      disabled={disabled}
    >Undo</button>
  )
}
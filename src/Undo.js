export default function Undo({onClick, disabled}) {

  return (
    <button
      className='undo'
      onClick={onClick}
      disabled={disabled}/>
  )
}
export default function ColorButton({color, setColor}) {
  return (
    <button
      className='color-button'
      onClick={() => setColor(color)}>
        {color}
    </button>
  )
}
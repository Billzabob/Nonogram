import ColorButton from "./ColorButton"

export default function ColorPicker({setColor}) {
  return (
    <div className='color-picker'>
      <ColorButton setColor={setColor} color='black'/>
      <ColorButton setColor={setColor} color='red'/>
      <ColorButton setColor={setColor} color='blue'/>
    </div>
  )
}
import ColorButton from "./ColorButton"

export default function ColorPicker({setColor}) {
  const buttons = ['red', 'green', 'blue'].map(color => <ColorButton setColor={setColor} color={color}/>)
  return <div className='color-picker'>{buttons}</div>
}
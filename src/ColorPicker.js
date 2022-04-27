export default function Game({pickColor}) {
  return (
    <div>
      <button onClick={() => pickColor('black')}>Black</button>
      <button onClick={() => pickColor('red')}>Red</button>
      <button onClick={() => pickColor('blue')}>Blue</button>
    </div>
  )
}
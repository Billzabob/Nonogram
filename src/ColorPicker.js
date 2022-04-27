export default function Game({setColor}) {
  return (
    <div>
      <button onClick={() => setColor('black')}>Black</button>
      <button onClick={() => setColor('red')}>Red</button>
      <button onClick={() => setColor('blue')}>Blue</button>
    </div>
  )
}
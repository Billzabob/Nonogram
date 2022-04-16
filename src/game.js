import { Board } from './board.js'

export function Game(_props) {
  return (
    <div className="game">
      <Board />
      <div className="game-info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  )
}

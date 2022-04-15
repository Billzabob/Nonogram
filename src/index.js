import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const Square = ({ value, onClick }) => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  )
}

const Board = (props) => {
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)

  const handleClick = (i) => {
    const squares_slice = squares.slice()
    if (calculateWinner(squares_slice) || squares_slice[i]) {
      return
    }
    squares_slice[i] = xIsNext ? 'X' : 'O';
    setSquares(squares_slice)
    setXIsNext(!xIsNext)
  }

  const renderSquare = (i) => {
    return (
      <Square
        value={squares[i]}
        onClick={() => handleClick(i)}
      />
    )
  }

  const winner = calculateWinner(squares)
  const status = winner ? 'Winner: ' + winner : 'Next player: ' + (xIsNext ? 'X' : 'O')

  const grid = [0, 1, 2].map(row =>
    <div className="board-row">
      {[0, 1, 2].map(column => renderSquare(row * 3 + column))}
    </div>
  )

  return (
    <div className="game-board">
      <div className="status">{status}</div>
      {grid}
    </div>
  )
}

const Game = _ => {
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

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
)

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

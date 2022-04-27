import { useState } from 'react'
import GameBoard from './GameBoard.js'
import ColorPicker from './ColorPicker.js'
import Undo from './Undo.js'

const boardWidth = 15
const boardHeight = boardWidth
const blankColor = 'white'

export default function Game() {
  const [color, setColor] = useState('black')
  const [board, setBoard] = useState([Array(boardHeight).fill(Array(boardWidth).fill(blankColor))])

  function updateMove(color) {
    setBoard(([, ...rest]) => [color, ...rest])
  }

  function startMove(color) {
    setBoard(old => [color, ...old])
  }

  function undo() {
    setBoard(([, ...rest]) => rest)
  }

  return (
    <div className='game'>
      <GameBoard
        color={color}
        board={board[0]}
        updateMove={updateMove}
        startMove={startMove}
        blankColor={blankColor}
      />
      <ColorPicker
        setColor={setColor}
      />
      <Undo
        onClick={undo}
        disabled={board.length <= 1}
      />
    </div>
  )
}

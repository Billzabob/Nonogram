import { useState } from 'react'
import GameBoard from './GameBoard.js'
import ColorPicker from './ColorPicker.js'
import Undo from './Undo.js'
import Hints from './Hints.js'

const boardWidth = 10
const boardHeight = boardWidth
const defaultColor = 'red'
const blankColor = 'white'

const level = {
  rows: [[1, 2, 3], [3, 2, 1], [2], [1], [4, 2], [5, 4], [4, 5], [1, 1], [2, 2], [3, 3]],
  columns: [[1, 2, 3], [3, 2, 1], [2], [1], [4, 2], [5, 4], [4, 5], [1, 1], [2, 2], [3, 3]]
}

export default function Game() {
  const [color, setColor] = useState(defaultColor)
  const [boards, setBoards] = useState([Array(boardHeight).fill(Array(boardWidth).fill(blankColor))])

  function updateMove(color) {
    setBoards(([, ...rest]) => [color, ...rest])
  }

  function startMove(color) {
    setBoards(old => [color, ...old])
  }

  function undo() {
    setBoards(([, ...rest]) => rest)
  }

  return (
    <div className='game'>
      <div className='full-board'>
        <div className='board-top'>
          <Hints lists={level.rows} direction='row'/>
        </div>
        <div className='board-bottom'>
          <Hints lists={level.columns} direction='column'/>
          <GameBoard
            color={color}
            board={boards[0]}
            updateMove={updateMove}
            startMove={startMove}
            blankColor={blankColor}
          />
        </div>
      </div>
      <ColorPicker setColor={setColor}/>
      <Undo onClick={undo} disabled={boards.length <= 1}/>
    </div>
  )
}

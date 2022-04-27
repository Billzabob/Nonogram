import { useState } from 'react'
import GameBoard from './GameBoard.js'
import ColorPicker from './ColorPicker.js'

const boardWidth = 15
const boardHeight = boardWidth
const unfilled = 'white'

export default function Game() {
  const [fillColor, setFillColor] = useState('black')
  const [colors, setColors] = useState(Array(boardHeight).fill(Array(boardWidth).fill(unfilled)))

  return (
    <div className='game'>
      <GameBoard
        fillColor={fillColor}
        colors={colors}
        setColors={setColors}
        unfilled={unfilled}
      />
      <ColorPicker
        pickColor={setFillColor}
      />
    </div>
  )
}

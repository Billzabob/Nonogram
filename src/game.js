import { useState } from 'react'
import GameBoard from './GameBoard.js'
import ColorPicker from './ColorPicker.js'

export default function Game() {
  const [fillColor, setFillColor] = useState('black')

  return (
    <div>
      <GameBoard
        fillColor={fillColor}
      />
      <ColorPicker
        pickColor={color => setFillColor(color)}
      />
    </div>
  )
}

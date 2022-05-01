import { useReducer } from "react"
import Grid from "./Grid.js"
import ColorPicker from "./ColorPicker.js"
import Undo from "./Undo.js"
import Hints from "./Hints.js"
import { reducer } from "./GameLogic.js"

const defaultColor = "red"
const blankColor = "white"
const segmentSize = 5

const level = {
  rows: [
    [2],
    [5],
    [8],
    [10],
    [10],
    [11],
    [11],
    [10],
    [8],
    [5],
    [3, 3],
    [5],
    [5],
    [5],
    [3],
  ],
  columns: [
    [2, 3],
    [4, 5],
    [6, 5],
    [7, 5],
    [6, 3],
    [7],
    [6],
    [7],
    [6],
    [7],
    [7],
    [6],
    [6],
    [4],
    [2],
  ],
}

export default function Game() {
  const [state, dispatch] = useReducer(reducer, {
    boards: [
      Array(level.columns.length).fill(
        Array(level.rows.length).fill(blankColor)
      ),
    ],
    color: defaultColor,
    startSquare: null,
    endSquare: null,
    paintColor: defaultColor,
  })

  return (
    <div className="game" onMouseUp={() => dispatch({ type: "release" })}>
      <div className="board">
        <div className="board-top">
          <Hints lists={level.rows} direction="row" />
        </div>
        <div className="board-bottom">
          <Hints lists={level.columns} direction="column" />
          <Grid
            dispatch={dispatch}
            color={state.color}
            board={state.boards[0]}
            blankColor={blankColor}
            segmentSize={segmentSize}
          />
        </div>
      </div>
      <div className="buttons">
        <ColorPicker
          setColor={(color) => dispatch({ type: "color", color: color })}
        />
        <Undo
          onClick={() => dispatch({ type: "undo" })}
          disabled={state.boards.length <= 1}
        />
      </div>
    </div>
  )
}

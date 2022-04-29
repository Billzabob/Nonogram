import { createRoot } from "react-dom/client"
import "./index.css"
import Game from "./Game.js"

const root = createRoot(document.getElementById("root"))
root.render(<Game />)

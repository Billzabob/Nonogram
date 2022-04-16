import {createRoot} from 'react-dom/client'
import './index.css'
import { Game } from './game.js'

const root = createRoot(document.getElementById('root'))
root.render(<Game />)

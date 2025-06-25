import { Render } from '../engine/render.js'
import { Game } from './game.js'

const canvas = document.getElementById("webgl-canvas")
const render = new Render(canvas)

render.scene = new Game(render)

window.addEventListener("load", () => render.load())
window.addEventListener("resize", () => render.resize())

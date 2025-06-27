import { Bubbles } from './bubbles.js'
import { Turret } from './turret.js'

export class Game {
    constructor(render) {
        this.render = render
        this.resize()
    }

    resize() {
        this.bubbles = new Bubbles(this.render.canvas, 20, 4)
        this.turret = new Turret(this.render.canvas)
        this.turret.size = this.bubbles.bubbleSize()
    }

    draw() {
        this.bubbles.draw(this.render.ctx)
        this.turret.draw(this.render.ctx)
    }
}

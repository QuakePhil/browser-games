import { Bubbles } from './bubbles.js'
import { Bubble } from './bubble.js'
import { Turret } from './turret.js'

export class Game {
    constructor(render) {
        this.render = render
        this.bubbles = new Bubbles(this.render.canvas, 20, 4)
        this.resize()
    }

    resize() {
        this.turret = new Turret(this.render.canvas)
        this.turret.size = this.bubbles.bubbleSize()
    }

    collission(x1, y1, r1, x2, y2, r2) {
        const dx = x2 - x1
        const dy = y2 - y1
        const distanceSquared = dx * dx + dy * dy
        const radiusSum = r1 + r2
        //console.log(x1, y1, r1, x2, y2, r2, distanceSquared, radiusSum * radiusSum)
        return distanceSquared <= radiusSum * radiusSum
    }

    spawnNewBubble(from_x, from_y, to_x, to_y, nearest_grid_i, nearest_grid_j) {
        console.log(/*from_x, from_y, */"collided with:", /*to_x, to_y, */nearest_grid_i, nearest_grid_j)
    }

    draw() {
        const shot = this.turret.shot
        this.turret.draw(this.render.ctx)
        this.bubbles.draw(this.render.ctx, (i, j, x, y, size) => {
            if (this.collission(x, y, size,
                shot.x,
                shot.y,
                size
            )) {
                this.bubbles.set(...shot.spawnBubbleOnGrid(size))
                shot.x_travel = 0
                shot.y_travel = 0
                shot.x_speed = 0
                shot.y_speed = 0
                shot.x = this.turret.x
                shot.y = this.turret.y
            }
        })
    }
}

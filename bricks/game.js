import { Bricks } from './bricks.js'
import { Paddle } from './paddle.js'
import { Ball } from './ball.js'

export class Game {
    constructor(render) {
        this.render = render
        this.resize()
        this.bounce_x_adjust = 0 // becomes non-zero if ball bounces off-center from a rectangle
    }

    resize() {
        this.paddle = new Paddle(this.render.canvas)
        this.bricks = new Bricks(this.render.canvas, 14, 8)
        this.ball = new Ball(this.render.canvas)
        this.bounce_x_adjustment_factor = this.render.canvas.width / 70
    }

    rectIntersectsCircle(ball, bounds) {
        const rx1 = bounds[0]
        const ry1 = bounds[1]
        const rx2 = bounds[2]
        const ry2 = bounds[3]
        //, rw, rh, 
        const cx = ball.x
        const cy = ball.y
        const r = ball.size
        // Find the closest point to the circle within the rectangle
        const closestX = Math.max(rx1, Math.min(cx, rx2))
        const closestY = Math.max(ry1, Math.min(cy, ry2))

        // Calculate the distance between the circle's center and this closest point
        const dx = cx - closestX
        const dy = cy - closestY

        // Calcualte bounce adjustment
        this.bounce_x_adjust = cx - (rx1 + rx2) / 2

        // If the distance is less than the radius, there's an intersection
        return dx * dx + dy * dy <= r * r
    }

    bounce() {
        const bricks = this.bricks.bricks
        for (let y = 0; y < bricks.length; y++) {
            for (let x = 0; x < bricks[y].length; x++) {
                if (bricks[y][x] > 0) {
                    let brickBounds = this.bricks.getBrickBounds(x, y, bricks[0].length, bricks.length)
                    let collideBrick = this.rectIntersectsCircle(this.ball, brickBounds)
                    if (collideBrick) {
                        bricks[y][x] = 0
                        return "brick"
                    }
                }
            }
        }
        return (
            this.rectIntersectsCircle(this.ball, this.paddle.bounds()) ? "paddle" : false
        )
    }

    // TODO: ensure at most one collision with paddle, to account for movement
    // maybe only collide with paddle if going down?
    draw() {
        this.paddle.draw(this.render.ctx)
        this.bricks.draw(this.render.ctx)
        this.ball.draw(this.render.ctx)

        let bounce = this.bounce()
        if (bounce !== false) {
            this.ball.y_speed *= -1
            if (bounce == "paddle") {
                this.ball.x_speed += (this.bounce_x_adjust / this.bounce_x_adjustment_factor)
            } else if (bounce == "brick") {
                this.ball.accelerate += 0.2
            }
        }
    }
}

export class Ball {
    constructor(canvas) {
        this.canvas = canvas
        this.size = Math.min(canvas.width, canvas.height) * 0.01
        this.reset()
    }

    reset() {
        this.x = this.canvas.width / 2
        this.y = this.canvas.height / 2
        this.x_speed = 0
        this.y_speed = 4
        this.accelerate = 1
    }

    bounce() {
        if (this.x - this.size < 0 || this.x + this.size > this.canvas.width) {
            this.x_speed *= -1
        }
        if (this.y - this.size < 0) {
            this.y_speed *= -1
        }
        if (this.y + this.size > this.canvas.height) {
            this.reset()
        }
    }

    draw(ctx) {
        ctx.setFillColor([1, 1, 1, 1])
        ctx.fillCircle(this.x, this.y, this.size)

        this.bounce()
        this.x += this.x_speed * this.accelerate
        this.y += this.y_speed * this.accelerate
    }
}
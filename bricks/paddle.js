export class Paddle {
    constructor(canvas) {
        this.canvas = canvas
        this.size = canvas.width * 0.04
        this.x = canvas.width / 2
        this.waypoint_x = this.x
        this.y = canvas.height * 0.9
        this.speed = 5

        document.addEventListener("mousemove", (event) => {
            this.waypoint_x = event.clientX
        })
    }

    bounds() {
        return [
            this.x - this.size,
            this.y,
            this.x + this.size,
            this.y + 5
        ]
    }

    draw(ctx) {
        ctx.setFillColor([1, 0, 0, 1])
        ctx.fillRect(...this.bounds())

        const epsilon = this.speed - 0.1 // threshold to consider "arrived"

        if (Math.abs(this.waypoint_x - this.x) > epsilon) {
            if (this.waypoint_x > this.x) {
                this.x += this.speed
            } else {
                this.x -= this.speed
            }
        } else {
            // Snap to target if close enough and optionally advance to next waypoint
            this.x = this.waypoint_x
            // this.waypoints.shift() // Uncomment to remove waypoint once reached
        }
    }
}
export class Turret {
    constructor(canvas) {
        this.canvas = canvas
        this.x = canvas.width / 2
        this.y = canvas.height * 0.9
        this.waypoint_x = this.x
        this.waypoint_y = this.y - 100
        this.speed = 5

        document.addEventListener("mousemove", (event) => {
            //this.waypoint_x = event.clientX
            //this.waypoint_y = event.clientY
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
        ctx.fillCircle(this.x, this.y, this.size)

        ctx.setColor([1, 0, 0, 1])
        ctx.line(this.x, this.y, this.waypoint_x, this.waypoint_y)
    }
}
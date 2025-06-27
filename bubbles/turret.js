export class Turret {
    constructor(canvas) {
        this.canvas = canvas
        this.x = canvas.width / 2
        this.y = canvas.height * 0.9
        this.waypoint_x = this.x
        this.waypoint_y = this.y - 100
        this.speed = 5

        document.addEventListener("mousemove", (event) => {
            // TODO: update waypoint to point to mouse, using a limited size (of 100, for now)
            // use Math.hypot ?
            //this.waypoint_x = event.clientX
            //this.waypoint_y = event.clientY
            const rect = this.canvas.getBoundingClientRect()
            const mouseX = event.clientX - rect.left
            const mouseY = event.clientY - rect.top

            const dx = mouseX - this.x
            const dy = mouseY - this.y

            // Angle in radians, relative to horizontal
            const angle = Math.atan2(-dy, dx) // negative dy since y-axis points down
            const angleDeg = Math.abs(angle * (180 / Math.PI))

            // Reject near-horizontal directions (±15° from 0° or 180°)
            if (angleDeg < 15 || angleDeg > 165) return

            const dist = Math.hypot(dx, dy)

            const factor = 100 / dist
            this.waypoint_x = this.x + dx * factor
            this.waypoint_y = this.y + dy * factor
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
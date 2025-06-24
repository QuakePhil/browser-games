export class Layout {
    constructor(canvas, container) {
        this.width = canvas.width
        this.height = canvas.height
        this.container = container

        // pivot if in portrait mode
        if (this.height > this.width) {
            this.container = this.container[0].map(
                (_, column) => this.container.map(row => row[column])
            )
        }
    }

    draw() {
        let x = 0
        let y = 0
        let x_step = this.width / this.container[0].length
        let y_step = this.height / this.container.length
        let x_margin = x_step * 0.1
        let y_margin = y_step * 0.1

        for (let row of this.container) {
            for (let cb of row) {
                if (cb.length === 2) {
                    cb(
                        x,
                        y
                    )
                } else if (cb.length === 3) {
                    cb(
                        x + x_step / 2,
                        y + y_step / 2,
                        Math.min(x_step, y_step) / 2 * 0.9
                    )
                } else if (cb.length === 4) {
                    cb(
                        x + x_margin,
                        y + y_margin,
                        x + x_step - x_margin,
                        y + y_step - y_margin
                    )
                } else if (cb.length === 6) {
                    cb(
                        x + x_margin,
                        y + y_margin,
                        x + x_step - x_margin,
                        y + y_step - y_margin,
                        10,
                        10
                    )
                }
                x += x_step
            }
            x = 0
            y += y_step
        }
    }
}
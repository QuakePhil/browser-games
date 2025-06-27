export class Bubbles {
    constructor(canvas, columns, rows) {
        this.canvas = canvas
        this.bubbles = []

        for (let y = 0; y < rows; y++) {
            const row = []
            for (let x = 0; x < columns; x++) {
                row.push(Math.floor(Math.random() * 6))
            }
            this.bubbles.push(row)
        }
    }

    bubbleSize() {
        const canvasWidth = this.canvas.width
        const canvasHeight = this.canvas.height
        const columns = this.bubbles[0].length
        const rows = this.bubbles.length
        return Math.min(
            (canvasWidth) / (columns + 0.5),
            (canvasHeight) / rows
        ) / 2
    }

    getBounds(x, y) {
        const size = this.bubbleSize()
        const verticalSlack = 0.88 // Tighten up the rows
        const offset = (y % 2) * size
        const x1 = x * size * 2 + offset
        const y1 = y * size * 2 * verticalSlack

        return [x1 + size, y1 + size, size]
    }

    draw(ctx) {
        const colors = {
            0: [1.0, 0.0, 0.0, 1],     // red
            1: [0.0, 1.0, 0.0, 1],     // green
            2: [0.0, 0.0, 1.0, 1],     // blue
            3: [1.0, 1.0, 0.0, 1],     // yellow
            4: [0.0, 1.0, 1.0, 1],     // cyan
            5: [1.0, 0.0, 1.0, 1],     // magenta
            /*
            6: [1.0, 1.0, 1.0, 1],     // white
            7: [0.5, 0.5, 0.5, 1],     // gray
            8: [1.0, 0.647, 0.0, 1],   // orange
            9: [0.502, 0.0, 0.502, 1], // purple
            10: [0.647, 0.165, 0.165, 1], // brown
            11: [1.0, 0.753, 0.796, 1], // pink
            12: [0.0, 0.502, 0.502, 1], // teal
            13: [0.0, 0.0, 0.502, 1]   // navy
            */
        }

        for (let y = 0; y < this.bubbles.length; y++) {
            for (let x = 0; x < this.bubbles[y].length; x++) {
                const bounds = this.getBounds(x, y)
                const color = colors[this.bubbles[y][x]]
                ctx.setFillColor(color)
                ctx.fillCircle(...bounds)
            }
        }
    }
}
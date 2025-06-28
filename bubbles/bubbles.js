import { Bubble } from './bubble.js'

export class Bubbles {
    constructor(canvas, columns, rows) {
        this.canvas = canvas
        this.bubbles = []

        for (let y = 0; y < rows; y++) {
            const row = []
            for (let x = 0; x < columns; x++) {
                row.push(new Bubble())
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

    draw(ctx) {
        for (let y = 0; y < this.bubbles.length; y++) {
            for (let x = 0; x < this.bubbles[y].length; x++) {
                this.bubbles[y][x].drawOnGrid(ctx, x, y, this.bubbleSize())
            }
        }
    }
}
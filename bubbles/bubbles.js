import { Bubble } from './bubble.js'
import { TwoDimensionalDict } from '../tiles/world/tiles/dict2d.js' // todo: move to ../engine

export class Bubbles extends TwoDimensionalDict {
    constructor(canvas, columns, rows) {
        super()
        this.canvas = canvas
        this.columns = columns
        this.rows = rows // TODO: do we need this?
        // this.bubbles = []

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < columns; x++) {
                this.set(x, y, new Bubble())
            }
        }
    }

    bubbleSize() {
        const canvasWidth = this.canvas.width
        const canvasHeight = this.canvas.height
        return Math.min(
            (canvasWidth) / (this.columns + 0.5),
            (canvasHeight) / this.rows
        ) / 2
    }

    draw(ctx, cb) {
        const size = this.bubbleSize()
        this.iterate((x, y, bubble) => {
            let bounds = bubble.drawOnGrid(ctx, x, y, size)
            cb(x, y, bounds[0], bounds[1], bounds[2])
        })
    }
}
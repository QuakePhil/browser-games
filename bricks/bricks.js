export class Bricks {
    constructor(canvas, columns, rows) {
        this.canvas = canvas
        this.bricks = []

        for (let y = 0; y < rows; y++) {
            const value = y < 2 ? 7 : y < 4 ? 5 : y < 6 ? 3 : 1
            const row = Array(columns).fill(value)
            this.bricks.push(row)
        }
    }

    getBrickBounds(x, y, columns) {
        const canvasWidth = this.canvas.width
        const canvasHeight = this.canvas.height
        const padding = canvasWidth * 0.005
        const brickWidth = (canvasWidth * 0.8 - (columns - 1) * padding) / columns
        const brickHeight = canvasHeight * 0.025
        const offsetX = (canvasWidth - (brickWidth + padding) * columns + padding) / 2
        const offsetY = canvasHeight * 0.1

        const x1 = offsetX + x * (brickWidth + padding)
        const x2 = x1 + brickWidth
        const y1 = offsetY + y * (brickHeight + padding)
        const y2 = y1 + brickHeight

        return [x1, y1, x2, y2]
    }

    draw(ctx) {
        const colors = {
            7: [1, 0, 0, 1],   // red
            5: [1, 0.5, 0, 1], // orange
            3: [0, 1, 0, 1],   // green
            1: [1, 1, 0, 1],   // yellow
        }

        for (let y = 0; y < this.bricks.length; y++) {
            for (let x = 0; x < this.bricks[y].length; x++) {
                if (this.bricks[y][x] > 0) {
                    const bounds = this.getBrickBounds(x, y, this.bricks[0].length, this.bricks.length)
                    const color = colors[this.bricks[y][x]]
                    ctx.setFillColor(color)
                    ctx.fillRect(...bounds)
                }
            }
        }
    }
}
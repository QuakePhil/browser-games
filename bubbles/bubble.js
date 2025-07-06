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


let previousRandom = null
function nextRandom(max) {
    let n
    do {
        n = Math.floor(Math.random() * max)
    } while (n === previousRandom)

    previousRandom = n
    return n
}

export class Bubble {
    constructor() {
        this.color = nextRandom(6)

        this.x_speed = 0
        this.y_speed = 0
        this.x_travel = 0
        this.y_travel = 0
        this.x = 0
        this.y = 0
    }

    shoot(x_direction, y_direction, speed) {
        if (this.x_speed == 0 && this.y_speed == 0) {
            const magnitude = Math.sqrt(x_direction ** 2 + y_direction ** 2);
            this.x_speed = (x_direction / magnitude) * speed;
            this.y_speed = (y_direction / magnitude) * speed;
        }
    }

    spawnBubbleOnGrid(size) {
        let spawn = new Bubble()
        const coords = this.calculateGridPosition(size)
        return [coords[0], coords[1], spawn]
    }

    calculateGridPosition(size) {
        const verticalSlack = 0.88

        // Subtract the size offset to get top-left corner
        const x1 = this.x - size
        const y1 = this.y - size

        // Estimate raw y using inverse of vertical scaling
        let y = Math.round(y1 / (size * 2 * verticalSlack))

        // Determine if this is a staggered row (odd y) and calculate offset
        const offset = (y % 2) * size

        // Now recover x using that offset
        let x = Math.round((x1 - offset) / (size * 2))

        //console.log(this.x, this.y, Math.abs(x), Math.abs(y))
        return [x, y];
        //console.log(this.x, this.y)
    }

    getGridBounds(x, y, size) {
        const verticalSlack = 0.88 // Tighten up the rows
        const offset = (y % 2) * size
        const x1 = x * size * 2 + offset
        const y1 = y * size * 2 * verticalSlack
        return [x1 + size, y1 + size, size] // TODO: don't need to return size
    }

    draw(ctx, ...bounds) {
        const color = colors[this.color]
        ctx.setFillColor(color)
        this.x = bounds[0] + this.x_travel
        this.y = bounds[1] + this.y_travel
        ctx.fillCircle(this.x, this.y, bounds[2])

        this.x_travel += this.x_speed
        this.y_travel += this.y_speed
    }

    drawOnGrid(ctx, x, y, size) {
        const bounds = this.getGridBounds(x, y, size)
        this.draw(ctx, ...bounds)
        return bounds
    }
}

import { Layout } from './layout.js'

export class Primitives {
    constructor(render) {
        this.ctx = render.ctx
        this.canvas = render.ctx.canvas
        this.resize()
        this.colors = [
            this.getRandomColor(), this.getRandomColor(), this.getRandomColor(), this.getRandomColor(),
            this.getRandomColor(), this.getRandomColor(), this.getRandomColor(), this.getRandomColor(),
        ]
    }

    getRandomColor() {
        return [Math.random(), Math.random(), Math.random(), 1]
    }

    resize() {
        this.layout = new Layout(this.canvas, [
            [
                (x1, y1, x2, y2) => {
                    this.ctx.setColor(this.colors[0])
                    this.ctx.line(x1, y1, x2, y2)
                },
                (x1, y1, x2, y2, d1, d2) => {
                    this.ctx.setColor(this.colors[1])
                    this.ctx.dashLine(x1, y1, x2, y2, d1, d2)
                },
                (x, y, r) => {
                    this.ctx.setColor(this.colors[2])
                    this.ctx.circle(x, y, r)
                },
                (x, y, r) => {
                    this.ctx.setFillColor(this.colors[3])
                    this.ctx.fillCircle(x, y, r)
                }
            ], [
                (x1, y1, x2, y2) => {
                    this.ctx.setColor(this.colors[4])
                    this.ctx.rect(x1, y1, x2, y2)
                },
                (x1, y1, x2, y2) => {
                    this.ctx.setFillColor(this.colors[5])
                    this.ctx.fillRect(x1, y1, x2, y2)
                },
                (x1, y1, x2, y2, _ignore1, _ignore2) => {
                    this.ctx.setColor(this.colors[6])
                    this.ctx.triangle(x1, y1, x2, y2, x1, y2)
                },
                (x1, y1, x2, y2, _ignore1, _ignore2) => {
                    this.ctx.setFillColor(this.colors[7])
                    this.ctx.fillTriangle(x1, y1, x2, y2, x1, y2)
                }]
        ])
    }

    draw() {
        this.layout.draw()
    }
}

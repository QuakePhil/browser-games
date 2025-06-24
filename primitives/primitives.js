import { Layout } from './layout.js'

export class Primitives {
    constructor(render) {
        this.render = render
        this.layout = new Layout(render.canvas, [
            [
                (x1, y1, x2, y2) => {
                    this.render.ctx.setColor([0.9, 0.6, 0.1, 1])
                    this.render.ctx.line(x1, y1, x2, y2)
                },
                (x1, y1, x2, y2, d1, d2) => {
                    this.render.ctx.setColor([0.9, 0.6, 0.1, 1])
                    this.render.ctx.dashLine(x1, y1, x2, y2, d1, d2)
                },
                (x, y, r) => {
                    this.render.ctx.setColor([0.1, 0.6, 0.9, 1])
                    this.render.ctx.circle(x, y, r)
                }
            ], [
                (x1, y1, x2, y2) => {
                    this.render.ctx.setColor([0.6, 0.9, 0.1, 1])
                    this.render.ctx.rect(x1, y1, x2, y2)
                },
                (x1, y1, x2, y2) => {
                    this.render.ctx.setFillColor([0.6, 0.1, 0.9, 1])
                    this.render.ctx.fillRect(x1, y1, x2, y2)
                },
                (x1, y1, x2, y2, _ignore1, _ignore2) => {
                    this.render.ctx.setColor([0.2, 0.3, 0.9, 1])
                    this.render.ctx.triangle(x1, y1, x2, y2, x1, y2)
                }]
        ])
    }

    draw() {
        this.layout.draw()

        this.render.report.count_frames_and_report_every_nth()
    }
}

export const Shapes = Base => class extends Base {
    _drawBuffer(vertices, color, mode) {
        const gl = this.gl

        gl.useProgram(this.program)
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

        gl.enableVertexAttribArray(this.a_position)
        gl.vertexAttribPointer(this.a_position, 2, gl.FLOAT, false, 0, 0)

        gl.uniform2f(this.u_resolution, ...this.resolution)
        gl.uniform4f(this.u_color, ...color)

        gl.drawArrays(mode, 0, vertices.length / 2)
    }

    rect(x1, y1, x2, y2) {
        this._drawBuffer([x1, y1, x2, y1, x2, y2, x1, y2], this.color, this.gl.LINE_LOOP)
    }

    fillRect(x1, y1, x2, y2) {
        this._drawBuffer([x1, y1, x2, y1, x1, y2, x2, y2], this.color, this.gl.TRIANGLE_STRIP)
    }

    triangle(x1, y1, x2, y2, x3, y3, mode, color) {
        this._drawBuffer([x1, y1, x2, y2, x3, y3], this.color, this.gl.LINE_LOOP)
    }

    fillTriangle(x1, y1, x2, y2, x3, y3, mode, color) {
        this._drawBuffer([x1, y1, x2, y2, x3, y3], this.fillColor, this.gl.TRIANGLES)
    }

    line(x1, y1, x2, y2) {
        this._drawBuffer([x1, y1, x2, y2], this.color, this.gl.LINES)
    }

    dashLine(x1, y1, x2, y2, dashLength = 5, gapLength = 3) {
        const dx = x2 - x1
        const dy = y2 - y1
        const distance = Math.hypot(dx, dy)
        const unitX = dx / distance
        const unitY = dy / distance
        const pattern = dashLength + gapLength
        const count = Math.floor(distance / pattern)

        const vertices = []
        let cx = x1, cy = y1
        for (let i = 0; i < count; i++) {
            const ex = cx + unitX * dashLength
            const ey = cy + unitY * dashLength
            vertices.push(cx, cy, ex, ey)
            cx += unitX * pattern
            cy += unitY * pattern
        }

        this._drawBuffer(vertices, this.color, this.gl.LINES)
    }

    _circle(x, y, radius, segments, mode, color) {
        const needCenter = mode === this.gl.TRIANGLE_FAN
        const steps = needCenter ? segments + 1 : segments
        const vertices = needCenter ? [x, y] : []

        for (let i = 0; i < steps; i++) {
            const angle = (i / segments) * 2 * Math.PI
            vertices.push(x + radius * Math.cos(angle))
            vertices.push(y + radius * Math.sin(angle))
        }

        this._drawBuffer(vertices, color, mode)
    }

    circle(x, y, radius, segments = 64) {
        this._circle(x, y, radius, segments, this.gl.LINE_LOOP, this.color)
    }

    fillCircle(x, y, radius, segments = 32) {
        this._circle(x, y, radius, segments, this.gl.TRIANGLE_FAN, this.fillColor)
    }
}

export const Line = Base => class extends Base {
    _line(vertices, color) {
        const gl = this.gl

        gl.useProgram(this.program)
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

        gl.enableVertexAttribArray(this.a_position)
        gl.vertexAttribPointer(this.a_position, 2, gl.FLOAT, false, 0, 0)

        gl.uniform2f(this.u_resolution, ...this.resolution)
        gl.uniform4f(this.u_color, ...color)

        gl.drawArrays(gl.LINES, 0, vertices.length / 2)
    }

    line(x1, y1, x2, y2) {
        this._line([x1, y1, x2, y2], this.color)
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

        this._line(vertices, this.color)
    }
};

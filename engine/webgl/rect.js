export const Rect = Base => class extends Base {
    _vertices(x1, y1, x2, y2, mode) {
        return new Float32Array(
            mode === this.gl.TRIANGLE_STRIP
                ? [x1, y1, x2, y1, x1, y2, x2, y2]
                : [x1, y1, x2, y1, x2, y2, x1, y2]
        )
    }

    _rect(x1, y1, x2, y2, mode, color) {
        const gl = this.gl
        const vertices = this._vertices(x1, y1, x2, y2, mode)

        gl.useProgram(this.program)
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

        gl.enableVertexAttribArray(this.a_position)
        gl.vertexAttribPointer(this.a_position, 2, gl.FLOAT, false, 0, 0)

        gl.uniform2f(this.u_resolution, ...this.resolution)
        gl.uniform4f(this.u_color, ...color)

        gl.drawArrays(mode, 0, 4)
    }

    rect(x1, y1, x2, y2) {
        this._rect(x1, y1, x2, y2, this.gl.LINE_LOOP, this.color)
    }

    fillRect(x1, y1, x2, y2) {
        this._rect(x1, y1, x2, y2, this.gl.TRIANGLE_STRIP, this.fillColor)
    }
}
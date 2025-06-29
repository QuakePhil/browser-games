export const Triangle = Base => class extends Base {
    _triangle(x1, y1, x2, y2, x3, y3, mode, color) {
        const vertices = [x1, y1, x2, y2, x3, y3]

        const gl = this.gl
        gl.useProgram(this.program)
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

        gl.enableVertexAttribArray(this.a_position)
        gl.vertexAttribPointer(this.a_position, 2, gl.FLOAT, false, 0, 0)

        gl.uniform2f(this.u_resolution, ...this.resolution)
        gl.uniform4f(this.u_color, ...color)

        gl.drawArrays(mode, 0, 3)
    }

    triangle(x1, y1, x2, y2, x3, y3, mode, color) {
        this._triangle(x1, y1, x2, y2, x3, y3, this.gl.LINE_LOOP, this.color)
    }

    fillTriangle(x1, y1, x2, y2, x3, y3, mode, color) {
        this._triangle(x1, y1, x2, y2, x3, y3, this.gl.TRIANGLES, this.fillColor)
    }
}
import Vector from "./vector";

export default class Matrix {

    constructor(
        public readonly x: Vector = new Vector(1, 0),
        public readonly y: Vector = new Vector(0, 1),
        public readonly shift: Vector = new Vector(0, 0)) {
    }

    public scale(kx: number, ky: number): Matrix {
        const x = this.x.mul(kx);
        const y = this.y.mul(ky);
        return new Matrix(x, y, this.shift);
    }

    public translate(delta: Vector): Matrix {
        return new Matrix(this.x, this.y, this.shift.add(delta));
    }

    public rotateDeg(deg: number): Matrix {
        const angle = Math.PI * deg / 180;
        return this.rotate(angle);
    }

    public rotate(angle: number): Matrix {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const nx = this.x.mul(cos).add(this.y.mul(sin));
        const ny = this.y.mul(cos).sub(this.x.mul(sin));
        return new Matrix(nx, ny, this.shift);
    }

    public transform(vector: Vector): Vector {
        const dx = this.x.mul(vector.x);
        const dy = this.y.mul(vector.y);
        return dx.add(dy).add(this.shift);
    }

}

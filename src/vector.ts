export default class Vector {

    constructor(
        public readonly x: number,
        public readonly y: number
    ) {
    }

    public scale(kx: number, ky: number): Vector {
        return new Vector(this.x * kx, this.y * ky);
    }

    public add(other: Vector): Vector {
        return new Vector(this.x + other.x, this.y + other.y);
    }

    public addX(val: number): Vector {
        return new Vector(this.x + val, this.y);
    }

    public addY(val: number): Vector {
        return new Vector(this.x, this.y + val);
    }

    public subY(val: number): Vector {
        return new Vector(this.x, this.y - val);
    }

    public setX(val: number): Vector {
        return new Vector(val, this.y);
    }

    public setY(val: number): Vector {
        return new Vector(this.x, val);
    }

    public sub(other: Vector): Vector {
        return new Vector(this.x - other.x, this.y - other.y);
    }

    public mul(k: number): Vector {
        return new Vector(this.x * k, this.y * k);
    }

    public toString(): string {
        return `${this.x} ${this.y}`;
    }

}

export class QuadraticVector {

    constructor(
        public readonly control: Vector,
        public readonly end: Vector
    ) {
    }

    public scale(kx: number, ky: number): QuadraticVector {
        return new QuadraticVector(this.control.scale(kx, ky), this.end.scale(kx, ky));
    }

    public translate(delta: Vector): QuadraticVector {
        return new QuadraticVector(this.control.add(delta), this.end.add(delta));
    }

    public toString(): string {
        return `${this.control.toString()} ${this.end.toString()}`;
    }

}

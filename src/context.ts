import Vector, { QuadraticVector } from "./vector";

export default class SvgPathParseContext {

    private index: number = 0;

    constructor(
        private readonly content: string
    ) {
    }

    public get endOfFile(): boolean {
        return this.index >= this.content.length;
    }

    public readChar(): string {
        const res = this.content.charAt(this.index);
        this.index++;
        return res;
    }

    public readChatAssert(ch: string): string {
        const res = this.readChar();
        if (res !== ch) {
            throw new Error(`${ch} expected but ${res} found`);
        }
        return res;
    }

    public peekChar(): string {
        return this.content.charAt(this.index);
    }

    public isNumber(): boolean {
        const index = this.index;
        this.skipWhite();
        const ch = this.readChar();
        this.index = index;
        if (ch === "-") {
            return true;
        }
        if (ch === ".") {
            return true;
        }
        if (ch >= "0" && ch <= "9") {
            return true;
        }

        return false;
    }

    public skipWhite(): void {
        while (!this.endOfFile) {
            const ch = this.peekChar();
            switch (ch) {
                case " ":
                case ",":
                    this.readChar();
                    break;
                default:
                    return;
            }
        }
    }

    public readNumber(): number {
        this.skipWhite();
        const start = this.index;
        let hasSign = false;
        let hasDot = false;
        while (!this.endOfFile) {
            const ch = this.peekChar();
            if (!hasSign && ch === "-") {
                hasSign = true;
                this.readChar();
            } else if (!hasDot && ch === ".") {
                hasDot = true;
                this.readChar();
            } else if (ch >= "0" && ch <= "9") {
                this.readChar();
            } else {
                break;
            }
        }
        const str = this.content.substring(start, this.index);
        return parseFloat(str);
    }

    public readVector(): Vector {
        const x = this.readNumber();
        const y = this.readNumber();
        return new Vector(x, y);
    }

    public readQuadraticVector(): QuadraticVector {
        const control = this.readVector();
        const end = this.readVector();
        return new QuadraticVector(control, end);
    }

}

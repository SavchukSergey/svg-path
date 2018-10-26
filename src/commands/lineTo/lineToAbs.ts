import SvgPathParseContext from "../../context";
import EvaluationContext from "../../eval";
import Matrix from "../../matrix";
import Vector from "../../vector";
import SvgPathCommand from "../command";
import HorizontalToAbsoluteCommand from "./horizontalToAbs";
import VerticalToAbsoluteCommand from "./verticalToAbs";

export default class LineToAbsoluteCommand extends SvgPathCommand {

    public readonly points: Vector[] = [];

    public transform(matrix: Matrix, context: EvaluationContext): LineToAbsoluteCommand {
        const res = new LineToAbsoluteCommand();
        for (const point of this.points) {
            const oldEnd = point;
            const newEnd = matrix.transform(oldEnd);
            res.points.push(newEnd);
            context.position = oldEnd;
        }
        return res;
    }

    public optimize(context: EvaluationContext): SvgPathCommand {
        if (!this.points.length) {
            return this;
        }

        let sameX = false;
        let sameY = false;
        for (const point of this.points) {
            if (point.x !== context.position.x) {
                sameX = false;
            }
            if (point.y !== context.position.y) {
                sameY = false;
            }
        }

        if (sameX) {
            const res = new VerticalToAbsoluteCommand();
            for (const point of this.points) {
                res.points.push(point.y);
            }
            return res;
        } else if (sameY) {
            const res = new HorizontalToAbsoluteCommand();
            for (const point of this.points) {
                res.points.push(point.x);
            }
            return res;
        }
        return this;
    }

    public static parseFrom(context: SvgPathParseContext): LineToAbsoluteCommand {
        context.readChatAssert("L");
        const res = new LineToAbsoluteCommand();
        res.points.push(context.readVector());
        while (context.isNumber()) {
            res.points.push(context.readVector());
        }
        return res;
    }

    public toString(): string {
        let res = "L";
        for (let i = 0; i < this.points.length; i++) {
            const point = this.points[i];
            if (i) {
                res += " ";
            }
            res += point.toString();
        }
        return res;
    }

}

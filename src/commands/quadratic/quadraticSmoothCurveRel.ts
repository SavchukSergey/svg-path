import SvgPathParseContext from "../../context";
import EvaluationContext from "../../eval";
import Matrix from "../../matrix";
import Vector from "../../vector";
import SvgPathCommand from "../command";

export default class QuadraticSmoothCurveRelativeCommand extends SvgPathCommand {

    public readonly points: Vector[] = [];

    public transform(matrix: Matrix, context: EvaluationContext): QuadraticSmoothCurveRelativeCommand {
        const res = new QuadraticSmoothCurveRelativeCommand();
        for (const point of this.points) {
            const oldStart = context.position;
            const oldEnd = oldStart.add(point);
            const newStart = matrix.transform(oldStart);
            const newEnd = matrix.transform(oldEnd);
            const deltaEnd = newEnd.sub(newStart);
            res.points.push(deltaEnd);
            context.position = oldEnd;
        }
        return res;
    }

    public static parseFrom(context: SvgPathParseContext): QuadraticSmoothCurveRelativeCommand {
        context.readChatAssert("t");
        const res = new QuadraticSmoothCurveRelativeCommand();
        res.points.push(context.readVector());
        while (context.isNumber()) {
            res.points.push(context.readVector());
        }
        return res;
    }

    public toString(): string {
        let res = "t";
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

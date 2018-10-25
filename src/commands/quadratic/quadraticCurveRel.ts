import EvaluationContext from "../../eval";
import Matrix from "../../matrix";
import SvgPathParseContext from "../../parse-context";
import { QuadraticVector } from "../../vector";
import SvgPathCommand from "../command";

export default class QuadraticCurveRelativeCommand extends SvgPathCommand {

    public readonly points: QuadraticVector[] = [];

    public transform(matrix: Matrix, context: EvaluationContext): QuadraticCurveRelativeCommand {
        const res = new QuadraticCurveRelativeCommand();
        for (const point of this.points) {
            const oldStart = context.position;
            const oldControl = context.position.add(point.control);
            const oldEnd = oldStart.add(point.end);
            const newStart = matrix.transform(oldStart);
            const newControl = matrix.transform(oldControl);
            const newEnd = matrix.transform(oldEnd);
            const deltaControl = newControl.sub(newStart);
            const deltaEnd = newEnd.sub(newStart);
            res.points.push(new QuadraticVector(deltaControl, deltaEnd));
            context.position = oldEnd;
        }
        return res;
    }

    public static parseFrom(context: SvgPathParseContext): QuadraticCurveRelativeCommand {
        context.readChatAssert("q");
        const res = new QuadraticCurveRelativeCommand();
        res.points.push(context.readQuadraticVector());
        while (context.isNumber()) {
            res.points.push(context.readQuadraticVector());
        }
        return res;
    }

    public toString(): string {
        let res = "q";
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

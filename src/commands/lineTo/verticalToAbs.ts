import SvgPathParseContext from "../../context";
import EvaluationContext from "../../eval";
import Matrix from "../../matrix";
import SvgPathCommand from "../command";
import LineToAbsoluteCommand from "./lineToAbs";

export default class VerticalToAbsoluteCommand extends SvgPathCommand {

    public readonly points: number[] = [];

    public transform(matrix: Matrix, context: EvaluationContext): SvgPathCommand {
        const contextSnapshot = context.clone();
        const res = new LineToAbsoluteCommand();
        for (const point of this.points) {
            const oldStart = context.position;
            const oldEnd = oldStart.setY(point);
            const newEnd = matrix.transform(oldEnd);
            res.points.push(newEnd);
            context.position = oldEnd;
        }
        return res.optimize(contextSnapshot);
    }

    public static parseFrom(context: SvgPathParseContext): VerticalToAbsoluteCommand {
        context.readChatAssert("V");
        const res = new VerticalToAbsoluteCommand();
        res.points.push(context.readNumber());
        while (context.isNumber()) {
            res.points.push(context.readNumber());
        }
        return res;
    }

    public toString(): string {
        let res = "V";
        for (let i = 0; i < this.points.length; i++) {
            const y = this.points[i];
            if (i) {
                res += " ";
            }
            res += y;
        }
        return res;
    }

}

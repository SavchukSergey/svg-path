import EvaluationContext from "../../eval";
import Matrix from "../../matrix";
import SvgPathParseContext from "../../parse-context";
import SvgPathCommand from "../command";
import LineToAbsoluteCommand from "./lineToAbs";

export default class HorizontalToAbsoluteCommand extends SvgPathCommand {

    public readonly points: number[] = [];

    public transform(matrix: Matrix, context: EvaluationContext): SvgPathCommand {
        const contextSnapshot = context.clone();
        const res = new LineToAbsoluteCommand();
        for (const point of this.points) {
            const oldStart = context.position;
            const oldEnd = oldStart.setX(point);
            const newEnd = matrix.transform(oldEnd);
            res.points.push(newEnd);
            context.position = oldEnd;
        }
        return res.optimize(contextSnapshot);
    }

    public static parseFrom(context: SvgPathParseContext): HorizontalToAbsoluteCommand {
        context.readChatAssert("H");
        const res = new HorizontalToAbsoluteCommand();
        res.points.push(context.readNumber());
        while (context.isNumber()) {
            res.points.push(context.readNumber());
        }
        return res;
    }

    public toString(): string {
        let res = "H";
        for (let i = 0; i < this.points.length; i++) {
            const x = this.points[i];
            if (i) {
                res += " ";
            }
            res += x;
        }
        return res;
    }

}

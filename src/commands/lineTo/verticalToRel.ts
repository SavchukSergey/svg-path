import EvaluationContext from "../../eval";
import Matrix from "../../matrix";
import SvgPathParseContext from "../../parse-context";
import SvgPathCommand from "../command";
import LineToRelativeCommand from "./lineToRel";

export default class VerticalToRelativeCommand extends SvgPathCommand {

    public readonly dPoints: number[] = [];

    public transform(matrix: Matrix, context: EvaluationContext): SvgPathCommand {
        const contextSnapshot = context.clone();
        const res = new LineToRelativeCommand();
        for (const point of this.dPoints) {
            const oldStart = context.position;
            const oldEnd = oldStart.addY(point);
            const newStart = matrix.transform(oldStart);
            const newEnd = matrix.transform(oldEnd);
            const delta = newEnd.sub(newStart);
            res.dPoints.push(delta);
            context.position = oldEnd;
        }
        return res.optimize(contextSnapshot);
    }

    public static parseFrom(context: SvgPathParseContext): VerticalToRelativeCommand {
        context.readChatAssert("v");
        const res = new VerticalToRelativeCommand();
        res.dPoints.push(context.readNumber());
        while (context.isNumber()) {
            res.dPoints.push(context.readNumber());
        }
        return res;
    }

    public toString(): string {
        let res = "v";
        for (let i = 0; i < this.dPoints.length; i++) {
            const dy = this.dPoints[i];
            if (i) {
                res += " ";
            }
            res += dy;
        }
        return res;
    }

}

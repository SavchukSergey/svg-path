import SvgPathParseContext from "../../context";
import EvaluationContext from "../../eval";
import Matrix from "../../matrix";
import SvgPathCommand from "../command";
import LineToRelativeCommand from "./lineToRel";

export default class HorizontalToRelativeCommand extends SvgPathCommand {

    public readonly dPoints: number[] = [];

    public transform(matrix: Matrix, context: EvaluationContext): SvgPathCommand {
        const contextSnapshot = context.clone();
        const res = new LineToRelativeCommand();
        for (const point of this.dPoints) {
            const oldStart = context.position;
            const oldEnd = oldStart.addX(point);
            const newStart = matrix.transform(oldStart);
            const newEnd = matrix.transform(oldEnd);
            const delta = newEnd.sub(newStart);
            res.dPoints.push(delta);
            context.position = oldEnd;
        }
        return res.optimize(contextSnapshot);
    }

    public static parseFrom(context: SvgPathParseContext): HorizontalToRelativeCommand {
        context.readChatAssert("h");
        const res = new HorizontalToRelativeCommand();
        res.dPoints.push(context.readNumber());
        while (context.isNumber()) {
            res.dPoints.push(context.readNumber());
        }
        return res;
    }

    public toString(): string {
        let res = "h";
        for (let i = 0; i < this.dPoints.length; i++) {
            const dx = this.dPoints[i];
            if (i) {
                res += " ";
            }
            res += dx;
        }
        return res;
    }

}

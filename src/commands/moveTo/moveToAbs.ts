import SvgPathParseContext from "../../context";
import EvaluationContext from "../../eval";
import Matrix from "../../matrix";
import Vector from "../../vector";
import SvgPathCommand from "../command";

export default class MoveToAbsoluteCommand extends SvgPathCommand {

    public readonly points: Vector[] = [];

    public transform(matrix: Matrix, context: EvaluationContext): MoveToAbsoluteCommand {
        const res = new MoveToAbsoluteCommand();
        for (const point of this.points) {
            const oldEnd = point;
            const newEnd = matrix.transform(oldEnd);
            res.points.push(newEnd);
            context.position = oldEnd;
        }
        return res;
    }

    public static parseFrom(context: SvgPathParseContext): MoveToAbsoluteCommand {
        context.readChatAssert("M");
        const res = new MoveToAbsoluteCommand();
        res.points.push(context.readVector());
        while (context.isNumber()) {
            res.points.push(context.readVector());
        }
        return res;
    }

    public toString(): string {
        let res = "M";
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

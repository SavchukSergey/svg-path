import SvgPathParseContext from "../../context";
import EvaluationContext from "../../eval";
import Matrix from "../../matrix";
import Vector from "../../vector";
import SvgPathCommand from "./../command";

export default class MoveToRelativeCommand extends SvgPathCommand {

    public readonly points: Vector[] = [];

    public transform(matrix: Matrix, context: EvaluationContext): MoveToRelativeCommand {
        const res = new MoveToRelativeCommand();
        for (const point of this.points) {
            const oldStart = context.position;
            const oldEnd = oldStart.add(point);
            const newStart = matrix.transform(oldStart);
            const newEnd = matrix.transform(oldEnd);
            const delta = newEnd.sub(newStart);
            res.points.push(delta);
            context.position = oldEnd;
        }
        return res;
    }

    public static parseFrom(context: SvgPathParseContext): MoveToRelativeCommand {
        context.readChatAssert("m");
        const res = new MoveToRelativeCommand();
        res.points.push(context.readVector());
        while (context.isNumber()) {
            res.points.push(context.readVector());
        }
        return res;
    }

    public toString(): string {
        let res = "m";
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

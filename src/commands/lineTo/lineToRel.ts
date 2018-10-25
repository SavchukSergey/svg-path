import EvaluationContext from "../../eval";
import Matrix from "../../matrix";
import SvgPathParseContext from "../../parse-context";
import Vector from "../../vector";
import SvgPathCommand from "./../command";
import HorizontalToRelativeCommand from "./horizontalToRel";
import VerticalToRelativeCommand from "./verticalToRel";

export default class LineToRelativeCommand extends SvgPathCommand {

    public readonly dPoints: Vector[] = [];

    public transform(matrix: Matrix, context: EvaluationContext): LineToRelativeCommand {
        const res = new LineToRelativeCommand();
        for (const point of this.dPoints) {
            const oldStart = context.position;
            const oldEnd = oldStart.add(point);
            const newStart = matrix.transform(oldStart);
            const newEnd = matrix.transform(oldEnd);
            const delta = newEnd.sub(newStart);
            res.dPoints.push(delta);
            context.position = oldEnd;
        }
        return res;
    }

    public optimize(context: EvaluationContext): SvgPathCommand {
        if (!this.dPoints.length) {
            return this;
        }

        let sameX = false;
        let sameY = false;
        for (const point of this.dPoints) {
            if (!point.x) {
                sameX = false;
            }
            if (!point.y) {
                sameY = false;
            }
        }

        if (sameX) {
            const res = new VerticalToRelativeCommand();
            for (const point of this.dPoints) {
                res.dPoints.push(point.y);
            }
            return res;
        } else if (sameY) {
            const res = new HorizontalToRelativeCommand();
            for (const point of this.dPoints) {
                res.dPoints.push(point.x);
            }
            return res;
        }
        return this;
    }

    public static parseFrom(context: SvgPathParseContext): LineToRelativeCommand {
        context.readChatAssert("l");
        const res = new LineToRelativeCommand();
        res.dPoints.push(context.readVector());
        while (context.isNumber()) {
            res.dPoints.push(context.readVector());
        }
        return res;
    }

    public toString(): string {
        let res = "l";
        for (let i = 0; i < this.dPoints.length; i++) {
            const point = this.dPoints[i];
            if (i) {
                res += " ";
            }
            res += point.toString();
        }
        return res;
    }

}

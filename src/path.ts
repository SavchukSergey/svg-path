import CloseAbsoluteCommand from "./commands/close/closeAbs";
import CloseRelativeCommand from "./commands/close/closeRel";
import SvgPathCommand from "./commands/command";
import HorizontalToAbsoluteCommand from "./commands/lineTo/horizontalToAbs";
import HorizontalToRelativeCommand from "./commands/lineTo/horizontalToRel";
import LineToAbsoluteCommand from "./commands/lineTo/lineToAbs";
import LineToRelativeCommand from "./commands/lineTo/lineToRel";
import VerticalToAbsoluteCommand from "./commands/lineTo/verticalToAbs";
import VerticalToRelativeCommand from "./commands/lineTo/verticalToRel";
import MoveToAbsoluteCommand from "./commands/moveTo/moveToAbs";
import MoveToRelativeCommand from "./commands/moveTo/moveToRel";
import QuadraticCurveRelativeCommand from "./commands/quadratic/quadraticCurveRel";
import QuadraticSmoothCurveRelativeCommand from "./commands/quadratic/quadraticSmoothCurveRel";
import EvaluationContext from "./eval";
import Matrix from "./matrix";
import SvgPathParseContext from "./parse-context";
import Vector from "./vector";

export default class SvgPath {

    public commands: SvgPathCommand[] = [];

    public scale(kx: number, ky: number): SvgPath {
        return this.transform(new Matrix().scale(kx, ky));
    }

    public translate(delta: Vector): SvgPath {
        return this.transform(new Matrix().translate(delta));
    }

    public transform(matrix: Matrix): SvgPath {
        const context = new EvaluationContext();
        const res = new SvgPath();
        for (const command of this.commands) {
            res.commands.push(command.transform(matrix, context));
        }
        return res;
    }

    public toString(): string {
        let res = "";
        for (const command of this.commands) {
            res += command.toString();
        }
        return res;
    }

    public static parse(commands: string): SvgPath {
        const res = new SvgPath();
        const context = new SvgPathParseContext(commands);
        while (!context.endOfFile) {
            context.skipWhite();
            const ch = context.peekChar();
            switch (ch) {
                case "M":
                    res.commands.push(MoveToAbsoluteCommand.parseFrom(context));
                    break;
                case "m":
                    res.commands.push(MoveToRelativeCommand.parseFrom(context));
                    break;
                case "H":
                    res.commands.push(HorizontalToAbsoluteCommand.parseFrom(context));
                    break;
                case "h":
                    res.commands.push(HorizontalToRelativeCommand.parseFrom(context));
                    break;
                case "V":
                    res.commands.push(VerticalToAbsoluteCommand.parseFrom(context));
                    break;
                case "v":
                    res.commands.push(VerticalToRelativeCommand.parseFrom(context));
                    break;
                case "L":
                    res.commands.push(LineToAbsoluteCommand.parseFrom(context));
                    break;
                case "l":
                    res.commands.push(LineToRelativeCommand.parseFrom(context));
                    break;
                case "q":
                    res.commands.push(QuadraticCurveRelativeCommand.parseFrom(context));
                    break;
                case "t":
                    res.commands.push(QuadraticSmoothCurveRelativeCommand.parseFrom(context));
                    break;
                case "Z":
                    res.commands.push(CloseAbsoluteCommand.parseFrom(context));
                    break;
                case "z":
                    res.commands.push(CloseRelativeCommand.parseFrom(context));
                    break;
                default:
                    throw new Error(`unknown command ${ch}`);
            }
        }
        return res;
    }

}

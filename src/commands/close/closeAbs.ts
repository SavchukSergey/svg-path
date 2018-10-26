import SvgPathParseContext from "../../context";
import EvaluationContext from "../../eval";
import Matrix from "../../matrix";
import SvgPathCommand from "../command";

export default class CloseAbsoluteCommand extends SvgPathCommand {

    public transform(matrix: Matrix, context: EvaluationContext): CloseAbsoluteCommand {
        return new CloseAbsoluteCommand();
    }

    public static parseFrom(context: SvgPathParseContext): CloseAbsoluteCommand {
        context.readChatAssert("Z");
        return new CloseAbsoluteCommand();
    }

    public toString(): string {
        return "Z";
    }

}

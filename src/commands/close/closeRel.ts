import SvgPathParseContext from "../../context";
import EvaluationContext from "../../eval";
import Matrix from "../../matrix";
import SvgPathCommand from "../command";

export default class CloseRelativeCommand extends SvgPathCommand {

    public transform(matrix: Matrix, context: EvaluationContext): CloseRelativeCommand {
        return new CloseRelativeCommand();
    }

    public static parseFrom(context: SvgPathParseContext): CloseRelativeCommand {
        context.readChatAssert("z");
        return new CloseRelativeCommand();
    }

    public toString(): string {
        return "z";
    }

}

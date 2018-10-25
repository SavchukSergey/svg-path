import EvaluationContext from "../eval";
import Matrix from "../matrix";

export default abstract class SvgPathCommand {

    public abstract transform(matrix: Matrix, context: EvaluationContext): SvgPathCommand;

}

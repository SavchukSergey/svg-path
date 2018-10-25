import Vector from "./vector";

export default class EvaluationContext {

    public clone(): EvaluationContext {
        const res = new EvaluationContext();
        res.position = this.position;
        return res;
    }

    public position: Vector = new Vector(0, 0);

}

import Matrix from "./matrix";
import SvgPath from "./path";
import Vector from "./vector";

const path = SvgPath.parse("M1152 1493v-190q0 -14 -9 -23.5t-22 -9.5h-192q-13 0 -23 10t-10 23v190q0 13 10 23t23 10h192q13 0 22 -9.5t9 -23.5z");
const path2 = path.transform(new Matrix().rotateDeg(30).translate(new Vector(300, -300)));
// let path2 = path.translate(new Vector(100, 0));
console.log(path2.toString());

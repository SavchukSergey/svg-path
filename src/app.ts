import SvgPath, { Matrix, Vector } from "./path";

const sourceArea = document.getElementById("source") as HTMLTextAreaElement;
const targetArea = document.getElementById("target") as HTMLTextAreaElement;
const sourcePath = document.getElementById("sourcePath") as HTMLElement;
const targetPath = document.getElementById("targetPath") as HTMLElement;

const mxx = document.getElementById("mxx") as HTMLInputElement;
const mxy = document.getElementById("mxy") as HTMLInputElement;
const myx = document.getElementById("myx") as HTMLInputElement;
const myy = document.getElementById("myy") as HTMLInputElement;
const mx = document.getElementById("mx") as HTMLInputElement;
const my = document.getElementById("my") as HTMLInputElement;

let matrix = new Matrix().rotateDeg(30).translate(new Vector(300, -300));

function refreshModel() {
    matrix = new Matrix(
        new Vector(mxx.valueAsNumber || 0, mxy.valueAsNumber || 0),
        new Vector(myx.valueAsNumber || 0, myy.valueAsNumber || 0),
        new Vector(mx.valueAsNumber || 0, my.valueAsNumber || 0),
    );
    const sourcePathValue = SvgPath.parse(sourceArea.value);
    const targetPathValue = sourcePathValue.transform(matrix);
    targetArea.value = targetPathValue.toString();

    sourcePath.setAttribute("d", sourcePathValue.toString());
    targetPath.setAttribute("d", targetPathValue.toString());
}

function refreshUI() {
    mxx.value = matrix.x.x.toString();
    mxy.value = matrix.x.y.toString();
    myx.value = matrix.y.x.toString();
    myy.value = matrix.y.y.toString();
    mx.value = matrix.shift.x.toString();
    my.value = matrix.shift.y.toString();
}

sourceArea.textContent = "M1152 1493v-190q0 -14 -9 -23.5t-22 -9.5h-192q-13 0 -23 10t-10 23v190q0 13 10 23t23 10h192q13 0 22 -9.5t9 -23.5z";

refreshUI();
refreshModel();

sourceArea.addEventListener("input", () => refreshModel());
mxx.addEventListener("input", () => refreshModel());
mxy.addEventListener("input", () => refreshModel());
myx.addEventListener("input", () => refreshModel());
myy.addEventListener("input", () => refreshModel());
mx.addEventListener("input", () => refreshModel());
my.addEventListener("input", () => refreshModel());

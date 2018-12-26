import { IDeref } from "@thi.ng/api/api";
import { EPS } from "@thi.ng/math/api";
import { IVector, Vec } from "@thi.ng/vectors3/api";
import { eqDelta4 } from "@thi.ng/vectors3/eqdelta";
import { declareIndices } from "@thi.ng/vectors3/internal/accessors";
import { AVec } from "@thi.ng/vectors3/internal/avec";
import { values } from "@thi.ng/vectors3/internal/vec-utils";
import { Color, ColorMode, IColor } from "./api";
import { ensureArgs } from "./internal/ctor-args";

export function rgba(rgba: Color): RGBA
export function rgba(r: number, g: number, b: number, a?: number): RGBA;
export function rgba(...args: any[]) {
    return new RGBA(ensureArgs(args));
}

export class RGBA extends AVec implements
    IColor,
    IDeref<Color>,
    IVector<RGBA> {

    r: number;
    g: number;
    b: number;
    a: number;
    [id: number]: number;

    constructor(buf?: Vec, offset = 0, stride = 1) {
        super(buf || [0, 0, 0, 0], offset, stride);
    }

    [Symbol.iterator]() {
        return values(this.buf, 4, this.offset, this.stride);
    }

    get mode() {
        return ColorMode.RGBA;
    }

    get length() {
        return 4;
    }

    copy() {
        return new RGBA(this.deref());
    }

    copyView() {
        return new RGBA(this.buf, this.offset, this.stride);
    }

    deref(): Color {
        return [this[0], this[1], this[2], this[3]];
    }

    empty() {
        return new RGBA();
    }

    eqDelta(o: RGBA, eps = EPS): boolean {
        return eqDelta4(this, o, eps);
    }
}

declareIndices(RGBA.prototype, ["r", "g", "b", "a"]);

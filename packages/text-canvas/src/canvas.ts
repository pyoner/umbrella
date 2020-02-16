import { NumOrString } from "@thi.ng/api";
import { peek } from "@thi.ng/arrays";
import { clamp } from "@thi.ng/math";
import {
    ClipRect,
    NONE,
    STROKE_STYLES,
    StrokeStyle
} from "./api";
import { charCode, intersectRect } from "./utils";

export class Canvas {
    buf: Uint32Array;
    width: number;
    height: number;
    format: number;
    defaultFormat: number;
    styles: StrokeStyle[];
    clipRects: ClipRect[];

    constructor(
        width: number,
        height: number,
        format = NONE,
        style = STROKE_STYLES.ascii
    ) {
        this.width = width;
        this.height = height;
        this.buf = new Uint32Array(width * height).fill(0x20);
        this.format = this.defaultFormat = format;
        this.styles = [style];
        this.clipRects = [
            { x1: 0, y1: 0, x2: width, y2: height, w: width, h: height }
        ];
    }
}

export const beginClip = (
    canvas: Canvas,
    x: number,
    y: number,
    w: number,
    h: number
) => {
    x |= 0;
    y |= 0;
    w |= 0;
    h |= 0;
    const { width, height } = canvas;
    const x2 = clamp(x + w, 0, width);
    const y2 = clamp(y + h, 0, height);
    const x1 = clamp(x, 0, width);
    const y1 = clamp(y, 0, height);
    canvas.clipRects.push(
        intersectRect(
            { x1, y1, x2, y2, w: x2 - x1, h: y2 - y1 },
            peek(canvas.clipRects)
        )
    );
};

const pop = (stack: any[]) => stack.length > 1 && stack.pop();

export const endClip = (canvas: Canvas) => pop(canvas.clipRects);

export const beginStyle = (canvas: Canvas, style: StrokeStyle) => {
    canvas.styles.push(style);
};

export const endStyle = (canvas: Canvas) => pop(canvas.styles);

export const setAt = (
    canvas: Canvas,
    x: number,
    y: number,
    code: NumOrString,
    format = canvas.format
) => {
    x |= 0;
    y |= 0;
    const { x1, y1, x2, y2 } = peek(canvas.clipRects);
    if (x < x1 || y < y1 || x >= x2 || y >= y2) return;
    canvas.buf[x + y * canvas.width] = charCode(code, format);
};

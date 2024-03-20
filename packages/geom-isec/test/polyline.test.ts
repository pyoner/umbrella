import { IntersectionType } from "@thi.ng/geom-api";
import { expect, test } from "bun:test";
import {
	intersectLinePolylineAll,
	intersectRayPolylineAll,
} from "../src/index.js";

const pts = [
	[0, 0],
	[100, 0],
	[100, 50],
	[0, 100],
];

test("ray (x)", () => {
	expect(intersectRayPolylineAll([-50, 25], [1, 0], pts, false)).toEqual({
		type: IntersectionType.INTERSECT,
		isec: [[100, 25]],
		alpha: 150,
		beta: 150,
	});
	expect(intersectRayPolylineAll([-50, 25], [1, 0], pts, true)).toEqual({
		type: IntersectionType.INTERSECT,
		isec: [
			[0, 25],
			[100, 25],
		],
		alpha: 50,
		beta: 150,
	});
});

test("ray (y)", () => {
	expect(intersectRayPolylineAll([50, -50], [0, 1], pts, false)).toEqual({
		type: IntersectionType.INTERSECT,
		isec: [
			[50, 0],
			[50, 75],
		],
		alpha: 50,
		beta: 125,
	});
	expect(intersectRayPolylineAll([50, -50], [0, 1], pts, true)).toEqual({
		type: IntersectionType.INTERSECT,
		isec: [
			[50, 0],
			[50, 75],
		],
		alpha: 50,
		beta: 125,
	});
});

test("line (x)", () => {
	expect(intersectLinePolylineAll([-50, 25], [50, 25], pts, false)).toEqual({
		type: IntersectionType.NONE,
	});
	expect(intersectLinePolylineAll([-50, 25], [110, 25], pts, false)).toEqual({
		type: IntersectionType.INTERSECT,
		isec: [[100, 25]],
		alpha: 150,
		beta: 150,
	});
	expect(intersectLinePolylineAll([-50, 25], [50, 25], pts, true)).toEqual({
		type: IntersectionType.INTERSECT,
		isec: [[0, 25]],
		alpha: 50,
		beta: 50,
	});
	expect(intersectLinePolylineAll([-50, 25], [110, 25], pts, true)).toEqual({
		type: IntersectionType.INTERSECT,
		isec: [
			[0, 25],
			[100, 25],
		],
		alpha: 50,
		beta: 150,
	});
});

test("line (y)", () => {
	expect(intersectLinePolylineAll([50, -25], [50, -20], pts, false)).toEqual({
		type: IntersectionType.NONE,
	});
	expect(intersectLinePolylineAll([50, -25], [50, 50], pts, false)).toEqual({
		type: IntersectionType.INTERSECT,
		isec: [[50, 0]],
		alpha: 25,
		beta: 25,
	});
	expect(intersectLinePolylineAll([50, -25], [50, 100], pts, false)).toEqual({
		type: IntersectionType.INTERSECT,
		isec: [
			[50, 0],
			[50, 75],
		],
		alpha: 25,
		beta: 100,
	});
});

test("ray minD/maxD", () => {
	const I = Infinity;
	expect(intersectRayPolylineAll([50, 25], [1, 0], pts, true, -I, I)).toEqual(
		{
			type: IntersectionType.INTERSECT,
			isec: [
				[0, 25],
				[100, 25],
			],
			alpha: -50,
			beta: 50,
		}
	);
	expect(intersectRayPolylineAll([-50, 25], [1, 0], pts, true, 60)).toEqual({
		type: IntersectionType.INTERSECT,
		isec: [[100, 25]],
		alpha: 150,
		beta: 150,
	});
	expect(intersectRayPolylineAll([50, 25], [1, 0], pts, true, 0, 10)).toEqual(
		{
			type: IntersectionType.NONE,
		}
	);
});

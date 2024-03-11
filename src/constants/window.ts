import type { ScreenDimension } from "excalibur";

export const WINDOW_DIMENSIONS = {
	width: 1280,
	height: 720
} as const satisfies ScreenDimension;
export const WINDOW_RESOLUTION = {
	width: 432,
	height: 243
} as const satisfies ScreenDimension;

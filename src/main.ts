import { Engine, type ScreenDimension } from "excalibur";
import { loader } from "./resources";
import { Paddle } from "./actors/paddle";

const WINDOW_DIMENSIONS = {
	width: 1280,
	height: 720
} as const satisfies ScreenDimension

const WINDOW_RESOLUTION = {
	width: 432,
	height: 243
} as const satisfies ScreenDimension

class Game extends Engine {
	constructor() {
		super({
			// set the viewport dimensions
			viewport: WINDOW_DIMENSIONS,
			// set the resolution
			resolution: WINDOW_RESOLUTION,
			// no more blurriness or filtering, important of a nice crisp, 2D look
			antialiasing: false
		});
	}
	initialize() {
		const player1 = new Paddle(10, 30, 5, 20)
		const player2 = new Paddle(WINDOW_RESOLUTION.width - 10, WINDOW_RESOLUTION.height - 30, 5, 20)
		this.add(player1)
		this.add(player2)

		this.start(loader);
	}
}

export const game = new Game();
game.initialize();

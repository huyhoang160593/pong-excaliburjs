import { Actor, Color, type Engine, Rectangle, Vector } from "excalibur";
import { WINDOW_RESOLUTION } from "../constants/window.constant";
import type { Paddle } from "./paddle.actor";
import { gameState } from "../globals/game_state.global";
import { GAME_STATE } from "../constants/state.constant";

export class Ball extends Actor {
	public dx = 0;
	public dy = 0;

	constructor(x: number, y: number, width: number, height: number) {
		super({
			x,
			y,
			width,
			height,
			anchor: Vector.Zero,
		});
	}

	onInitialize(_engine: Engine): void {
		this.graphics.add(
			new Rectangle({
				width: this.width,
				height: this.height,
				color: Color.Red,
				smoothing: false,
			}),
		);
	}

	reset() {
		this.pos.x = WINDOW_RESOLUTION.width / 2 - 2;
		this.pos.y = WINDOW_RESOLUTION.height / 2 - 2;
		this.dx = 0;
		this.dy = 0;
	}

	update(engine: Engine, delta: number): void {
		super.update(engine, delta);
		if (gameState !== GAME_STATE.PLAY) {
			return;
		}
		this.pos.x += this.dx * (delta / 1000);
		this.pos.y += this.dy * (delta / 1000);
	}

	collides(paddle: Paddle) {
		// first, check to see if the left edge of either is farther to the right
		// than the right edge of the other
		if (
			this.pos.x > paddle.pos.x + paddle.width ||
			paddle.pos.x > this.pos.x + this.width
		) {
			return false;
		}
		// then check to see if the bottom edge of either is higher than the top
		// edge of the other
		if (
			this.pos.y > paddle.pos.y + paddle.height ||
			paddle.pos.y > this.pos.y + this.height
		) {
			return false;
		}
		// if the above aren't true, they're overlapping
		return true;
	}
}

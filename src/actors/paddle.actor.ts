import { Actor, Color, type Engine, Rectangle, Vector } from "excalibur";
import { WINDOW_RESOLUTION } from "../constants/window.constant";

export class Paddle extends Actor {
	public dy = 0;
	public score = 0;

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
				color: Color.White,
			}),
		);
	}

	update(engine: Engine, delta: number): void {
		super.update(engine, delta);

		// Move the paddle when there is dy present
		if (this.dy < 0) {
			this.pos.y = Math.max(0, this.pos.y + this.dy * (delta / 1000));
		} else {
			this.pos.y = Math.min(
				WINDOW_RESOLUTION.height - this.height,
				this.pos.y + this.dy * (delta / 1000),
			);
		}
	}
}

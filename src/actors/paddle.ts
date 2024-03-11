import { Actor, Color, type Engine, Rectangle } from "excalibur";

export class Paddle extends Actor {
	public dy = 0;
	constructor(x: number, y: number, width: number, height: number) {
		super({
			x,
			y,
			width,
			height,
		});
	}

	onInitialize(_engine: Engine<never>): void {
		this.graphics.add(
			new Rectangle({
				width: this.width,
				height: this.height,
				color: Color.White,
        smoothing: false
			}),
		);
	}
}

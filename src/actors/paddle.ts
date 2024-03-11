import { Actor, Color, type Engine, Rectangle, Keys } from "excalibur";
import { WINDOW_RESOLUTION } from "../constants/window";
import { PADDLE_SPEED } from "../constants/paddle_speed";

export class Paddle extends Actor {
	public dy = 0;
  public score = 0;

	constructor(x: number, y: number, width: number, height: number) {
		super({
			x,
			y,
			width,
			height,
		});
	}

	onInitialize(_engine: Engine): void {
		this.graphics.add(
			new Rectangle({
				width: this.width,
				height: this.height,
				color: Color.White,
        smoothing: false
			}),
		);
	}

  update(engine: Engine, delta: number): void {
    // Move the paddle when there is dy present
    if (this.dy < 0) {
      this.pos.y = Math.max(0+ this.height/2, this.pos.y + this.dy * delta);
    } else {
      this.pos.y = Math.min(WINDOW_RESOLUTION.height - this.height/2, this.pos.y + this.dy * delta);
    }

    // moving the paddle by keyboard
    if (engine.input.keyboard.isHeld(Keys.W)) {
      this.dy = -PADDLE_SPEED
    } else if (engine.input.keyboard.isHeld(Keys.S)) {
      this.dy = PADDLE_SPEED
    } else {
      this.dy = 0
    }
  }
}

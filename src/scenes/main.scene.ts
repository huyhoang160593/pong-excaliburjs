import { type Engine, Scene, Keys } from "excalibur";
import { Paddle } from "../actors/paddle.actor";
import { WINDOW_RESOLUTION } from "../constants/window.constant";
import { PADDLE_SPEED } from "../constants/paddle_speed.constant";
import { Ball } from "../actors/ball.actor";
import { GAME_STATE } from "../constants/state.constant";
import { gameState, setGameState } from "../globals/game_state.global";
import { getRandomArbitrary } from "../utils/random.utls";

export class MainGameScene extends Scene {
	public player1: Paddle = new Paddle(10, 30, 5, 20);
	public player2: Paddle = new Paddle(
		WINDOW_RESOLUTION.width - 10,
		WINDOW_RESOLUTION.height - 30,
		5,
		20,
	);

	public ball: Ball = new Ball(
		WINDOW_RESOLUTION.width / 2 - 2,
		WINDOW_RESOLUTION.height / 2 - 2,
		4,
		4,
	);

	servingPlayer = 1; // ether 1 or 2; whoever scored get to serve the following turn
	winningPayer = 0;

	onInitialize(_engine: Engine): void {
		this.add(this.player1);
		this.add(this.player2);
		this.add(this.ball);
		this.engine.input.keyboard.on("release", (evt) => {
			if (evt.key === Keys.Enter) {
				if (gameState === GAME_STATE.START) {
					setGameState(GAME_STATE.SERVE);
				} else if (gameState === GAME_STATE.SERVE) {
					setGameState(GAME_STATE.PLAY);
				} else if (gameState === GAME_STATE.DONE) {
					setGameState(GAME_STATE.SERVE);
					this.player1.score = 0;
					this.player2.score = 0;

					if (this.winningPayer === 1) {
						this.servingPlayer = 2;
					} else {
						this.servingPlayer = 1;
					}
				}
			}
		});
	}

	update(engine: Engine, delta: number): void {
		super.update(engine, delta);
		switch (gameState) {
			case GAME_STATE.SERVE: {
				// before switching to play, initialize the ball velocity based on player who last scored
				this.ball.dy = getRandomArbitrary(-50, 50);
				if (this.servingPlayer === 1) {
					this.ball.dx = getRandomArbitrary(140, 200);
				} else {
					this.ball.dx = -getRandomArbitrary(140, 200);
				}
				break;
			}
			case GAME_STATE.PLAY:
				{
					if (this.ball.collides(this.player1)) {
						this.ball.dx = -this.ball.dx * 1.03;
						this.ball.pos.x = this.player1.pos.x + 5;

						if (this.ball.dy < 0) {
							this.ball.dy = -getRandomArbitrary(10, 150);
						} else {
							this.ball.dy = getRandomArbitrary(10, 150);
						}
					}
				}
				if (this.ball.collides(this.player2)) {
					this.ball.dx = -this.ball.dx * 1.03;
					this.ball.pos.x = this.player2.pos.x - 4;

					if (this.ball.dy < 0) {
						this.ball.dy = -getRandomArbitrary(10, 150);
					} else {
						this.ball.dy = getRandomArbitrary(10, 150);
					}
				}

				if (this.ball.pos.y <= 0) {
					this.ball.pos.y = 0;
					this.ball.dy = -this.ball.dy;
				}

				if (this.ball.pos.y >= WINDOW_RESOLUTION.height - 4) {
					this.ball.pos.y = WINDOW_RESOLUTION.height - 4;
					this.ball.dy = -this.ball.dy;
				}

				if (this.ball.pos.x < 0) {
					this.servingPlayer = 1;
					this.player2.score += 1;

					if (this.player2.score === 10) {
						this.winningPayer = 2;
						setGameState(GAME_STATE.DONE);
					} else {
						setGameState(GAME_STATE.SERVE);
						this.ball.reset();
					}
				}

				if (this.ball.pos.x > WINDOW_RESOLUTION.width) {
					this.servingPlayer = 2;
					this.player1.score += 1;

					if (this.player1.score === 10) {
						this.winningPayer = 1;
						setGameState(GAME_STATE.DONE);
					} else {
						setGameState(GAME_STATE.SERVE);
						this.ball.reset();
					}
				}
		}

		// paddles can move no matter what state we're in
		// Player 1 moving
		if (engine.input.keyboard.isHeld(Keys.W)) {
			this.player1.dy = -PADDLE_SPEED;
		} else if (engine.input.keyboard.isHeld(Keys.S)) {
			this.player1.dy = PADDLE_SPEED;
		} else {
			this.player1.dy = 0;
		}

		// Player 2 moving
		if (engine.input.keyboard.isHeld(Keys.Up)) {
			this.player2.dy = -PADDLE_SPEED;
		} else if (engine.input.keyboard.isHeld(Keys.Down)) {
			this.player2.dy = PADDLE_SPEED;
		} else {
			this.player2.dy = 0;
		}
	}
}

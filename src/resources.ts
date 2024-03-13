import { FontSource, ImageSource, Loader, Sound } from "excalibur";
import sword from "./assets/images/sword.png";
import pixelFont from "./assets/fonts/font.ttf";
import paddleHit from "./assets/sounds/paddle_hit.wav";
import score from "./assets/sounds/score.wav";
import wallHit from "./assets/sounds/wall_hit.wav";

export const Resources = {
	Sword: new ImageSource(sword),
	PixelFont: new FontSource(pixelFont, "PixelFont"),
	PaddleHitSound: new Sound(paddleHit),
	ScoreSound: new Sound(score),
	WallHitSound: new Sound(wallHit),
} as const;

export const loader = new Loader();
for (const res of Object.values(Resources)) {
	loader.addResource(res);
}

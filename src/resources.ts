import { FontSource, ImageSource, Loader } from "excalibur";
import sword from "./assets/images/sword.png";
import pixelFont from "./assets/fonts/font.ttf";

export const Resources = {
	Sword: new ImageSource(sword),
	PixelFont: new FontSource(pixelFont, "PixelFont"),
} as const;

export const loader = new Loader();
for (const res of Object.values(Resources)) {
	loader.addResource(res);
}

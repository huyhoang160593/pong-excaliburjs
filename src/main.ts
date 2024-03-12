import { Engine } from "excalibur";
import { loader } from "./resources";
import {
	WINDOW_DIMENSIONS,
	WINDOW_RESOLUTION,
} from "./constants/window.constant";
import { MainGameScene } from "./scenes/main.scene";
import { SceneName } from "./constants/scene_name.constant";

class Game extends Engine {
	constructor() {
		super({
			// set the viewport dimensions
			viewport: WINDOW_DIMENSIONS,
			// set the resolution
			resolution: WINDOW_RESOLUTION,
			// no more blurriness or filtering, important of a nice crisp, 2D look
			antialiasing: false,
		});
	}
	initialize() {
		const mainGameScene = new MainGameScene();

		this.add(SceneName.MAIN, mainGameScene);

		this.start(loader).then(() => {
			this.goToScene(SceneName.MAIN);
		});
	}
}

export const game = new Game();

game.initialize();

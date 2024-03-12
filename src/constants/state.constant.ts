export const GAME_STATE = {
	START: "start",
	SERVE: "serve",
	PLAY: "play",
	DONE: "done",
} as const;

export type GameState = (typeof GAME_STATE)[keyof typeof GAME_STATE];

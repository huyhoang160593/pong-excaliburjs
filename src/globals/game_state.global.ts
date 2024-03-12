import { type GameState, GAME_STATE } from "../constants/state.constant";

export let gameState: GameState = GAME_STATE.START;

export function setGameState(newState: GameState) {
	gameState = newState;
}

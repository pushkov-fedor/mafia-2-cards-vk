import { GameStatus } from "../constants";

export default (game) => game && game.gameStatus === GameStatus.Finished;

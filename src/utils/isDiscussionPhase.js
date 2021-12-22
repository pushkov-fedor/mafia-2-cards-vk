import { GamePhase, GameStatus } from "../constants";

export default (game) =>
  game &&
  game.gameStatus === GameStatus.Started &&
  game.gamePhase === GamePhase.Discussion;

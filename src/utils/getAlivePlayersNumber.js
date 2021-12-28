import { HealthStatus } from "../constants";

export default (game) =>
  game.players.filter((player) => player.status === HealthStatus.Alive).length;

import { HealthStatus } from "../constants";

export default (game, playerId) =>
  game.players.filter(
    (player) => player.id !== playerId && player.status !== HealthStatus.Dead
  );

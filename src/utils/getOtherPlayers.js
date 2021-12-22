export default (game, playerId) =>
  game.players.filter((player) => player.id !== playerId);

export default (game, playerId) =>
  game.players.find((player) => player.id === playerId);

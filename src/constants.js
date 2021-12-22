export const BaseUrl = "http://localhost:3000/api";

export const GameStatus = {
  Created: 0,
  Started: 1,
  Finished: 2,
};

export const GamePhase = {
  MafiaTurn: 0,
  PoliceTurn: 1,
  Discussion: 2,
  CivilsTurn: 3,
  BeforeNight: 4,
};

export const CardType = {
  Mafia: 0,
  Police: 1,
  Civil: 2,
};

export const HealthStatus = {
  Alive: 0,
  Injured: 1,
  Dead: 2,
};

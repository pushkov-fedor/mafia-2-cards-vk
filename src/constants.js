export const BaseUrl = "http://localhost:3000/api";

export const GameStatus = {
  Created: 0,
  Started: 1,
  Finished: 2,
};

export const GamePhase = {
  MafiaTurn: 0,
  PoliceTurn: 1,
  CardRevealAfterNight: 2,
  CivilsTurn: 3,
  CardRevealAfterCourt: 4,
  BeforeNight: 5,
};

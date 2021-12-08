import axios from "axios";
import { BaseUrl } from "./constants";

export const GameApi = {
  createGame: (
    creatorName,
    playersNumber,
    mafiaNumber,
    policeNumber,
    cardsPerPlayer = 0
  ) =>
    axios.post(`${BaseUrl}/game2/create`, {
      creatorName,
      mafiaNumber,
      policeNumber,
      playersNumber,
      cardsPerPlayer,
    }),
  joinGame: (playerName, gameId) =>
    axios.post(`${BaseUrl}/game2/join`, {
      playerName,
      gameId,
    }),
  getGame: (gameId) => axios.get(`${BaseUrl}/game2/get/${gameId}`),
  starGame: (gameId) =>
    axios.post(`${BaseUrl}/game2/start`, {
      gameId,
    }),
};

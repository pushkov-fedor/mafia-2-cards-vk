import axios from "axios";
import { BaseUrl } from "./constants";

export const GameApi = {
  createGame: (creatorName, civilsNumber, mafiaNumber, hasPolice) =>
    axios.post(`${BaseUrl}/game2/create`, {
      creatorName,
      civilsNumber,
      mafiaNumber,
      hasPolice,
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
  startNight: (gameId, playerName) =>
    axios.post(`${BaseUrl}/game2/startNight`, {
      gameId,
      playerName,
    }),
  mafiaKill: (gameId, playerName, playerVoteValue) =>
    axios.post(`${BaseUrl}/game2/mafiaKill`, {
      gameId,
      playerName,
      playerVoteValue,
    }),
};

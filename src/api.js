import axios from "axios";
import { BaseUrl } from "./constants";

export const GameApi = {
  createGame: (
    creatorName,
    playerPhotoUrl,
    civilsNumber,
    mafiaNumber,
    hasPolice
  ) =>
    axios.post(`${BaseUrl}/game2/create`, {
      creatorName,
      playerPhotoUrl,
      civilsNumber,
      mafiaNumber,
      hasPolice,
    }),
  joinGame: (playerName, playerPhotoUrl, gameId) =>
    axios.post(`${BaseUrl}/game2/join`, {
      playerName,
      playerPhotoUrl,
      gameId,
    }),
  getGame: (gameId) => axios.get(`${BaseUrl}/game2/get/${gameId}`),
  starGame: (gameId) =>
    axios.post(`${BaseUrl}/game2/start`, {
      gameId,
    }),
  startNight: (gameId, playerId) =>
    axios.post(`${BaseUrl}/game2/startNight`, {
      gameId,
      playerId,
    }),
  mafiaKill: (gameId, playerId, playerVoteValue) =>
    axios.post(`${BaseUrl}/game2/mafiaKill`, {
      gameId,
      playerId,
      playerVoteValue,
    }),
  endNight: (gameId) =>
    axios.post(`${BaseUrl}/game2/endNight`, {
      gameId,
    }),
  startTrial: (gameId, playerId) =>
    axios.post(`${BaseUrl}/game2/startTrial`, {
      gameId,
      playerId,
    }),
  civilsKill: (gameId, playerId, playerVoteValue) =>
    axios.post(`${BaseUrl}/game2/civilsKill`, {
      gameId,
      playerId,
      playerVoteValue,
    }),
};

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
};

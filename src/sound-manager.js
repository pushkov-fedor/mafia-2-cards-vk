import { Howl, Howler } from "howler";
import playersSleep from "./assets/playersSleep.mp3";
import playersWakeUp from "./assets/playersWakeUp.mp3";
import mafiaSleep from "./assets/mafiaSleep.mp3";
import mafiaWakeUp from "./assets/mafiaWakeUp.mp3";
import policeSleep from "./assets/policeSleep.mp3";
import policeWakeUp from "./assets/policeWakeUp.mp3";

export const soundManager = {
  playersSleep: new Howl({
    src: [playersSleep],
  }),
  playersWakeUp: new Howl({
    src: [playersWakeUp],
  }),
  mafiaSleep: new Howl({
    src: [mafiaSleep],
  }),
  mafiaWakeUp: new Howl({
    src: [mafiaWakeUp],
  }),
  policeSleep: new Howl({
    src: [policeSleep],
  }),
  policeWakeUp: new Howl({
    src: [policeWakeUp],
  }),
};

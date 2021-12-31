import React, { useEffect, useState } from "react";
import { AppRoot, View, Panel, Root } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import "./App.css";
import bridge from "@vkontakte/vk-bridge";
import { mainPanels } from "./routes";
import MainHomePage from "./pages/Home.page";
import MainCreateGamePage from "./pages/CreateGame.page";
import MainJoinGamePage from "./pages/JoinGame.page";
import MainWaitGamePage from "./pages/WaitGame.page";
import MainGamePage from "./pages/Game.page";
import { GameApi } from "./api";
import { GameAudioPhase } from "./constants";
import MafiaPage from "./pages/Mafia.page";
import PolicePage from "./pages/Police.page";
import CivilsPage from "./pages/Civils.page";
import isBeforeNightPhase from "./utils/isBeforeNightPhase";
import isMafiaTurnPhase from "./utils/isMafiaTurnPhase";
import isPoliceTurnPhase from "./utils/isPoliceTurnPhase";
import isCivilsTurnPhase from "./utils/isCivilsTurnPhase";
import isDiscussionPhase from "./utils/isDiscussionPhase";
import isGameFinished from "./utils/isGameFinished";
import getPlayerById from "./utils/getPlayerById";
import { soundManager } from "./sound-manager";
import IntroPage from "./pages/Intro.page";

const App = () => {
  // game models
  const [game, setGame] = useState(null);
  const [playerId, setPlayerId] = useState(null);
  const [playerPhotoUrl, setPlayerPhotoUrl] = useState(null);
  const [gameAudioPhase, setGameAudioPhase] = useState(null);
  // ui state
  const [activeView, setActiveView] = useState("main");
  const [activePanel, setActivePanel] = useState(mainPanels.home);
  const [intervalId, setIntervalId] = useState(null);
  // methods
  const subscribeToGame = (gameId) => {
    const intervalId = setInterval(() => {
      GameApi.getGame(gameId).then((responsee) => {
        setGame(responsee.data);
        setGameAudioPhase(responsee.data.gameAudioPhase);
      });
    }, 2000);
    setIntervalId(intervalId);
  };
  const submitHasSeenIntro = () =>
    bridge.send("VKWebAppStorageSet", {
      key: "hasSeenIntro",
      value: "1",
    });

  // effects
  useEffect(() => {
    if (isGameFinished(game)) {
      setActivePanel(mainPanels.game);
      clearInterval(intervalId);
      setIntervalId(null);
    }
    if (isBeforeNightPhase(game) || isDiscussionPhase(game)) {
      setActivePanel(mainPanels.game);
    }
    if (isMafiaTurnPhase(game)) {
      setActivePanel(mainPanels.mafia);
    }
    if (isPoliceTurnPhase(game)) {
      setActivePanel(mainPanels.police);
    }
    if (isCivilsTurnPhase(game)) {
      setActivePanel(mainPanels.civils);
    }
  }, [game]);
  useEffect(() => {
    if (game) {
      const player = getPlayerById(game, playerId);
      if (
        player.isHost &&
        (gameAudioPhase !== null || gameAudioPhase !== undefined)
      ) {
        switch (gameAudioPhase) {
          case GameAudioPhase.MafiaSleep:
            soundManager.mafiaSleep.play();
            break;
          case GameAudioPhase.MafiaWakeUp:
            soundManager.mafiaWakeUp.play();
            break;
          case GameAudioPhase.PlayersSleep:
            soundManager.playersSleep.play();
            break;
          case GameAudioPhase.PlayersWakeUp:
            soundManager.playersWakeUp.play();
            break;
          case GameAudioPhase.PoliceSleep:
            soundManager.policeSleep.play();
            break;
          case GameAudioPhase.PoliceWakeUp:
            soundManager.policeWakeUp.play();
            break;
          default:
        }
      }
    }
  }, [gameAudioPhase]);
  useEffect(() => {
    GameApi.wakeup();
    bridge.send("VKWebAppGetUserInfo").then((res) => {
      setPlayerPhotoUrl(res.photo_200);
    });
    bridge
      .send("VKWebAppStorageGet", { keys: ["hasSeenIntro"] })
      .then(({ keys }) => {
        const hasSeenIntro = keys[0].value;
        if (!hasSeenIntro) {
          setActivePanel(mainPanels.intro);
        }
      });
  }, []);
  useEffect(() => {
    if (activePanel === mainPanels.home && intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  }, [activePanel]);

  return (
    <AppRoot>
      <Root activeView={activeView}>
        <View activePanel={activePanel} id="main">
          <Panel centered id={mainPanels.intro}>
            <IntroPage
              setActivePanel={setActivePanel}
              panelHeaderMessage="Добро пожаловать!"
              submitHasSeenIntro={submitHasSeenIntro}
            />
          </Panel>
          <Panel centered id={mainPanels.home} className="home-panel">
            <MainHomePage
              setActivePanel={setActivePanel}
              panelHeaderMessage="Мафия"
            />
          </Panel>
          <Panel id={mainPanels.createGame} className="create-game-panel">
            <MainCreateGamePage
              setActivePanel={setActivePanel}
              setGame={setGame}
              setPlayerId={setPlayerId}
              subscribeToGame={subscribeToGame}
              panelHeaderMessage="Создать игру"
              playerPhotoUrl={playerPhotoUrl}
            />
          </Panel>
          <Panel id={mainPanels.joinGame}>
            <MainJoinGamePage
              setActivePanel={setActivePanel}
              setGame={setGame}
              setPlayerId={setPlayerId}
              subscribeToGame={subscribeToGame}
              panelHeaderMessage="Присоединиться к игре"
              playerPhotoUrl={playerPhotoUrl}
            />
          </Panel>
          <Panel id={mainPanels.waitGame}>
            <MainWaitGamePage
              setActivePanel={setActivePanel}
              panelHeaderMessage="Ждем всех игроков"
              game={game}
              playerId={playerId}
            />
          </Panel>
          <Panel id={mainPanels.game}>
            <MainGamePage
              setActivePanel={setActivePanel}
              panelHeaderMessage="Игра"
              game={game}
              playerId={playerId}
            />
          </Panel>
          <Panel id={mainPanels.mafia}>
            <MafiaPage
              setActivePanel={setActivePanel}
              panelHeaderMessage="Ночь: ход Мафии"
              game={game}
              playerId={playerId}
            />
          </Panel>
          <Panel id={mainPanels.police}>
            <PolicePage
              setActivePanel={setActivePanel}
              panelHeaderMessage="Ночь: ход Комиссара"
              game={game}
              playerId={playerId}
            />
          </Panel>
          <Panel id={mainPanels.civils}>
            <CivilsPage
              setActivePanel={setActivePanel}
              panelHeaderMessage="Суд"
              game={game}
              playerId={playerId}
            />
          </Panel>
        </View>
      </Root>
    </AppRoot>
  );
};
export default App;

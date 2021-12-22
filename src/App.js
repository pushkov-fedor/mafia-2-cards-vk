import React, { useEffect, useState } from "react";
import {
  useAdaptivity,
  AppRoot,
  SplitLayout,
  SplitCol,
  ViewWidth,
  View,
  Panel,
  PanelHeader,
  Header,
  Group,
  SimpleCell,
  Root,
  Button,
  Div,
  Cell,
  PanelHeaderBack,
  Avatar,
  Search,
  Spinner,
  FormLayout,
  FormItem,
  Input,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import "./App.css";
import { mainPanels } from "./routes";
import MainHomePage from "./pages/MainHome.page";
import MainCreateGamePage from "./pages/MainCreateGame.page";
import MainJoinGamePage from "./pages/MainJoinGame.page";
import MainWaitGamePage from "./pages/MainWaitGame.page";
import MainGamePage from "./pages/MainGame.page";
import { GameApi } from "./api";
import { GamePhase, GameStatus } from "./constants";
import MafiaPage from "./pages/Mafia.page";
import PolicePage from "./pages/Police.page";
import CivilsPage from "./pages/Civils.page";
import isBeforeNightPhase from "./utils/isBeforeNightPhase";
import isMafiaTurnPhase from "./utils/isMafiaTurnPhase";
import isPoliceTurnPhase from "./utils/isPoliceTurnPhase";
import isCivilsTurnPhase from "./utils/isCivilsTurnPhase";
import isDiscussionPhase from "./utils/isDiscussionPhase";
import isGameFinished from "./utils/isGameFinished";

const App = () => {
  // game models
  const [game, setGame] = useState(null);
  const [playerId, setPlayerId] = useState(null);

  // ui state
  const [activeView, setActiveView] = useState("main");
  const [activePanel, setActivePanel] = useState(mainPanels.home);
  const [intervalId, setIntervalId] = useState(null);
  // methods
  const subscribeToGame = (gameId) => {
    const intervalId = setInterval(() => {
      GameApi.getGame(gameId).then((responsee) => {
        setGame(responsee.data);
      });
    }, 2000);
    setIntervalId(intervalId);
  };
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

  return (
    <AppRoot>
      <Root activeView={activeView}>
        <View activePanel={activePanel} id="main">
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
            />
          </Panel>
          <Panel id={mainPanels.joinGame}>
            <MainJoinGamePage
              setActivePanel={setActivePanel}
              setGame={setGame}
              setPlayerId={setPlayerId}
              subscribeToGame={subscribeToGame}
              panelHeaderMessage="Присоединиться к игре"
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

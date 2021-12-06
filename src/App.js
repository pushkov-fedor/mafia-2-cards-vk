import React, { useState } from "react";
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

const App = () => {
  const [activeView, setActiveView] = useState("main");
  const [activePanel, setActivePanel] = useState(mainPanels.waitGame);
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
              panelHeaderMessage="Создать игру"
            />
          </Panel>
          <Panel id={mainPanels.joinGame}>
            <MainJoinGamePage
              setActivePanel={setActivePanel}
              panelHeaderMessage="Присоединиться к игре"
            />
          </Panel>
          <Panel id={mainPanels.waitGame}>
            <MainWaitGamePage
              setActivePanel={setActivePanel}
              panelHeaderMessage="Ждем всех игроков"
            />
          </Panel>
        </View>
      </Root>
    </AppRoot>
  );
};
export default App;

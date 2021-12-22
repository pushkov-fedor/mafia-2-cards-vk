import {
  Icon24Cancel,
  Icon24Done,
  Icon24Hide,
  Icon24HideOutline,
} from "@vkontakte/icons";
import {
  ANDROID,
  Avatar,
  Button,
  Caption,
  Cell,
  Div,
  Group,
  Header,
  IOS,
  ModalPage,
  ModalPageHeader,
  ModalRoot,
  PanelHeader,
  PanelHeaderBack,
  PanelHeaderButton,
  ScreenSpinner,
  SimpleCell,
  Snackbar,
  SplitCol,
  SplitLayout,
  Separator,
  Switch,
  Title,
  usePlatform,
  VKCOM,
} from "@vkontakte/vkui";
import React, { useEffect, useState } from "react";
import { GameApi } from "../api";
import GameFeedComponent from "../components/GameFeed.component";
import MyCardComponent from "../components/MyCard.component";
import { CardType, GamePhase, HealthStatus } from "../constants";
import { mainPanels } from "../routes";
import getCardNameByType from "../utils/getCardNameByType";
import getPlayerById from "../utils/getPlayerById";
import "./MainGame.page.css";

const Modals = {
  MafiaTurn: "MafiaTurn",
};

export default function MainGamePage({
  setActivePanel,
  panelHeaderMessage,
  game,
  playerId,
}) {
  // game models
  const [player, setPlayer] = useState(getPlayerById(game, playerId));
  // ui state
  // methods
  const onStartNight = () => {
    GameApi.startNight(game.id, player.name);
  };
  // const onStartTrial = () => {
  //   GameApi.
  // }
  // effects
  useEffect(() => {
    setPlayer(getPlayerById(game, playerId));
  }, [game]);
  return (
    <>
      <PanelHeader
        left={
          <PanelHeaderBack onClick={() => setActivePanel(mainPanels.home)} />
        }
      >
        {panelHeaderMessage}
      </PanelHeader>
      <SplitLayout>
        <SplitCol>
          <MyCardComponent player={player} />
          <Separator style={{ margin: "12px 0" }} />
          <Div>
            {game.gamePhase === GamePhase.BeforeNight && (
              <Button size="l" stretched onClick={onStartNight}>
                Начать ночь
              </Button>
            )}
            {game.gamePhase === GamePhase.CivilsTurn && (
              <Button size="l" stretched onClick={onStartNight}>
                Начать суд
              </Button>
            )}
          </Div>
          <GameFeedComponent actions={game.actions} />
        </SplitCol>
      </SplitLayout>
    </>
  );
}

import {
  Icon24Cancel,
  Icon24Done,
  Icon24Hide,
  Icon24HideOutline,
  Icon56CupMusicNoteOutline,
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
  ModalCard,
} from "@vkontakte/vkui";
import React, { useEffect, useState } from "react";
import { GameApi } from "../api";
import GameFeedComponent from "../components/GameFeed.component";
import MyCardComponent from "../components/MyCard.component";
import { CardType, GamePhase, HealthStatus, GameResult } from "../constants";
import { mainPanels } from "../routes";
import getAlivePlayersNumber from "../utils/getAlivePlayersNumber";
import getCardNameByType from "../utils/getCardNameByType";
import getPlayerById from "../utils/getPlayerById";
import getVotedPlayersNumber from "../utils/getVotedPlayersNumber";
import isAlive from "../utils/isAlive";
import isGameFinished from "../utils/isGameFinished";
import "./MainGame.page.css";

const GameModals = {
  MafiaWins: "MafiaWins",
  CivilWins: "CivilWins",
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
  const [activeModal, setActiveModal] = useState(null);
  // methods
  const onStartNight = () => {
    GameApi.startNight(game.id, player.name);
  };
  const onStartTrial = () => {
    GameApi.startTrial(game.id, playerId);
  };
  const onFinishedGame = () => {
    setActiveModal(null);
    setActivePanel(mainPanels.home);
  };
  // modal
  const modal = (
    <ModalRoot activeModal={activeModal}>
      <ModalCard
        id={GameModals.MafiaWins}
        header="Результат"
        subheader="Победила мафия"
        icon={<Icon56CupMusicNoteOutline />}
        onClose={onFinishedGame}
        actions={
          <Button size="l" mode="primary" onClick={onFinishedGame}>
            Завершить игру
          </Button>
        }
      />
      <ModalCard
        id={GameModals.CivilWins}
        header="Результат"
        subheader="Победили мирные жители"
        icon={<Icon56CupMusicNoteOutline />}
        onClose={onFinishedGame}
        actions={
          <Button size="l" mode="primary" onClick={onFinishedGame}>
            Завершить игру
          </Button>
        }
      />
    </ModalRoot>
  );
  // effects
  useEffect(() => {
    setPlayer(getPlayerById(game, playerId));
    if (isGameFinished(game) && game.result === GameResult.CivilWins) {
      setActiveModal(GameModals.CivilWins);
    }
    if (isGameFinished(game) && game.result === GameResult.MafiaWins) {
      setActiveModal(GameModals.MafiaWins);
    }
  }, [game]);
  useEffect(() => {
    console.log(game);
    console.log(GameResult);
    if (isGameFinished(game) && game.result === GameResult.CivilWins) {
      setActiveModal(GameModals.CivilWins);
    }
    if (isGameFinished(game) && game.result === GameResult.MafiaWins) {
      setActiveModal(GameModals.MafiaWins);
    }
    console.log(activeModal);
  }, [game.result]);
  return (
    <>
      <PanelHeader
        left={
          <PanelHeaderBack onClick={() => setActivePanel(mainPanels.home)} />
        }
      >
        {panelHeaderMessage}
      </PanelHeader>
      <SplitLayout modal={modal}>
        <SplitCol>
          <MyCardComponent player={player} />
          <Separator style={{ margin: "12px 0" }} />
          <Div>
            {game.gamePhase === GamePhase.BeforeNight && (
              <Button
                size="l"
                stretched
                onClick={onStartNight}
                disabled={!isAlive(player)}
              >
                {getVotedPlayersNumber(game) === 0
                  ? "Начать ночь"
                  : `Начать ночь (голосов ${getVotedPlayersNumber(
                      game
                    )} из ${getAlivePlayersNumber(game)})`}
              </Button>
            )}
            {game.gamePhase === GamePhase.Discussion && (
              <Button
                size="l"
                stretched
                onClick={onStartTrial}
                disabled={!isAlive(player)}
              >
                {getVotedPlayersNumber(game) === 0
                  ? "Начать суд"
                  : `Начать суд (голосов ${getVotedPlayersNumber(
                      game
                    )} из ${getAlivePlayersNumber(game)})`}
              </Button>
            )}
          </Div>
          <GameFeedComponent actions={game.actions} />
        </SplitCol>
      </SplitLayout>
    </>
  );
}

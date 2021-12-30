import { Icon56CupMusicNoteOutline } from "@vkontakte/icons";
import {
  Button,
  Div,
  ModalRoot,
  PanelHeader,
  PanelHeaderBack,
  SplitCol,
  SplitLayout,
  Separator,
  ModalCard,
} from "@vkontakte/vkui";
import React, { useEffect, useState } from "react";
import { GameApi } from "../api";
import ErrorSnackbar from "../components/ErrorSnackbar";
import GameFeedComponent from "../components/GameFeed.component";
import MyCardComponent from "../components/MyCard.component";
import { GamePhase, GameResult } from "../constants";
import { mainPanels } from "../routes";
import getAlivePlayersNumber from "../utils/getAlivePlayersNumber";
import getPlayerById from "../utils/getPlayerById";
import getVotedPlayersNumber from "../utils/getVotedPlayersNumber";
import isAlive from "../utils/isAlive";
import isGameFinished from "../utils/isGameFinished";
import "./Game.page.css";

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
  const [hasVoted, setHasVoted] = useState(false);
  const [snackbarError, setSnackbarError] = useState(null);
  // methods
  const onStartNight = () => {
    setHasVoted(true);
    GameApi.startNight(game.id, player.name).catch((e) => {
      const errorMessage = e.response.data.message;
      setSnackbarError(errorMessage);
    });
  };
  const onStartTrial = () => {
    setHasVoted(true);
    GameApi.startTrial(game.id, playerId).catch((e) => {
      const errorMessage = e.response.data.message;
      setSnackbarError(errorMessage);
    });
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
  }, [game]);
  useEffect(() => {
    if (isGameFinished(game) && game.result === GameResult.CivilWins) {
      setActiveModal(GameModals.CivilWins);
    }
    if (isGameFinished(game) && game.result === GameResult.MafiaWins) {
      setActiveModal(GameModals.MafiaWins);
    }
  }, [game.result]);
  useEffect(() => {
    setHasVoted(false);
  }, [game.gamePhase]);
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
                disabled={!isAlive(player) || hasVoted}
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
                disabled={!isAlive(player) || hasVoted}
              >
                {getVotedPlayersNumber(game) === 0
                  ? "Начать суд"
                  : `Начать суд (голосов ${getVotedPlayersNumber(
                      game
                    )} из ${getAlivePlayersNumber(game)})`}
              </Button>
            )}
          </Div>
          {isAlive(player) && hasVoted && (
            <Div>Ваш голос учтен, ждем остальных игроков</Div>
          )}
          <GameFeedComponent actions={game.actions} />
        </SplitCol>
      </SplitLayout>
      {snackbarError && (
        <ErrorSnackbar
          errorMessage={snackbarError}
          closeSnackbar={() => setSnackbarError(null)}
        />
      )}
    </>
  );
}

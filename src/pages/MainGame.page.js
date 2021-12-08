import { Icon24Cancel, Icon24Done } from "@vkontakte/icons";
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
  Switch,
  Title,
  usePlatform,
  VKCOM,
} from "@vkontakte/vkui";
import React, { useEffect, useState } from "react";
import { GameApi } from "../api";
import { CardType, GamePhase, HealthStatus } from "../constants";
import { mainPanels } from "../routes";
import "./MainGame.page.css";

const Modals = {
  MafiaTurn: "MafiaTurn",
};

const getCardName = (cardType) => {
  switch (cardType) {
    case CardType.Mafia:
      return "Мафия";
    case CardType.Police:
      return "Комиссар";
    case CardType.Civil:
    default:
      return "Мирный";
  }
};

const hasAliveMafia = (player) =>
  player.cards.some(
    (card) => card.type === CardType.Mafia && card.status !== HealthStatus.Dead
  );

const hasAlivePolice = (player) =>
  player.cards.some(
    (card) => card.type === CardType.Police && card.status !== HealthStatus.Dead
  );

const getAlivePlayers = (players) =>
  players.filter((player) => player.status !== HealthStatus.Dead);

const getPlayersExcludeByName = (players, playerName) =>
  players.filter((player) => player.name !== playerName);

const getCheckedPlayer = (players) => players.find((player) => player.checked);

export default function MainGamePage({
  setActivePanel,
  panelHeaderMessage,
  game,
  playerId,
}) {
  const [activeModal, setActiveModal] = useState(null);
  const [snackbar, setSnackbar] = useState(null);
  const [showCards, setShowCards] = useState(true);
  const [players, setPlayers] = useState(
    game.players.map((player) => ({ ...player, checked: false }))
  );
  const [hasVoted, setHasVoted] = useState(false);
  const [spinner, setSpinner] = useState(null);

  const player = game.players.find((player) => player.id === playerId);
  useEffect(() => {
    switch (game.gamePhase) {
      case GamePhase.MafiaTurn:
        if (hasAliveMafia(player)) {
          setActiveModal(Modals.MafiaTurn);
        } else {
          setSpinner(<ScreenSpinner />);
        }
        break;
      default:
    }
  }, [game.gamePhase]);

  const onStartNight = () => {
    GameApi.startNight(game.id, player.name).then(() => {
      setHasVoted(true);
    });
  };

  const onCheck = (index, value) => {
    const oldValue = players[index].checked;
    const newPlayers = players.map((player) => ({ ...player, checked: false }));
    if (!oldValue) {
      newPlayers[index].checked = value;
    }
    setPlayers(newPlayers);
  };
  const isSomeoneChecked = () => players.some((player) => player.checked);

  const onModalClose = () => {
    setSnackbar(
      <Snackbar duration="2000" onClose={() => setSnackbar(null)}>
        Необходимо выбрать, кого убить
      </Snackbar>
    );
  };
  const onKill = () => {
    const checkedPlayer = getCheckedPlayer(players);
    GameApi.mafiaKill(game.id, player.name, checkedPlayer.name).then(
      (response) => {
        console.log(response);
        setActiveModal(null);
      }
    );
  };

  const modal = (
    <ModalRoot activeModal={activeModal}>
      <ModalPage id={Modals.MafiaTurn} onClose={() => onModalClose()}>
        <Group>
          <Div>
            <Title level="2" weight="bold">
              Кого убить?
            </Title>
          </Div>
        </Group>
        <Group>
          {getPlayersExcludeByName(getAlivePlayers(players), player.name).map(
            (player, index) => (
              <Cell
                key={player.name}
                mode="selectable"
                checked={player.checked}
                before={<Avatar />}
                onChange={(e) => {
                  onCheck(index, e.currentTarget.checked);
                }}
              >
                {player.name}
              </Cell>
            )
          )}
        </Group>
        <Group>
          <Div>
            <Button
              mode="commerce"
              size="l"
              stretched
              disabled={!isSomeoneChecked()}
              onClick={() => onKill()}
            >
              Убить
            </Button>
          </Div>
        </Group>
      </ModalPage>
    </ModalRoot>
  );
  console.log(game);
  return (
    <>
      <PanelHeader
        left={
          <PanelHeaderBack onClick={() => setActivePanel(mainPanels.home)} />
        }
      >
        {panelHeaderMessage}
      </PanelHeader>
      <SplitLayout modal={modal} popout={spinner}>
        <SplitCol>
          <Group>
            <Div>
              {player.cards.map((card) => (
                <Title
                  level="1"
                  weight="bold"
                  className="game-panel__card-type"
                  key={card.id}
                >
                  {showCards ? getCardName(card.type) : "Скрыты"}
                </Title>
              ))}
            </Div>
          </Group>
          <Group>
            <Header mode="secondary">Настройки</Header>
            <SimpleCell
              disabled
              after={
                <Switch
                  defaultChecked
                  value={showCards}
                  onChange={(e) => {
                    setShowCards(e.currentTarget.checked);
                  }}
                />
              }
            >
              Показывать карты
            </SimpleCell>
          </Group>
          <Div className="game-panel-action-btn-container">
            <Button
              size="l"
              stretched
              onClick={() => onStartNight()}
              disabled={hasVoted}
            >
              {game.votingPull.length === 0
                ? "Начать ночь"
                : `Начать ночь (${game.votingPull.length})`}
            </Button>
          </Div>
          {snackbar}
        </SplitCol>
      </SplitLayout>
    </>
  );
}

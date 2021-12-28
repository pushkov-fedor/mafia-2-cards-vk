import React, { useEffect } from "react";
import {
  Avatar,
  Button,
  Cell,
  Div,
  Group,
  Header,
  PanelHeader,
  PanelHeaderBack,
  Separator,
  SimpleCell,
  Title,
} from "@vkontakte/vkui";
import { Howl, Howler } from "howler";
import { mainPanels } from "../routes";
import "./MainWaitGame.page.css";
import { GameApi } from "../api";

export default function MainWaitGamePage({
  setActivePanel,
  panelHeaderMessage,
  game,
  playerId,
}) {
  // game models
  const player = game.players.find((player) => player.id === playerId);
  // methods
  const onStartGame = () => {
    GameApi.starGame(game.id).then((response) => {
      setActivePanel(mainPanels.game);
    });
  };
  return (
    <>
      <PanelHeader
        left={
          <PanelHeaderBack onClick={() => setActivePanel(mainPanels.home)} />
        }
      >
        {panelHeaderMessage}
      </PanelHeader>
      <Group>
        <Div>
          <Title level="1" weight="bold" className="wait-game-panel__room-code">
            Код игры: {game.id}
          </Title>
          <Title
            level="2"
            weight="regular"
            className="wait-game-panel__room-players"
          >
            Игроков: {game.players.length}/{game.playersNumber}
          </Title>
        </Div>
      </Group>
      <Group header={<Header>Игроки</Header>}>
        <Div>
          {game.players.map((player) => (
            <SimpleCell
              before={<Avatar src={player.photoUrl} />}
              key={player.id}
            >
              {player.name}
            </SimpleCell>
          ))}
        </Div>
      </Group>
      <Div>
        <Button
          mode="commerce"
          size="l"
          stretched
          disabled={
            !(game.players.length === game.playersNumber && player.isHost)
          }
          onClick={onStartGame}
        >
          Начать игру
        </Button>
      </Div>
    </>
  );
}

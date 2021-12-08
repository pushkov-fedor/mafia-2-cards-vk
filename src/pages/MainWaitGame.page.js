import React from "react";
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
import { mainPanels } from "../routes";
import "./MainWaitGame.page.css";

export default function MainWaitGamePage({
  setActivePanel,
  panelHeaderMessage,
  game,
}) {
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
            <SimpleCell before={<Avatar />}>{player.name}</SimpleCell>
          ))}
        </Div>
      </Group>
      <Div>
        <Button mode="commerce" size="l" stretched>
          Начать игру
        </Button>
      </Div>
    </>
  );
}

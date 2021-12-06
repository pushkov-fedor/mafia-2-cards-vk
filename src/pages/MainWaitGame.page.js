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
}) {
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
            Код игры: H2TM22
          </Title>
          <Title
            level="2"
            weight="regular"
            className="wait-game-panel__room-players"
          >
            Игроков: 5/6
          </Title>
        </Div>
      </Group>
      <Group header={<Header>Игроки</Header>}>
        <Div>
          <SimpleCell before={<Avatar />}>Артур Стамбульцян</SimpleCell>
          <SimpleCell before={<Avatar />}>Игорь Федоров</SimpleCell>
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

import {
  Button,
  Caption,
  Cell,
  Div,
  Group,
  Header,
  PanelHeader,
  PanelHeaderBack,
  SimpleCell,
  Switch,
  Title,
} from "@vkontakte/vkui";
import React, { useState } from "react";
import { mainPanels } from "../routes";
import "./MainGame.page.css";

export default function MainGamePage({ setActivePanel, panelHeaderMessage }) {
  const [showCards, setShowCards] = useState(true);
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
          <Title level="1" weight="bold" className="game-panel__card-type">
            {showCards ? "Мафия" : "Скрыты"}
          </Title>
          <Title level="1" weight="bold" className="game-panel__card-type">
            {showCards ? "Мирный" : "Скрыты"}
          </Title>
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
        <Button size="l" stretched>
          Начать ночь
        </Button>
      </Div>
    </>
  );
}

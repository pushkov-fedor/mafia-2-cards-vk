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
  SimpleCell,
  Snackbar,
  SplitCol,
  SplitLayout,
  Switch,
  Title,
  usePlatform,
  VKCOM,
} from "@vkontakte/vkui";
import React, { useState } from "react";
import { mainPanels } from "../routes";
import "./MainGame.page.css";

const Modals = {
  MafiaKill: "MafiaKill",
};

export default function MainGamePage({ setActivePanel, panelHeaderMessage }) {
  const platform = usePlatform();
  const [activeModal, setActiveModal] = useState(null);
  const [snackbar, setSnackbar] = useState(null);
  const [showCards, setShowCards] = useState(true);
  const [players, setPlayers] = useState([
    { name: "Артур Стамбульцян", checked: false },
    { name: "Игорь Федоров", checked: false },
  ]);

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
    setActiveModal(null);
  };

  const modal = (
    <ModalRoot activeModal={activeModal}>
      <ModalPage id={Modals.MafiaKill} onClose={() => onModalClose()}>
        <Group>
          <Div>
            <Title level="2" weight="bold">
              Кого убить?
            </Title>
          </Div>
        </Group>
        <Group>
          {players.map((player, index) => (
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
          ))}
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
            <Button
              size="l"
              stretched
              onClick={() => setActiveModal(Modals.MafiaKill)}
            >
              Начать ночь
            </Button>
          </Div>
          {snackbar}
        </SplitCol>
      </SplitLayout>
    </>
  );
}

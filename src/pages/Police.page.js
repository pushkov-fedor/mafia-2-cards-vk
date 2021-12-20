import React, { useState } from "react";
import {
  Avatar,
  Button,
  Cell,
  Div,
  Group,
  ModalCard,
  ModalPage,
  ModalRoot,
  PanelHeader,
  SplitCol,
  SplitLayout,
  Title,
} from "@vkontakte/vkui";
import { Icon56Users3Outline } from "@vkontakte/icons";
import isPolice from "../utils/isPolice";
import { CardType } from "../constants";
import { GameApi } from "../api";

const PoliceModals = {
  mafia: "Mafia",
  civil: "Civil",
};

export default function PolicePage({
  setActivePanel,
  panelHeaderMessage,
  game,
  playerId,
}) {
  // game models
  const [player, setPlayer] = useState(
    game.players.find((player) => player.id === playerId)
  );
  const [otherPlayers, setOtherPlayers] = useState(
    game.players.filter((player) => player.id !== playerId)
  );
  // ui state
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  // methods
  const onPoliceCheck = () => {
    const selectedPlayer = otherPlayers.find(
      (player) => player.id === selectedPlayerId
    );
    if (selectedPlayer.card.type === CardType.Mafia) {
      setActiveModal(PoliceModals.mafia);
    } else {
      setActiveModal(PoliceModals.civil);
    }
  };
  const onEndNight = () => {
    setActiveModal(null);
    GameApi.endNight(game.id);
  };
  // modal
  const modal = (
    <ModalRoot activeModal={activeModal}>
      <ModalCard
        id={PoliceModals.mafia}
        header="Результат"
        subheader="Этот пользователь мафия"
        icon={<Icon56Users3Outline />}
        onClose={onEndNight}
        actions={
          <Button size="l" mode="primary" onClick={onEndNight}>
            Завершить ход
          </Button>
        }
      />
      <ModalCard
        id={PoliceModals.civil}
        header="Результат"
        subheader="Этот пользователь мирный житель"
        icon={<Icon56Users3Outline />}
        onClose={onEndNight}
        actions={
          <Button size="l" mode="primary" onClick={onEndNight}>
            Завершить ход
          </Button>
        }
      />
    </ModalRoot>
  );

  return (
    <>
      <PanelHeader>{panelHeaderMessage}</PanelHeader>
      {isPolice(player) ? (
        <SplitLayout modal={modal}>
          <SplitCol>
            <Div>
              <Title level="2" weight="medium">
                Кого проверить?
              </Title>
            </Div>
            <Group>
              {otherPlayers.map((player) => (
                <Cell
                  mode="selectable"
                  before={<Avatar />}
                  onChange={() => {
                    setSelectedPlayerId(
                      player.id === selectedPlayerId ? null : player.id
                    );
                  }}
                  key={player.id}
                  checked={player.id === selectedPlayerId}
                >
                  {player.name}
                </Cell>
              ))}
            </Group>
            <Div>
              <Button
                size="l"
                stretched
                mode="commerce"
                disabled={selectedPlayerId === null}
                onClick={onPoliceCheck}
              >
                Проверить
              </Button>
            </Div>
          </SplitCol>
        </SplitLayout>
      ) : (
        <Div>Вы мирный</Div>
      )}
    </>
  );
}

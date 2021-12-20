import {
  Avatar,
  Button,
  Cell,
  Div,
  Group,
  PanelHeader,
  Title,
} from "@vkontakte/vkui";
import React, { useState } from "react";
import isMafia from "../utils/isMafia";

export default function NightPage({
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
  return (
    <>
      <PanelHeader>{panelHeaderMessage}</PanelHeader>
      {isMafia(player) ? (
        <>
          <Div>
            <Title level="2" weight="medium">
              Кого убить?
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
            >
              Убить
            </Button>
          </Div>
        </>
      ) : (
        <Div>Вы мирный</Div>
      )}
    </>
  );
}

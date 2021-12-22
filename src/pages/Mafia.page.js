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
import { useEffect } from "react/cjs/react.development";
import { GameApi } from "../api";
import getPlayerById from "../utils/getPlayerById";
import isMafia from "../utils/isMafia";

export default function MafiaPage({
  setActivePanel,
  panelHeaderMessage,
  game,
  playerId,
}) {
  // game models
  const [player, setPlayer] = useState(getPlayerById(game, playerId));
  const [otherPlayers, setOtherPlayers] = useState(
    game.players.filter((player) => player.id !== playerId)
  );
  // ui state
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);
  // methods
  const onKill = () => {
    GameApi.mafiaKill(game.id, player.name, selectedPlayerId);
  };
  // effects
  useEffect(() => {
    setPlayer(getPlayerById(game, playerId));
  }, [game]);
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
              onClick={onKill}
            >
              Убить
            </Button>
          </Div>
        </>
      ) : (
        <Div>Спокойной ночи!</Div>
      )}
    </>
  );
}

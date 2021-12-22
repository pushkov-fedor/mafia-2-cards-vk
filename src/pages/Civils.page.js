import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Cell,
  Div,
  Group,
  PanelHeader,
  Title,
} from "@vkontakte/vkui";
import getPlayerById from "../utils/getPlayerById";
import { GameApi } from "../api";
import isAlive from "../utils/isAlive";

export default function CivilsPage({
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
  const onCivilsKill = () => {
    GameApi.civilsKill(game.id, playerId, selectedPlayerId);
  };
  // effects
  useEffect(() => {
    setPlayer(getPlayerById(game, playerId));
  }, [game]);
  return (
    <>
      <PanelHeader>{panelHeaderMessage}</PanelHeader>
      {isAlive(player) ? (
        <>
          <Div>
            <Title level="2" weight="medium">
              Кого осудить??
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
              onClick={onCivilsKill}
            >
              Осудить
            </Button>
          </Div>
        </>
      ) : (
        <Div>Вы мертвы</Div>
      )}
    </>
  );
}

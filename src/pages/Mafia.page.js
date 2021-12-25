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
import getOtherPlayersAlive from "../utils/getOtherPlayersAlive";
import getPlayerById from "../utils/getPlayerById";
import isAlive from "../utils/isAlive";
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
    getOtherPlayersAlive(game, playerId)
  );
  const [hasVoted, setHasVoted] = useState(false);
  // ui state
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);
  // methods
  const onKill = () => {
    setHasVoted(true);
    GameApi.mafiaKill(game.id, player.name, selectedPlayerId);
  };
  // effects
  useEffect(() => {
    setPlayer(getPlayerById(game, playerId));
  }, [game]);
  return (
    <>
      <PanelHeader>{panelHeaderMessage}</PanelHeader>
      {isMafia(player) && isAlive(player) && !hasVoted && (
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
                before={<Avatar src={player.photoUrl} />}
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
      )}
      {isMafia(player) && isAlive(player) && hasVoted && (
        <Div>Ваш голос учтен, ждем остальных игроков</Div>
      )}
      {isMafia(player) && !isAlive(player) && <Div>Вы мертвы</Div>}
      {!isMafia(player) && <Div>Спокойной ночи!</Div>}
    </>
  );
}

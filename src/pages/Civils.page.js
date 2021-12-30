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
import getOtherPlayersAlive from "../utils/getOtherPlayersAlive";
import ErrorSnackbar from "../components/ErrorSnackbar";

export default function CivilsPage({
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
  const [snackbarError, setSnackbarError] = useState(null);
  // methods
  const onCivilsKill = () => {
    setHasVoted(true);
    GameApi.civilsKill(game.id, playerId, selectedPlayerId).catch((e) => {
      const errorMessage = e.response.data.message;
      setSnackbarError(errorMessage);
    });
  };
  // effects
  useEffect(() => {
    setPlayer(getPlayerById(game, playerId));
  }, [game]);
  return (
    <>
      <PanelHeader>{panelHeaderMessage}</PanelHeader>
      {isAlive(player) && !hasVoted && (
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
              onClick={onCivilsKill}
            >
              Осудить
            </Button>
          </Div>
        </>
      )}
      {isAlive(player) && hasVoted && (
        <Div>Ваш голос учтен, ждем остальных игроков</Div>
      )}
      {!isAlive(player) && <Div>Вы мертвы</Div>}
      {snackbarError && (
        <ErrorSnackbar
          errorMessage={snackbarError}
          closeSnackbar={() => setSnackbarError(null)}
        />
      )}
    </>
  );
}

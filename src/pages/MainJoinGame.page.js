import {
  Button,
  FormItem,
  FormLayout,
  Group,
  Input,
  PanelHeader,
  PanelHeaderBack,
} from "@vkontakte/vkui";
import React, { useState } from "react";
import { GameApi } from "../api";
import { mainPanels } from "../routes";
import { GameStatus } from "../constants";

export default function MainJoinGamePage({
  setActivePanel,
  setGame,
  setPlayerId,
  panelHeaderMessage,
}) {
  const [roomCodeControlValue, setRoomCodeControlValue] = useState("");
  const [nameControlValue, setNameControlValue] = useState("");
  const [controlsTouchedStatus, setControlsTouchedStatus] = useState({
    roomCode: false,
    name: false,
  });
  const touchControl = (controlName) => {
    setControlsTouchedStatus({ ...controlsTouchedStatus, [controlName]: true });
  };
  const onJoin = () => {
    GameApi.joinGame(nameControlValue, roomCodeControlValue).then(
      (response) => {
        setGame(response.data.game);
        setPlayerId(response.data.playerId);
        setInterval(() => {
          GameApi.getGame(response.data.game.id).then((responsee) =>
            setGame(responsee.data)
          );
        }, 2000);
        if (response.data.game.gameStatus === GameStatus.Started) {
          setActivePanel(mainPanels.game);
          return;
        }
        setActivePanel(mainPanels.waitGame);
      }
    );
  };
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
        <FormLayout
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <FormItem
            top="Код комнаты"
            status={
              roomCodeControlValue
                ? "valid"
                : controlsTouchedStatus.roomCode
                ? "error"
                : "default"
            }
            bottom={
              !roomCodeControlValue && controlsTouchedStatus.roomCode
                ? "Это поле обязательное"
                : ""
            }
          >
            <Input
              type="text"
              name="roomCode"
              value={roomCodeControlValue}
              onChange={(e) => {
                setRoomCodeControlValue(e.currentTarget.value.toUpperCase());
              }}
              onFocus={(e) => touchControl("roomCode")}
              placeholder="MF12P5"
            />
          </FormItem>
          <FormItem
            top="Имя"
            status={
              nameControlValue
                ? "valid"
                : controlsTouchedStatus.name
                ? "error"
                : "default"
            }
            bottom={
              !nameControlValue && controlsTouchedStatus.name
                ? "Это поле обязательное"
                : ""
            }
          >
            <Input
              type="text"
              name="name"
              value={nameControlValue}
              onChange={(e) => {
                setNameControlValue(e.currentTarget.value);
              }}
              onFocus={(e) => touchControl("name")}
              placeholder="Твое имя"
            />
          </FormItem>
          <FormItem>
            <Button
              mode="commerce"
              type="submit"
              stretched
              size="l"
              disabled={!roomCodeControlValue || !nameControlValue}
              onClick={onJoin}
            >
              Присоединиться
            </Button>
          </FormItem>
        </FormLayout>
      </Group>
    </>
  );
}

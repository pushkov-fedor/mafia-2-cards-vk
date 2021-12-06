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
import { mainPanels } from "../routes";

export default function MainJoinGamePage({
  setActivePanel,
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
            >
              Присоединиться
            </Button>
          </FormItem>
        </FormLayout>
      </Group>
    </>
  );
}

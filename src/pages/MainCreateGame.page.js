import React, { useState } from "react";

import {
  Button,
  Checkbox,
  FormItem,
  FormLayout,
  Group,
  Input,
  PanelHeader,
  PanelHeaderBack,
} from "@vkontakte/vkui";
import { mainPanels } from "../routes";
import { GameApi } from "../api";

export default function MainCreateGamePage({
  setActivePanel,
  setGame,
  setPlayerId,
  panelHeaderMessage,
}) {
  const [nameControlValue, setNameControlValue] = useState("");
  const [numberOfPlayersControlValue, setNumberOfPlayersControlValue] =
    useState(6);
  const [numberOfMafiaControlValue, setNumberOfMafiaControlValue] = useState(1);
  const [isAddPolice, setIsAddPolice] = useState(false);
  const [controlsTouchedStatus, setControlsTouchedStatus] = useState({
    name: false,
    numberOfPlayers: false,
    numberOfMafia: false,
  });
  const touchControl = (controlName) => {
    setControlsTouchedStatus({ ...controlsTouchedStatus, [controlName]: true });
  };

  const onCreateGame = () =>
    GameApi.createGame(
      nameControlValue,
      numberOfPlayersControlValue,
      numberOfMafiaControlValue,
      isAddPolice ? 1 : 0
    ).then((response) => {
      setGame(response.data.game);
      setPlayerId(response.data.playerId);
      setActivePanel(mainPanels.waitGame);
    });

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
              placeholder="Мое имя"
            />
          </FormItem>
          <FormItem
            top="Количество игроков"
            status={
              numberOfPlayersControlValue
                ? "valid"
                : controlsTouchedStatus.numberOfPlayers
                ? "error"
                : "default"
            }
            bottom={
              !numberOfPlayersControlValue &&
              controlsTouchedStatus.numberOfPlayers
                ? "Это поле обязательное"
                : ""
            }
          >
            <Input
              type="number"
              name="numberOfPlayers"
              value={numberOfPlayersControlValue}
              onChange={(e) => {
                setNumberOfPlayersControlValue(e.currentTarget.value);
              }}
              onFocus={(e) => touchControl("numberOfPlayers")}
            />
          </FormItem>
          <FormItem
            top="Количество мафии"
            status={
              numberOfMafiaControlValue
                ? "valid"
                : controlsTouchedStatus.numberOfMafia
                ? "error"
                : "default"
            }
            bottom={
              !numberOfMafiaControlValue && controlsTouchedStatus.numberOfMafia
                ? "Это поле обязательное"
                : ""
            }
          >
            <Input
              type="number"
              name="numberOfMafia"
              value={numberOfMafiaControlValue}
              onChange={(e) => {
                setNumberOfMafiaControlValue(e.currentTarget.value);
              }}
              onFocus={(e) => touchControl("numberOfMafia")}
            />
          </FormItem>
          <Checkbox
            value={isAddPolice}
            onChange={(e) => setIsAddPolice(e.currentTarget.value)}
          >
            Добавить комиссара
          </Checkbox>
          <FormItem>
            <Button
              mode="commerce"
              type="submit"
              stretched
              size="l"
              disabled={
                !nameControlValue ||
                !numberOfPlayersControlValue ||
                !numberOfMafiaControlValue
              }
              onClick={onCreateGame}
            >
              Создать
            </Button>
          </FormItem>
        </FormLayout>
      </Group>
    </>
  );
}

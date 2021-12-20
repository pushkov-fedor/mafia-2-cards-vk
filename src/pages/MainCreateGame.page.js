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
  const [hostName, setHostName] = useState("");
  const [numberOfCivils, setNumberOfCivils] = useState(5);
  const [numberOfMafia, setNumberOfMafia] = useState(1);
  const [hasPolice, setHasPolice] = useState(false);
  const [controlsTouchedStatus, setControlsTouchedStatus] = useState({
    name: false,
    numberOfCivils: false,
    numberOfMafia: false,
  });
  const touchControl = (controlName) => {
    setControlsTouchedStatus({ ...controlsTouchedStatus, [controlName]: true });
  };

  const onCreateGame = () => {
    console.log("hostName", hostName);
    console.log("numberOfCivils", numberOfCivils);
    console.log("numberOfMafia", numberOfMafia);
    console.log("hasPolice", hasPolice);
    GameApi.createGame(hostName, numberOfCivils, numberOfMafia, hasPolice).then(
      (response) => {
        setGame(response.data.game);
        setPlayerId(response.data.playerId);
        setInterval(() => {
          GameApi.getGame(response.data.game.id).then((responsee) =>
            setGame(responsee.data)
          );
        }, 2000);
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
            top="Имя"
            status={
              hostName
                ? "valid"
                : controlsTouchedStatus.name
                ? "error"
                : "default"
            }
            bottom={
              !hostName && controlsTouchedStatus.name
                ? "Это поле обязательное"
                : ""
            }
          >
            <Input
              type="text"
              name="name"
              value={hostName}
              onChange={(e) => {
                setHostName(e.currentTarget.value);
              }}
              onFocus={(e) => touchControl("name")}
              placeholder="Мое имя"
            />
          </FormItem>
          <FormItem
            top="Количество мирных жителей"
            status={
              numberOfCivils
                ? "valid"
                : controlsTouchedStatus.numberOfCivils
                ? "error"
                : "default"
            }
            bottom={
              !numberOfCivils && controlsTouchedStatus.numberOfCivils
                ? "Это поле обязательное"
                : ""
            }
          >
            <Input
              type="number"
              name="numberOfCivils"
              value={numberOfCivils}
              onChange={(e) => {
                setNumberOfCivils(e.currentTarget.value);
              }}
              onFocus={(e) => touchControl("numberOfCivils")}
            />
          </FormItem>
          <FormItem
            top="Количество мафии"
            status={
              numberOfMafia
                ? "valid"
                : controlsTouchedStatus.numberOfMafia
                ? "error"
                : "default"
            }
            bottom={
              !numberOfMafia && controlsTouchedStatus.numberOfMafia
                ? "Это поле обязательное"
                : ""
            }
          >
            <Input
              type="number"
              name="numberOfMafia"
              value={numberOfMafia}
              onChange={(e) => {
                setNumberOfMafia(e.currentTarget.value);
              }}
              onFocus={(e) => touchControl("numberOfMafia")}
            />
          </FormItem>
          <Checkbox
            value={hasPolice}
            onChange={(e) => setHasPolice(e.currentTarget.value)}
          >
            Добавить комиссара
          </Checkbox>
          <FormItem>
            <Button
              mode="commerce"
              type="submit"
              stretched
              size="l"
              disabled={!hostName || !numberOfCivils || !numberOfMafia}
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

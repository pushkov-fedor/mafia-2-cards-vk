import React, { useEffect, useState } from "react";
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
import ErrorSnackbar from "../components/ErrorSnackbar";

export default function MainCreateGamePage({
  setActivePanel,
  setGame,
  setPlayerId,
  subscribeToGame,
  panelHeaderMessage,
  playerPhotoUrl,
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
  const [snackbarError, setSnackbarError] = useState(null);
  const [numberOfMafiaValidStatus, setNumberOfMafiaValidStatus] =
    useState("valid");
  const [numberOfMafiaErrorMessage, setNumberOfMafiaErrorMessage] =
    useState("");
  const [numberOfCivilsValidStatus, setNumberOfCivilsValidStatus] =
    useState("valid");
  const [numberOfCivilsErrorMessage, setNumberOfCivilsErrorMessage] =
    useState("");
  // public methods
  const touchControl = (controlName) => {
    setControlsTouchedStatus({ ...controlsTouchedStatus, [controlName]: true });
  };
  const onCreateGame = () => {
    GameApi.createGame(
      hostName,
      playerPhotoUrl,
      Number(numberOfCivils),
      Number(numberOfMafia),
      hasPolice
    )
      .then((response) => {
        setGame(response.data.game);
        setPlayerId(response.data.playerId);
        subscribeToGame(response.data.game.id);
        setActivePanel(mainPanels.waitGame);
      })
      .catch((e) => {
        const errorMessage = e.response.data.message;
        setSnackbarError(errorMessage);
      });
  };
  // effects
  useEffect(() => {
    const numberOfMafiaNum = Number(numberOfMafia);
    const numberOfCivilsNum = Number(numberOfCivils);
    let mafiaValidErrorWasRegisteredInCurrentRun = false;
    let civilsValidErrorWasREgisteredInCurrentRun = false;
    if (numberOfMafiaNum < 1) {
      setNumberOfMafiaValidStatus("error");
      setNumberOfMafiaErrorMessage("Мафии должно быть больше 0");
      mafiaValidErrorWasRegisteredInCurrentRun = true;
    }
    if (numberOfCivilsNum < 3) {
      setNumberOfCivilsValidStatus("error");
      setNumberOfCivilsErrorMessage("Мирных жителей должно быть больше 2");
      civilsValidErrorWasREgisteredInCurrentRun = true;
    }
    if (numberOfMafiaNum === numberOfCivilsNum) {
      setNumberOfMafiaValidStatus("error");
      setNumberOfMafiaErrorMessage(
        "Мафии не может быть столько же, сколько мирных жителей"
      );
      mafiaValidErrorWasRegisteredInCurrentRun = true;
    }
    if (numberOfMafiaNum > numberOfCivilsNum) {
      setNumberOfMafiaValidStatus("error");
      setNumberOfMafiaErrorMessage(
        "Мафии не может быть больше, чем мирных жителей"
      );
      mafiaValidErrorWasRegisteredInCurrentRun = true;
    }
    if (!mafiaValidErrorWasRegisteredInCurrentRun) {
      setNumberOfMafiaValidStatus("valid");
      setNumberOfMafiaErrorMessage("");
    }
    if (!civilsValidErrorWasREgisteredInCurrentRun) {
      setNumberOfCivilsValidStatus("valid");
      setNumberOfCivilsErrorMessage("");
    }
  }, [numberOfMafia, numberOfCivils]);

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
            status={numberOfCivilsValidStatus}
            bottom={numberOfCivilsErrorMessage}
          >
            <Input
              type="number"
              name="numberOfCivils"
              value={numberOfCivils}
              onChange={(e) => {
                setNumberOfCivils(e.target.value);
              }}
              onFocus={(e) => touchControl("numberOfCivils")}
            />
          </FormItem>
          <FormItem
            top="Количество мафии"
            status={numberOfMafiaValidStatus}
            bottom={numberOfMafiaErrorMessage}
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
            onChange={(e) => setHasPolice(e.currentTarget.checked)}
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
                !hostName ||
                numberOfCivilsValidStatus === "error" ||
                numberOfMafiaValidStatus === "error"
              }
              onClick={onCreateGame}
            >
              Создать
            </Button>
          </FormItem>
        </FormLayout>
      </Group>
      {snackbarError && (
        <ErrorSnackbar
          errorMessage={snackbarError}
          closeSnackbar={() => setSnackbarError(null)}
        />
      )}
    </>
  );
}

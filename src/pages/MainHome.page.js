import React from "react";

import { Button, Div, PanelHeader } from "@vkontakte/vkui";
import { mainPanels } from "../routes";

export default function MainHomePage({ setActivePanel, panelHeaderMessage }) {
  return (
    <>
      <PanelHeader>{panelHeaderMessage}</PanelHeader>
      <Div>
        <Button
          size="l"
          stretched
          onClick={() => setActivePanel(mainPanels.createGame)}
        >
          Создать игру
        </Button>
      </Div>
      <Div>
        <Button size="l" stretched>
          Присоединиться
        </Button>
      </Div>
    </>
  );
}

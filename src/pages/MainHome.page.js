import React from "react";

import { Button, Div, PanelHeader } from "@vkontakte/vkui";
import { mainPanels } from "../routes";

export default function MainHomePage({ setActivePanel, panelHeaderMessage }) {
  return (
    <>
      <PanelHeader>Мафия</PanelHeader>
      <Div>
        <Button
          size="l"
          stretched
          onClick={() => setActivePanel(mainPanels.createGame)}
        >
          {panelHeaderMessage}
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

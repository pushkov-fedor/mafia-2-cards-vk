import React from "react";

import {
  FormItem,
  FormLayout,
  Group,
  Input,
  PanelHeader,
  PanelHeaderBack,
} from "@vkontakte/vkui";
import { mainPanels } from "../routes";

export default function MainCreateGamePage({
  setActivePanel,
  panelHeaderMessage,
}) {
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
        <FormLayout>
          <FormItem top="Имя">
            <Input type="text" name="name" />
          </FormItem>
        </FormLayout>
      </Group>
    </>
  );
}

import { Icon24Cancel, Icon24Done } from "@vkontakte/icons";
import {
  ANDROID,
  Avatar,
  Button,
  Caption,
  Cell,
  Div,
  Group,
  Header,
  IOS,
  ModalPage,
  ModalPageHeader,
  ModalRoot,
  PanelHeader,
  PanelHeaderBack,
  PanelHeaderButton,
  ScreenSpinner,
  SimpleCell,
  Snackbar,
  SplitCol,
  SplitLayout,
  Switch,
  Title,
  usePlatform,
  VKCOM,
} from "@vkontakte/vkui";
import React, { useEffect, useState } from "react";
import { GameApi } from "../api";
import { CardType, GamePhase, HealthStatus } from "../constants";
import { mainPanels } from "../routes";
import "./MainGame.page.css";

const Modals = {
  MafiaTurn: "MafiaTurn",
};

export default function MainGamePage({ setActivePanel, panelHeaderMessage }) {
  return (
    <>
      <PanelHeader
        left={
          <PanelHeaderBack onClick={() => setActivePanel(mainPanels.home)} />
        }
      >
        {panelHeaderMessage}
      </PanelHeader>
      <SplitLayout>
        <SplitCol>123</SplitCol>
      </SplitLayout>
    </>
  );
}

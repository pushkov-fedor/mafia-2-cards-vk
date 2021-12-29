import { Div, PanelHeader } from "@vkontakte/vkui";
import React from "react";

export default function IntroPage({
  setActivePanel,
  panelHeaderMessage,
  hasSeenIntro,
}) {
  return (
    <>
      <PanelHeader>{panelHeaderMessage}</PanelHeader>
      <Div>123</Div>
    </>
  );
}

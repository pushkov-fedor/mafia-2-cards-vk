import React from "react";
import { Button, Div, Group, PanelHeader, Title } from "@vkontakte/vkui";
import "./Intro.page.css";

export default function IntroPage({
  setActivePanel,
  panelHeaderMessage,
  hasSeenIntro,
}) {
  return (
    <>
      <PanelHeader>{panelHeaderMessage}</PanelHeader>
      <Group>
        <Div>
          <Title level="1" weight="bold" className="title-1">
            Привет! 🤖
          </Title>
          <Title level="2" weight="regular" className="title-21">
            С этим приложением ты можешь играть в мафию без ведущего. Все
            команды будет озвучивать робот-ассистент.
          </Title>
          <Title level="2" weight="regular" className="title-22">
            Робота будет слышно из телефона только одно игрока - создателя
            комнаты. Если это ты, то убедись, что звук на телефоне включен!
          </Title>
        </Div>
        <Div>
          <Button stretched size="l" mode="commerce">
            ОК
          </Button>
        </Div>
      </Group>
    </>
  );
}

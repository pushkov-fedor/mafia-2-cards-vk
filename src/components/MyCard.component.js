import { Icon24Hide, Icon24HideOutline } from "@vkontakte/icons";
import { Div, SimpleCell, Title } from "@vkontakte/vkui";
import React, { useState } from "react";
import getCardNameByType from "../utils/getCardNameByType";

let displayCardNameSave = true;

export default function MyCardComponent({ player }) {
  const [displayCardName, setDisplayCardName] = useState(displayCardNameSave);
  return (
    <>
      <Div>
        <Title level="2" weight="medium">
          Твоя карта
        </Title>
      </Div>
      {player.card && (
        <SimpleCell
          after={
            displayCardName ? (
              <Icon24HideOutline
                onClick={() => {
                  setDisplayCardName(false);
                  displayCardNameSave = false;
                }}
              />
            ) : (
              <Icon24Hide
                onClick={() => {
                  setDisplayCardName(true);
                  displayCardNameSave = true;
                }}
              />
            )
          }
        >
          {displayCardName
            ? getCardNameByType(player.card.type)
            : "Карта скрыта"}
        </SimpleCell>
      )}
    </>
  );
}

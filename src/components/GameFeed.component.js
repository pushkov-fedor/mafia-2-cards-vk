import { Avatar, SimpleCell } from "@vkontakte/vkui";
import React from "react";

export default function GameFeedComponent() {
  return (
    <>
      <SimpleCell before={<Avatar />} description="Был убит ночью мафией">
        Злая сука
      </SimpleCell>
      <SimpleCell
        before={<Avatar />}
        description="Был убил днем мирными жителями"
      >
        yaya
      </SimpleCell>
    </>
  );
}

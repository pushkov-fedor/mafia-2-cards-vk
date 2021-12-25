import { Avatar, SimpleCell } from "@vkontakte/vkui";
import React from "react";

export default function GameFeedComponent({ actions = [] }) {
  return (
    <>
      {actions.map((action) => (
        <SimpleCell
          key={action.id}
          before={<Avatar src={action.killedPlayer.photoUrl} />}
          description={action.message}
        >
          {action.killedPlayer.name}
        </SimpleCell>
      ))}
    </>
  );
}

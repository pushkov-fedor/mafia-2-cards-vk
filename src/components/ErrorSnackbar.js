import React from "react";
import { Icon16ErrorCircleFill } from "@vkontakte/icons";
import { Snackbar } from "@vkontakte/vkui";

export default function ErrorSnackbar({ closeSnackbar, errorMessage }) {
  return (
    <Snackbar onClose={closeSnackbar} before={<Icon16ErrorCircleFill />}>
      {errorMessage}
    </Snackbar>
  );
}

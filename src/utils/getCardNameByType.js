import { CardType } from "../constants";

export default (cardType) => {
  switch (cardType) {
    case CardType.Mafia:
      return "Мафия";
    case CardType.Police:
      return "Комиссар";
    case CardType.Civil:
      return "Мирный житель";
    default:
      return "Карты с таким типом не существует";
  }
};

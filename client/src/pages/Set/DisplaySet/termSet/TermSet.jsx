import { useContext } from "react";
import { Card } from "./Card";
import "./TermSetStyle.css";
import downArrow from "assets/down-arrow.svg";
import { CardsetContext } from "../SetPage";

export const TermSet = () => {
  const { cardSet } = useContext(CardsetContext);

  const listTerms = (cards) => {
    return cards.map((card) => {
      return (
        <div>
          <Card card={card} />
        </div>
      );
    });
  };

  return (
    <div className="terms">
      <div className="terms-list-title">
        <h2>Terms in this set ({cardSet.cards.length})</h2>
        <div className="sort">
          <h4>Original</h4>
          <img className="down-arrow" src={downArrow} />
        </div>
      </div>
      {listTerms(cardSet.cards)}
    </div>
  );
};

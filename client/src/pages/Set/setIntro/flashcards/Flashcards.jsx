import { useContext, useState } from "react";
import "./Flashcards.css";
import {
  playIcon,
  shuffleIcon,
  backIcon,
  forwardIcon,
  settingIcon,
  fullscreenIcon,
} from "assets/assets";
import { CardsetContext } from "pages/Set/SetPage";
import { CardOptions } from "./CardOptions";

export const Flashcards = ({ mode }) => {
  const { cardSet } = useContext(CardsetContext);
  const [currentCard, setCurrentCard] = useState(1);
  const [cardContent, setCardContent] = useState("term");
  const cards = cardSet.cards;

  const getCard = (currentCard) => {
    return cards.find((card) => {
      return card.order === currentCard;
    });
  };

  /*
  cards.find((card) => {
  return (card.order === 6)
  })
  */

  return (
    <div className="flashcard-player">
      <div
        className="flashcard"
        onClick={() =>
          setCardContent(cardContent === "term" ? "definition" : "term")
        }
      >
        <CardOptions />
        <div className="card">{getCard(currentCard)[cardContent]}</div>
        <div className="empty"></div>
      </div>
      <div className="flashcard-controls">
        <div className="controls">
          <button className="play-btn">
            <img className="play-icon" src={playIcon} />
          </button>
          <button className="shuffle-btn">
            <img className="shuffle-icon" src={shuffleIcon} />
          </button>
        </div>
        <div className="arrows">
          <button
            className="back-btn"
            onClick={() => {
              setCurrentCard(currentCard === 1 ? 1 : currentCard - 1);
            }}
          >
            <img className="back-icon" src={backIcon} />
          </button>
          <a className="card-counter">
            {currentCard} / {cards.length}
          </a>
          <button
            className="forward-btn"
            onClick={() => {
              setCurrentCard(
                currentCard === cards.length ? 1 : currentCard + 1
              );
              setCardContent("term");
            }}
          >
            <img className="forward-icon" src={forwardIcon} />
          </button>
        </div>
        <div className="flashcards-options">
          <button className="settings-btn">
            <img className="settings-icon" src={settingIcon} />
          </button>
          <button className="fullscreen-btn">
            <img className="fullscreen-icon" src={fullscreenIcon} />
          </button>
        </div>
      </div>
      <div
        className="progress-bar-container"
        style={{ height: "2px", backgroundColor: "#282e3e" }}
      >
        <div
          className="progress-bar-fill"
          style={{
            height: "2px",
            width: `${((currentCard - 1) / cards.length) * 100}%`,
            backgroundColor: "white",
          }}
        ></div>
      </div>
    </div>
  );
};

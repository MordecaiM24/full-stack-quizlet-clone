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

/* 
Current card movement: Starts current card at 1, goes until length. Uses current card to do direct retrieval from 
original data where order is equal to current card. Increases currentCard sequentially.
New: Still uses current card. Before direct retrieval from original data, get index from shuffled order.
*/

export const Flashcards = ({ mode }) => {
  const { cardSet } = useContext(CardsetContext);
  const [currentCard, setCurrentCard] = useState(1);
  const [cardContent, setCardContent] = useState("term");
  const cards = cardSet.cards;

  const sortedOrders = Array.from({ length: cards.length }, (_, i) => i + 1);
  const [cardMode, setCardMode] = useState("original");
  const [cardOrder, setCardOrder] = useState(sortedOrders);
  const [shuffleAlert, setShuffleAlert] = useState(false);

  const getCard = (currentCard) => {
    let virtualCard = cardOrder[currentCard - 1];

    return cards.find((card) => {
      return card.order === virtualCard;
    });
  };

  function shuffleArray(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  return (
    <div className="flashcard-player">
      {shuffleAlert &&
        (cardMode === "original" ? "shuffle is off" : "shuffle is on")}
      <div
        className="flashcard"
        onClick={() => {
          setCardContent(cardContent === "term" ? "definition" : "term");
        }}
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
          <button
            className="shuffle-btn"
            onClick={() => {
              if (cardMode == "shuffle") {
                setCardMode("original");
                setCardOrder(sortedOrders);
              }
              if (cardMode == "original") {
                setCardOrder(shuffleArray(sortedOrders));
                setCardMode("shuffle");
              }

              setShuffleAlert(true);

              setTimeout(() => {
                setShuffleAlert(false);
              }, 5000);
            }}
            style={{
              border: cardMode === "shuffle" && "solid 1px #fff",
              padding: cardMode === "shuffle" && "7px",
            }}
          >
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

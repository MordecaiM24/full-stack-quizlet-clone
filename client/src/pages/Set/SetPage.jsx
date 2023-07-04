import axios from "axios";
import { useEffect, useState } from "react";
import { Flashcards } from "./setIntro/flashcards/Flashcards";
import { TermSet } from "./termSet/TermSet";
import shareIcon from "assets/share-icon.svg";
import "./PageStyle.css";
import { Modes } from "./setIntro/Modes";
import { Loading } from "common/Loading";
import { Dna } from "react-loader-spinner";

export const SetPage = () => {
  const [cardSet, setCardSet] = useState({});
  const [isLoading, setLoading] = useState(true);

  const errorSet = {
    title: "Error Title",
    cards: [
      {
        term: "AX2",
        definition: "Linear, 180, SP",
        _id: "649e53f6d32ee3d3984d6cec",
      },
      {
        term: "AX2",
        definition: "Linear, 180, SP",
        _id: "649e53f6d32ee3d3984d6cec",
      },
    ],
  };

  useEffect(() => {
    setTimeout(() => {
      const fetchSet = async () => {
        const setID = "649e53f6d32ee3d3984d6cea";
        try {
          const response = await axios.get(
            `http://localhost:5000/api/flashcards/${setID}`
          );
          setCardSet(response.data[0]);
          setLoading(false);

          console.log("Array: " + Array.isArray(cardSet.cards));
          console.log(cardSet);
          if (cardSet === {}) {
            throw new Error("err");
          }
          console.log(cardSet.cards);
          console.log(cardSet.title);
        } catch (err) {
          setCardSet(errorSet);
        }
      };

      fetchSet();
    }, 10000);
  }, []);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <div className="body">
        <div className="page-wrapper">
          <div className="intro">
            <div className="title-share">
              <h1>{cardSet.title}</h1>
              <button className="share-btn">
                <img className="share-icon" src={shareIcon} />
                <span className="share-text">Share</span>
              </button>
            </div>
            <Modes />
            <Flashcards cardSet={cardSet} />
          </div>

          <TermSet cardSet={cardSet} />
        </div>
      </div>
    );
  }
};

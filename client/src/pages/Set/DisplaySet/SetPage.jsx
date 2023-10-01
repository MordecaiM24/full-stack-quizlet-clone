import axios from "axios";
import { useEffect, useState, createContext } from "react";
import { Flashcards } from "./setIntro/flashcards/Flashcards";
import { TermSet } from "./termSet/TermSet";
import shareIcon from "assets/share-icon.svg";
import "./PageStyle.css";
import { Modes } from "./setIntro/Modes";
import { Loading } from "common/Loading";
import { useParams } from "react-router-dom";

export const CardsetContext = createContext(null);

export const SetPage = () => {
  let { id } = useParams();
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
    const fetchSet = async () => {
      const setID = id;
      try {
        const response = await axios.get(
          `http://localhost:5000/api/flashcards/${setID}`
        );
        setCardSet(response.data[0]);
        setLoading(false);

        if (cardSet == {}) {
          throw new Error("err");
        }
      } catch (err) {
        setCardSet(errorSet);
      }
    };

    fetchSet(); //Create context
  }, []);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      // Context provider
      <CardsetContext.Provider value={{ cardSet }}>
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
              <Flashcards /> {/*Replace with context*/}
            </div>
            <TermSet /> {/*Replace with context*/}
          </div>
        </div>
      </CardsetContext.Provider>
    );
  }
};

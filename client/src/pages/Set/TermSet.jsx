import axios from "axios";
import { useEffect, useState } from "react";
import { Dna } from "react-loader-spinner";
import { Card } from "./Card";
import "./TermSetStyle.css";
import downArrow from "../../assets/down-arrow.svg";

export const TermSet = () => {
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
            `http://192.168.1.6:5000/api/flashcards/${setID}`
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
    }, 1000);
  }, []);

  const listTerms = (cards) => {
    return cards.map((card) => {
      return (
        <div>
          <Card card={card} />
        </div>
      );
    });
  };

  if (isLoading) {
    return (
      <div
        style={{
          position: "fixed",
          top: "15%",
        }}
      >
        <Dna
          visible={true}
          height="250"
          width="250"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      </div>
    );
  } else {
    return (
      <div className="terms">
        <div className="terms-list-title">
          <h2>Terms in this set ({cardSet.cards.length})</h2>
          <div className="sort">
            <h4>Original</h4>
            <img class="down-arrow" src={downArrow} />
          </div>
        </div>
        {listTerms(cardSet.cards)}
      </div>
    );
  }

  return (
    <div>
      <h1>Title: {cardSet.title}</h1>
      {/* {listTerms(cardSet.cards)} */}
    </div>
  );

  // return (
  //   <div>
  //     <ul>
  //       {cardSet.map((set) => {
  //         return (
  //           <li key={set._id}>
  //             <h1>Title: {set.title}</h1>
  //             {listTerms(set.cards)}
  //           </li>
  //         );
  //       })}
  //     </ul>
  //   </div>
  // );
};

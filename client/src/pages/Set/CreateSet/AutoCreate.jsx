import axios from "axios";
import { useState } from "react";
import "./Modal.css";
import { xIcon } from "assets/assets";

export const AutoCreate = (props) => {
  const [topic, setTopic] = useState("");
  const [numCards, setNumCards] = useState(0);
  const setCardSet = props.setCardSet;
  const cardSet = props.cardSet;
  const setVisibility = props.setVisibility;

  const handleTopicChange = (event) => {
    const { value } = event.target;
    setTopic(value);
  };

  const handleNumChange = (event) => {
    const { value } = event.target;
    setNumCards(value);
  };

  const getCards = async (topic, num) => {
    const response = await axios.get(
      "http://192.168.1.23:5000/api/flashcards/auto",
      { params: { num, topic } }
    );

    const cards = response.data;

    setCardSet({ ...cardSet, cards });
    setVisibility(false);
  };

  const exit = () => {
    setVisibility(false);
  };

  return (
    <div className="modal">
      <div className="modal-box">
        <div className="modal-header">
          <h1>Auto Generate Cards</h1>
          <button className="exit-modal" onClick={exit}>
            <img src={xIcon} />
          </button>
        </div>
        <div className="modal-body">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              getCards(topic, numCards);
            }}
          >
            <div>
              <label for="auto-subject">Subject: </label>
              <input
                type="text"
                id="auto-subject"
                className="auto-subject"
                onChange={handleTopicChange}
              />
            </div>

            <div>
              <label for="auto-num">Number of Cards:</label>
              <input
                type="number"
                id="auto-num"
                className="auto-num"
                onChange={handleNumChange}
              />
            </div>
            <input type="submit" value="Create" className="auto-submit" />
          </form>
        </div>
      </div>
    </div>
    // <form
    //   onSubmit={(event) => {
    //     event.preventDefault();
    //     getCards(topic);
    //   }}
    // >
    //   <input
    //     type="text"
    //     name="topic"
    //     placeholder="What topic would you like your set to be about?"
    //     style={{ width: "500px" }}
    //     onChange={handleChange}
    //   />
    //   <button>Submit</button>
    // </form>
  );
};

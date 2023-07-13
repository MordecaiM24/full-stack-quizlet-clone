import axios from "axios";
import { useState } from "react";

export const AutoCreate = (props) => {
  const [topic, setTopic] = useState("");
  const setCardSet = props.setCardSet;
  const cardSet = props.cardSet;
  const setVisibility = props.setVisibility;

  const handleChange = (event) => {
    const { value } = event.target;
    setTopic(value);
  };

  const getCards = async (topic) => {
    const response = await axios.get(
      "http://192.168.1.23:5000/api/flashcards/auto"
    );
    const cards = response.data.data;
    setCardSet({ ...cardSet, cards });
    setVisibility(false);
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        getCards(topic);
      }}
    >
      <input
        type="text"
        name="topic"
        placeholder="What topic would you like your set to be about?"
        style={{ width: "500px" }}
        onChange={handleChange}
      />
      <button>Submit</button>
    </form>
  );
};

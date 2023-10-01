import axios from "axios";
import { useState } from "react";
import "./Modal.css";
import { xIcon } from "assets/assets";

const tempCards = [
  {
    term: "Cell",
    definition:
      "The basic structural and functional unit of all living organisms, capable of independent existence and reproduction.",
  },
  {
    term: "DNA",
    definition:
      "Deoxyribonucleic acid, a molecule that carries the genetic instructions for the development, functioning, growth, and reproduction of all known living organisms.",
  },
  {
    term: "Gene",
    definition:
      "A unit of heredity that is transferred from parents to offspring and is held to determine some characteristic of the offspring.",
  },
  {
    term: "Evolution",
    definition:
      "The process of change in all forms of life over generations, involving descent with modification through genetic variation, natural selection, and speciation.",
  },
  {
    term: "Photosynthesis",
    definition:
      "The process by which green plants, algae, and some bacteria convert sunlight, carbon dioxide, and water into glucose (a form of stored energy) and release oxygen as a byproduct.",
  },
  {
    term: "Respiration",
    definition:
      "The process by which living organisms take in oxygen and release carbon dioxide, producing energy for cellular activities.",
  },
  {
    term: "Mitosis",
    definition:
      "A type of cell division that results in two daughter cells, each having the same number of chromosomes as the parent cell. It is essential for growth, repair, and asexual reproduction.",
  },
  {
    term: "Ecosystem",
    definition:
      "A biological community of interacting organisms (including plants, animals, and microorganisms) and their physical environment.",
  },
  {
    term: "Homeostasis",
    definition:
      "The ability of an organism or cell to maintain internal stability and equilibrium in response to changes in the external environment.",
  },
  {
    term: "Natural Selection",
    definition:
      "The process by which organisms that are better adapted to their environment tend to survive and reproduce more successfully, leading to evolutionary changes in populations over time.",
  },
];

export const AutoCreate = (props) => {
  const [topic, setTopic] = useState("");
  const [numCards, setNumCards] = useState(0);
  const setCardSet = props.setCardSet;
  const cardSet = props.cardSet;
  const setVisibility = props.setVisibility;
  const changeStyle = props.changeStyle;

  const handleTopicChange = (event) => {
    const { value } = event.target;
    setTopic(value);
  };

  const handleNumChange = (event) => {
    const { value } = event.target;
    setNumCards(value);
  };

  const getCards = async (topic, num) => {
    let response = await axios.get(
      `${process.env.REACT_APP_SERVER_DOMAIN}/api/flashcards/auto`,
      { params: { num, topic } }
    );

    response = response.data;
    setVisibility(false);

    let i = 0;

    const fillCards = () => {
      setTimeout(() => {
        changeStyle(i); //Empty set fills event parameter
        setCardSet({
          ...cardSet,
          cards: [
            ...cardSet.cards,
            (cardSet.cards[i] = { ...response[i], index: i + 1 }),
          ],
        });

        i++;

        window.scrollTo(0, 118 + i * 200);

        if (i < response.length) {
          fillCards();
        }
        if (i == response.length) {
          changeStyle({}, i);
        }
      }, 1500);
    };

    fillCards();

    // for (let i = 0; i < tempCards.length; i++) {
    //   setCardSet({ ...cardSet, cards: [...cards, (cards[i] = tempCards[i])] });
    //   time.sleep(0.5);
    // }
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
            autoComplete="off"
            onSubmit={(event) => {
              event.preventDefault();
              getCards(topic, numCards);
            }}
          >
            <div>
              <label htmlFor="auto-subject">Subject: </label>
              <input
                type="text"
                id="auto-subject"
                className="auto-subject"
                onChange={handleTopicChange}
              />
            </div>

            <div>
              <label htmlFor="auto-num">Number of Cards:</label>
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

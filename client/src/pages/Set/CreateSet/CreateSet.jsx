import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateBody.css";
import "./CreateHeading.css";
import "./Toggle.css";
import {
  createIcon,
  settingIcon,
  flipIcon,
  keyboardIcon,
  trashIcon,
} from "assets/assets";
import axios from "axios";
import { useCookies } from "react-cookie";

export const CreateSet = () => {
  const [cardSet, setCardSet] = useState({
    title: "",
    cards: [
      { index: 0, term: "", definition: "" },
      { index: 1, term: "", definition: "" },
      { index: 2, term: "", definition: "" },
      { index: 3, term: "", definition: "" },
    ],
    public: false,
    userOwner: {
      ownerId: localStorage.getItem("userID"),
      ownerName: localStorage.getItem("username"),
    },
    school: "",
    subject: "",
    description: "",
  });

  const [cookies, _] = useCookies(["access_token"]);

  const navigate = useNavigate("/library");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCardSet({ ...cardSet, [name]: value });
  };

  const handleSubmit = async () => {
    console.log(cardSet);
    try {
      await axios.post(
        "http://localhost:5000/api/flashcards",
        { ...cardSet },
        { headers: { authorization: cookies.access_token } }
      );
      alert("Set created!");
      navigate("/library");
    } catch (err) {
      alert(err);
    }
  };

  const handleCheck = () => {
    setCardSet({ ...cardSet, public: !cardSet.public });
  };

  const handleCardChange = (event, index) => {
    const { name, value } = event.target;
    const cards = [...cardSet.cards];
    cards[index][name] = value;
    console.log(cards[index]);
    setCardSet({ ...cardSet, cards });
  };

  const addCard = () => {
    const cards = [
      ...cardSet.cards,
      { index: cardSet.cards.length, term: "", definition: "" },
    ];
    console.log("Added");
    console.log(cards);
    setCardSet({ ...cardSet, cards });
  };

  const removeCard = (index) => {
    console.log(index);
    const newCards = cardSet.cards.filter((card) => card.index != index);
    console.log("Removed");
    for (let i = index; i < newCards.length; i++) {
      newCards[i].index--;
    }
    console.log(newCards);
    setCardSet({ ...cardSet, cards: newCards });
  };

  return (
    <div className="body">
      <form className="create-set" onSubmit={handleSubmit}>
        <div style={{ marginBottom: "52px" }}>
          <div className="create-set-header">
            <h1>Create a new study set</h1>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                columnGap: "8px",
              }}
            >
              <label className="toggle">
                <input
                  className="toggle-input"
                  type="checkbox"
                  name="public"
                  value="public"
                  onChange={handleCheck}
                />
                <span
                  className="toggle-label"
                  data-off="Private"
                  data-on="Public"
                ></span>
                <span className="toggle-handle"></span>
              </label>
              <input
                style={{
                  backgroundColor: "#4255ff",
                  color: "white",
                  lineHeight: "20px",
                  border: "none",
                  borderRadius: "4px",
                  padding: "8px 16px",
                }}
                placeholder="Submit"
                type="submit"
                onClick={(event) => {
                  event.preventDefault();
                  handleSubmit();
                }}
              />
            </div>
          </div>
          <div className="create-set-heading">
            <input
              name="title"
              type="text"
              className="create-set-title"
              value={cardSet.title}
              placeholder='Enter a title, like "Biology"'
              onChange={handleChange}
            />
            <div className="create-set-extras">
              <textarea
                name="description"
                type="text"
                className="create-set-description"
                value={cardSet.description}
                placeholder="Add a description..."
                onChange={handleChange}
              ></textarea>
              <div className="create-set-environment">
                <input
                  name="school"
                  type="text"
                  className="create-set-school"
                  value={cardSet.school}
                  placeholder="School"
                  onChange={handleChange}
                />
                <input
                  name="subject"
                  type="text"
                  className="create-set-subject"
                  value={cardSet.subject}
                  placeholder="Subject"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="create-set-options">
            <div className="create-set-functions">
              <button>
                <img src={createIcon} />
                Import
              </button>
              <button>
                <img src={createIcon} />
                Add diagram
              </button>
              <button>Create from notes</button>
            </div>
            <div className="create-set-utility">
              <button>
                <img src={settingIcon} />
              </button>
              <button>
                <img src={flipIcon} />
              </button>
              <button>
                <img src={keyboardIcon} />
              </button>
            </div>
          </div>
        </div>
        <div className="create-set-body">
          {cardSet.cards.map((card, index) => {
            return (
              <li className="create-set-card" key={index}>
                <div className="create-set-taskbar">
                  <p>{index + 1}</p>
                  <button
                    onClick={() => removeCard(index)}
                    type="button"
                    style={{
                      backgroundColor: "#2e3856",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <img src={trashIcon} style={{ height: "18px" }} />
                  </button>
                </div>
                <div className="card-body">
                  <div className="term-container">
                    <input
                      type="text"
                      className="create-term"
                      name="term"
                      value={card.term}
                      placeholder="Enter term"
                      onChange={(event) => handleCardChange(event, index)}
                    />
                    <p>T E R M</p>
                  </div>
                  <div className="definition-container">
                    <input
                      type="text"
                      className="create-definition"
                      name="definition"
                      value={card.definition}
                      placeholder="Enter definition"
                      onChange={(event) => handleCardChange(event, index)}
                    />
                    <p>D E F I N I T I O N</p>
                  </div>
                </div>
              </li>
            );
          })}
          <button onClick={addCard} type="button" className="add-card">
            <span
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                color: "#1a1d28",
              }}
            >
              {cardSet.cards.length + 1}
            </span>
            <span
              style={{
                fontWeight: "bold",
                color: "white",
                fontSize: "16px",
                borderBottom: "solid 5px #3ccfcf",
                paddingBottom: "12px",
              }}
            >
              + Add Card
            </span>
            <div></div>
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <form
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="title"
        class="create-set-title"
        value={cardSet.title}
        placeholder='Enter a title, like "Biology"'
        onChange={handleChange}
      />
      <label class="toggle">
        <input
          class="toggle-input"
          type="checkbox"
          name="public"
          value="public"
          onChange={handleCheck}
        />
        <span class="toggle-label" data-off="Private" data-on="Public"></span>
        <span class="toggle-handle"></span>
      </label>

      <textarea
        name="description"
        type="text"
        class="create-set-description"
        value={cardSet.description}
        placeholder="Add a description..."
        onChange={handleChange}
      ></textarea>

      <input
        name="school"
        type="text"
        class="create-set-school"
        value={cardSet.school}
        placeholder="School"
        onChange={handleChange}
      />

      <input
        name="subject"
        type="text"
        class="create-set-subject"
        value={cardSet.subject}
        placeholder="Subject"
        onChange={handleChange}
      />

      {cardSet.cards.map((card, index) => {
        return (
          <li className="create-set-card" key={index}>
            <input
              type="text"
              class="create-term"
              name="term"
              value={card.term}
              placeholder="Enter term"
              onChange={(event) => handleCardChange(event, index)}
            />
            <input
              type="text"
              class="create-definition"
              name="definition"
              value={card.definition}
              placeholder="Enter definition"
              onChange={(event) => handleCardChange(event, index)}
            />
            <button onClick={() => removeCard(index)} type="button">
              Remove Card
            </button>
          </li>
        );
      })}
      <button onClick={addCard} type="button">
        Add Card
      </button>

      <input
        style={{
          backgroundColor: "#4255ff",
          color: "white",
          lineHeight: "20px",
          border: "none",
          borderRadius: "4px",
          padding: "8px 16px",
        }}
        placeholder="Submit"
        type="submit"
      />
    </form>
  ); // Old, css-less version. Still useful for debugging without css clutter
};

const error = ({ props }) => {};

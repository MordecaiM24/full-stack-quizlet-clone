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
  xIcon,
} from "assets/assets";
import axios from "axios";
import { useCookies } from "react-cookie";
import { AutoCreate } from "./AutoCreate";

export const CreateSet = () => {
  const [cardSet, setCardSet] = useState({
    title: "",
    cards: [{ index: 0, term: "", definition: "" }],
    public: false,
    userOwner: {
      ownerId: localStorage.getItem("userID"),
      ownerName: localStorage.getItem("username"),
    },
    school: "",
    subject: "",
    description: "",
    qa: [],
  });

  const [cookies, _] = useCookies(["access_token"]);

  const navigate = useNavigate("/");

  const [visibility, setVisibility] = useState(false);

  const [showOutline, setOutline] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCardSet({ ...cardSet, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      console.log("Submitted");
      const newArray = cardSet.cards.map(({ index, ...card }) => card);
      const cards = JSON.stringify({ newArray });
      console.log("CARDS PASSED");
      console.log(cards);
      const res = await axios.post("http://192.168.1.23:5000/qa", {
        data: cards,
      });

      console.log("Getting QA");
      console.log(res.data);

      let newCardSet = cardSet;
      console.log(cardSet);

      newCardSet = {
        ...newCardSet,
        qa: res.data,
      };
      console.log(newCardSet);

      await axios.post("http://192.168.1.23:5000/api/flashcards", newCardSet, {
        headers: { authorization: cookies.access_token },
      });

      alert("Set created!");
      navigate("/library");
    } catch (err) {
      alert(err);
      console.log(err);
    }
  };

  const handleCheck = () => {
    setCardSet({ ...cardSet, public: !cardSet.public });
  };

  const handleCardChange = (event, index) => {
    console.log(event);
    const { name, value } = event.target;
    const cards = [...cardSet.cards];
    cards[index][name] = value;
    setCardSet({ ...cardSet, cards });
  };

  const addCard = () => {
    const cards = [
      ...cardSet.cards,
      { index: cardSet.cards.length, term: "", definition: "" },
    ];
    setCardSet({ ...cardSet, cards });
  };

  const removeCard = (index) => {
    const newCards = cardSet.cards.filter((card) => card.index !== index);
    for (let i = index; i < newCards.length; i++) {
      newCards[i].index--;
    }
    setCardSet({ ...cardSet, cards: newCards });
  };

  const resetCards = () => {
    setCardSet({
      ...cardSet,
      cards: [{ index: 0, term: "", definition: "" }],
    });
  };

  const changeStyle = (index) => {
    let temp = [...showOutline];
    temp[index] = !temp[index];
    setOutline(temp);
  };

  return (
    <div className="body">
      {visibility && (
        <AutoCreate
          setCardSet={setCardSet}
          cardSet={cardSet}
          setVisibility={setVisibility}
          changeStyle={changeStyle}
        />
      )}
      <form autoComplete="off" className="create-set" onSubmit={handleSubmit}>
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
                  cursor: "pointer",
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
                <img src={createIcon} alt="Import set" />
                Import
              </button>
              <button type="button" onClick={resetCards}>
                <img src={xIcon} style={{ height: "22px" }} alt="Reset cards" />
                Reset Cards
              </button>
              <button type="button" onClick={() => setVisibility(true)}>
                Autocreate Set
              </button>
            </div>
            <div className="create-set-utility">
              <button>
                <img src={settingIcon} alt="Settings" />
              </button>
              <button>
                <img src={flipIcon} alt="Flip" />
              </button>
              <button>
                <img src={keyboardIcon} alt="Keyboard" />
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
                    <img
                      src={trashIcon}
                      style={{ height: "18px" }}
                      alt="Delete card"
                    />
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
                      style={{
                        outline: showOutline[index] && "solid 2px white",
                        borderRadius: showOutline[index] && "4px",
                        borderBottom: showOutline[index] && "none",
                        padding: showOutline[index] && "12px",
                      }}
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
                      style={{
                        outline: showOutline[index] && "solid 2px white",
                        borderRadius: showOutline[index] && "4px",
                        borderBottom: showOutline[index] && "none",
                        padding: showOutline[index] && "12px",
                      }}
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

  // return (
  //   <form
  //     style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
  //     onSubmit={handleSubmit}
  //   >
  //     <input
  //       type="text"
  //       name="title"
  //       class="create-set-title"
  //       value={cardSet.title}
  //       placeholder='Enter a title, like "Biology"'
  //       onChange={handleChange}
  //     />
  //     <label class="toggle">
  //       <input
  //         class="toggle-input"
  //         type="checkbox"
  //         name="public"
  //         value="public"
  //         onChange={handleCheck}
  //       />
  //       <span class="toggle-label" data-off="Private" data-on="Public"></span>
  //       <span class="toggle-handle"></span>
  //     </label>

  //     <textarea
  //       name="description"
  //       type="text"
  //       class="create-set-description"
  //       value={cardSet.description}
  //       placeholder="Add a description..."
  //       onChange={handleChange}
  //     ></textarea>

  //     <input
  //       name="school"
  //       type="text"
  //       class="create-set-school"
  //       value={cardSet.school}
  //       placeholder="School"
  //       onChange={handleChange}
  //     />

  //     <input
  //       name="subject"
  //       type="text"
  //       class="create-set-subject"
  //       value={cardSet.subject}
  //       placeholder="Subject"
  //       onChange={handleChange}
  //     />

  //     {cardSet.cards.map((card, index) => {
  //       return (
  //         <li className="create-set-card" key={index}>
  //           <input
  //             type="text"
  //             class="create-term"
  //             name="term"
  //             value={card.term}
  //             placeholder="Enter term"
  //             onChange={(event) => handleCardChange(event, index)}
  //           />
  //           <input
  //             type="text"
  //             class="create-definition"
  //             name="definition"
  //             value={card.definition}
  //             placeholder="Enter definition"
  //             onChange={(event) => handleCardChange(event, index)}
  //           />
  //           <button onClick={() => removeCard(index)} type="button">
  //             Remove Card
  //           </button>
  //         </li>
  //       );
  //     })}
  //     <button onClick={addCard} type="button">
  //       Add Card
  //     </button>

  //     <input
  //       style={{
  //         backgroundColor: "#4255ff",
  //         color: "white",
  //         lineHeight: "20px",
  //         border: "none",
  //         borderRadius: "4px",
  //         padding: "8px 16px",
  //       }}
  //       placeholder="Submit"
  //       type="submit"
  //     />
  //   </form>
  // ); // Old, css-less version. Still useful for debugging without css clutter
};

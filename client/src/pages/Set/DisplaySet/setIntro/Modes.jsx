import { useContext } from "react";
import "./Modes.css";
import { useNavigate } from "react-router-dom";
import { CardsetContext } from "../SetPage";

export const Modes = () => {
  const navigate = useNavigate();
  const { cardSet } = useContext(CardsetContext);

  return (
    <div class="modes">
      <button class="gamemode">
        <h3>Flashcards</h3>
      </button>
      <button
        onClick={() => {
          navigate(`/learn/${cardSet._id}`);
        }}
        class="gamemode"
      >
        <h3>Learn</h3>
      </button>
      <button class="gamemode">
        <h3>Test</h3>
      </button>
      <button class="gamemode">
        <h3>Match</h3>
      </button>
      <button class="gamemode">
        <h3>Q-Chat</h3>
      </button>
    </div>
  );
};

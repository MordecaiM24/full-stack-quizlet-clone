import { lightbulbIcon, pencilIcon, soundIcon, star } from "assets/assets";

export const CardOptions = () => {
  return (
    <div className="card-options">
      <button className="hint-btn" onClick={(event) => event.stopPropagation()}>
        <img className="lightbulb-icon" src={lightbulbIcon} />
        <a>Get a hint</a>
      </button>
      <div className="options">
        <button
          className="edit-btn"
          onClick={(event) => event.stopPropagation()}
        >
          <img src={pencilIcon} className="pencil-icon" />
        </button>
        <button
          className="speaker-btn"
          onClick={(event) => event.stopPropagation()}
        >
          <img src={soundIcon} className="sound-icon" />
        </button>
        <button
          className="favorite-btn"
          onClick={(event) => event.stopPropagation()}
        >
          <img src={star} className="star-icon" />
        </button>
      </div>
    </div>
  );
};

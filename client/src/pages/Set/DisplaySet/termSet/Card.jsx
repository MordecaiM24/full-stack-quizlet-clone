import "./CardStyle.css";

export const Card = ({ card }) => {
  return (
    <div className="term">
      <div className="small-side">
        <a className="word">{card.term}</a>
      </div>
      <div className="large-side">
        <a className="defintion">{card.definition}</a>
      </div>
    </div>
  );
};

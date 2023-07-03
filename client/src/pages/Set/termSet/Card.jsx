import "./CardStyle.css";

export const Card = ({ card }) => {
  return (
    <div class="term">
      <div class="small-side">
        <a class="word">{card.term}</a>
      </div>
      <div class="large-side">
        <a class="defintion">{card.definition}</a>
      </div>
    </div>
  );
};

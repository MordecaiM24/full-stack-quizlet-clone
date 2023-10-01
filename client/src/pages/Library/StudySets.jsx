import { downArrow, profPic, searchIcon } from "assets/assets";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const StudySets = () => {
  const [cardSets, setCardSets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSets = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_DOMAIN}/api/flashcards`
        );
        setCardSets(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSets();
  }, []);

  useEffect(() => {
    console.log(`SET NUMBER ${cardSets.length}`);
    console.log(`SET LIST`);
  }, [cardSets]);

  return (
    <div className="personal-study-sets">
      <div className="study-set-header">
        <button className="set-sort">
          Recent <img src={downArrow} style={{ height: "24px" }} />
        </button>
        <div className="set-search-container">
          <input
            className="set-search"
            type="search"
            placeholder="Search your sets"
          />
          <img src={searchIcon} className="set-search-icon" />
        </div>
      </div>
      <header className="time-seperator">
        <h5 className="time-label">THIS WEEK</h5>
        <div className="time-seperator-line">
          <hr color="#282e3e" />
        </div>
      </header>
      {cardSets.map((set) => {
        return (
          <div
            className="study-set"
            onClick={() => {
              navigate(`/cards/${set._id}`);
            }}
            style={{ cursor: "pointer" }}
          >
            <div className="set-info">
              <p className="term-count">{set.cards.length} terms</p>
              <div className="set-creator">
                <img className="set-creator-prof-pic" src={profPic} />
                <p className="set-creator-user">{set.userOwner.ownerName}</p>
              </div>
            </div>
            <h2 className="set-title">{set.title}</h2>
          </div>
        );
      })}
    </div>
  );
};

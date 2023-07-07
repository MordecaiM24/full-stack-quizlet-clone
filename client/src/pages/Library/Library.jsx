import axios from "axios";
import { Loading } from "common/Loading";
import { useState, useEffect } from "react";

export const Library = () => {
  const [isLoading, setLoading] = useState(false);
  const [cardSets, setCardSets] = useState([]);

  useEffect(() => {
    const fetchSets = async () => {
      try {
        const response = await axios.get(
          `http://192.168.1.23:5000/api/flashcards/`
        );
        setCardSets(response.data);
        setLoading(false);

        if (cardSets === {}) {
          throw new Error("err");
        }
      } catch (err) {
        setCardSets(null);
      }
    };

    fetchSets(); //Create context
  }, []);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <div>
        {cardSets.map((cardSet) => {
          return (
            <>
              <p>{cardSet.title}</p>
              <p>{cardSet.userOwner}</p>
            </>
          );
        })}
      </div>
    );
  }
};

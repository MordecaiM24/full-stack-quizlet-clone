import axios from "axios";
import { Loading } from "common/Loading";
import { useState, useEffect } from "react";
import "./Library.css";
import { LibraryHeader } from "./LibraryHeader";
import { StudySets } from "./StudySets";

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
      <div className="body">
        <div className="library-page">
          <LibraryHeader />
          <StudySets />
        </div>
      </div>
    );
  }
};

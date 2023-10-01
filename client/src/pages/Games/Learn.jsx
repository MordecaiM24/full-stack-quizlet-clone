import axios from "axios";
import { Loading } from "common/Loading";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./learn.css";
import { learnIcon, downArrow, xIcon, redX, check } from "assets/assets";
import "./validate.css";
import "./options-modal.css";

export const Learn = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [cardSet, setCardSet] = useState({});
  const [isLoading, setLoading] = useState(true);
  // Loading state implemented so that useeffects don't crash
  const [currentCard, setCurrentCard] = useState(0);
  const [cardContent, setCardContent] = useState({
    question: "",
    questionType: "",
    answerType: "",
  });
  const [answer, setAnswer] = useState("");
  const [answerBox, setAnswerBox] = useState({
    inputAnswer: true,
    wrongAnswer: false,
    correctAnswer: false,
    skippedAnswer: false,
  });
  const [showModal, setModal] = useState(false);

  const [options, setOptions] = useState({
    shuffleTerms: false,
    flashcards: false,
    multipleChoice: false,
    written: true,
    writeMode: false,
    spellMode: false,
    questionFormat: {
      answerWithTerm: true,
      answerWithDefinition: false,
      fillInBlank: false,
    },
  });

  // useEffect(() => {
  //   console.log(`CARD SET: ${JSON.stringify(cardSet)}`);
  //   console.log(`CURRENT CARD: ${currentCard}`);
  //   console.log(`ANSWER: ${answer}`);
  //   console.log(`CARD CONTENT: ${JSON.stringify(cardContent)}`);
  // }, [cardContent, cardSet, currentCard, answer]);

  const createCardContent = (currentCard, cards) => {
    // if (
    //   options.questionFormat.answerWithDefinition &&
    //   options.questionFormat.answerWithTerm
    // ) {
    //   setCardContent(
    //     Math.random() < 0.5
    //       ? {
    //           question: cards[currentCard].term,
    //           questionType: "Term",
    //           answerType: "definition",
    //         }
    //       : {
    //           question: cards[currentCard].definition,
    //           questionType: "Definition",
    //           answerType: "term",
    //         }
    //   );
    // }
    // if (options.questionFormat.answerWithDefinition) {
    //   setCardContent({
    //     question: cards[currentCard].term,
    //     questionType: "Term",
    //     answerType: "definition",
    //   });
    // }
    if (options.questionFormat.answerWithTerm) {
      setCardContent({
        question: cards[currentCard].definition,
        questionType: "Definition",
        answerType: "term",
      });
    }
    // if (options.questionFormat.fillInBlank) {
    //   setCardContent({
    //     question: cardSet.qa[currentCard].question,
    //     questionType: "Fill in the Blank",
    //     answerType: "answer",
    //   });
    // }
  };

  useEffect(() => {
    const fetchSet = async () => {
      const setID = id;
      try {
        const response = await axios.get(
          `http://localhost:5000/api/flashcards/${setID}`
        );
        setCardSet(response.data[0]);
        setLoading(false);

        createCardContent(currentCard, response.data[0].cards);

        if (cardSet == {}) {
          throw new Error("err");
        }
      } catch (err) {
        setCardSet([]);
      }
    };

    fetchSet(); //Create context
  }, []);

  useEffect(() => {
    if (cardContent.question) {
      console.log("Resetting card content");
      console.log("1." + cardSet.cards[currentCard].definition);
      // if statement prevents render attempt before setting
      // if (options.questionFormat.answerWithTerm) {
      // setCardContent(cardSet.cards[currentCard].definition);
      setCardContent({
        question: cardSet.cards[currentCard].definition,
        questionType: "Definition",
        answerType: "term",
      });
      // }
      // if (options.questionFormat.answerWithDefinition) {
      //   setCardContent(cardSet.cards[currentCard].term);
      // }
      // if (options.questionFormat.fillInBlank) {
      //   createCardContent(currentCard);
      // }
    }
  }, [currentCard]);

  const checkAnswer = (event) => {
    console.log(cardContent);
    console.log(cardSet);
    console.log(cardSet.cards);
    console.log(currentCard);
    console.log(cardSet.cards[currentCard]);
    console.log(cardContent.answerType);

    event.preventDefault();
    if (
      options.questionFormat.answerWithDefinition ||
      options.questionFormat.answerWithTerm
    ) {
      if (
        answer.toLowerCase() ===
        cardSet.cards[currentCard][cardContent.answerType].toLowerCase()
      ) {
        setAnswerBox({
          inputAnswer: false,
          wrongAnswer: false,
          correctAnswer: true,
          skippedAnswer: false,
        });
      } else {
        setAnswerBox({
          inputAnswer: false,
          wrongAnswer: true,
          correctAnswer: false,
          skippedAnswer: false,
        });
      }
    } else if (options.questionFormat.fillInBlank) {
      if (
        answer.toLowerCase() === cardSet.qa[currentCard].answer.toLowerCase()
      ) {
        setAnswerBox({
          inputAnswer: false,
          wrongAnswer: false,
          correctAnswer: true,
          skippedAnswer: false,
        });
      } else {
        setAnswerBox({
          inputAnswer: false,
          wrongAnswer: true,
          correctAnswer: false,
          skippedAnswer: false,
        });
      }
    }
  };

  const nextCard = () => {
    console.log(currentCard);
    setAnswer("");
    setCurrentCard(currentCard + 1);
    setAnswerBox({
      inputAnswer: true,
      wrongAnswer: false,
      correctAnswer: false,
    });
    console.log(currentCard);
  };

  const handleTermChange = () => {
    setOptions({
      ...options,
      questionFormat: {
        answerWithTerm: !options.questionFormat.answerWithTerm,
        answerWithDefinition: false,
        fillInBlank: false,
      },
    });
  };

  const handleQAChange = () => {
    setOptions({
      ...options,
      questionFormat: {
        answerWithTerm: false,
        answerWithDefinition: false,
        fillInBlank: !options.questionFormat.fillInBlank,
      },
    });
  };

  const handleCheck = () => {};

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <>
        {showModal && (
          <div className="modal">
            <div className="options-modal">
              <div className="options-modal-header">
                <h1>Options</h1>
                <button
                  onClick={() => {
                    setModal(false);
                  }}
                >
                  <img src={xIcon} />
                </button>
              </div>
              <div className="option">
                <span>Study starred terms only</span>
                <label className="option-toggle">
                  <input
                    className="option-toggle-input"
                    type="checkbox"
                    name="starred"
                    onChange={handleCheck}
                  />
                  <span className="option-toggle-label"></span>
                  <span className="option-toggle-handle"></span>
                </label>
              </div>
              <div className="option">
                <span>Shuffle terms</span>
                <label className="option-toggle">
                  <input
                    className="option-toggle-input"
                    type="checkbox"
                    name="shuffle"
                    onChange={handleCheck}
                  />
                  <span className="option-toggle-label"></span>
                  <span className="option-toggle-handle"></span>
                </label>
              </div>
              <div className="option">
                <span>Flashcards</span>
                <label className="option-toggle">
                  <input
                    className="option-toggle-input"
                    type="checkbox"
                    name="flash"
                    onChange={handleCheck}
                  />
                  <span className="option-toggle-label"></span>
                  <span className="option-toggle-handle"></span>
                </label>
              </div>
              <div className="option">
                <span>Multiple Choice</span>
                <label className="option-toggle">
                  <input
                    className="option-toggle-input"
                    type="checkbox"
                    name="mc"
                    onChange={handleCheck}
                  />
                  <span className="option-toggle-label"></span>
                  <span className="option-toggle-handle"></span>
                </label>
              </div>
              <div className="option">
                <span>Written</span>
                <label className="option-toggle">
                  <input
                    className="option-toggle-input"
                    type="checkbox"
                    name="written"
                    checked
                    onChange={handleCheck}
                  />
                  <span className="option-toggle-label"></span>
                  <span className="option-toggle-handle"></span>
                </label>
              </div>
              <div className="option">
                <span>Answer with Term</span>
                <label className="option-toggle">
                  <input
                    className="option-toggle-input"
                    type="checkbox"
                    name="answerWithTerm"
                    onChange={handleTermChange}
                    checked={options.questionFormat.answerWithTerm && "checked"}
                  />
                  <span className="option-toggle-label"></span>
                  <span className="option-toggle-handle"></span>
                </label>
              </div>
              <div className="option">
                <span>Answer with Definition</span>
                <label className="option-toggle">
                  <input
                    className="option-toggle-input"
                    type="checkbox"
                    name="answerWithDef"
                    onChange={handleCheck}
                  />
                  <span className="option-toggle-label"></span>
                  <span className="option-toggle-handle"></span>
                </label>
              </div>
              <div className="option">
                <span>Question & Answer (Experimental) </span>
                <label className="option-toggle">
                  <input
                    className="option-toggle-input"
                    type="checkbox"
                    name="starred"
                    onChange={handleQAChange}
                    checked={options.questionFormat.fillInBlank && "checked"}
                  />
                  <span className="option-toggle-label"></span>
                  <span className="option-toggle-handle"></span>
                </label>
              </div>
            </div>
          </div>
        )}
        <header className="learn-header">
          <button className="learn">
            <img src={learnIcon} className="learn-icon" /> Learn
            <img src={downArrow} className="down-arrow" />
          </button>
          <h4>Round 1</h4>
          <div className="header-options">
            <button className="options-btn" onClick={() => setModal(true)}>
              Options
            </button>
            <button
              className="exit-btn"
              onClick={() => navigate(`/cards/${cardSet._id}`)}
            >
              <img src={xIcon} />
            </button>
          </div>
        </header>
        {answerBox.inputAnswer && (
          <div className="learn-box">
            <div className="question-box">
              <div className="question-type">{cardContent.questionType}</div>
              <span className="question">{cardContent.question}</span>
              <button className="hint">Show hint</button>
            </div>

            <form className="answer-box" onSubmit={checkAnswer}>
              <label htmlFor="answer">Your Answer</label>
              <input
                type="text"
                name="answer"
                id="answer"
                className="answer"
                placeholder="Type the answer"
                autoComplete="off"
                onChange={(event) => setAnswer(event.target.value)}
                value={answer}
              />
              <div className="answer-options">
                <button className="idk-btn">Don't know?</button>
                <button className="answer-btn" type="submit">
                  Answer
                </button>
              </div>
            </form>
          </div>
        )}
        {answerBox.wrongAnswer && (
          <WrongAnswer
            answer={answer}
            cards={cardSet.cards}
            currentCard={currentCard}
            cardContent={cardContent}
            nextCard={nextCard}
            fillIn={cardSet.qa}
          />
        )}
        {answerBox.correctAnswer && (
          <CorrectAnswer
            answer={answer}
            setAnswer={setAnswer}
            setCurrentCard={setCurrentCard}
            setAnswerBox={setAnswerBox}
            currentCard={currentCard}
            cardContent={cardContent}
          />
        )}
      </>
    );
  }
};

const WrongAnswer = (props) => {
  const answer = props.answer;
  const cards = props.cards;
  const currentCard = props.currentCard;
  const { question, questionType, answerType } = props.cardContent;
  const nextCard = props.nextCard;
  const qa = props.fillIn;

  return (
    <>
      <div className="learn-box">
        <div className="question-box">
          <div className="question-type">{questionType}</div>
          <span className="question">{question}</span>
          <button className="hint">Show hint</button>
        </div>
        <div className="incorrect-box">
          <span className="incorrect-msg">
            No problem. You're still learning!
          </span>
          <section className="incorrect-answer">
            <img src={redX} className="red-x" />
            {answer}
          </section>
        </div>
        <div className="correct-box">
          <span className="correct-label">Correct answer </span>
          <section className="correct-answer">
            <img src={check} className="check" />
            {questionType === "Fill in the Blank"
              ? qa[currentCard][answerType]
              : cards[currentCard][answerType]}
          </section>
        </div>
      </div>
      <div className="post-answer-options">
        <span>Press any key to continue</span>
        <button onClick={nextCard}>Continue</button>
      </div>
    </>
  );
};

const CorrectAnswer = (props) => {
  const { answer, setAnswer, setCurrentCard, setAnswerBox, currentCard } =
    props;
  const { question, questionType } = props.cardContent;

  setTimeout(() => {
    setAnswer("");
    setCurrentCard(currentCard + 1);
    setAnswerBox({
      inputAnswer: true,
      wrongAnswer: false,
      correctAnswer: false,
    });
  }, 500);

  return (
    <>
      <div className="learn-box">
        <div className="question-box">
          <div className="question-type">{questionType}</div>
          <span className="question">{question}</span>
          <button className="hint">Show hint</button>
        </div>

        <div className="correct-box">
          <span className="correct-msg">Great! </span>
          <section className="correct-answer">
            <img src={check} className="check" />
            {answer}
          </section>
        </div>
      </div>
    </>
  );
};

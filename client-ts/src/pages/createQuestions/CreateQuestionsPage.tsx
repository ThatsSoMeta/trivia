import React, { ChangeEvent, useState } from "react";
import { Question, QType, addQuestion, Difficulty, testQuestion } from "../../API";
import { CreateQuestionStyle } from "./CreateQuestion.styles";

export const CreateQuestionsPage = () => {
  const [categories] = useState([
    "movies",
    "music",
    "television",
    "geography",
    "math",
    "literature",
    "other",
  ]);
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.UNSET);
  const [type, setType] = useState<QType>(QType.UNSET);
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([""]);
  const [incorrectAnswers, setIncorrectAnswers] = useState<string[]>([
    "",
    "",
    "",
  ]);
  const [message, setMessage] = useState<string>("");
  const [updateComplete, setUpdateComplete] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const newQuestion= new Question(
      category,
      type,
      difficulty,
      question,
      correctAnswers,
      incorrectAnswers,
      'Drewski'
    );
    await addQuestion(newQuestion)
      .then(() => {
        setCategory("");
        setCorrectAnswers([""]);
        setDifficulty(Difficulty.UNSET);
        setIncorrectAnswers(["", "", ""]);
        setNewCategory("");
        setQuestion("");
        setType(QType.UNSET);
        setMessage("Successfully created question!");
        setUpdateComplete(true);
      })
      .then(() => {
        setLoading(false);
      });
  };

  const toggleDifficulty = (level: Difficulty) => {
    if (level === difficulty) {
      setDifficulty(Difficulty.UNSET);
    } else {
      setDifficulty(level);
    }
  };

  const toggleType = (level: QType) => {
    if (level === type) {
      setType(QType.UNSET);
    } else {
      setType(level);
    }
  };

  const toggleCategory = (level: string) => {
    if (level === category) {
      setCategory("");
    } else {
      setCategory(level);
    }
  };

  const toggleTF = (choice: string[]) => {
    if (correctAnswers === choice) {
      setCorrectAnswers([]);
    } else {
      setCorrectAnswers(choice);
    }
  };

  const updateAnswers = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    let index = parseInt(target.id);
    let currentAnswers = [...correctAnswers];
    currentAnswers[index] = target.value;
    setCorrectAnswers(currentAnswers);
  };

  const addAnswerInput = () => {
    setCorrectAnswers((prev) => [...prev, ""]);
  };

  const handleTestClick = (question: Question) => {
    question.correctGuess()
    question.correctGuess()
    question.correctGuess()
    question.correctGuess()
    question.incorrectGuess()
    console.log(question.getCorrectRate())
    console.log(question)
    console.log(question.getAllAnswers())
    question.ask()
  }

  return (
    <>
      <header>
        <h2>Create New Question</h2>
      </header>
      <button onClick={() => handleTestClick(testQuestion)}>Test Question Class</button>
      <CreateQuestionStyle>
        {loading ? (
          <h3>Loading...</h3>
        ) : updateComplete && message ? (
          <div id='update-complete'>
            <h3>{message}</h3>
            <input 
              className='button'
              type='button'
              value='New Question'
              id='new-question'
              onClick={(e) => {
                e.preventDefault()
                setUpdateComplete(false)
                window.scrollTo({top: 0})
              }}
            />
          </div>
        ) : (
          <form>
            <label className="field-label">Difficulty:</label>
            <br />
            <input
              style={
                difficulty === "kids" ? { boxShadow: "0 0 15px cyan" } : {}
              }
              className="button"
              type="button"
              value={Difficulty.KIDS}
              name="kids"
              id="kids"
              onClick={() => toggleDifficulty(Difficulty.KIDS)}
            />
            <input
              style={
                difficulty === "easy" ? { boxShadow: "0 0 15px cyan" } : {}
              }
              className="button"
              type="button"
              value={Difficulty.EASY}
              name="easy"
              id="easy"
              onClick={() => toggleDifficulty(Difficulty.EASY)}
            />
            <input
              style={
                difficulty === "medium" ? { boxShadow: "0 0 15px cyan" } : {}
              }
              className="button"
              type="button"
              value={Difficulty.MEDIUM}
              name="medium"
              id="medium"
              onClick={() => toggleDifficulty(Difficulty.MEDIUM)}
            />
            <input
              style={
                difficulty === "hard" ? { boxShadow: "0 0 15px cyan" } : {}
              }
              className="button"
              type="button"
              value={Difficulty.HARD}
              name="hard"
              id="hard"
              onClick={() => toggleDifficulty(Difficulty.HARD)}
            />
            <br />
            <label className="field-label">Type of question:</label>
            <br />
            <input
              style={
                type === QType.MULTIPLE_CHOICE ? { boxShadow: "0 0 15px cyan" } : {}
              }
              className="button"
              type="button"
              value="Multiple Choice"
              onClick={() => toggleType(QType.MULTIPLE_CHOICE)}
            />
            <input
              style={
                type === QType.TRUE_FALSE ? { boxShadow: "0 0 15px cyan" } : {}
              }
              className="button"
              type="button"
              value="True or False"
              onClick={() => toggleType(QType.TRUE_FALSE)}
            />
            <input
              style={
                type === QType.OPEN_ENDED ? { boxShadow: "0 0 15px cyan" } : {}
              }
              className="button"
              type="button"
              value="Open Ended"
              onClick={() => toggleType(QType.OPEN_ENDED)}
            />
            <input
              style={
                type === QType.CHOOSE_MANY ? { boxShadow: "0 0 15px cyan" } : {}
              }
              className="button"
              type="button"
              value="Choose Many"
              onClick={() => toggleType(QType.CHOOSE_MANY)}
            />
            <br />
            <label className="field-label">Category:</label>
            <br />
            {categories.map((cat) => (
              <input
                style={cat === category ? { boxShadow: "0 0 15px cyan" } : {}}
                className="button"
                type="button"
                key={cat}
                value={categories.includes(cat) ? cat : newCategory}
                onClick={(e) => toggleCategory(e.currentTarget.value)}
              />
            ))}
            <br />
            {category !== "" &&
            (!categories.includes(category) || category === "other") ? (
              <>
                <input
                  type="text"
                  id="category"
                  className="question-input"
                  autoFocus
                  value={category !== "other" ? category : newCategory}
                  placeholder="Category"
                  onChange={(e) => setNewCategory(e.currentTarget.value)}
                />
                <br />
              </>
            ) : null}
            <label className="field-label">Question:</label>
            <br />
            <input
              type="text"
              name="question"
              id="question"
              className="question-input"
              value={question}
              onChange={(e) => setQuestion(e.currentTarget.value)}
              placeholder="Type your question here..."
            />
            <br />
            {type === QType.OPEN_ENDED ? (
              <label className="field-label">Answer:</label>
            ) : (
              <label className="field-label">Answers:</label>
            )}
            <br />
            {type === QType.MULTIPLE_CHOICE ? (
              <div id="multiple-choice-answers">
                <input
                  type="text"
                  className="question-input correct-answer"
                  id="0"
                  placeholder="Correct answer..."
                  value={correctAnswers[0]}
                  onChange={(e) => setCorrectAnswers([e.currentTarget.value])}
                />
                <br />
                <input
                  type="text"
                  className="question-input incorrect-answer"
                  id="incorrect-answer"
                  placeholder="Incorrect answer..."
                  value={incorrectAnswers[0]}
                  onChange={(e) =>
                    setIncorrectAnswers([
                      e.currentTarget.value,
                      incorrectAnswers[1],
                      incorrectAnswers[2],
                    ])
                  }
                />
                <br />
                <input
                  type="text"
                  className="question-input incorrect-answer"
                  id="incorrect-answer"
                  placeholder="Incorrect answer..."
                  value={incorrectAnswers[1]}
                  onChange={(e) =>
                    setIncorrectAnswers([
                      incorrectAnswers[0],
                      e.currentTarget.value,
                      incorrectAnswers[2],
                    ])
                  }
                />
                <br />
                <input
                  type="text"
                  className="question-input incorrect-answer"
                  id="incorrect-answer"
                  placeholder="Incorrect answer..."
                  value={incorrectAnswers[2]}
                  onChange={(e) =>
                    setIncorrectAnswers([
                      incorrectAnswers[0],
                      incorrectAnswers[1],
                      e.currentTarget.value,
                    ])
                  }
                />
                <br />
                <input type="button" className="button" value="+" />
              </div>
            ) : type === QType.TRUE_FALSE ? (
              <>
                <input
                  style={
                    correctAnswers[0] === "True"
                      ? { boxShadow: "0 0 15px cyan" }
                      : {}
                  }
                  type="button"
                  className="button"
                  id="true"
                  value="True"
                  onClick={() => toggleTF(["True"])}
                />
                <input
                  style={
                    correctAnswers[0] === "False"
                      ? { boxShadow: "0 0 15px cyan" }
                      : {}
                  }
                  type="button"
                  className="button"
                  id="false"
                  value="False"
                  onClick={() => toggleTF(["False"])}
                />
              </>
            ) : type === QType.OPEN_ENDED || type === QType.UNSET ? (
              <input
                type="text"
                className="question-input correct-answer"
                id="correct-answer"
                placeholder="Correct answer..."
                onChange={(e) => setCorrectAnswers([e.currentTarget.value])}
              />
            ) : type === QType.CHOOSE_MANY ? (
              <div>
                <div id="choose-many-input">
                  {correctAnswers.map((_, index) => {
                    let name = `choose-many-answers-${index}`;
                    return (
                      <input
                        type="text"
                        name={name}
                        className="question-input correct-answer choose-many"
                        id={String(index)}
                        key={index}
                        defaultValue={correctAnswers[index]}
                        placeholder="Correct answer..."
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          updateAnswers(e)
                        }
                      />
                    );
                  })}
                </div>
                <button
                  about="Add Answer"
                  onClick={(e) => {
                    e.preventDefault();
                    addAnswerInput();
                  }}
                >
                  +
                </button>
              </div>
            ) : null}
            <br />
            <hr />
            <input
              className="button"
              type="submit"
              value="Submit Question"
              id="submit"
              disabled={loading || updateComplete}
              onClick={() => handleSubmit()}
            />
          </form>
        )}
      </CreateQuestionStyle>
    </>
  );
};

import React, { ChangeEvent, useState } from "react";
import { Question, QuestionType, addQuestion, Difficulty } from "../../API";
import { CreateQuestionStyle } from "./CreateQuestion.styles";

export const CreateQuestionsPage = () => {
  const [categories] = useState([
    "movies",
    "music",
    "television",
    "geography",
    "other",
  ]);
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.UNSET);
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([""]);
  const [incorrectAnswers, setIncorrectAnswers] = useState<string[]>([
    "",
    "",
    "",
  ]);
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async () => {
    setLoading(true);
    const newQuestion: Question = {
      category,
      correct_answers: correctAnswers,
      difficulty,
      question,
      incorrect_answers: [],
      type: QuestionType.MULTIPLE_CHOICE,
      times_correct: 0,
      times_incorrect: 0,
      _id: "",
    };
    if (type === "multiple choice") {
      newQuestion.incorrect_answers = incorrectAnswers;
      newQuestion.type = QuestionType.MULTIPLE_CHOICE;
    }
    if (type === "true or false") {
      newQuestion.type = QuestionType.TRUE_FALSE;
      if (correctAnswers[0] === "true") {
        newQuestion.incorrect_answers = ["false"];
      } else {
        newQuestion.incorrect_answers = ["true"];
      }
    }
    if (type === "open ended") {
      newQuestion.incorrect_answers = [];
      newQuestion.type = QuestionType.OPEN_ENDED;
    }
    if (type === "choose many") {
      newQuestion.incorrect_answers = [];
      newQuestion.type = QuestionType.CHOOSE_MANY;
    } else {
      newQuestion.correct_answers = correctAnswers.filter((_, i) => i < 1);
    }
    if (category === "other") {
      newQuestion.category = newCategory.toLowerCase();
    }
    await addQuestion(newQuestion)
      .then(() => {
        setCategory("");
        setCorrectAnswers([""]);
        setDifficulty(Difficulty.UNSET);
        setIncorrectAnswers(["", "", ""]);
        setNewCategory("");
        setQuestion("");
        setType("");
        setMessage("Successfully created question!");
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

  const toggleType = (level: string) => {
    if (level.toLowerCase() === type) {
      setType("");
    } else {
      setType(level.toLowerCase());
    }
  };

  const toggleCategory = (level: string) => {
    if (level.toLowerCase() === category) {
      setCategory("");
    } else {
      setCategory(level.toLowerCase());
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

  return (
    <>
      <header>
        <h2>Create New Question</h2>
      </header>
      <CreateQuestionStyle>
        <form>
          <label className="field-label">Difficulty:</label>
          <br />
          <input
            style={difficulty === "kids" ? { boxShadow: "0 0 15px cyan" } : {}}
            className="button"
            type="button"
            value={Difficulty.KIDS}
            name="kids"
            id="kids"
            onClick={() => toggleDifficulty(Difficulty.KIDS)}
          />
          <input
            style={difficulty === "easy" ? { boxShadow: "0 0 15px cyan" } : {}}
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
            style={difficulty === "hard" ? { boxShadow: "0 0 15px cyan" } : {}}
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
              type === "multiple choice" ? { boxShadow: "0 0 15px cyan" } : {}
            }
            className="button"
            type="button"
            value="Multiple Choice"
            onClick={(e) => toggleType(e.currentTarget.value)}
          />
          <input
            style={
              type === "true or false" ? { boxShadow: "0 0 15px cyan" } : {}
            }
            className="button"
            type="button"
            value="True or False"
            onClick={(e) => toggleType(e.currentTarget.value)}
          />
          <input
            style={type === "open ended" ? { boxShadow: "0 0 15px cyan" } : {}}
            className="button"
            type="button"
            value="Open Ended"
            onClick={(e) => toggleType(e.currentTarget.value)}
          />
          <input
            style={type === "choose many" ? { boxShadow: "0 0 15px cyan" } : {}}
            className="button"
            type="button"
            value="Choose Many"
            onClick={(e) => toggleType(e.currentTarget.value)}
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
          {type === "choose many" ? (
            <label className="field-label">Answers:</label>
          ) : (
            <label className="field-label">Answer:</label>
          )}
          <br />
          {type === "multiple choice" ? (
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
          ) : type === "true or false" ? (
            <>
              <input
                style={
                  correctAnswers[0] === "true"
                    ? { boxShadow: "0 0 15px cyan" }
                    : {}
                }
                type="button"
                className="button"
                id="true"
                value="true"
                onClick={() => toggleTF(["true"])}
              />
              <input
                style={
                  correctAnswers[0] === "false"
                    ? { boxShadow: "0 0 15px cyan" }
                    : {}
                }
                type="button"
                className="button"
                id="false"
                value="false"
                onClick={() => toggleTF(["false"])}
              />
            </>
          ) : type === "open ended" || type === "" ? (
            <input
              type="text"
              className="question-input correct-answer"
              id="correct-answer"
              placeholder="Correct answer..."
              onChange={(e) => setCorrectAnswers([e.currentTarget.value])}
            />
          ) : type === "choose many" ? (
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
              about='Add Answer'
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
          <br />
        </form>
      </CreateQuestionStyle>
      <input
        className="button"
        type="submit"
        value="Submit Question"
        id="submit"
        disabled={loading}
        onClick={() => handleSubmit()}
      />
      {message && <span>{message}</span>}
    </>
  );
};

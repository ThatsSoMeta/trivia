import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Question,
  QType,
  updateQuestion,
  fetchSingleQuestion,
  Difficulty,
  deleteQuestion,
} from "../../API";
import {
  EditQuestionPageStyle,
  EditQuestionStyle,
} from "./EditQuestion.styles";
import { useParams } from "react-router-dom";

export const EditQuestionsPage = () => {
  const [categories] = useState<string[]>([
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
  const [questionID, setQuestionID] = useState("");
  const [message, setMessage] = useState("");
  const [updateComplete, setUpdateComplete] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetchSingleQuestion(questionID)
      .then((data) => {
        data = data[0];
        setQuestion(data.question);
        setDifficulty(data.difficulty);
        if (data.correct_answers !== []) {
          setCorrectAnswers(data.correct_answers);
        } else {
          setCorrectAnswers([""]);
        }
        setIncorrectAnswers(data.incorrect_answers);
        setQuestionID(data._id);
        if (categories.includes(data.category)) {
          setCategory(data.category);
        } else {
          setCategory("other");
          setNewCategory(data.category);
        }
        setType(data.type)
      })
      .catch((error) => console.error(error));
    setLoading(false);
  }, []);

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this question? This action can not be undone."
      )
    ) {
      deleteQuestion(questionID);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const newQuestion = new Question(
      category,
      type,
      difficulty,
      question,
      correctAnswers.filter((answer) => answer !== ''),
      incorrectAnswers,
      "Drewski"
      )
      if (category === "other") {
        newQuestion.category = newCategory;
      }
      // category,
      // correct_answers: correctAnswers.filter((answer) => answer !== ""),
      // difficulty,
      // question,
      // incorrect_answers: [],
      // times_correct: timesCorrect,
      // times_incorrect: timesIncorrect,
      // type: QuestionType.MULTIPLE_CHOICE,
      // uploaded_by: 'Guest',
      // _id: questionID,
    // if (type === "multiple choice") {
    //   newQuestion.incorrect_answers = incorrectAnswers;
    //   newQuestion.type = QuestionType.MULTIPLE_CHOICE;
    // }
    // if (type === "true or false") {
    //   newQuestion.type = QuestionType.TRUE_FALSE;
    //   if (correctAnswers[0] === "True") {
    //     newQuestion.incorrect_answers = ["False"];
    //   } else {
    //     newQuestion.incorrect_answers = ["True"];
    //   }
    // }
    // if (type === "open ended") {
    //   newQuestion.incorrect_answers = [];
    //   newQuestion.type = QuestionType.OPEN_ENDED;
    // }
    // if (type === "choose many") {
    //   newQuestion.incorrect_answers = [];
    //   newQuestion.type = QuestionType.CHOOSE_MANY;
    // } else {
    //   newQuestion.correct_answers = correctAnswers.filter((_, i) => i < 1);
    // }
    await updateQuestion(questionID, newQuestion).then(() => {
      setMessage("Question Updated!");
      setUpdateComplete(true);
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

  return (
    <>
      <EditQuestionPageStyle />
      <header>
        <h1>Edit Question</h1>
      </header>
      <EditQuestionStyle>
        {loading ? (
          <h3>Loading...</h3>
        ) : updateComplete && message ? (
          <h3>{message}</h3>
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
            <div id="category-selector">
              {categories ? (
                categories.map((cat, i, list) => {
                  console.log(list[i]);
                  console.log(cat, i, list);
                  if (cat !== "") {
                    return (
                      <input
                        style={
                          cat === category ? { boxShadow: "0 0 15px cyan" } : {}
                        }
                        id={cat}
                        key={String(Math.random())}
                        className="button"
                        type="button"
                        value={
                          categories.includes(cat)
                            ? cat.toLowerCase()
                            : newCategory.toLowerCase()
                        }
                        onClick={(e) => toggleCategory(e.currentTarget.value)}
                      />
                    );
                  }
                })
              ) : (
                <span>Loading Categories...</span>
              )}
            </div>
            <br />
            {category === "other" ? (
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
            {type === QType.CHOOSE_MANY ? (
              <label className="field-label">Answers:</label>
            ) : (
              <label className="field-label">Answer:</label>
            )}
            <br />
            {type === QType.MULTIPLE_CHOICE ? (
              <div id="multiple-choice-answers">
                <input
                  type="text"
                  className="question-input correct-answer"
                  id="correct-answer"
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
            ) : type === QType.OPEN_ENDED ? (
              <input
                type="text"
                className="question-input"
                id="0"
                placeholder="Correct answer..."
                defaultValue=""
                value={correctAnswers[0]}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  updateAnswers(e)
                }
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
                        className="question-input choose-many"
                        id={String(index)}
                        key={index}
                        defaultValue=""
                        value={correctAnswers[index]}
                        placeholder="Correct answer..."
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          updateAnswers(e)
                        }
                      />
                    );
                  })}
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    addAnswerInput();
                  }}
                >
                  Add Answer
                </button>
              </div>
            ) : null}

            <br />
            <br />
          </form>
        )}
        <hr style={{ width: "100%" }} />
        {!updateComplete ? (
          <div id="submit-box">
            <input
              type="button"
              className="button"
              value="Delete Question"
              id="delete"
              disabled={loading || updateComplete}
              onClick={() => handleDelete()}
            />
            <input
              className="button"
              type="submit"
              value="Save Question"
              id="submit"
              disabled={loading || updateComplete}
              onClick={() => handleSubmit()}
            />
          </div>
        ) : (
          <>
            <a href="/questions/create">
              <button>New Question</button>
            </a>
            <a href="/questions/viewAll">
              <button>All Questions</button>
            </a>
          </>
        )}
      </EditQuestionStyle>
    </>
  );
};

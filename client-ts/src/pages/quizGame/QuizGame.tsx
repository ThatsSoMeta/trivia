import React, { useState } from 'react';
import QuestionCard from '../../components/questionCard/QuestionCard';
import {
  Difficulty,
  fetchQuizQuestions,
  QuestionsState,
  QType,
  IQuery,
  IQuestion,
  Question,
  getQuestionCount
} from '../../API';
import {QuizGameStyle} from './QuizGame.styles'


export type AnswerObject = {
  question: string;
  answers: string[];
  correct: boolean;
  correct_answers: string[];
}

const TOTAL_QUESTIONS = 10

export const QuizGame = () => {
  const [loading, setLoading] = useState(false);
  const [gameOver, setGameOver] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentAnswers, setCurrentAnswers] = useState<string[]>([])
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [number, setNumber] = useState(0);
  const [kids, setKids] = useState(false)
  const [easy, setEasy] = useState(false);
  const [medium, setMedium] = useState(false);
  const [hard, setHard] = useState(false);
  const [multipleChoice, setMultipleChoice] = useState(false)
  const [trueFalse, setTrueFalse] = useState(false)
  const [openEnded, setOpenEnded] = useState(false)
  const [chooseMany, setChooseMany] = useState(false)
  const [totalQuestions, setTotalQuestions] = useState(TOTAL_QUESTIONS)

  const toggleDifficulty = (option: Difficulty) => {
  switch (option) {
    case Difficulty.KIDS:
      setKids(!kids)
      break;
    case Difficulty.EASY:
      setEasy(!easy)
      break;
    case Difficulty.MEDIUM:
      setMedium(!medium)
      break;
    case Difficulty.HARD:
      setHard(!hard)
      break;
    default:
      throw TypeError('This is not a valid Difficulty option.')
    }
  }

  const toggleType = (option: QType) => {
    switch (option) {
      case QType.MULTIPLE_CHOICE:
        setMultipleChoice(!multipleChoice);
        break;
      case QType.OPEN_ENDED:
        setOpenEnded(!openEnded);
        break;
      case QType.CHOOSE_MANY:
        setChooseMany(!chooseMany);
        break;
      case QType.TRUE_FALSE:
        setTrueFalse(!trueFalse);
        break;
      default:
        console.log("No type selected")
        break;
    }
  }

  let quizQuery: IQuery = {
    difficulty: [],
    type: [],
    category: [],
    questionID: [],
    uploaded_by: [],
    amount: totalQuestions
  }

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    if (kids) {
      quizQuery.difficulty.push(Difficulty.KIDS)
    }
    if (easy) {
      quizQuery.difficulty.push(Difficulty.EASY)
    }
    if (medium) {
      quizQuery.difficulty.push(Difficulty.MEDIUM)
    }
    if (hard) {
      quizQuery.difficulty.push(Difficulty.HARD)
    }
    if (multipleChoice) {
      quizQuery.type.push(QType.MULTIPLE_CHOICE)
    }
    if (chooseMany) {
      quizQuery.type.push(QType.CHOOSE_MANY)
    }
    if (trueFalse) {
      quizQuery.type.push(QType.TRUE_FALSE)
    }
    if (openEnded) {
      quizQuery.type.push(QType.OPEN_ENDED)
    }

    await fetchQuizQuestions(quizQuery)
    .then(result => {
      console.log(result)
      setQuestions(result);
      setScore(0);
      setUserAnswers([]);
      setNumber(0);
      setLoading(false);
      resetForm();
    })
    .catch((error) => console.error(error))
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Checking answer...")
    let answers
    if (!gameOver) {
      answers = [e.currentTarget.value];
      const sortedCorrect = questions[number].correct_answers.sort()
      console.log("answers:", answers)
      console.log("sortedCorrect:", sortedCorrect)
      const correct = sortedCorrect[0] === answers[0];
      if (correct) {
        console.log("Correct guess in QuizGame")
        setScore(prev => prev + 1)
        questions[number].correctGuess()
      } else {
        console.log("Sorry, that's not right...")
        questions[number].incorrectGuess()
      };
      const answerObject: AnswerObject = {
        question: questions[number].question,
        answers,
        correct,
        correct_answers: questions[number].correct_answers,
      };
      setUserAnswers((prev) => [...prev, answerObject])
    }
    console.log(questions[number])
  }

  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion)
    }
  }


  const resetForm = () => {
    setKids(false)
    setEasy(false)
    setMedium(false)
    setHard(false)
    setMultipleChoice(false)
    setTrueFalse(false)
    setOpenEnded(false)
    setChooseMany(false)
  }


  return (
    <QuizGameStyle>
      <button onClick={getQuestionCount}>Test Question Count</button>
      {gameOver &&
      <>
        <form id="game-options">
          <div id='difficulty-selector' className='quiz-selector'>
            <h3>Difficulty:</h3>
            <div className='options'>
              <div>
                <input type='checkbox' name='kids' checked={kids} onChange={() => toggleDifficulty(Difficulty.KIDS)} />
                <label htmlFor='kids'>Kids</label>
              </div>
              <div>
                <input type='checkbox' name='easy' checked={easy} onChange={() => toggleDifficulty(Difficulty.EASY)} />
                <label htmlFor='easy'>Easy</label>
              </div>
              <div>
                <input type='checkbox' name='medium' checked={medium} onChange={() => toggleDifficulty(Difficulty.MEDIUM)} />
                <label htmlFor='medium'>Medium</label>
              </div>
              <div>
                <input type='checkbox' name='hard' checked={hard} onChange={() => toggleDifficulty(Difficulty.HARD)} />
                <label htmlFor='hard'>Hard</label>
              </div>
            </div>
          </div>
          <div id='type-selector' className='quiz-selector'>
            <h3>Type:</h3>
            <div className='options'>
              <div>
                <input type='checkbox' name='multiple-choice' checked={multipleChoice} onChange={() => toggleType(QType.MULTIPLE_CHOICE)} />
                <label htmlFor='multiple-choice'>Multiple Choice</label>
              </div>
              <div>
                <input type='checkbox' name='true-false' checked={trueFalse} onChange={() => toggleType(QType.TRUE_FALSE)} />
                <label htmlFor='true-false'>True or False</label>
              </div>
              <div>
                <input type='checkbox' name='open-ended' checked={openEnded} onChange={() => toggleType(QType.OPEN_ENDED)} />
                <label htmlFor='open-ended'>Open Ended</label>
              </div>
              <div>
                <input type='checkbox' name='choose-many' checked={chooseMany} onChange={() => toggleType(QType.CHOOSE_MANY)} />
                <label htmlFor='choose-many'>Choose Many</label>
              </div>
            </div>
          </div>
        </form>
        <button onClick={resetForm}>Reset Options</button>
      </>
      }
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
      <button className="start" onClick={startTrivia}>
        Start!
      </button>)
      : null
      }
      {!gameOver ? 
      <p className="score">
        Score: {score}
      </p>
      : null
      }
      {loading && <p>Loading Questions...</p>}
      {!loading && !gameOver && (
      <>
        <QuestionCard
          questionNum={number + 1}
          totalQs={totalQuestions}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
          type={questions[number].type}
        />
        <button
          hidden={gameOver || number === questions.length - 1}
          className="next"
          onClick={nextQuestion}
        >
          Next Question
        </button>
      </>
      )}
      <span>Most questions provided by https://opentdb.com/</span>
    </QuizGameStyle>
  );
}

import React, { useState } from 'react';
import QuestionCard from '../../components/questionCard/QuestionCard';
import { Difficulty, fetchQuizQuestions, QuestionsState } from '../../API';
import {QuizGameStyle} from './QuizGame.styles'


export type AnswerObject = {
  question: string;
  answers: string[];
  correct: boolean;
  correct_answers: string[];
}

const TOTAL_QUESTIONS = 3

export const QuizGame = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [difficulty, setDifficulty] = useState<Difficulty[]>([]);
  const [kids, setKids] = useState(false)
  const [easy, setEasy] = useState(false);
  const [medium, setMedium] = useState(false);
  const [hard, setHard] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState<string[]>([])
  const [type, setType] = useState('')
  
  const toggleDifficulty = (option: Difficulty) => {
  switch(option) {
    case Difficulty.KIDS:
      setKids(!kids)
      console.log(kids)
      break;
    case Difficulty.EASY:
      setEasy(!easy)
      console.log(easy)
      break;
    case Difficulty.MEDIUM:
      setMedium(!medium)
      console.log(medium)
      break;
    case Difficulty.HARD:
      setHard(!hard)
      console.log(hard)
      break;
  }
}

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    if (kids) {
      setDifficulty((prev) => [...prev, Difficulty.KIDS])
    }
    if (easy) {
      setDifficulty((prev) => [...prev, Difficulty.EASY])
    }
    if (medium) {
      setDifficulty((prev) => [...prev, Difficulty.MEDIUM])
    }
    if (hard) {
      setDifficulty((prev) => [...prev, Difficulty.HARD])
    }

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      difficulty
    );  

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0)
    setLoading(false)
    setEasy(false)
    setMedium(false)
    setHard(false)
  }  

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answers = currentAnswer;
      const correct = questions[number].correct_answers === answers;
      if (correct) {

        setScore(prev => prev + 1)
      };
      const answerObject: AnswerObject = {
        question: questions[number].question,
        answers,
        correct,
        correct_answers: questions[number].correct_answers,
      };
      setUserAnswers((prev) => [...prev, answerObject])
    }
  }

  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion)
      setType(questions[nextQuestion].type)
    }
  }

  return (
    <QuizGameStyle>
      <h1>Welcome to Trivia!</h1>
      {gameOver &&
      <div id="game-options">
        <div id='difficulty-selector'>
          <h3>Difficulty:</h3>
            <div>
              <input type='checkbox' name='easy'defaultChecked={false} onChange={() => toggleDifficulty(Difficulty.EASY)} />
              <label htmlFor='easy'>Easy</label>
            </div>
            <div>
              <input type='checkbox' name='medium'defaultChecked={false} onChange={() => toggleDifficulty(Difficulty.MEDIUM)} />
              <label htmlFor='medium'>Medium</label>
            </div>
            <div>
              <input type='checkbox' name='hard'defaultChecked={false} onChange={() => toggleDifficulty(Difficulty.HARD)} />
              <label htmlFor='hard'>Hard</label>
            </div>
        </div>
        <div id='difficulty-selector'>
          <h3>Categories:</h3>
            
            <div>
              <input type='checkbox' name='easy'defaultChecked={false} onChange={() => toggleDifficulty(Difficulty.EASY)} />
              <label htmlFor='easy'>Easy</label>
            </div>
        </div>
      </div>
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
      <QuestionCard
        questionNum={number + 1}
        totalQs={TOTAL_QUESTIONS}
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswer={userAnswers ? userAnswers[number] : undefined}
        callback={checkAnswer}
        type={type}
      />)}
      <button
        hidden={gameOver || number === questions.length - 1}
        className="next"
        onClick={nextQuestion}
      >
        Next Question
      </button>
    </QuizGameStyle>
  );
}

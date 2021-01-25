import React, { useState } from 'react';
import QuestionCard from '../../components/questionCard/QuestionCard';
import { Difficulty, fetchQuizQuestions, QuestionsState } from '../../API';
import {QuizGameStyle} from './QuizGame.styles'


export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correct_answer: string;
}

const TOTAL_QUESTIONS = 1

export const QuizGame = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0)
    setLoading(false)
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) setScore(prev => prev + 1);
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correct_answer: questions[number].correct_answer,
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
    }
  }

  return (
    <QuizGameStyle>
      <h1>Welcome to Trivia!</h1>
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

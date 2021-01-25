import { shuffleArray } from "./utils";

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: QuestionType;
  _id: string;
};

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export enum QuestionType {
  MULTIPLE_CHOICE = 'multiple-choice',
  TRUE_FALSE = 'true-false',
  OPEN_ENDED = 'open-ended'
}

export type QuestionsState = Question & { answers: string[] };

export const fetchQuizQuestions = async (
  amount: number,
  difficulty: Difficulty
) => {
  const endpoint = `http://localhost:5000/questions?amount=${amount}&difficulty=${difficulty}`;
  const data = await (await fetch(endpoint)).json();
  console.log(data.results)
  return data.results.map((question: Question) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  }));
};

export const fetchAllQuestions = async () => {
  const endpoint = 'http://localhost:5000/questions'
  const data = await (await fetch(endpoint)).json();
  console.log(data.results)
  return data.results
}

export const addQuestion = async (question: Question) => {
  const endpoint = 'http://localhost:5000/questions/new';
  const data = fetch(
    endpoint,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(question)
    }
  )
  .then(response => response.json())
  .then(question => console.log('Success: ', question))
  .catch((error) => console.error('Error: ', error))
}

export const deleteQuestion = async (_id: string) => {
  const endpoint = `http://localhost:5000/questions/delete/${_id}`
  await fetch(
    endpoint,
    {
      method: 'DELETE',
      body: _id
    }
  )
  .then(() => console.log("Successfully deleted question: ", _id))
  .catch((error) => console.error(error))
}

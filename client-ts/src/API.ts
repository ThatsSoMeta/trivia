import { shuffleArray } from "./utils";

export type Question = {
  category: string;
  type: QuestionType;
  difficulty: Difficulty;
  question: string;
  correct_answers: string[];
  incorrect_answers: string[];
  times_correct: number;
  times_incorrect: number;
  _id: string;
};

interface IQuery {
  difficulty?: Difficulty;
  type?: QuestionType;
  category?: string;
  questionID?: string;
  uploaded_by?: string;
}

export enum Difficulty {
  KIDS = "kids",
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
  UNSET = ""
}

export enum QuestionType {
  MULTIPLE_CHOICE = 'multiple-choice',
  TRUE_FALSE = 'true-false',
  OPEN_ENDED = 'open-ended',
  CHOOSE_MANY = 'choose-many',
  UNSET = '',
}

const BASE_URL = 'http://localhost:5000'

export type QuestionsState = Question & { answers: string[] };

export const fetchQuizQuestions = async (
  amount: number,
  difficulty: Difficulty[]
) => {
  let endpoint = `${BASE_URL}/questions`;
  console.log("Difficulty: ", difficulty)
  let queryList = []
  if (difficulty) {
    for (let index in difficulty) {
      console.log("Adding", difficulty[index], "to difficulty")
      queryList.push(`difficulty=${difficulty[index]}`)
    }
  }
  console.log("Query List: ", queryList)
  if (queryList) {
    let queryStr = queryList.join("&");
    endpoint += `?${queryStr}`
  }
  console.log(endpoint)
  const data = await (await fetch(endpoint)).json();
  console.log(data.results)
  return data.results.map((question: Question) => ({
    ...question,
    answers: shuffleArray(
      question.incorrect_answers.concat(question.correct_answers)
    ),
  }));
};

export const fetchAllQuestions = async () => {
  const endpoint = `${BASE_URL}/questions`
  const data = await (await fetch(endpoint)).json();
  return data.results
}

export const fetchSomeQuestions = async (params: IQuery) => {
  let endpoint = `${BASE_URL}/questions`
  // console.log(params)
  const queryList: string[] = []
  if (params) {
    if (params.difficulty) {
      queryList.push(`difficulty=${params.difficulty}`)
    }
    if (params.type) {
      queryList.push(`type=${params.type}`)
    }
    if (params.category) {
      queryList.push(`category=${params.category}`)
    }
    if (params.questionID) {
      queryList.push(`_id=${params.questionID}`)
    }
  }
  // console.log(queryList.join('&'))
  let queryStr = queryList.join('&')
  endpoint += `?${queryStr}`
  const data = await (await fetch(
    endpoint,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )).json();
  return data.results
}

export const addQuestion = async (question: Question) => {
  const endpoint = `${BASE_URL}/questions/new`;
  await fetch(
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
  const endpoint = `${BASE_URL}/questions/delete/${_id}`
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

export const updateQuestion = async (_id: Question["_id"], updateInfo: object = {}) => {
  console.log("Updates to question: ", JSON.stringify(updateInfo))
  const endpoint = `${BASE_URL}/questions/edit/${_id}`;
  await fetch(
    endpoint,
    {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updateInfo)
    }
  )
  .then(response => response.json())
  .then(data => console.log(data))
  .catch((error) => console.error(error))
}

import { shuffleArray } from "./utils";

export enum Difficulty {
  KIDS = "kids",
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
  UNSET = ""
}

export enum QType {
  MULTIPLE_CHOICE = 'multiple-choice',
  TRUE_FALSE = 'true-false',
  OPEN_ENDED = 'open-ended',
  CHOOSE_MANY = 'choose-many',
  UNSET = '',
}

const BASE_URL = 'http://localhost:5000'
export interface IQuery {
  difficulty: Difficulty[];
  type: string[];
  category: string[];
  questionID: string[];
  uploaded_by: string[];
  amount: number;
}

export interface IQuestion {
  category: string;
  type: string;
  difficulty: Difficulty | string;
  question: string;
  correct_answers: string[];
  incorrect_answers: string[];
  uploaded_by: string;
};

export class Question implements IQuestion {
  category: string
  type: QType | string
  difficulty: Difficulty | string
  question: string
  correct_answers: string[]
  incorrect_answers: string[]
  uploaded_by: string
  times_correct: number
  times_incorrect: number
  answers: string[]
  total_guesses: number
  _id: string = ''

  constructor(
    category: string,
    type: QType | string,
    difficulty: Difficulty | string,
    question: string,
    correct_answers: string[],
    incorrect_answers: string[],
    uploaded_by: string,
    times_correct: number = 0,
    times_incorrect: number = 0,
    _id: string = ''
    ) {
    this.category = category;
    this.type = type;
    this.difficulty = difficulty;
    this.question = question;
    this.correct_answers = correct_answers;
    this.incorrect_answers = incorrect_answers;
    this.uploaded_by = uploaded_by;
    this.times_correct = times_correct;
    this.times_incorrect = times_incorrect;
    this.answers = shuffleArray(this.correct_answers.concat(this.incorrect_answers));
    this._id = _id;
    this.total_guesses = this.times_correct + this.times_incorrect
  };
  __str__(): string {
    return this.question
  }
  correctGuess(): void {
    this.times_correct += 1
    console.log("ID:", this._id)
    updateQuestion(this._id, {times_correct: this.times_correct})
  }
  incorrectGuess(): void {
    this.times_incorrect += 1
    console.log("ID:", this._id)
    updateQuestion(this._id, {times_incorrect: this.times_incorrect})
  }
  getCorrectRate(): number {
    console.log(`${(this.times_correct / (this.times_correct + this.times_incorrect)) * 100}% correct`)
    return this.times_correct / (this.times_correct + this.times_incorrect)
  }
  typeToString(): string {
    switch(this.type) {
      case QType.MULTIPLE_CHOICE:
        return 'Multiple Choice'
      case QType.CHOOSE_MANY:
        return 'Choose Many'
      case QType.OPEN_ENDED:
        return 'Open Ended'
      case QType.TRUE_FALSE:
        return 'True or False'
      default:
        return 'Unset'
    }
  }
  getAllAnswers() : string[] {
    if (this.type === QType.MULTIPLE_CHOICE) {
      return shuffleArray(this.correct_answers.concat(this.incorrect_answers))
    }
    else if (this.type === QType.TRUE_FALSE) {
      return ['True', 'False']
    } else {
      return this.correct_answers
    }
  }
  ask() {
    let guess = window.prompt(this.question)
    if (guess?.toLowerCase() === this.correct_answers[0].toLowerCase()) {
      return this.correctGuess()
    } else {
      return this.incorrectGuess()
    }
  }
}

export const testQuestion = new Question(
  'Movies',
  QType.TRUE_FALSE,
  Difficulty.EASY,
  'Senator Palpatine is a powerful Jedi.',
  ['False'],
  ['True'],
  'Drewski'
)


export type QuestionsState = IQuestion & { answers: string[] };

export const testQueryLimit = async (n=10) => {
  let endpoint = `${BASE_URL}/questions/testLimit`;
  await fetch(endpoint)
  .then(data => {
    console.log("Data in test:", data);
    return data
  })
  .catch((error) => console.error(error))
}

export const fetchQuizQuestions = async ( params: IQuery) => {
  let {
    difficulty,
    type,
    // category,
    // questionID,
    // uploaded_by,
    amount
  } = params
  let endpoint = `${BASE_URL}/questions/get/random/`;
  console.log("Difficulty: ", difficulty)
  let queryList = []
  if (amount) {
    endpoint += String(amount)
  }
  for (let index in difficulty) {
    console.log("Adding", difficulty[index], "to difficulty")
    queryList.push(`difficulty=${difficulty[index]}`)
  }
  for (let index in type) {
    console.log("Adding", type[index], "to type")
    queryList.push(`type=${type[index]}`)
  }
  console.log("Query List: ", queryList)
  if (queryList) {
    let queryStr = queryList.join("&");
    endpoint += `?${queryStr}`
    console.log(queryStr)
  }
  console.log("Endpoint in API:", endpoint)
  let qArray: Question[] = []
  let data = await (await fetch(endpoint)).json();
  data.map((item: any) => {
    let newQ = new Question(
      item.category,
      item.type,
      item.difficulty,
      item.question,
      item.correct_answers,
      item.incorrect_answers,
      item.uploaded_by,
      item.times_correct,
      item.times_incorrect,
      item._id
    )
    qArray.push(newQ)
  })
  return qArray
};

export const getQuestionCount = async () => {
  const endpoint = `${BASE_URL}/questions/count`
  const data = await (await fetch(endpoint)).json();
  console.log(data)
  return data
}

export const fetchFromOpenTrivia = async () => {
  const endpoint = 'https://opentdb.com/api.php?amount=50'
  const data = await (await fetch(endpoint)).json();
  return data.results
}

export const fetchAllQuestions = async (offset: number = 0) => {
  const endpoint = `${BASE_URL}/questions/get/stream/${offset}`;

  const data = await (await fetch(endpoint)).json();
  return data
}

export const fetchSingleQuestion = async (_id: string) => {
  const endpoint = `${BASE_URL}/questions/get/${_id}`;
  const data = await (await fetch(endpoint)).json();
  return data.results
}

export const fetchSomeQuestions = async (params: IQuery) => {
  let endpoint = `${BASE_URL}/questions/get`
  // console.log(params)
  const queryList: string[] = []
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
  .then(question => console.log('Result: ', question))
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

export const updateQuestion = async (_id: string, updateInfo: object = {}) => {
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

export const deleteAllQuestions = async () => {
  const endpoint = `${BASE_URL}/questions/deleteAll`
  await fetch(
    endpoint,
    {
      method: 'DELETE'
    }
  )
  .then(response => console.log("All questions deleted:", response))
}
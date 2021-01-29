import React, { useEffect, useState } from 'react';
import { deleteAllQuestions, fetchAllQuestions, Question, testQueryLimit } from '../../API';
import { QuestionIndex } from '../../components';
import { ViewQuestionsStyle } from './ViewAllQuestions.styles';

export const ViewQuestionsPage = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    setLoading(true);
    console.log("Fetching questions...")
    fetchAllQuestions(offset)
    .then(data => {
      console.log(data)
      setQuestions(data)
      setLoading(false)
    })
    .catch((error) => console.error(error))
  }, [offset])

  const increaseOffset = () => {
    setOffset(prev => prev + 10)
  }

  const decreaseOffset = () => {
    if (offset !== 0) {
      setOffset(prev => prev - 10)
    }
  }

  return (
    <ViewQuestionsStyle>
      <h1>All Questions: </h1>
      {loading && <h3>Loading...</h3>}
      {!loading && questions &&
      <>
        <div>
          <button onClick={decreaseOffset}>Previous Page</button>
          <button onClick={increaseOffset}>Next Page</button>
        </div>
        <table id='question-table'>
          <thead>
            <tr id='header-row'>
              <th>Category</th>
              <th>Question</th>
              {/* <th>Answer</th> */}
              <th>Difficulty</th>
              <th>Type</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {questions &&
              questions.map(question => (
                <QuestionIndex
                question={question}
                offset={offset}
                key={question._id}
                />
              ))
            }
          </tbody>
        </table>
      </>}
      <a href='/questions/create' >
        <button>New Question</button>
      </a>
    </ViewQuestionsStyle>
  )
}
import React, { useEffect, useState } from 'react';
import { fetchAllQuestions, Question } from '../../API';
import { QuestionIndex } from '../../components';
import { ViewQuestionsStyle } from './ViewAllQuestions.styles';

export const ViewQuestionsPage = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    setLoading(true);
    fetchAllQuestions()
    .then(data => {
      setQuestions(data)
    })
    .catch((error) => console.error(error))
    setLoading(false)
  }, [])

  return (
    <ViewQuestionsStyle>
      <h1>All Questions: </h1>
      {loading && <h3>Loading...</h3>}
      {questions &&
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
              key={question._id}
              questions={questions}
              />
            ))
          }
        </tbody>
      </table>}
      <a href='/questions/create' >
        <button>New Question</button>
      </a>
    </ViewQuestionsStyle>
  )
}
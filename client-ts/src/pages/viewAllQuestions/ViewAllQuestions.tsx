import React, { useEffect, useState } from 'react';
import { fetchAllQuestions, Question } from '../../API';
import { QuestionCardSmall, QuestionIndex } from '../../components';
import { ViewQuestionsStyle } from './ViewAllQuestions.styles';

export const ViewQuestionsPage = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    setLoading(true);
    fetchAllQuestions()
    .then(data => {
      setQuestions(data)
      console.log(localStorage.questions)
    })
    .catch((error) => console.error(error))
    setLoading(false)
  }, [])

  return (
    <ViewQuestionsStyle>
      <h1>All Questions: </h1>
      <table id='question-table'>
        <tr id='header-row'>
          <td>Category</td>
          <td>Question</td>
          <td>Answer</td>
          <td>Difficulty</td>
          <td>Type</td>
          <td>Edit</td>
          <td>Delete</td>
        </tr>
        {questions &&
          questions.map(question => (
            <QuestionIndex
            question={question}
            setQuestions={setQuestions}
            questions={questions}
            />
          ))
        }
      </table>
    </ViewQuestionsStyle>
  )
}
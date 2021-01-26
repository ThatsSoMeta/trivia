import React from 'react';
import { Question, deleteQuestion } from '../../API';
import { capitalize } from '../../utils';
import { QuestionIndexStyle } from './QuestionIndex.styles'
import EditIcon from '../../images/edit-blue.png';
import DeleteIcon from '../../images/delete-red.png';
import { AnswerObject } from '../../pages';


export interface IQuestionProps {
  question: Question
}

export const QuestionIndex = (props: React.PropsWithChildren<IQuestionProps>) => {
  let {
    category,
    correct_answers,
    question,
    type,
    difficulty,
    times_correct,
    times_incorrect,
    _id
  } = props.question

  const toggleDelete = () => {
    if (window.confirm(
      'Are you sure? This can not be undone.'
    )) {
      console.log('Deleting Question: ', question)
      deleteQuestion(_id)
      .then(data => {
        console.log("Successfully deleted: ", data)
      })
      .catch((error) => console.error(error))
    }
  }

  const displayAnswerString = (answer: string[]): string => {
      return answer.join(', ')
  }

  const editURL = `/questions/edit/${_id}`

  return (
    <QuestionIndexStyle
    onClick={() => console.log(props.question)}
    >
      <td id='category'>{capitalize(category)}</td>
      <td id='question'>{capitalize(question)}</td>
      <td id='answer'>{displayAnswerString(correct_answers)}</td>
      <td id='difficulty'>{capitalize(difficulty)}</td>
      <td id='type'>{type}</td>
      <td id='edit'>
        <a href={editURL}>
          <img src={EditIcon} alt='Edit' />
        </a>
      </td>
      <td id='delete' onClick={() => toggleDelete()}>
        <img src={DeleteIcon} alt='Delete' />
      </td>
    </QuestionIndexStyle>
  )
}
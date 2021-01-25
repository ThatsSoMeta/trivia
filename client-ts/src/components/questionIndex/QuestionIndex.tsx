import React, { useState } from 'react';
import { Question, deleteQuestion, fetchAllQuestions } from '../../API';
import { capitalize } from '../../utils';
import { QuestionIndexStyle } from './QuestionIndex.styles'
import EditIcon from '../../images/edit-blue.png';
import DeleteIcon from '../../images/delete-red.png';


interface IQuestionProps {
  question: Question,
  setQuestions: (questions: Question[]) => void,
  questions: Question[]
}

export const QuestionIndex = (props: React.PropsWithChildren<IQuestionProps>) => {
  let {
    category,
    correct_answer,
    question,
    incorrect_answers,
    type,
    difficulty,
    _id
  } = props.question

  const toggleDelete = () => {
    if (window.confirm(
      'Are you sure? This can not be undone.'
    )) {
      console.log('Deleting Question: ', question)
      deleteQuestion(_id)
      .then(() => {
        fetchAllQuestions()
        .then(data => {
          props.setQuestions(data)
        })
        .catch((error) => console.error(error))
      })
    }
  }

  return (
    <QuestionIndexStyle
    onClick={() => console.log(props.question)}
    >
      <td id='category'>{capitalize(category)}</td>
      <td id='question'>{capitalize(question)}</td>
      <td id='answer'>{capitalize(correct_answer)}</td>
      <td id='difficulty'>{capitalize(difficulty)}</td>
      <td id='type'>{type}</td>
      <td id='edit'>
        <img src={EditIcon} alt='Edit' />
      </td>
      <td id='delete' onClick={() => toggleDelete()}>
        <img src={DeleteIcon} alt='Delete' />
      </td>
    </QuestionIndexStyle>
  )
}
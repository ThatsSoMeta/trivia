import React, { useState } from 'react';
import { Question } from '../../API';
import { QuestionCardSmallStyle } from './QuestionCardSmall.styles'
import { capitalize } from '../../utils';

interface IQuestionProps {
  question: Question
}

export const QuestionCardSmall = (props: React.PropsWithChildren<IQuestionProps>) => {
  let {
    category,
    correct_answer,
    question,
    incorrect_answers,
    type,
    difficulty
  } = props.question

  const CategoryColors = {
    'movies': 'blue',
    'music': 'red',
    'tv': 'yellow'
  }


  return (
    <QuestionCardSmallStyle>
      <header
        style={
          category === 'movies' ?
          {backgroundColor: 'blue'} :
          category === 'music' ?
          {backgroundColor: 'yellow'} :
          category === 'television' ?
          {backgroundColor: 'red'} :
          {backgroundColor: 'black'}
        }
      >
        <h2>{capitalize(category)}</h2>
      </header>
      <div id='content'>
        <h3>{question}</h3>
        <p id='answer'>{capitalize(correct_answer)}</p>
      </div>
    </QuestionCardSmallStyle>
  )
}
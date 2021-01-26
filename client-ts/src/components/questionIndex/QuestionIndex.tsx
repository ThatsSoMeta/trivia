import { useEffect, useState } from 'react';
import { Question, deleteQuestion, QuestionType } from '../../API';
import { capitalize } from '../../utils';
import { QuestionIndexStyle } from './QuestionIndex.styles'
import EditIcon from '../../images/edit-blue.png';
import DeleteIcon from '../../images/delete-red.png';

export interface IQuestionProps {
  question: Question
}

export const QuestionIndex = (props: React.PropsWithChildren<IQuestionProps>) => {
  const [typeLabelText, setTypeLabelText] = useState<string>('default')
  const [correctAnswerRate, setCorrectAnswerRate] = useState<number>(0)

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


  useEffect(() => {
    switch(type) {
      case QuestionType.CHOOSE_MANY:
        setTypeLabelText('Many');
        break;
      case QuestionType.MULTIPLE_CHOICE:
        setTypeLabelText('MC');
        break;
      case QuestionType.OPEN_ENDED:
        setTypeLabelText('Open')
        break;
      case QuestionType.TRUE_FALSE:
        setTypeLabelText('T/F')
        break;
    };

    if (times_correct + times_incorrect > 0) {
      setCorrectAnswerRate(times_correct / (times_correct + times_incorrect))
    }
  }, [times_correct, times_incorrect, type])

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
      <td id='difficulty'>
        <span>{capitalize(difficulty)}</span>
        <span id='correct-rate'>({correctAnswerRate * 100}% correct)</span>
      </td>
      <td id='type'>{typeLabelText}</td>
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
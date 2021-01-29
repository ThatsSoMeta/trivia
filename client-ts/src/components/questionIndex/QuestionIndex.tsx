import { useEffect, useState } from 'react';
import { Question, deleteQuestion, QType } from '../../API';
import { capitalize, htmlDecode } from '../../utils';
import { QuestionIndexStyle } from './QuestionIndex.styles'
import EditIcon from '../../images/edit-blue.png';
import DeleteIcon from '../../images/delete-red.png';

export interface IQuestionProps {
  question: Question,
  offset: number
}

export const QuestionIndex = (props: React.PropsWithChildren<IQuestionProps>) => {
  const [typeLabelText, setTypeLabelText] = useState<string>('default');
  const [correctAnswerRate, setCorrectAnswerRate] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [difficultyColor, setDifficultyColor] = useState('');
  const [questionType, setQuestionType] = useState<QType>(QType.UNSET);
  const [questionText, setQuestionText] = useState('')
  const [submittingQuestion, setSubmittingQuestion] = useState(false);
  const [offset, setOffset] = useState(props.offset)

  let {
    category,
    question,
    type,
    difficulty,
    times_correct,
    times_incorrect,
    _id
  } = props.question

  useEffect(() => {
    setLoading(true)
    switch(type) {
      case QType.CHOOSE_MANY:
        setTypeLabelText('Many');
        setQuestionType(QType.CHOOSE_MANY);
        break;
      case QType.MULTIPLE_CHOICE:
        setTypeLabelText('MC');
        setQuestionType(QType.MULTIPLE_CHOICE);
        break;
      case QType.OPEN_ENDED:
        setTypeLabelText('Open');
        setQuestionType(QType.OPEN_ENDED);
        break;
      case QType.TRUE_FALSE:
        setTypeLabelText('T/F');
        setQuestionType(QType.TRUE_FALSE);
        break;
      default:
        setTypeLabelText('N/A');
        setQuestionType(QType.UNSET);
    };
    switch(difficulty) {
      case 'kids':
        setDifficultyColor('purple');
        break;
      case 'easy':
        setDifficultyColor('green');
        break;
      case 'medium':
        setDifficultyColor('orange');
        break;
      case 'hard':
        setDifficultyColor('red');
        break;
      default:
        setDifficultyColor('blue');
        break;
    }
    if (times_correct + times_incorrect > 0) {
      setCorrectAnswerRate(times_correct / (times_correct + times_incorrect))
    }
    setQuestionText(htmlDecode(question))
    // const newQuestion: Question = {
    //   category,
    //   type: questionType,
    //   difficulty,
    //   question: htmlDecode(question),
    //   correct_answers: []

    // }
    setLoading(false)
  }, [times_correct, times_incorrect, type, loading, offset])

  const toggleDelete = () => {
    setLoading(true);
    if (window.confirm(
      'Are you sure? This can not be undone.'
    )) {
      console.log('Deleting Question: ', question)
      deleteQuestion(_id)
      .catch((error) => console.error(error))
    }
    setLoading(false)
  }

  // const displayAnswerString = (answer: string[]): string => {
  //     return capitalize(answer.join(', '))
  // }

  const editURL = `/questions/edit/${_id}`

  return (
    <>
      {loading ?
      <QuestionIndexStyle>
      <td></td>
      <td>Loading question...</td>
      <td />
      <td />
      <td />
      <td />
      </QuestionIndexStyle> :
      <QuestionIndexStyle onClick={() => console.log(props.question)} >
        <td id='category'>{capitalize(category)}</td>
        <td id='question'>{htmlDecode(question)}</td>
        {/* <td id='answer'>{correct_answers.map((answer) => {
          return <><span>{answer}</span><br /></>
        })}</td> */}
        <td id='difficulty'>
          <span>{capitalize(difficulty)}</span>
          <hr style={{borderColor: difficultyColor, boxShadow: `2px 2px 5px ${difficultyColor}`}}/>
          <span id='correct-rate'>{correctAnswerRate * 100}% correct</span>
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
      </QuestionIndexStyle>}
    </>
  )
}
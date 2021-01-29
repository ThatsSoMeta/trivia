import React from 'react';
import { AnswerObject } from '../../pages/quizGame/QuizGame';
import { ButtonWrapper, QuestionStyle } from './QuestionCard.styles';
import {v4 as uuidv4} from 'uuid';

type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNum: number;
    totalQs: number;
    type: string;
}

const QuestionCard: React.FC<Props> = ({
    question,
    answers,
    callback,
    userAnswer,
    questionNum,
    totalQs,
    type,
}) => {
    return (
    <QuestionStyle>
        <p className="number">
            Question: {questionNum} / {totalQs}
        </p>
        <p dangerouslySetInnerHTML={{__html: question}} />
        <div id='answer-field'>
            {type === 'choose-many' ?
            <input type='text' /> :
            type === 'open-ended' ?
            <input type='text' /> :
            answers.map(answer => (
                <ButtonWrapper
                    key={uuidv4()}
                    correct={userAnswer?.correct_answers[0] === answer}
                    userClicked={userAnswer?.answers[0] === answer}
                >
                    <button disabled={!!userAnswer} onClick={callback} value={answer}>
                        <span dangerouslySetInnerHTML={{ __html: answer }} />
                    </button>
                </ButtonWrapper>
            ))}
        </div>
    </QuestionStyle>
    );
}

export default QuestionCard;
import React from 'react';
import { AnswerObject } from '../../pages/quizGame/QuizGame';
import { QuestionStyle } from './QuestionCard.styles';

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
        <div>
            {type === 'choose-many' ?
            <input type='text' /> :
            type === 'open ended' ?
            <input type='text' /> :
            answers.map(answer => (
                <div key={answer}>
                    <button disabled={!!userAnswer} onClick={callback} value={answer}>
                        <span dangerouslySetInnerHTML={{ __html: answer }} />
                    </button>
                </div>
            ))}
        </div>
    </QuestionStyle>
    );
}

export default QuestionCard;
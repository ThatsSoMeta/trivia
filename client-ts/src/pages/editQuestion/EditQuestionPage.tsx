import React, { ChangeEvent, createElement, useEffect, useState } from 'react';
import { Question, QuestionType, updateQuestion, fetchSomeQuestions, Difficulty } from '../../API';
import { EditQuestionPageStyle, EditQuestionStyle } from './EditQuestion.styles'
import { useParams } from 'react-router-dom';


export const EditQuestionsPage = () => {
    const [categories] = useState(
        ['movies', 'music', 'television', 'geography', 'other']
    );
    const [loading, setLoading] = useState(false);
    const [question, setQuestion] = useState('');
    const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.UNSET);
    const [type, setType] = useState('');
    const [category, setCategory] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
    const [incorrectAnswers, setIncorrectAnswers] = useState<string[]>(['', '', '']);
    const [questionID, setQuestionID] = useState('');
    const [message, setMessage] = useState('');
    const [timesCorrect, setTimesCorrect] = useState<number>(0);
    const [timesIncorrect, setTimesIncorrect] = useState<number>(0);
    const [answers, setAnswers] = useState<string[]>([]);

    const params = useParams()

    useEffect(() => {
        setLoading(true);
        fetchSomeQuestions(params)
        .then(data => {
            data = data[0]
            console.log("Data on EditPage: ", data)
            setQuestion(data.question)
            setDifficulty(data.difficulty)
            setCorrectAnswers(data.correct_answers)
            setIncorrectAnswers(data.incorrect_answers)
            setQuestionID(data._id)
            if (data.times_correct) {
                setTimesCorrect(data.times_correct)
            } else {
                setTimesCorrect(0)
            }
            if (data.times_incorrect) {
                setTimesIncorrect(data.times_incorrect)
            } else {
                setTimesIncorrect(0)
            }
            if (categories.includes(data.category)) {
                setCategory(data.category)
            } else {
                setCategory('other');
                setNewCategory(data.category)
            }
            switch(data.type) {
                case "multiple-choice":
                    setType('multiple choice')
                    break;
                case 'true-false':
                    setType('true or false')
                    break;
                case 'open-ended':
                    setType('open ended')
                    break;
                case 'choose-many':
                    setType('choose many')
                    break;
            }
        })
        .catch((error) => console.error(error))
        setLoading(false)
    }, [categories, params])

    const handleSubmit = async () => {
        setLoading(true);
        const newQuestion: Question = {
            category,
            correct_answers: correctAnswers,
            difficulty,
            question,
            incorrect_answers: [],
            times_correct: timesCorrect,
            times_incorrect: timesIncorrect,
            type: QuestionType.MULTIPLE_CHOICE,
            _id: questionID
        }
        if (type === 'multiple choice') {
            newQuestion.incorrect_answers = incorrectAnswers;
            newQuestion.type = QuestionType.MULTIPLE_CHOICE
        }
        if (type === 'true or false') {
            newQuestion.type = QuestionType.TRUE_FALSE;
            if (correctAnswers[0] === 'true') {
                newQuestion.incorrect_answers = ['false'];
            } else {
                newQuestion.incorrect_answers = ['true'];
            }
        }
        if (type === 'open ended') {
            newQuestion.incorrect_answers = [];
            newQuestion.type = QuestionType.OPEN_ENDED
        }
        if (type === 'choose many') {
            newQuestion.incorrect_answers = [];
            newQuestion.type = QuestionType.CHOOSE_MANY
        }
        if (category === 'other') {
            newQuestion.category = newCategory.toLowerCase()
        }
        await updateQuestion(newQuestion)
        .then(() => {
            setCategory('');
            setCorrectAnswers([]);
            setDifficulty(Difficulty.UNSET);
            setIncorrectAnswers(['','','']);
            setNewCategory('');
            setQuestion('');
            setType('');
            setMessage('Question Updated!');
            setAnswers([]);
        })
        .then(() => {
            setLoading(false)
        })
    }

    const toggleDifficulty = (level: Difficulty) => {
        if (level === difficulty) {
            setDifficulty(Difficulty.UNSET)
        } else {
            setDifficulty(level)
        }
    }

    const toggleType = (level: string) => {
        if (level.toLowerCase() === type) {
            setType('')
        } else {
            setType(level.toLowerCase())
        }
    }

    const toggleCategory = (level: string) => {
        if (level.toLowerCase() === category) {
            setCategory('')
        } else {
            setCategory(level.toLowerCase())
        }
    }

    const toggleTF = (choice: string[]) => {
        if (correctAnswers === choice) {
            setCorrectAnswers([])
        } else {
            setCorrectAnswers(choice)
        }
    }

    const chooseManyAnswersUpdate = (e: Event) => {
        const target = e.target as HTMLInputElement
        let index = parseInt(target.id)
        let currentAnswers = [...answers]
        currentAnswers[index] = target.value
        setAnswers(currentAnswers)
        }

    const addAnswerInput = () => {
        // setAnswers(prev => [...prev, ''])
        console.log('Answers: ', answers)
        console.log('Adding input...')
        let answersDiv = document.getElementById('choose-many-input');
        let number = answers.length;
        if (answersDiv) {
            answersDiv.innerHTML = '';
        }
        for (let i = 0; i <= number; i++) {
            let input = document.createElement('input');
            input.type = 'text';
            input.className = 'choose-many question-input';
            input.name = `choose-many-answer-${i}`;
            input.id = `${i}`;
            if (answers[i]) {
                input.value = answers[i];
            }
            input.placeholder = 'Next Answer';
            input.addEventListener(
                'change',
                (e: Event) => chooseManyAnswersUpdate(e)
            )
            // input.addEventListener('blur', () => console.log('Answers: ', answers))
            answersDiv?.appendChild(input)
            answersDiv?.appendChild(document.createElement('br'))
        }
    }

    return(
        <>
            <EditQuestionPageStyle />
            <header>
                <h1>Edit Question</h1>
            </header>
            <EditQuestionStyle>
                {loading && <h3>Loading...</h3>}
                <form>
                    <label className='field-label'>Difficulty:</label>
                    <br />
                    <input
                    style={
                        difficulty === 'easy' ?
                        {boxShadow: '0 0 15px cyan'} :
                        {}
                    }
                    className="button"
                    type="button"
                    value={Difficulty.EASY}
                    name="easy"
                    id="easy"
                    onClick={() => toggleDifficulty(Difficulty.EASY)}
                    />
                    <input
                    style={
                        difficulty === 'medium' ?
                        {boxShadow: '0 0 15px cyan'} :
                        {}
                    }
                    className="button"
                    type="button"
                    value={Difficulty.MEDIUM}
                    name="medium"
                    id="medium"
                    onClick={() => toggleDifficulty(Difficulty.MEDIUM)}
                    />
                    <input
                    style={
                        difficulty === 'hard' ?
                        {boxShadow: '0 0 15px cyan'} :
                        {}
                    }
                    className="button"
                    type="button"
                    value={Difficulty.HARD}
                    name="hard"
                    id="hard"
                    onClick={() => toggleDifficulty(Difficulty.HARD)}
                    />
                    <br />
                    <label className='field-label'>Type of question:</label>
                    <br />
                    <input
                    style={
                        type === 'multiple choice' ?
                        {boxShadow: '0 0 15px cyan'} :
                        {}
                    }
                    className="button"
                    type="button"
                    value="Multiple Choice"
                    onClick={(e) => toggleType(e.currentTarget.value)}
                    />
                    <input
                    style={
                        type === 'true or false' ?
                        {boxShadow: '0 0 15px cyan'} :
                        {}
                    }
                    className="button"
                    type="button"
                    value="True or False"
                    onClick={(e) => toggleType(e.currentTarget.value)}
                    />
                    <input
                    style={
                        type === 'open ended' ?
                        {boxShadow: '0 0 15px cyan'} :
                        {}
                    }
                    className="button"
                    type="button"
                    value="Open Ended"
                    onClick={(e) => toggleType(e.currentTarget.value)}
                    />
                    <input
                    style={
                        type === 'choose many' ?
                        {boxShadow: '0 0 15px cyan'} :
                        {}
                    }
                    className="button"
                    type="button"
                    value="Choose Many"
                    onClick={(e) => toggleType(e.currentTarget.value)}
                    />
                    <br />
                    <label className='field-label'>Category (pick one):</label>
                    <br />
                    {categories.map(
                        (cat) => (
                            <input
                            style={
                                cat === category ?
                                {boxShadow: '0 0 15px cyan'} :
                                {}
                            }
                            id={cat}
                            key={cat}
                            className="button"
                            type="button"
                            value={categories.includes(cat) ? cat : newCategory}
                            onClick={(e) => toggleCategory(e.currentTarget.value)}
                            />
                        )
                    )}
                    <br />
                    {!categories.includes(category) ||
                    category === 'other' ?
                    <>
                        <input
                        type='text'
                        id='category'
                        className='question-input'
                        autoFocus
                        value={
                            category !== 'other' ?
                            category :
                            newCategory
                        }
                        placeholder='Category'
                        onChange={(e) => setNewCategory(e.currentTarget.value)}
                        />
                        <br />
                    </> :
                    null
                    }
                    <label className='field-label'>Question:</label>
                    <br />
                    <input
                    type="text"
                    name="question"
                    id="question"
                    className='question-input'
                    value={question}
                    onChange={(e) => setQuestion(e.currentTarget.value)}
                    placeholder='Type your question here...'
                    />
                    <br />
                    {type === 'choose many' ?
                    <label className='field-label'>Answers:</label> :
                    <label className='field-label'>Answer:</label>
                    }
                    <br />
                    {
                    type === 'multiple choice' ?
                    <div id='multiple-choice-answers'>
                        <input
                        type='text'
                        className='question-input correct-answer'
                        id='correct-answer'
                        placeholder='Correct answer...'
                        value={correctAnswers[0]}
                        onChange={(e) => setCorrectAnswers([e.currentTarget.value])}
                        />
                        <br />
                        <input
                        type='text'
                        className='question-input incorrect-answer'
                        id='incorrect-answer'
                        placeholder='Incorrect answer...'
                        value={incorrectAnswers[0]}
                        onChange={(e) => (
                            setIncorrectAnswers(
                                [
                                    e.currentTarget.value,
                                    incorrectAnswers[1],
                                    incorrectAnswers[2],
                                ]
                            )
                            )}
                        />
                        <br />
                        <input
                        type='text'
                        className='question-input incorrect-answer'
                        id ='incorrect-answer'
                        placeholder='Incorrect answer...'
                        value={incorrectAnswers[1]}
                        onChange={(e) => (
                            setIncorrectAnswers(
                                [
                                    incorrectAnswers[0],
                                    e.currentTarget.value,
                                    incorrectAnswers[2],
                                ]
                            )
                            )}
                        />
                        <br />
                        <input
                        type='text'
                        className='question-input incorrect-answer'
                        id='incorrect-answer'
                        placeholder='Incorrect answer...'
                        value={incorrectAnswers[2]}
                        onChange={(e) => (
                            setIncorrectAnswers(
                                [
                                    incorrectAnswers[0],
                                    incorrectAnswers[1],
                                    e.currentTarget.value,
                                ]
                            )
                            )}
                        />
                        <br />
                        <input type='button' className='button' value='+' />
                    </div> :
                    type === 'true or false' ?
                    <>
                        <input
                        style={
                            correctAnswers[0] === 'true' ?
                            {boxShadow: '0 0 15px cyan'} :
                            {}
                        }
                        type='button'
                        className='button'
                        id='true'
                        value='true'
                        onClick={() => toggleTF(['true'])}
                        />
                        <input
                        style={
                            correctAnswers[0] === 'false' ?
                            {boxShadow: '0 0 15px cyan'} :
                            {}
                        }
                        type='button'
                        className='button'
                        id='false'
                        value='false'
                        onClick={() => toggleTF(['false'])}
                        />
                    </> :
                    type === 'open ended' ?
                    <input type='text'
                    className='question-input'
                    id='correct-answer'
                    placeholder='Correct answer...'
                    value={correctAnswers[0]}
                    onChange={(e) => setCorrectAnswers([e.currentTarget.value, ...correctAnswers])}
                    /> :
                    type === 'choose many' ?
                    <div>
                        <div id='choose-many-input'>
                            <p>Answers go here</p>
                        </div>
                        <button onClick={(e) => {
                            e.preventDefault()
                            addAnswerInput()
                            }}
                        >Add Answer
                        </button>
                    </div> :
                    null
                    }
                    
                    <br /><br />
                </form>
            </EditQuestionStyle>
            <input
            className="button"
            type="submit"
            value="Save Question"
            id="submit"
            disabled={loading}
            onClick={() => handleSubmit()}
            />
            {message && <p>{message}</p>}
        </>
    )
}
import { useEffect, useState } from 'react';
import { addQuestion, Difficulty, fetchFromOpenTrivia, Question, QType } from '../../API';
import { QuestionIndex } from '../../components';
import { ViewQuestionsStyle } from '../viewAllQuestions/ViewAllQuestions.styles';
import { v4 } from 'uuid';
import { htmlDecode } from '../../utils';

export const OpenTriviaPage = () => {
    const [convertedQuestions, setConvertedQuestions] = useState<Question[]>([])
    const [retrievedQuestions, setRetrievedQuestions] = useState([])
    const [loading, setLoading] = useState(false);
    const [converting, setConverting] = useState(false);
    const [submissionActive, setSubmissionActive] = useState(false);

    useEffect(() => {
        setLoading(true)
        fetchFromOpenTrivia()
        .then(data => {
            setRetrievedQuestions(data)
            console.log(data.length)
        })
        setLoading(false)
    }, []);

    const convertQuestion = (raw: {
        category: string;
        correct_answer: string;
        difficulty: string;
        incorrect_answers: string[];
        question: string;
        type: string; 
    }): Question => {
        setConverting(true);
        let {
            category,
            correct_answer,
            difficulty,
            incorrect_answers,
            question,
            type
        } = raw;

        let newDifficulty = Difficulty.UNSET;
        let newType = QType.MULTIPLE_CHOICE;

        switch(difficulty) {
            case 'easy':
                newDifficulty = Difficulty.EASY;
                break;
            case 'medium':
                newDifficulty = Difficulty.MEDIUM;
                break;
            case 'hard':
                newDifficulty = Difficulty.HARD;
                break;
            default:
                newDifficulty = Difficulty.UNSET
        };

        switch(type) {
            case 'multiple':
                newType = QType.MULTIPLE_CHOICE;
                break;
            case 'boolean':
                newType = QType.TRUE_FALSE;
                break;
            default:
                newType = QType.MULTIPLE_CHOICE;
                break;
        }

        let newQuestion = new Question(
            category,
            newType,
            newDifficulty,
            question,
            [correct_answer],
            incorrect_answers,
            "Open Trivia DB"
        );
        // category,
        // correct_answers: [correct_answer],
        // difficulty: newDifficulty,
        // incorrect_answers,
        // question: htmlDecode(question),
        // type: newType,
        // times_correct: 0,
        // times_incorrect: 0,
        // uploaded_by: 'Open Trivia DB',
        // _id: '',
        setConverting(false);
        return newQuestion
    }

    const convertRetrievedQuestions = async () => {
        if (!retrievedQuestions) {
            console.log('No questions:', retrievedQuestions)
            return
        } else {
            setSubmissionActive(true)
            setConvertedQuestions([])
            console.log(`Converting ${retrievedQuestions.length} questions...`)
            retrievedQuestions.map((question) => {
                // console.log('Converting Question:', question)
                setConvertedQuestions(prev => [...prev, convertQuestion(question)])
            })
        }
        setSubmissionActive(false)
    }


    return (
        <ViewQuestionsStyle>
            <h1> Open Trivia </h1>
            {loading && <h3>Loading questions...</h3>}
            {converting && <h3>Converting...</h3>}
            <button
            disabled={retrievedQuestions.length === 0 || loading}
            onClick={() => {
                setSubmissionActive(true)
                convertRetrievedQuestions()
                .then(() => {
                    console.log("Converting complete:", convertedQuestions)
                    convertedQuestions.map(question => addQuestion(question))
                })
                .then(() => {
                    console.log("Sumbission complete!")
                    setSubmissionActive(false)
                })
                .catch((error) => {
                    console.error(error);
                    setSubmissionActive(false)
                })
            }}>Begin Submission</button>
            {retrievedQuestions &&
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
                {retrievedQuestions &&
                    retrievedQuestions.map(question => (
                    <QuestionIndex
                    question={question}
                    key={v4()}
                    />
                    ))
                }
                </tbody>
            </table>
            }
        </ViewQuestionsStyle>
    )
}
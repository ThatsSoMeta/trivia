import { Document } from 'mongoose';

export default interface IQuestion extends Document {
    category: string,
    difficulty: string,
    type: string,
    question: string,
    times_correct: number,
    times_incorrect: number,
    correct_answers: string[],
    incorrect_answers: string[],
}
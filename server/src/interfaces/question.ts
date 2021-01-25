import { Document } from 'mongoose';

export default interface Question extends Document {
    category: string,
    difficulty: string,
    type: string,
    question: string,
    correct_answer: string,
    incorrect_answers: string[]
}
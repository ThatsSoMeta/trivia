import { Document } from 'mongoose';

export default interface Question extends Document {
    id: string,
    category: string,
    difficulty: string,
    type: string,
    text: string,
    correct_answer: string,
    incorrect_answers: string[]
}
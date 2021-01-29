import { Document } from 'mongoose';

export default interface IQuestion extends Document {
    category: string,
    difficulty: string,
    type: string,
    question: string,
    correct_answers: string[],
    incorrect_answers: string[],
    uploaded_by: string
}

export default interface IQuery {
    select_difficulty: string[];
    select_type: string[];
    select_category: string[];
    select_questionID: string[];
    select_uploaded_by: string[];
    select_amount: number;
  }
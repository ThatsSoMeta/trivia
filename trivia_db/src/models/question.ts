import mongoose, { Schema } from 'mongoose';
import Question from '../interfaces/question';

const QuestionSchema: Schema = new Schema(
    {
        category: {
            type: String,
            required: true,
            default: 'misc'
        },
        difficulty: {
            type: String,
            required: true,
            enum: ['easy', 'medium', 'hard'],
        },
        type: {
            type: String,
            required: true,
            enum: ['open', 'multiple-choice', 'true-false'],
        },
        text: {
            type: String,
            required: true,
        },
        correct_answer: {
            type: String,
            required: true,
        },
        incorrect_answers: {
            type: Array,
            required: false,
        }
    },
    {
        timestamps: true
    }
);

QuestionSchema.post<Question>('save', function () {
    console.log(`Question saved: ${this.text}`)
})

export default mongoose.model<Question>('Question', QuestionSchema);
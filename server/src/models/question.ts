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
            enum: ['open-ended', 'multiple-choice', 'true-false'],
        },
        question: {
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
    console.log(`Question saved: ${this.question}`)
})

export default mongoose.model<Question>('Question', QuestionSchema);
import mongoose, { Schema } from 'mongoose';
import IQuestion from '../interfaces/question';

const QuestionSchema: Schema = new Schema(
    {
        category: {
            type: String,
            required: true,
            default: 'other'
        },
        difficulty: {
            type: String,
            required: true,
            enum: ['kids', 'easy', 'medium', 'hard'],
        },
        type: {
            type: String,
            required: true,
            enum: ['open-ended', 'multiple-choice', 'true-false', 'choose-many'],
        },
        question: {
            type: String,
            required: true,
        },
        times_correct: {
            type: Number,
            required: true,
            default: 0,
        },
        times_incorrect: {
            type: Number,
            required: true,
            default: 0,
        },
        correct_answers: {
            type: Array,
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

QuestionSchema.post<IQuestion>('save', function () {
    console.log(`Question saved: ${this.question}`)
})

export default mongoose.model<IQuestion>('Question', QuestionSchema);
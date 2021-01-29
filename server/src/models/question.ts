import mongoose, { Schema } from 'mongoose';
import IQuestion from '../interfaces/question';
import random from 'mongoose-simple-random';




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
            default: 'easy',
        },
        type: {
            type: String,
            required: true,
            default: 'open-ended',
        },
        question: {
            type: String,
            required: true,
            unique: true,
        },
        uploaded_by: {
            type: String,
            required: true,
            default: 'Guest',
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
        },
        public: {
            type: Boolean,
            required: true,
            default: true,
        },
    },
    {
        timestamps: true
    }
);

QuestionSchema.post<IQuestion>('save', function () {
    console.log(`Question saved: ${this.question}`)
})

QuestionSchema.plugin(random);

export default mongoose.model<IQuestion>('Question', QuestionSchema);
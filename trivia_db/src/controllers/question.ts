import { NextFunction, Request, response, Response } from 'express';
import mongoose from 'mongoose';
import Question from '../models/question';

const createQuestion = (req: Request, res: Response, next: NextFunction) => {
    let {
        category,
        difficulty,
        type,
        text,
        correct_answer,
        incorrect_answers
    } = req.body;

    const question = new Question({
        __id: new mongoose.Types.ObjectId(),
        category,
        difficulty,
        type,
        text,
        correct_answer,
        incorrect_answers
    });

    return question
    .save()
    .then((result) => {
        return res.status(201).json({
            question: result
        })
    })
    .catch((error) => {
        return res.status(500).json({
            message: error.message,
            error
        })
    })
}

const getAllQuestions = (req: Request, res: Response, next: NextFunction) => {
    Question.find()
    .exec()
    .then((results: string | any[]) => {
        return res.status(200).json({
            questions: results,
            count: results.length
        })
    })
    .catch((error: Error) => {
        return res.status(500).json({
            message: error.message,
            error
        })
    })
}

export default { getAllQuestions, createQuestion };
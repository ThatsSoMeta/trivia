import { NextFunction, Request, response, Response } from "express";
import mongoose from "mongoose";
import Question from "../models/question";

const deleteQuestion = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.params.questionID)
    let id = req.params.questionID;
    return Question.deleteOne({ _id: id })
    .exec()
    .then(() => {
        res.status(200).json({
          message: 'Successfully deleted.'
        })
    })
    .catch((error: Error) => console.error(error))
};

const createQuestion = (req: Request, res: Response, next: NextFunction) => {
  let {
    category,
    difficulty,
    type,
    question,
    correct_answer,
    incorrect_answers,
  } = req.body;

  const newQuestion = new Question({
    __id: new mongoose.Types.ObjectId(),
    category,
    difficulty,
    type,
    question,
    correct_answer,
    incorrect_answers,
  });

  return newQuestion
    .save()
    .then((result) => {
      return res.status(201).json({
        newQuestion: result,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

const getQuestions = (req: Request, res: Response, next: NextFunction) => {
  interface Query {
    question?: string;
    difficulty?: string;
    type?: string;
    category?: string;
  }
  let query: Query = {};
  if (req.query) {
    let q = req.query;
    if (q.question) {
      query.question = (q as any).question;
    }
    if (q.difficulty) {
      query.difficulty = (q as any).difficulty;
    }
    if (q.type) {
      query.type = (q as any).type;
    }
    if (q.category) {
      query.category = (q as any).category;
    }
  }
  console.log(query);
  Question.find(query)
    .exec()
    .then((results: string | any[]) => {
      return res.status(200).json({
        results: results,
        count: results.length,
      });
    })
    .catch((error: Error) => {
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

export default { getQuestions, createQuestion, deleteQuestion };

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
    correct_answers,
    incorrect_answers,
  } = req.body;

  const newQuestion = new Question({
    __id: new mongoose.Types.ObjectId(),
    category,
    difficulty,
    type,
    question,
    correct_answers,
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
  Question.find(req.query)
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

const updateQuestion = (req: Request, res: Response, next: NextFunction) => {
  console.log("Params in controllers: ", req.params)
  console.log("Body: ", req.body)
  Question.findByIdAndUpdate(req.params.questionID, req.body)
  .then((data: Response) => {
    console.log(data)
    return data
  })
  .catcn((error: Error) => console.error(error))
}

export default { getQuestions, createQuestion, deleteQuestion, updateQuestion };

import { NextFunction, Request, response, Response } from "express";
import mongoose, { models } from "mongoose";
import IQuestion from "../interfaces/question";
import IQuery from "../interfaces/question";
import Question from "../models/question";

const deleteAllQuestions = (req: Request, res: Response, next: NextFunction) => {
  Question.deleteMany({type: 'open-ended'})
  .then(() => {
    res.status(201).json({
      message: 'Successfully deleted'
    })
  })
  .catch((error: Error) => console.error(error))
}

const getQuestion = (req: Request, res: Response, next: NextFunction) => {
  Question.find(
    {_id: req.params.questionID},
    (err, data) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
          error: err
        })
      } else {
        console.log(data)
        return res.status(201).json({
          result: data
        })
      }
    }
  )
}

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

const createQuestion = async (req: Request, res: Response, next: NextFunction) => {
  let {
    category,
    difficulty,
    type,
    question,
    uploaded_by,
    correct_answers,
    incorrect_answers,
  } = req.body;

  const newQuestion = new Question({
    __id: new mongoose.Types.ObjectId(),
    category,
    difficulty,
    type,
    question,
    uploaded_by,
    correct_answers,
    incorrect_answers,
  });

  await newQuestion
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


const updateQuestion = async (req: Request, res: Response, next: NextFunction) => {
  let {
    category,
    difficulty,
    type,
    question,
    uploaded_by,
    correct_answers,
    incorrect_answers,
  } = req.body;

  const updatedQuestion = {
    category,
    difficulty,
    type,
    question,
    uploaded_by,
    correct_answers,
    incorrect_answers,
  };

  await Question.findByIdAndUpdate(
    req.params.questionID,
    updatedQuestion,
    {
      new: true,
    },
    (error, data) => {
      if(error) {
        console.error(error)
        return res.status(500).json({
          message: error.message,
          error
        })
      } else {
        console.log('Successfully updated question:', data)
        return res.status(201).json({
          updatedQuestion: data
        });
      }
    }
  )
}

const getQuestionCount = async (req: Request, res: Response, next: NextFunction) => {
  Question.countDocuments((err, data) => {
    if (err) {
      console.error(err)
    } else {
      res.status(201).json(data)
    }
  })
}

const getQuestions = async (req: Request, res: Response, next: NextFunction) => {
  await Question.find(req.query, (err, docs) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
        error: err
      })
    } else {
      console.log(docs)
      return res.status(201).send(docs)
    }
  })
  .skip(2000)
  .limit(parseInt(req.params.amount))
};

const testQueryLimit = (req: Request, res: Response, next: NextFunction) => {
  Question.find().limit(10).exec((err: Error, data: Response) => {
    if (err) {
      console.error(err)
    } else {
      console.log(data)
    }
  })
}


export default {
  getQuestions,
  createQuestion,
  deleteQuestion,
  updateQuestion,
  deleteAllQuestions,
  getQuestion,
  testQueryLimit,
  getQuestionCount
};

import express, { Application, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import questionRoutes from './routes/questions';
import cors from 'cors';
import { traceDeprecation } from "process";

mongoose.connect("mongodb://localhost/trivia", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

export const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to database: Trivia:"));

const app: Application = express();
app.listen(5000, () => console.log(
    `Server running on port 5000`
));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send(
        "Welcome to my trivia API!\nGet from route '/questions' to see all questions.\nPost to route '/questions/new' to add a new question!"
        );
    });

// Routes:
app.use('/questions', questionRoutes);
import express from 'express';
import controller from '../controllers/question';

const router = express.Router();

router.post('/new', controller.createQuestion);
router.get('/get:amount', controller.getQuestions);
router.get('/get/:questionID', controller.getQuestion);
router.get('/count', controller.getQuestionCount);
router.patch('/edit/:questionID', controller.updateQuestion);
router.put('/edit/:questionID', controller.updateQuestion);
router.delete('/delete/:questionID', controller.deleteQuestion);
router.delete('/deleteAll', controller.deleteAllQuestions);
router.get('/testLimit', controller.testQueryLimit)

export = router;
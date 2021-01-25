import express from 'express';
import controller from '../controllers/question';

const router = express.Router();

router.post('/new', controller.createQuestion);
router.get('/', controller.getQuestions);
router.delete('/delete/:questionID', controller.deleteQuestion)

export = router;
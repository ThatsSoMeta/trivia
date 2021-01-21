import express from 'express';
import controller from '../controllers/question';

const router = express.Router();

router.post('/new', controller.createQuestion);
router.get('/', controller.getAllQuestions);

export = router;
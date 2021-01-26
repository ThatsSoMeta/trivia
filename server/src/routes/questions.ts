import express from 'express';
import controller from '../controllers/question';

const router = express.Router();

router.post('/new', controller.createQuestion);
router.get('/', controller.getQuestions);
router.patch('/edit/:questionID', controller.updateQuestion);
router.put('/edit/:questionID', controller.updateQuestion);
router.delete('/delete/:questionID', controller.deleteQuestion);

export = router;
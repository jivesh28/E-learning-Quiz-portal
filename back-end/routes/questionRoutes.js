const express = require('express');
const router = express.Router();
const { createQuestion, getQuestionsByQuiz } = require('../controllers/questionController');
const auth = require('../middleware/authMiddleWare');

router.post('/', auth, createQuestion);
router.get('/:quizId', getQuestionsByQuiz);

module.exports = router;

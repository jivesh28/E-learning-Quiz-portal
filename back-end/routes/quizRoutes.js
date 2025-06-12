const express = require('express');
const router = express.Router();
const { createQuiz, getQuizzes } = require('../controllers/quizController');
const auth = require('../middleware/authMiddleWare');
router.post('/', auth, createQuiz);
router.get('/', getQuizzes);

module.exports = router;

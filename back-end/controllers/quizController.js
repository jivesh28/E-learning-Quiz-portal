const Quiz = require('../models/Quiz');

exports.createQuiz = async (req, res) => {
  const quiz = new Quiz({ ...req.body, instructor: req.user.id });
  await quiz.save();
  res.status(201).json(quiz);
};

exports.getQuizzes = async (req, res) => {
  const quizzes = await Quiz.find().populate('questions');
  res.json(quizzes);
};

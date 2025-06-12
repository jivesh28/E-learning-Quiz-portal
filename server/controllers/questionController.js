const Question = require('../models/Question');

exports.createQuestion = async (req, res) => {
  const question = new Question(req.body);
  await question.save();
  res.status(201).json(question);
};

exports.getQuestionsByQuiz = async (req, res) => {
  const { quizId } = req.params;
  const questions = await Question.find({ quiz: quizId });
  res.json(questions);
};

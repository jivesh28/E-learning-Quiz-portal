const Result = require('../models/Results');

exports.submitResult = async (req, res) => {
  const result = new Result({
    student: req.user.id,
    ...req.body
  });
  await result.save();
  res.status(201).json(result);
};

exports.getResultsByStudent = async (req, res) => {
  const results = await Result.find({ student: req.user.id })
    .populate('quiz')
    .populate('answers.question');
  res.json(results);
};

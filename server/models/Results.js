// models/Result.js
const mongoose = require('mongoose');
const Question = require("./Question.js");
const User = require("./user.js");
const Quiz = require("./Quiz.js");

const resultSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
  score: Number,
  answers: [{
    question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
    selectedOptions: [String]
  }],
  submittedAt: { type: Date, default: Date.now }
});


// answers: [ ... ]
// An array of the student's submitted answers. Each object contains:

// 🔸 question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' }
// Refers to the question being answered.

// 🔸 selectedOptions: [String]
// An array of selected option texts (e.g., ["Option A", "Option C"]).

// Works for both single and multiple choice questions.

// You can compare these with the correct options stored in Question.options to evaluate correctness.
module.exports = mongoose.model('Result', resultSchema);

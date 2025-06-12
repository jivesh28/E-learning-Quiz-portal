// models/Quiz.js
const mongoose = require('mongoose');
const User = require("./user.js");
const Question = require("./Question.js");

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],

//   questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }]
// Array of references to question documents.

// Each ObjectId here points to a Question document (defined by your questionSchema).

// This forms a one-to-many relationship: one quiz → many questions.
  timeLimit: Number, // in minutes
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Quiz', quizSchema);

// Quiz ← linked to → User (via createdBy)

// Quiz ← linked to → Question[] (via questions)

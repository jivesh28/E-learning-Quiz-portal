// models/Question.js
const mongoose = require('mongoose');
const Quiz = require("./Quiz.js");
const questionSchema = new mongoose.Schema({
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },

//   quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }
// This links the question to a specific quiz using the quiz’s _id.

// ObjectId → Mongoose uses this to reference documents in other collections.

// ref: 'Quiz' → Tells Mongoose this ObjectId refers to the Quiz model (i.e., foreign key).
  questionText: { type: String, required: true },
  options: [{ text: String, isCorrect: Boolean }],
  questionType: { type: String, enum: ['single', 'multiple'], default: 'single' }
});

module.exports = mongoose.model('Question', questionSchema);

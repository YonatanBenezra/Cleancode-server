const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  correctAnswer: {
    type: String,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  language: { type: mongoose.Schema.Types.ObjectId, ref: 'Language' },
  difficulty: {
    type: String,
    default: 'easy',
  },
});

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;

const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  initialCode: {
    type: String,
  },
  options: {
    type: [String],
  },
  correctAnswer: {
    type: String,
  },
  time: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  language: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Language',
    required: true,
  },
  marks: {
    type: Number,
    default: 1,
  },
  position: {
    type: Number,
    required: true,
  },
  difficulty: {
    type: String,
    default: 'easy',
  },
});

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;

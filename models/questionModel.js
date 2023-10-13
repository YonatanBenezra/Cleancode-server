const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
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
    enum: ['easy', 'medium', 'hard'],
    default: 'easy',
  },
});

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;

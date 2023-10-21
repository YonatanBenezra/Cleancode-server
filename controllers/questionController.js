const handlerFactory = require('./handlerFactory');
const Question = require('../models/questionModel');

exports.createQuestion = handlerFactory.createOne(Question);
exports.updateQuestion = handlerFactory.updateOne(Question);
exports.getAllQuestions = handlerFactory.getAll(Question, {
  path: 'language',
});
exports.getQuestion = handlerFactory.getOne(Question);
exports.deleteQuestion = handlerFactory.deleteOne(Question);

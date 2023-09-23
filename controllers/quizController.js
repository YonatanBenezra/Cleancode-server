const Quiz = require('../models/quizModel');
const handlerFactory = require('./handlerFactory');

exports.createQuiz = handlerFactory.createOne(Quiz);
exports.updateQuiz = handlerFactory.updateOne(Quiz);
exports.getAllQuizzes = handlerFactory.getAll(Quiz, { path: 'language' });
exports.getQuiz = handlerFactory.getOne(Quiz);
exports.deleteQuiz = handlerFactory.deleteOne(Quiz);

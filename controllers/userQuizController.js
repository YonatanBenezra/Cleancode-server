const UserQuiz = require('../models/userQuizModel');
const handlerFactory = require('./handlerFactory');

exports.createUserQuiz = handlerFactory.createOne(UserQuiz);
exports.updateUserQuiz = handlerFactory.updateOne(UserQuiz);
exports.getAllUserQuizzes = handlerFactory.getAll(UserQuiz);
exports.getUserQuiz = handlerFactory.getOne(UserQuiz);
exports.deleteUserQuiz = handlerFactory.deleteOne(UserQuiz);

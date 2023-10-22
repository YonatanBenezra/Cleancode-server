// Import necessary modules and utility functions
const Quiz = require('../models/quizModel');
const handlerFactory = require('./handlerFactory');



// Utility functions for handling CRUD operations on quizzes using the handlerFactory
exports.getQuiz = handlerFactory.getOne(Quiz); // Retrieve a single quiz by ID
exports.createQuiz = handlerFactory.createOne(Quiz); // Create a new quiz
exports.updateQuiz = handlerFactory.updateOne(Quiz); // Update an existing quiz by ID
exports.getAllQuizzes = handlerFactory.getAll(Quiz); // Retrieve all quizzes
exports.deleteQuiz = handlerFactory.deleteOne(Quiz); // Delete a quiz by ID

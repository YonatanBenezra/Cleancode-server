const express = require('express');
const quizController = require('../controllers/quizController');
const router = express.Router();

// Route for getting all quiz and creating a new quiz
router
  .route('/')
  .get(quizController.getAllQuizzes)
  .post(quizController.createQuiz);

// Routes for getting, updating, and deleting a specific quiz
router
  .route('/:id')
  .get(quizController.getQuiz)
  .patch(quizController.updateQuiz)
  .delete(quizController.deleteQuiz);

module.exports = router;

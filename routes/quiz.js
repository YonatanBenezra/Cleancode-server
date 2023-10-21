const express = require('express');
const quizController = require('../controllers/quizController');
const authController = require('../controllers/authController');
const router = express.Router();

// Route for getting all quiz and creating a new quiz
router
  .route('/')
  .get(quizController.getAllQuizzes)
  .post(
    authController.protectAndRestrictTo('admin'),
    quizController.createQuiz
  );

// Routes for getting, updating, and deleting a specific quiz
router
  .route('/:id')
  .get(quizController.getQuiz)
  .patch(
    authController.protectAndRestrictTo('admin'),
    quizController.updateQuiz
  )
  .delete(
    authController.protectAndRestrictTo('admin'),
    quizController.deleteQuiz
  );

module.exports = router;

const express = require('express');
const quizController = require('../controllers/quizController');
const authController = require('../controllers/authController');
const router = express.Router();

router.use(authController.protect);

// Route for getting all quiz and creating a new quiz
router
  .route('/')
  .get(quizController.getAllQuizzes)
  .post(authController.restrictTo('admin'), quizController.createQuiz);

// Routes for getting, updating, and deleting a specific quiz
router
  .route('/:id')
  .get(quizController.getQuiz)
  .patch(authController.restrictTo('admin'), quizController.updateQuiz)
  .delete(authController.restrictTo('admin'), quizController.deleteQuiz);

module.exports = router;

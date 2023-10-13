const express = require('express');
const authController = require('../controllers/authController');
const userQuizController = require('../controllers/userQuizController');
const router = express.Router();

// GET all UserQuizzes and POST a new UserQuiz
router
  .route('/')
  .get(userQuizController.getAllUserQuizzes)
  .post(userQuizController.createUserQuiz); 
// Routes for retrieving, updating, and deleting a specific UserQuiz by its ID
router
  .route('/:id')
  .get(userQuizController.getUserQuiz)
  .patch(authController.restrictTo('admin'), userQuizController.updateUserQuiz)
  .delete(
    authController.restrictTo('admin'),
    userQuizController.deleteUserQuiz
  );

module.exports = router;

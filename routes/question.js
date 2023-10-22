const express = require('express');
const authController = require('../controllers/authController');
const questionController = require('../controllers/questionController');
const router = express.Router();

router.use(authController.protect);

// GET all Questions and POST a new Question
router
  .route('/')

  .get(
    questionController.attemptTrialQuizMiddleware,
    questionController.getAllQuestions
  )
  .post(authController.restrictTo('admin'), questionController.createQuestion);
// Routes for retrieving, updating, and deleting a specific Question by its ID
router
  .route('/:id')
  .get(questionController.getQuestion)
  .patch(authController.restrictTo('admin'), questionController.updateQuestion)
  .delete(
    authController.restrictTo('admin'),
    questionController.deleteQuestion
  );
module.exports = router;

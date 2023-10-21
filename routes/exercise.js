const express = require('express');
const exerciseController = require('../controllers/exerciseController');
const router = express.Router();
const authController = require('../controllers/authController');

// Route for getting all exercises and creating a new exercise
router
  .route('/')
  .get(exerciseController.getAllExercises)
  .post(exerciseController.createExercise);

// Routes for getting, updating, and deleting a specific exercise
router
  .route('/:id')
  .get(exerciseController.getExercise)
  .patch(
    authController.protectAndRestrictTo('admin'),
    exerciseController.updateExercise
  )
  .delete(
    authController.protectAndRestrictTo('admin'),
    exerciseController.deleteExercise
  );

module.exports = router;

const express = require('express');
const exerciseController = require('../controllers/exerciseController');
const router = express.Router();

router.route('/').get(exerciseController.getAllExercises);

router.route('/:id').get(exerciseController.getExercise);

// // Protect all routes after this middleware
// // router.use(authController.protect);
// // router.use(authController.restrictTo('admin'));

router.route('/').post(exerciseController.createExercise);
router
  .route('/:id')
  .patch(
    exerciseController.updateExercise
  )
  .delete(exerciseController.deleteExercise);

module.exports = router;

const express = require('express');
const authController = require('../controllers/authController');
const paymentController = require('../controllers/paymentController');
const router = express.Router();

// Route for creating a new topic
router
  .route('/')
  .get(paymentController.getAllPayments)
  .post(authController.restrictTo('admin'), paymentController.createPayment);

// Routes for getting all topics and updating a specific topic
router
  .route('/:id')
  .get(paymentController.getPayment)
  .patch(authController.restrictTo('admin'), paymentController.updatePayment)
  .delete(authController.restrictTo('admin'), paymentController.deletePayment);

// Route for getting all topics (alternative way using 'getAllTopics')

module.exports = router;

const express = require('express');
const authController = require('../controllers/authController');
const paymentController = require('../controllers/paymentController');
const router = express.Router();

router.use(authController.protect);
// Route for creating a new payment
router
  .route('/')
  .get(paymentController.getAllPayments)
  .post(paymentController.createPayment);

// Routes for getting all payments and updating a specific payment
router
  .route('/:id')
  .get(paymentController.getPayment)
  .patch(authController.restrictTo('admin'), paymentController.updatePayment)
  .delete(authController.restrictTo('admin'), paymentController.deletePayment);

module.exports = router;

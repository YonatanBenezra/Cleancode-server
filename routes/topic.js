const express = require('express');
const authController = require('../controllers/authController');
const topicController = require('../controllers/topicController');
const router = express.Router();

// Route for creating a new topic
router
  .route('/')
  .get(topicController.getAllTopics)
  .post(authController.restrictTo('admin'), topicController.createTopic);

// Routes for getting all topics and updating a specific topic
router
  .route('/:id')
  .get(topicController.getTopic)
  .patch(authController.restrictTo('admin'), topicController.updateTopic)
  .delete(authController.restrictTo('admin'), topicController.deleteTopic);

// Route for getting all topics (alternative way using 'getAllTopics')

module.exports = router;

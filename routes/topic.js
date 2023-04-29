const express = require('express');
const topicController = require('../controllers/topicController');
const router = express.Router();

router.route('/').get(topicController.getAllTopics);

router.route('/:id').get(topicController.getTopic);

// // Protect all routes after this middleware
// // router.use(authController.protect);
// // router.use(authController.restrictTo('admin'));

router.route('/').post(topicController.createTopic);
router
  .route('/:id')
  .patch(
    topicController.updateTopic
  )
  .delete(topicController.deleteTopic);

module.exports = router;

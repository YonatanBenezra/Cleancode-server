const express = require("express");
const topicController = require("../controllers/topicController");
const router = express.Router();

// Route for creating a new topic
router.post("/", topicController.createTopic);

// Routes for getting all topics and updating a specific topic
router
  .route("/:id")
  .get(topicController.getTopic)
  .patch(topicController.updateTopic)
  .delete(topicController.deleteTopic);

// Route for getting all topics (alternative way using 'getAllTopics')
router.get("/", topicController.getAllTopics);

module.exports = router;

const express = require('express');
const blogController = require('../controllers/blogController');
const authController = require('../controllers/authController');
const router = express.Router();

// Route for getting all blogs and creating a new blog
router
  .route('/')
  .get(blogController.getAllBlogs)
  .post(authController.restrictTo('admin'), blogController.createBlog);

// Route for getting, updating, and deleting a specific blog
router
  .route('/:id')
  .get(blogController.getBlog) 
  .patch(authController.restrictTo('admin'), blogController.updateBlog)
  .delete(authController.restrictTo('admin'), blogController.deleteBlog);

module.exports = router;

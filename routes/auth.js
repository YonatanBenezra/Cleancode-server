const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

// Route for getting all users and creating a new user
router.route('/').get(authController.users).post(authController.register);

// Routes for login
router.route('/login').post(authController.login);
module.exports = router;

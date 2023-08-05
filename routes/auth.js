const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

// Route for getting all users and creating a new user
router.route("/").get(authController.users).post(authController.register);

// Routes for getting, updating, and deleting a specific user
router.route("/login").post(authController.login);
//   .patch(authController.updateUser)
//   .delete(authController.deleteUser);
module.exports = router;

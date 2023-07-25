const express = require("express");
const languageController = require("../controllers/languageController");
const router = express.Router();

// Route for getting all languages and creating a new language
router
  .route("/")
  .get(languageController.getAllLanguages)
  .post(languageController.createLanguage);

// Routes for getting, updating, and deleting a specific language
router
  .route("/:id")
  .get(languageController.getLanguage)
  .patch(languageController.updateLanguage)
  .delete(languageController.deleteLanguage);

module.exports = router;

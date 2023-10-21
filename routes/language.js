const express = require('express');
const authController = require('../controllers/authController');
const languageController = require('../controllers/languageController');
const router = express.Router();

// Route for getting all languages and creating a new language
router
  .route('/')
  .get(languageController.getAllLanguages)
  .post(
    authController.protectAndRestrictTo('admin'),
    languageController.createLanguage
  );

// Routes for getting, updating, and deleting a specific language
router
  .route('/:id')
  .get(languageController.getLanguage)
  .patch(
    authController.protectAndRestrictTo('admin'),
    languageController.updateLanguage
  )
  .delete(
    authController.protectAndRestrictTo('admin'),
    languageController.deleteLanguage
  );

module.exports = router;

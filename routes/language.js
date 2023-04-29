const express = require("express");
const languageController = require("../controllers/languageController");
const router = express.Router();

router.route("/").get(languageController.getAllLanguages);

router.route("/:id").get(languageController.getLanguage);

// // Protect all routes after this middleware
// // router.use(authController.protect);
// // router.use(authController.restrictTo('admin'));

router.route("/").post(languageController.createLanguage);
router
  .route("/:id")
  .patch(languageController.updateLanguage)
  .delete(languageController.deleteLanguage);

module.exports = router;

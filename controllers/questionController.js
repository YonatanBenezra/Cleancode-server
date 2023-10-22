const handlerFactory = require('./handlerFactory');
const Question = require('../models/questionModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

// Middleware function to handle trial quiz attempts for a user
exports.attemptTrialQuizMiddleware = catchAsync(async (req, res, next) => {
  try {
    // Find the user by their ID
    const user = await User.findById(req.user._id);

    // Extract the quiz ID from the request parameters
    const quizId = req.query.quiz;

    // Find the trial record of this user for the quiz they are attempting
    const trialRecord = user.trialQuizInfo.find((entry) =>
      entry.quiz.equals(quizId)
    );

    // If no trial record exists for this user and quiz, create one with 2 remaining attempts
    if (!trialRecord) {
      user.trialQuizInfo.push({
        quiz: quizId,
        trialsRemaining: 2,
      });
      await user.save();
      return next();
    }

    // If the trial record exists and there are available attempts, decrement the number of trials and proceed
    if (trialRecord.trialsRemaining > 0) {
      trialRecord.trialsRemaining -= 1;
      await user.save();
      return next();
    }

    // If there are no trials left, send a 403 Forbidden response
    return res.status(403).json({
      message: 'No trial attempts left for this quiz.',
      accessGranted: false,
    });
  } catch (error) {
    // Handle any unexpected errors by sending a 500 Internal Server Error response
    return res.status(500).json({ message: 'Server error.' });
  }
});
exports.createQuestion = handlerFactory.createOne(Question);
exports.updateQuestion = handlerFactory.updateOne(Question);
exports.getAllQuestions = handlerFactory.getAll(Question, {
  path: 'language',
});
exports.getQuestion = handlerFactory.getOne(Question);
exports.deleteQuestion = handlerFactory.deleteOne(Question);

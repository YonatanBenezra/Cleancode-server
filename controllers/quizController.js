const Quiz = require('../models/quizModel');
const catchAsync = require('../utils/catchAsync');
const handlerFactory = require('./handlerFactory');
function selectRandom(array, n) {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}
exports.getQuiz = catchAsync(async (req, res, next) => {
  // Fetch the quiz data
  const quiz = await Quiz.findById(req.params.id).populate({
    path: 'questions',
    populate: {
      path: 'language',
    },
  });

  // Separate questions by type
  const regularQuestions = quiz.questions.filter((q) => q.type === 'regular');
  const codingQuestions = quiz.questions.filter((q) => q.type === 'coding');
  const exerciseQuestions = quiz.questions.filter((q) => q.type === 'exercise');

  // Randomly select questions
  const selectedRegularQuestions = selectRandom(regularQuestions, 25);
  const selectedCodingQuestions = selectRandom(codingQuestions, 12);
  const selectedExerciseQuestions = selectRandom(exerciseQuestions, 13);

  // Combine selected questions
  const selectedQuestions = [
    ...selectedRegularQuestions,
    ...selectedCodingQuestions,
    ...selectedExerciseQuestions,
  ];

  // Respond with selected questions
  res.status(200).json({
    status: 'success',
    data: {
      data: selectedQuestions,
    },
  });
});

exports.createQuiz = handlerFactory.createOne(Quiz);
exports.updateQuiz = handlerFactory.updateOne(Quiz);
exports.getAllQuizzes = handlerFactory.getAll(Quiz);
exports.deleteQuiz = handlerFactory.deleteOne(Quiz);

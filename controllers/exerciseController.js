const Exercise = require("../models/exerciseModel.js");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const handlerFactory = require("./handlerFactory");

exports.createExercise = catchAsync(async (req, res) => {
  const newExercise = await Exercise.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      data: newExercise,
    },
  });
});
exports.updateExercise = catchAsync(async (req, res, next) => {
  const exercise = await Exercise.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!exercise) {
    return next(new AppError("No document found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      data: exercise,
    },
  });
});
exports.getAllExercises = handlerFactory.getAll(Exercise, { path: "topic" });
exports.getExercise = handlerFactory.getOne(Exercise, { path: "topic" });
exports.deleteExercise = handlerFactory.deleteOne(Exercise);

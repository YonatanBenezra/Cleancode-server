const Exercise = require("../models/exerciseModel.js");
const handlerFactory = require("./handlerFactory");

exports.createExercise = handlerFactory.createOne(Exercise);
exports.updateExercise = handlerFactory.updateOne(Exercise);
exports.getAllExercises = handlerFactory.getAll(Exercise, { path: "topic" });
exports.getExercise = handlerFactory.getOne(Exercise, { path: "topic" });
exports.deleteExercise = handlerFactory.deleteOne(Exercise);

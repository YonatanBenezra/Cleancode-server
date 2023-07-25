const Language = require("../models/languageModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const handlerFactory = require("./handlerFactory");

exports.createLanguage = handlerFactory.createOne(Language);
exports.updateLanguage = handlerFactory.updateOne(Language);
exports.getAllLanguages = handlerFactory.getAll(Language);
exports.getLanguage = handlerFactory.getOne(Language);
exports.deleteLanguage = handlerFactory.deleteOne(Language);

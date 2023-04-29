const Language = require('../models/languageModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const handlerFactory = require('./handlerFactory');


exports.createLanguage = catchAsync(async (req, res) => {
    console.log(req.body)
  const newLanguage = await Language.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      data: newLanguage,
    },
  });
});
exports.updateLanguage = catchAsync(async (req, res, next) => {
  const language = await Language.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!language) {
    return next(new AppError('No document found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      data: language,
    },
  });
});
exports.getAllLanguages = handlerFactory.getAll(Language);
exports.getLanguage = handlerFactory.getOne(Language);
exports.deleteLanguage = handlerFactory.deleteOne(Language);

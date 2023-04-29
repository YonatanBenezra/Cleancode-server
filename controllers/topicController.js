const Topic = require('../models/topicModel.js');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const handlerFactory = require('./handlerFactory');


exports.createTopic = catchAsync(async (req, res) => {
  const newTopic = await Topic.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      data: newTopic,
    },
  });
});
exports.updateTopic = catchAsync(async (req, res, next) => {
  const topic = await Topic.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!topic) {
    return next(new AppError('No document found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      data: topic,
    },
  });
});
exports.getAllTopics = handlerFactory.getAll(Topic, { path: 'language' });
exports.getTopic = handlerFactory.getOne(Topic, { path: 'language' });
exports.deleteTopic = handlerFactory.deleteOne(Topic);

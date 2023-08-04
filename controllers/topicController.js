const handlerFactory = require('./handlerFactory');
const Topic = require('../models/topicModel');

exports.createTopic = handlerFactory.createOne(Topic);
exports.updateTopic = handlerFactory.updateOne(Topic);
exports.getAllTopics = handlerFactory.getAll(Topic, { path: 'language' });
exports.getTopic = handlerFactory.getOne(Topic, { path: 'language' });
exports.deleteTopic = handlerFactory.deleteOne(Topic);

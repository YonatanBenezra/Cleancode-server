const Blog = require("../models/blogModel");
const handlerFactory = require("./handlerFactory");

exports.createBlog = handlerFactory.createOne(Blog);
exports.updateBlog = handlerFactory.updateOne(Blog);
exports.getAllBlogs = handlerFactory.getAll(Blog);
exports.getBlog = handlerFactory.getOne(Blog);
exports.deleteBlog = handlerFactory.deleteOne(Blog);

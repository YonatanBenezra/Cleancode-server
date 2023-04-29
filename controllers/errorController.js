const AppError = require('../utils/appError');
function capitalizeStr(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};
const handleDuplicateFieldDB = (err) => {
  const message = `${capitalizeStr(
    Object.keys(err.keyValue).join(' ')
  )} already exist. Please use another value!`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, req, res) =>
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });

const sendErrorProd = (err, req, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error ';
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    if (error.kind === 'ObjectId') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldDB(error);
    sendErrorProd(error, req, res);
  }
};

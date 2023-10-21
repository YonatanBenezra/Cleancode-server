const handlerFactory = require('./handlerFactory');
const Payment = require('../models/paymentModel');

// CRUD operations for Payments using handlerFactory for common operations
exports.createPayment = handlerFactory.createOne(Payment);
exports.updatePayment = handlerFactory.updateOne(Payment);
exports.getAllPayments = handlerFactory.getAll(Payment);
exports.getPayment = handlerFactory.getOne(Payment);
exports.deletePayment = handlerFactory.deleteOne(Payment);

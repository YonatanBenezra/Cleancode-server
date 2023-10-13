const handlerFactory = require('./handlerFactory');
const Payment = require('../models/paymentModel');

exports.createPayment = handlerFactory.createOne(Payment);
exports.updatePayment = handlerFactory.updateOne(Payment);
exports.getAllPayments = handlerFactory.getAll(Payment);
exports.getPayment = handlerFactory.getOne(Payment);
exports.deletePayment = handlerFactory.deleteOne(Payment);

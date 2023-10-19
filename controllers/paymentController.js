const { default: axios } = require('axios');
const handlerFactory = require('./handlerFactory');
const Payment = require('../models/paymentModel');
const catchAsync = require('../utils/catchAsync');

const getAccessToken = async () => {
  try {
    // Configuring request payload and headers
    const config = {
      headers: {
        Accept: 'application/json',
        'Accept-Language': 'en_US',
        'content-type': 'application/x-www-form-urlencoded',
      },
      auth: {
        username: process.env.PAYPAL_CLIENT_ID,
        password: process.env.PAYPAL_SECRET,
      },
    };

    // Making the actual request
    const response = await axios.post(
      'https://api.sandbox.paypal.com/v1/oauth2/token',
      'grant_type=client_credentials',
      config
    );

    return response.data.access_token;
  } catch (error) {
    console.error('Error obtaining access token:', error.response.data);
  }
};

exports.createPayment = catchAsync(async (req, res) => {
  // Defining the order details
  const order = {
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'USD',
          value: '3.00',
        },
        description: 'Quiz Order',
      },
    ],
    application_context: {
      return_url: 'http://localhost:5173/success',
      cancel_url: 'http://localhost:5173/cancel',
    },
  };

  // Getting the access token for authentication
  const ACCESS_TOKEN = await getAccessToken();

  // Making the payment creation request
  const response = await axios.post(
    'https://api.sandbox.paypal.com/v2/checkout/orders',
    order,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    }
  );
  // Saving payment information to the database
  const paymentInfo = {
    orderID: response.data.id,
    intent: order.intent,
    status: response.data.status,
    user: req.user._id,
    quiz: req.body.quiz,
    purchase_units: order.purchase_units,
  };

  const paymentRecord = new Payment(paymentInfo);
  await paymentRecord.save();

  // Sending the response back to the client
  res.send(response.data);
});

// CRUD operations for Payments using handlerFactory for common operations
exports.updatePayment = handlerFactory.updateOne(Payment);
exports.getAllPayments = handlerFactory.getAll(Payment);
exports.getPayment = handlerFactory.getOne(Payment);
exports.deletePayment = handlerFactory.deleteOne(Payment);

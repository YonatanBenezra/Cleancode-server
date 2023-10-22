const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    orderID: {
      type: String,
      required: true,
    },
    intent: String,
    status: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
    accessGranted: {
      type: Boolean,
      default: true,
    },
    purchase_units: [
      {
        description: String,
        amount: {
          currency_code: String,
          value: String,
        },
        payee: {
          email_address: String,
          merchant_id: String,
        },
      },
    ],
  },

  {
    timestamps: true,
  }
);

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;


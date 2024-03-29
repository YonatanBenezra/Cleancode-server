const mongoose = require('mongoose');
const exerciseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    question: { type: String },
    description: { type: String, required: true },
    difficulty: { type: Number, required: true },
    topic: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic' },
    position: { type: Number, required: true },
    approved: { type: Boolean, default: false, required: true },
    hint: { type: String },
    attempts: { type: Number, default: 0 },
    imgUrl: { type: String },
  },
  {
    timestamps: true,
  }
);

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;

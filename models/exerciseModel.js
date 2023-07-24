const mongoose = require("mongoose");
const exerciseSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    question: { type: String },
    code: { type: String, required: true },
    /* answers: { type: Array, required: true }, */
    difficulty: { type: Number, required: true },
    topic: { type: mongoose.Schema.Types.ObjectId, ref: "Topic" },
    position: { type: Number, required: true },
    approved: { type: Boolean, default: true, required: true },
    hint: { type: String },
    attempts: { type: Number, default: 0 },
    imageUrl: { type: String },
  },
  {
    timestamps: true,
  }
);

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;

const mongoose = require("mongoose");
const topicSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    language: { type: mongoose.Schema.Types.ObjectId, ref: "Language" },
    position: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
  { autoIndex: true }
);

const Topic = mongoose.model("Topic", topicSchema);

module.exports = Topic;

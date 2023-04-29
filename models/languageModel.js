const mongoose = require("mongoose");
const languageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    position: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
  { autoIndex: true }
);

const Language = mongoose.model("Language", languageSchema);

module.exports = Language;

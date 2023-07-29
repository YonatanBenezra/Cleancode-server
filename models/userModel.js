const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    finishedExercises: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }],
});

module.exports = mongoose.model('User', userSchema);
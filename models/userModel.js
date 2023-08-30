const crypto = require('crypto');
const moment = require('moment');
const schedule = require('node-schedule');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: {
    type: String,
    default:
      'https://res.cloudinary.com/djkdk03mf/image/upload/v1691243473/WhatsApp_Image_2023-08-05_at_7.50.29_PM_swfb5l.jpg',
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    select: false,
  },
  passwordConfirm: {
    type: String,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  finishedExercises: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' },
  ],

  codeStrike: {
    type: Number,
    default: 0,
  },
  lastCodedDate: {
    type: Date,
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimeStamp;
  }
  return false;
};
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};
userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

const User = mongoose.model('User', userSchema);
const updateUserStrike = async () => {
  try {
    // Get all users from the database
    const users = await User.find();

    // Use forEach instead of a for...of loop
    users.forEach(async (user) => {
      // If user has never coded, skip
      if (!user.lastCodedDate) return;

      const lastCodedDate = moment(user.lastCodedDate);
      const currentDate = moment();

      // Difference in days between last coded date and current date
      const dayDifference = currentDate.diff(lastCodedDate, 'days');

      if (dayDifference === 1) {
        // User coded yesterday, increment codeStrike
        user.codeStrike += 1;
      } else if (dayDifference > 1) {
        // User didn't code yesterday, reset codeStrike
        user.codeStrike = 0;
      }
      await user.save();
    });
  } catch (error) {
    console.error('Error updating codeStrike:', error);
  }
};

// Schedule task to run every day at 00:01
schedule.scheduleJob('1 0 * * *', updateUserStrike);

module.exports = User;

const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: 'You must enter a valid email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

 // Pre-save hook
userSchema.pre('save', async function hashPassword() {
  if (!this.isModified('password')) {
    return;
  }
  const saltRounds = Number(process.env.SALT_ROUNDS) || 10;
  this.password = await bcrypt.hash(this.password, saltRounds);
});

// Static method for logging in
userSchema.statics.findUserByCredentials = async function findUserByCredentials(
  email,
  password,
) {
  const user = await this.findOne({ email }).select('+password');

  // 1. If user not found, THROW the error
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const matched = await bcrypt.compare(password, user.password);

  // 2. If password does not match, THROW the error
  if (!matched) {
    throw new Error('InvalidCredentials');
  }

  // Convert the Mongoose document to a plain JavaScript object
const userObject = user.toObject();
// Delete the password property from the plain object
delete userObject.password;

  // Return the user object
  return user;
};

module.exports = mongoose.model('user', userSchema);

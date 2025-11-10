const mongoose  = require('mongoose');
const validator = require('validator');
const bcrypt    = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type:     String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type:      String,
    required:  true,
    unique:    true,
    lowercase: true,
    trim:      true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: 'You must enter a valid email',
    },
  },
  password: {
    type:   String,
    required: true,
    select: false,  // so it’s excluded by default
  },
  createdAt: {
    type:    Date,
    default: Date.now,
  },
});

// Pre‑save hook to hash password when modified
userSchema.pre('save', async function findUserByCredentials() {
  if (!this.isModified('password')) {
    return;
  }
  const saltRounds = Number(process.env.SALT_ROUNDS) || 10;
  this.password = await bcrypt.hash(this.password, saltRounds);
});

// Static method for login
userSchema.statics.findUserByCredentials = async function findUserByCredentials(email, password) {
  const user = await this.findOne({ email }).select('+password');
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const matched = await bcrypt.compare(password, user.password);
  if (!matched) {
    throw new Error('Invalid email or password');
  }

  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

module.exports = mongoose.model('User', userSchema);

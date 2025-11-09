const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

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
      validate: {
        validator(value) {
          return validator.isEmail(value);
        },
        message: "You must enter a valid email",
    },
  },
    password: {
      type: String,
      required: true,
      select: false,
    }
});

// Pre-save hook
userSchema.pre('save', async function(next) {
  if(!this.isModified('password')) return next();

  try {
  const saltRounds = Number(process.env.SALT_ROUNDS) || 10;
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
  } catch(err) {
    next(err);
  }
});


// Static method for logging in
userSchema.statics.findUserByCredentials = async function findUserByCredentials (email, password) {
  const user = await this.findOne({ email }).select("+password");
    if(!user) {
      return Promise.reject(new Error("Incorrect email or password"));
    }
    const matched = await bcrypt.compare(password, user.password);
      if(!matched) {
        return Promise.reject(new Error ("Incorrect email or password"));
      }
      user.password = undefined;
      return user;
  };

module.exports = mongoose.model("user", userSchema);
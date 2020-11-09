const mongoose = require("mongoose");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    minlength: 3,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    minlength: 3,
    trim: true,
    required: true,
  },
  username: {
    type: String,
    minlength: 5,
    trim: true,
    required: true,
  },
  avarter: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    trim: true,
  },
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  return _.pick(userObject, [
    "_id",
    "username",
    "email",
    "fullname",
    "avarter",
  ]);
};

userSchema.pre("save", function (next) {
  const user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

const User = mongoose.model("user", userSchema);

module.exports = User;

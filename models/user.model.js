const mongoose = require("mongoose");
const { type } = require("os");
const Schema = mongoose.Schema;

const userModel = new Schema(
  {
    username: {
      type: String,
      require: [true, "You need to name a product"],
    },
    gender: {
      type: Boolean,
      require: true,
    },
    mobile: {
      type: Number,
      require: true,
      default: 0,
    },
    email: {
      type: String,
      require: [true, "Must have email"],
    },
    password: {
      type: String,
      require: [true, "Must have password"],
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userModel);

module.exports = User;

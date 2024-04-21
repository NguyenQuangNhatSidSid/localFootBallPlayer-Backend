const mongoose = require("mongoose");
const { type } = require("os");
const Schema = mongoose.Schema;

const userModel = new Schema(
  {
    username: {
      type: String,
      required: [true, "You need to name a product"],
    },
    gender: {
      type: Boolean,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
      default: 0,
    },
    email: {
      type: String,
      required: [true, "Must have email"],
    },
    password: {
      type: String,
      required: [true, "Must have password"],
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userModel);

module.exports = User;

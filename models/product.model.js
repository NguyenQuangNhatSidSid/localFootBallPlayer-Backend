const mongoose = require("mongoose");
const { type } = require("os");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const productModel = new Schema(
  {
    name: {
      type: String,
      require: [true, "You need to name a product"],
    },
    quantity: {
      type: Number,
      require: true,
      default: 0,
    },
    price: {
      type: Number,
      require: true,
      default: 0,
    },
    image: {
      type: String,
      require: false,
    },
    numberGamePlays: {
      type: Number,
      require: true,
      default: 0,
    },
    rankPoint: {
      type: Number,
      require: true,
      default: 1,
    },
    rank: {
      type: String,
      require: true,
      default: "bonzo",
    },
    defender: {
      type: Boolean,
      require: false,
      default: false,
    },
    striker: {
      type: Boolean,
      require: false,
      default: false,
    },
    goalKeeper: {
      type: Boolean,
      require: false,
      default: false,
    },
    saitamaPoint: {
      type: Number,
      require: true,
      default: 0,
    },
    rightFoot: {
      type: Boolean,
      require: true,
      default: true,
    },
    leftFoot: {
      type: Boolean,
      require: true,
      default: true,
    },
    active: {
      type: Boolean,
      require: false,
      default: true,
    },
  },
  { timestamps: true }
);
const Product = mongoose.model("Product", productModel);

module.exports = Product;

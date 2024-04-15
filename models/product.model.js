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

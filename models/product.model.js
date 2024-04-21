const mongoose = require("mongoose");
const { type } = require("os");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const productModel = new Schema(
  {
    player_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
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
    playerWeight: {
      type: Number,
      require: true,
      validate: {
        validator: function (v) {
          return v > 50;
        },
        message: (props) =>
          `${props.value} is not validate, Weight must be greater than 50 kg`,
      },
      default: 51,
    },
    playerHeight: {
      type: Number,
      require: true,
      validate: {
        validator: function (v) {
          return v > 160;
        },
        message: (props) =>
          `${props.value} is not validate, Height must be greater than 160`,
      },
      default: 161,
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

const mongoose = require("mongoose");
const { type } = require("os");
const Schema = mongoose.Schema;

const footBallStadiumModel = new Schema(
  {
    managerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    stadium: {
      stadiumFor5: {
        type: Boolean,
        default: true,
      },
      stadiumFor7: {
        type: Boolean,
        default: true,
      },
      stadiumFor11: {
        type: Boolean,
        default: true,
      },
    },
    phone: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          var re = /^\d{10}$/;
          return re.test(v);
        },
        message: (props) => `${props.value} this phone number is not correct!`,
      },
    },
    discount: {
      isDiscount: {
        type: Boolean,
        required: true,
        default: true,
      },
      discountPercent: {
        type: Number,
        required: true,
        default: 0,
      },
    },
    address: {
      type: String,
      required: true,
      default: "",
    },
    carPark: {
      isCarPark: {
        type: Boolean,
        required: true,
        default: true,
      },
      price: {
        type: Number,
        required: true,
        default: 0,
      },
    },
  },
  { timestamps: true }
);
const stadium = mongoose.model("footBallStadium", footBallStadiumModel);

module.exports = stadium;

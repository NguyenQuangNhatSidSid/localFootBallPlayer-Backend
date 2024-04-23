const mongoose = require("mongoose");
const { type } = require("os");
const Schema = mongoose.Schema;

const rankModel = new Schema(
  {
    gameRank: {
      type: Boolean,
      required: true,
      default: true,
    },
    rankGame: {
      type: String,
      enum: [
        "copper",
        "silver",
        "gold",
        "platinum",
        "Emerald",
        "diamond",
        "master",
        "GrandMaster",
      ],
      default: "copper",
    },
    gamePoint: {
      type: Number,
      required: [true, "Must have point"],
      default: 1,
    },
  },
  { timestamps: true }
);
const Rank = mongoose.model("Rank", rankModel);

module.exports = Rank;

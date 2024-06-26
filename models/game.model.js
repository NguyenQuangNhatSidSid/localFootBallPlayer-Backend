const mongoose = require("mongoose");
const { type } = require("os");
const Schema = mongoose.Schema;

const gameModel = new Schema(
  {
    managerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    player_Id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
    ],
    footballStadium: {
      type: String,
      required: [
        true,
        "You need to write name a football field your team play",
      ],
    },
    gameRank: {
      type: Boolean,
      required: true,
      default: true,
    },
    rankOfGame: {
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
    gameStatus: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);
const Game = mongoose.model("Game", gameModel);

module.exports = Game;

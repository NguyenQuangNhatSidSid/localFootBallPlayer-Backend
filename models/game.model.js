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
    },
    gamePoint: {
      type: String,
      required: [true, "Must have point"],
    },
  },
  { timestamps: true }
);
const Game = mongoose.model("Game", gameModel);

module.exports = Game;

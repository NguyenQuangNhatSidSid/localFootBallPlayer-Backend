const mongoose = require("mongoose");
const { type } = require("os");
const Schema = mongoose.Schema;

const gameSessionSchema = new Schema(
  {
    gameId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Game",
    },
    playerPayments: [
      {
        player_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        amount: {
          type: Number,
        },
        hasPaid: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: true }
);
const GameSession = mongoose.model("GameSession", gameSessionSchema);

module.exports = GameSession;

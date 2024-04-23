const Product = require("../models/product.model");
const User = require("../models/user.model");
const Game = require("../models/game.model");

const getGame = async (req, res) => {
  try {
    const result = await Game.find({
      managerId: req.user.id,
    });
    if (!result) {
      return res.status(400).json({ message: `this team is not exsited` });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const createGame = async (req, res) => {
  try {
    const body = req.body;
    req.body.managerId = req.user.id;
    const result = await Game.create(data);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateGame = async (req, res) => {
  try {
    const body = req.body;
    const gameId = req.params.id;
    req.body.managerId = req.user.id;
    const game = await Game.findById(gameId);

    if (!game) {
      return res.status(400).json({ message: "Game not found!" });
    }
    // hàm updateGame sẽ kiểm tra liệu game.gamePoint có đủ 100 điểm để lên rank hay không. Nếu đủ, điểm game sẽ được thiết lập lại là 0, và rank sẽ được nâng lên 1 bậc.
    if (game.gameRank === true) {
      game.gamePoint++;
      if (game.gamePoint >= 100) {
        game.gamePoint = 0;
        const ranks = [
          "copper",
          "silver",
          "gold",
          "platinum",
          "Emerald",
          "diamond",
          "master",
          "GrandMaster",
        ];
        const currentRankIndex = ranks.indexOf(game.rankGame);
        if (currentRankIndex < ranks.length - 1) {
          gameRank = ranks[currentRankIndex + 1];
        }
      }
    }
    // Cập nhật các trường của 1 game theo body
    Object.keys(body).forEach((key) => {
      game[key] = body[key];
    });
    //Lưu game
    const result = await game.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getGame, createGame, updateGame };

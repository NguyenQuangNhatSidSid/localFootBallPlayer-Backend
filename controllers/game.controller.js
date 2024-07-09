const Game = require("../models/game.model");

const theChosenField = ` -__v -gameStatus`;

const getGame = async (req, res, next) => {
  try {
    const result = await Game.find({
      managerId: req.user.id,
      gameStatus: true,
    })
      .select(theChosenField)
      .populate("player_Id");
    if (!result) {
      return res.status(400).json({ message: `this team is not exsited` });
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getOneGame = async (req, res) => {
  try {
    const gameId = req.params.id;
    const result = await Game.findById(gameId, { gameStatus: true }).select(
      theChosenField
    );
    if (!result) {
      return res.status(400).json({ message: `this team is not exsited` });
    }
    res.status(200).json(result);
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error);
  }
};

const createGame = async (req, res) => {
  try {
    // const data = req.body;
    // req.body.managerId = req.user.id;
    const data = { ...req.body, managerId: req.user.id };
    const result = await Game.create(data);
    res.status(200).json(result);
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error);
  }
};

const getGameByRank = async (req, res) => {
  try {
    const rank = req.query;
    const result = await Game.find({
      rankOfGame: rank,
      gameStatus: true,
    }).select(theChosenField);
    res.status(200).json(result);
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error);
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
        const currentRankIndex = ranks.indexOf(game.rankOfGame);
        if (currentRankIndex < ranks.length - 1) {
          game.rankOfGame = ranks[currentRankIndex + 1];
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
    // res.status(500).json({ message: error.message });
    next(error);
  }
};

const deleteGame = async (req, res) => {
  try {
    const gameId = req.params.id;
    const game = await game.findById(gameId);

    if (!game || !game.gameStatus) {
      return res
        .status(404)
        .json({ message: "Game not found or already deleted" });
    }
    game.gameStatus = false;
    const result = await game.save();
    res.status(200).json(result);
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error);
  }
};

module.exports = {
  getGame,
  createGame,
  updateGame,
  deleteGame,
  getOneGame,
  getGameByRank,
};

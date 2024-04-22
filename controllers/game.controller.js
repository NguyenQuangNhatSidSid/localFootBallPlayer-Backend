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
    const data = req.body;
    // const user = await User.findById(req.user.id);
    // if (!user) {
    //   return res.status(400).json({ message: `can found user` });
    // }
    req.body.managerId = req.user.id;
    const result = await Game.create(data);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getGame, createGames };

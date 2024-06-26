const QRCode = require("qrcode");
const Product = require("../models/product.model");
const User = require("../models/user.model");
const GameSession = require("../models/gameSession.model");

const generateQRCode = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ message: `User is not exsited` });
    }
    const qrCode = await QRCode.toDataURL(user.email);
    user.qrCode = qrCode;
    await user.save();
    res.status(200).json({ qrCode });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const createGameSession = async (req, res) => {
  try {
    const { gameId, players, costPerPlayer } = req.params;
    const gameSession = new GameSession({
      gameId,
      playerPayments: players.map((player) => ({
        player_id: player.id,
        amount: player.isGoalKeeper ? 0 : costPerPlayer,
      })),
    });
    await gameSession.save();
    res.status(200).json({ gameSession });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const markPlayerPaid = async (req, res) => {
  try {
    const { sessionId, player } = req.body;
    const session = await GameSession.findById(sessionId);
    if (!session) {
      return res.status(400).json({ message: `session is not found!` });
    }
    const playerPayment = session.playerPayments.find((payment) => {
      payment.player_id.toString() === player_id;
    });
    if (!playePayment) {
      return res
        .status(400)
        .json({ message: `player not found in this session!` });
    }
    playerPayment.hasPaid = true;
    await session.save();
    res.status(200).json({ session });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  generateQRCode,
  createGameSession,
  markPlayerPaid,
};

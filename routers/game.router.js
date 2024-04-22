const express = require("express");
const router = express.Router();
const gameController = require("../controllers/game.controller");

// router.get("/", productController.getProduct);
router.post("/game", gameController.getGame);
router.post("/game/create-game", gameController.createGames);

module.exports = router;

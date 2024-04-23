const express = require("express");
const router = express.Router();
const gameController = require("../controllers/game.controller");

// router.get("/", productController.getProduct);
router.post("/game", gameController.getGame);
router.post("/game/create-game", gameController.createGames);
router.post("/game/find-one-game/:id", gameController.getOneGame);
router.post("/game/update-game/:id", gameController.updateGame);
router.post("/game/delete-game/:id", gameController.deleteGame);
router.post("/game/get-game-by-rank", gameController.getGameByRank);

module.exports = router;

const express = require("express");
const router = express.Router();
const gameController = require("../controllers/game.controller");
const validateToken = require("../middleware/validateTokenHanlder");

router.use(validateToken);
// router.get("/", productController.getProduct);
router.get("/", gameController.getGame);
router.post("/create-game", gameController.createGame);
router.get("/find-one-game/:id", gameController.getOneGame);
router.put("/update-game/:id", gameController.updateGame);
router.patch("/delete-game/:id", gameController.deleteGame);
router.get("/get-game-by-rank", gameController.getGameByRank);

module.exports = router;

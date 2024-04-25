const express = require("express");
const router = express.Router();
const scanQrController = require("../controllers/scanQr.controller");
const validateToken = require("../middleware/validateTokenHanlder");

router.use(validateToken);
// router.get("/", productController.getProduct);
router.post("/qr-generate/:id", scanQrController.generateQRCode);
router.post("/create-gamesession", scanQrController.createGameSession);
router.patch("/mark-player-paid", scanQrController.markPlayerPaid);
module.exports = router;

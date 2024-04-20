const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// router.get("/", productController.getProduct);
router.post("/register", userController.registerUser);

module.exports = router;

const product = require("../models/product.model");
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const servciePost = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token.length === 0) {
      res.status(400).json({ message: "not correct" });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, code) => {
      if (err) {
        return res.status(400).json({ message: "not correct" });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = servciePost;

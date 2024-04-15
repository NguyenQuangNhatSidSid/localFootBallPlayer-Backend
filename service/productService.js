const product = require("../models/product.model");
const express = require("express");
const app = express();

const servciePost = app.post("/api/products", (req, res) => {
  try {
    console.log(req.body);
    res.send(req.body);
  } catch (error) {
    console.log(error);
  }
});
module.exports = servciePost;

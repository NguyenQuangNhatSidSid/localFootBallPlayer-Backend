const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHanlder = require("express-async-handler");

const validateToken = asyncHanlder(async (req, res, next) => {
  try {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return res.status(400).json({ message: `Your user is Authorized!` });
        }
        req.user = decoded.user;
        next();
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = validateToken;

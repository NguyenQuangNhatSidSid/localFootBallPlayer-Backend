const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHanlder = require("express-async-handler");

const requiredFields = ["username", "email", "password", "mobile", "gender"];

//return token access and user ID
const registerUser = async (req, res) => {
  try {
    const userData = req.body;
    for (let field of requiredFields) {
      if (!(field in userData)) {
        return res.status(400).json({ message: `Field ${field} is missing.` });
      }
    }
    const userAvaiable = await User.findOne({ email: userData.email });
    if (userAvaiable) {
      return res
        .status(400)
        .json({ message: `Your email is already registered.` });
    }
    const salt = await bcrypt.genSalt(10);
    //hash password
    userData.password = await bcrypt.hash(userData.password, salt);
    console.log(userData.password);
    const user = await User.create(userData);

    //createJWT
    const accessToken = jwt.sign(
      { id: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.status(200).json({
      userId: user._id,
      accessToken,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//return token access
const loginUser = asyncHanlder(async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: `Your must enter email or password to sign in` });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: `Your user is not exist!` });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: `Invalid password` });
    }
    const accessToken = jwt.sign(
      { user: { username: user.username, email: user.email, id: user._id } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "90d" }
    );
    res.status(200).json({
      accessToken,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  registerUser,
  loginUser,
};

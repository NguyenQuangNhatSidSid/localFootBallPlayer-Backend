const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const requiredFields = ["username", "email", "password", "mobile", "gender"];

const registerUser = async (req, res) => {
  try {
    // const { username, email, password } = req.body;
    // if (!username || !email || !password) {
    //   return res.status(400).json({ message: `You input is lacking` });
    // }
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
    console.log(user);
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
module.exports = {
  registerUser,
};

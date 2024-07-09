const { body, validationResult } = require("express-validator");
const validateGame = [
  body("footballStadium")
    .isString()
    .withMessage("Football stadium must be a string")
    .notEmpty()
    .withMessage("Football stadium is required"),
  body("gameRank")
    .isBoolean()
    .withMessage("Game rank must be a true or false")
    .optional(),
  body("rankOfGame")
    .isString()
    .withMessage("Rank of game must be a string")
    .isIn([
      "copper",
      "silver",
      "gold",
      "platinum",
      "Emerald",
      "diamond",
      "master",
      "GrandMaster",
    ])
    .withMessage("Rank of game must be one of the predefined values")
    .optional(),
  body("gamePoint")
    .isInt({ min: 0 })
    .withMessage("Game point must be a non-negative integer")
    .optional(),
  (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ errors: err.array() });
    }
    next();
  },
];

module.exports = validateGame;

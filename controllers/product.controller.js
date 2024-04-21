const Product = require("../models/product.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const theChosenField = `-createdAt -updatedAt -__v -active`;

const getProduct = async (req, res) => {
  try {
    const result = await Product.find({ active: true }).select(theChosenField);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const result = await Product.findById(productId, { active: true }).select(
      theChosenField
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const result = await Product.create(req.body);
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(400).json({ message: "Product not found!" });
    }
    // Cập nhật các trường của product theo body
    Object.keys(body).forEach((key) => {
      product[key] = body[key];
    });
    //Lưu product
    const result = await product.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(400).json({ message: "Product not found!" });
    }
    if (product.active === true) {
      product.active = false;
      console.log(product.active);
      //Lưu product
      const result = await product.save();
      res.status(200).json(result);
    } else {
      return res.status(400).json({ message: "Product is no longer existed." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductByPrice = async (req, res) => {
  try {
    const price = Number(req.query.price);
    const type = req.query.type;

    let result;
    switch (type) {
      case "lower":
        result = await Product.find({ price: { $lte: price } }).sort({
          price: 1,
        });
        break;
      case "higher":
        result = await Product.find({ price: { $gte: price } }).sort({
          price: -1,
        });
        break;
      case "ascending":
        result = await Product.find().sort({
          price: 1,
        });
        break;
      case "descending":
        result = await Product.find().sort({
          price: -1,
        });
        break;
      default:
        return res.status(400).json({ message: `${type} is not a valid type` });
    }
    if (!result.length) {
      return res
        .status(400)
        .json({ message: `there is no product with this type range` });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteManyProduct = async (req, res) => {
  try {
    const { ids, active } = req.body;
    const result = await Promise.all(
      ids.map(async (id) => {
        const product = await Product.findById(id);
        if (!product) {
          return { id, status: "Product not found!" };
        }
        product.active = false;
        await product.save();
        return { id, active, status: "Updates" };
      })
    );
    //Lưu product
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductByName = async (req, res) => {
  try {
    const name = req.query.name;
    const result = await Product.find({ name: name, active: true }).select(
      theChosenField
    );

    if (result.length === 0) {
      return res
        .status(400)
        .json({ message: `there is no product with this name ${name}` });
    }
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductByRightFoot = async (req, res) => {
  try {
    const result = await Product.find({ rightFoot: true }).select(
      theChosenField + " rightFoot"
    );
    if (result.length === 0) {
      return res
        .status(400)
        .json({ message: `there is no player with this right foot is main` });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductByLeftFoot = async (req, res) => {
  try {
    const result = await Product.find({ leftFoot: true }).select(
      theChosenField + " leftFoot"
    );
    if (result.length === 0) {
      return res
        .status(400)
        .json({ message: `there is no player with this left foot is main` });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductsAreGoalKeeper = async (req, res) => {
  try {
    const result = await Product.find({ goalKeeper: true }).select(
      theChosenField + " goalKeeper"
    );
    if (result.length === 0) {
      return res
        .status(400)
        .json({ message: `there is no player with this left foot is main` });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductsAreDefender = async (req, res) => {
  try {
    const result = await Product.find({ defender: true }).select(
      theChosenField + " defender"
    );
    if (result.length === 0) {
      return res
        .status(400)
        .json({ message: `there is no player with this left foot is main` });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductsAreStrike = async (req, res) => {
  try {
    const result = await Product.find({ striker: true }).select(
      theChosenField + " striker"
    );
    if (result.length === 0) {
      return res
        .status(400)
        .json({ message: `there is no player with this left foot is main` });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPlayerbyHeight = async (req, res) => {
  try {
    const type = req.query.type;
    const height = req.query.height;

    console.log(type, height);
    let result;

    switch (type) {
      case "lower":
        result = await Product.find({ playerHeight: { $lte: height } })
          .select(theChosenField)
          .sort({ playerHeight: 1 });
        break;
      case "higher":
        result = await Product.find({ playerHeight: { $gte: height } })
          .select(theChosenField)
          .sort({ playerHeight: 1 });
        break;
      case "ascending":
        result = await Product.find()
          .select(theChosenField)
          .sort({ playerHeight: 1 });
        break;
      case "descending":
        result = await Product.find()
          .select(theChosenField)
          .sort({ playerHeight: -1 });
        break;

      default:
        return res.status(400).json({ message: `${type} is not a valid type` });
    }
    if (result.length === 0) {
      return res.status(400).json({ message: ` no player found` });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPlayerbyWeight = async (req, res) => {
  try {
    const type = req.query.type;
    const weight = req.query.height;
    let result;
    switch (type) {
      case "lower":
        result = await Product.find({ playerWeight: { $lte: weight } })
          .select(theChosenField)
          .sort({ playerWeight: 1 });
        break;
      case "higher":
        result = await Product.find({ playerWeight: { $gte: weight } })
          .select(theChosenField)
          .sort({ playerWeight: 1 });
        break;
      case "ascending":
        result = await Product.find()
          .select(theChosenField)
          .sort({ playerWeight: 1 });
        break;
      case "descending":
        result = await Product.find()
          .select(theChosenField)
          .sort({ playerWeight: -1 });
        break;
      default:
        return res.status(400).json({ message: `${type} is not a valid type` });
    }

    if (result.length === 0) {
      return res
        .status(400)
        .json({ message: `there is no player with this left foot is main` });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteManyProduct,
  getProductByPrice,
  getProductByName,
  getProductByLeftFoot,
  getProductByRightFoot,
  getProductsAreDefender,
  getProductsAreGoalKeeper,
  getProductsAreStrike,
  getPlayerbyWeight,
  getPlayerbyHeight,
};

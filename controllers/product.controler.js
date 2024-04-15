const Product = require("../models/product.model");

const theChosenField = `_id name quantity price image`;

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

module.exports = {
  getProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteManyProduct,
};

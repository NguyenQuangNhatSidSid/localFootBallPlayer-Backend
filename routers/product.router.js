const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controler");

router.get("/", productController.getProduct);
router.get("/:id", productController.getProductById);
router.post("/", productController.createProduct);
// dung findById va save thay cho findByIdAndUpdate vi` co the co middleware Mongoose mà bạn muốn chạy khi cập nhật một document (ví dụ, các hàm pre hoặc post save)
// update co the dung cho ca delete (update phan status)
router.put("/:id", productController.updateProduct);
//delete 1 san pham nên dùng patch
router.patch("/:id", productController.deleteProduct);
// delete nhieu san pham
router.patch("/", productController.deleteManyProduct);

module.exports = router;

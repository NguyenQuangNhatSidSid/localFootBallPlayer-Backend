const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controler");

router.get("/", productController.getProduct);

//lay san pham bang gia tien
router.get("/price", productController.getProductByPrice);

router.get("/name", productController.getProductByName);
// bỏ cái id ra sau vì Nguyên nhân của lỗi này là do cách định tuyến
// Khi bạn gọi http://localhost:3000/api/products/price,
// hệ thống sẽ không chắc chắn đường nào để theo dõi.Nó có thể chọn đường 2 và chọn "price" như một ID của sản phẩm.
//Để giải quyết lỗi này, bạn chỉ cần sắp xếp lại các đường định tuyến của mình. Cụ thể, /:id nên đến sau cùng
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

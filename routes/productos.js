const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController");

router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);
router.get("/", productController.getAllProducts);
router.get("/sort", productController.getSortedProducts);
router.get("/:id", productController.getProductById);
router.get("/productoByName/:name", productController.getProductByName);
router.get("/categorias", productController.getProductsWithCategories);

module.exports = router;

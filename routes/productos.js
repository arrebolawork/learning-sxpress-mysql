const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController");

router.post("/producto", productController.createProduct);
router.put("/producto/:id", productController.updateProduct);
router.delete("/producto/:id", productController.deleteProduct);
router.get("/productos", productController.getAllProducts);
router.get("/producto/:id", productController.getProductById);
router.get("/productoByName/:name", productController.getProductByName);
router.get("/productos/sort", productController.getSortedProducts);
router.get("/categorias", productController.getProductsWithCategories);

module.exports = router;

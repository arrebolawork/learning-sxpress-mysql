const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/CategoryController");

router.post("/categoria", categoryController.createCategory);
router.put("/categoria/:id", categoryController.updateCategory);
router.get("/categorias", categoryController.getAllCategories);
router.get("/categoria/:id", categoryController.getCategoryById);

module.exports = router;

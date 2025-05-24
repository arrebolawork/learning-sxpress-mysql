const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/CategoryController");

router.post("/", categoryController.createCategory);
router.put("/:id", categoryController.updateCategory);
router.get("/", categoryController.getAllCategories);
router.get("/:id", categoryController.getCategoryById);

module.exports = router;

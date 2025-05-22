const db = require("../config/database");

const CategoryController = {
  createCategory(req, res) {
    const { Category_name } = req.body;
    const sql = "INSERT INTO category(Category_name) VALUES (?)";
    db.query(sql, [Category_name], (err, result) => {
      if (err) return res.status(500).json({ error: "Error al crear categoría" });
      res.status(201).json({ message: "Categoría creada correctamente", id: result.insertId });
    });
  },
  updateCategory(req, res) {
    const { id } = req.params;
    const { Category_name } = req.body;
    const sql = "UPDATE category SET Category_name = ? WHERE Id = ?";
    db.query(sql, [Category_name, id], (err, result) => {
      if (err) return res.status(500).json({ error: "Error al actualizar categoría" });
      res.status(200).json({ message: "Categoría actualizada correctamente" });
    });
  },
  getAllCategories(req, res) {
    db.query("SELECT * FROM category", (err, result) => {
      if (err) return res.status(500).json({ error: "Error al obtener categorías" });
      res.status(200).json(result);
    });
  },
  getCategoryById(req, res) {
    const { id } = req.params;
    db.query("SELECT * FROM category WHERE Id = ?", [id], (err, result) => {
      if (err) return res.status(500).json({ error: "Error al obtener categoría" });
      res.status(200).json(result);
    });
  },
};
module.exports = CategoryController;

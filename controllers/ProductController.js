const db = require("../config/database");

const ProductController = {
  createProduct(req, res) {
    const { Product_name, Description, Category_Id } = req.body;
    const sql = "INSERT INTO product(Product_name, Description, Category_Id) VALUES (?, ?, ?)";
    db.query(sql, [Product_name, Description, Category_Id], (err, result) => {
      if (err) return res.status(500).json({ error: "Error al crear producto" });
      res.status(201).json({ message: "Producto creado correctamente", id: result.insertId });
    });
  },
  updateProduct(req, res) {
    const { id } = req.params;
    const { Product_name, Description, Category_Id } = req.body;
    const sql = "UPDATE product SET Product_name = ?, Description = ?, Category_Id = ? WHERE Id = ?";
    db.query(sql, [Product_name, Description, Category_Id, id], (err, result) => {
      if (err) return res.status(500).json({ error: "Error al actualizar producto" });
      res.status(200).json({ message: "Producto actualizado correctamente" });
    });
  },
  deleteProduct(req, res) {
    const { id } = req.params;
    const sql = "DELETE FROM product WHERE Id = ?";
    db.query(sql, [id], (err, result) => {
      if (err) return res.status(500).json({ error: "Error al eliminar producto" });
      if (result.affectedRows === 0) return res.status(404).json({ message: "Producto no encontrado" });
      res.status(200).json({ message: "Producto eliminado correctamente" });
    });
  },
  getAllProducts(req, res) {
    db.query("SELECT * FROM product", (err, result) => {
      if (err) return res.status(500).json({ error: "Error al obtener productos" });
      res.status(200).json(result);
    });
  },
  getProductById(req, res) {
    const { id } = req.params;
    db.query("SELECT * FROM product WHERE Id = ?", [id], (err, result) => {
      if (err) return res.status(500).json({ error: "Error al obtener producto" });
      res.status(200).json(result);
    });
  },
  getProductByName(req, res) {
    const { name } = req.params;
    db.query("SELECT * FROM product WHERE Product_name = ?", [name], (err, result) => {
      if (err) return res.status(500).json({ error: "Error al obtener producto" });
      res.status(200).json(result);
    });
  },
  getSortedProducts(req, res) {
    db.query("SELECT * FROM product ORDER BY Product_name DESC", (err, result) => {
      if (err) return res.status(500).json({ error: "Error al obtener productos ordenados" });
      res.status(200).json(result);
    });
  },
  getProductsWithCategories(req, res) {
    const sql = `
    SELECT p.Product_name, c.Category_name 
    FROM product p
    JOIN category c ON p.Category_Id = c.Id
  `;
    db.query(sql, (err, result) => {
      if (err) return res.status(500).json({ error: "Error al obtener productos con categoría" });
      res.status(200).json(result);
    });
  },
};
module.exports = ProductController;

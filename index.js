const express = require("express");
const mysql = require("mysql2");
const app = express();
require("dotenv").config();
app.use(express.json());
const PORT = 3000;

const db = mysql.createConnection({ host: "localhost", user: "root", password: process.env.DB_PASS, database: "tiendaTestDb" });
db.connect();

app.get("/createDB", (req, res) => {
  const sqlString = "CREATE DATABASE tiendaTestDb";
  db.query(sqlString, (err, result) => {
    if (err) throw err;
    res.status(201).send("Database created successfully");
  });
});

app.get("/createTables", (req, res) => {
  const sqlStringCategory = "CREATE TABLE category(Id int PRIMARY KEY AUTO_INCREMENT, Category_name varchar(20) not null)";
  const sqlStringProducts = "CREATE TABLE product(Id int PRIMARY KEY AUTO_INCREMENT,Product_name varchar(20) not null, Description varchar(200),Category_Id int,FOREIGN KEY(Category_Id)REFERENCES Category(Id));";

  db.query(sqlStringCategory, (err, result) => {
    if (err) {
      console.error("Error creating category table:", err);
      return res.status(500).send("Error creating category table");
    }

    db.query(sqlStringProducts, (err, result) => {
      if (err) {
        console.error("Error creating product table:", err);
        return res.status(500).send("Error creating product table");
      }

      res.status(201).send("Both tables created successfully");
    });
  });
});

app.post("/categorias/categoria", (req, res) => {
  const nuevaCat = req.body;
  const sqlStringAddCategoria = "INSERT INTO category(Category_name) VALUES (?)";
  db.query(sqlStringAddCategoria, [nuevaCat.Category_name], (err, result) => {
    if (err) throw err;
    res.status(201).send("Category created successfully");
  });
});

app.post("/productos/producto", (req, res) => {
  const nuevaPro = req.body;
  const sqlStringAddCategoria = "INSERT INTO product(Product_name,Description,Category_Id) VALUES (?,?,?)";
  db.query(sqlStringAddCategoria, [nuevaPro.Product_name, nuevaPro.Description, nuevaPro.Category_Id], (err, result) => {
    if (err) throw err;
    res.status(201).send("Product created successfully");
  });
});

app.put("/categorias/categoria/:id", (req, res) => {
  const { Category_name } = req.body;
  const { id } = req.params;
  const stringUpdateCategory = "UPDATE category SET Category_name =? WHERE id = ?";
  db.query(stringUpdateCategory, [Category_name, id], (err, result) => {
    if (err) {
      console.error("Error al actualizar categoría:", err);
      return res.status(500).json({ error: "Error al actualizar categoría" });
    }
    res.status(200).json({
      message: "Categoría actualizada correctamente",
      data: {
        id,
        nombre: Category_name,
      },
    });
  });
});

app.put("/productos/producto/:id", (req, res) => {
  const { Product_name, Description, Category_Id } = req.body;
  const { id } = req.params;
  const stringUpdateProduct = "UPDATE product SET Product_name = ?,Description= ?,Category_Id= ? WHERE id = ?";
  db.query(stringUpdateProduct, [Product_name, Description, Category_Id, id], (err, result) => {
    if (err) {
      console.error("Error al actualizar producto:", err);
      return res.status(500).json({ error: "Error al actualizar producto" });
    }
    res.status(200).json({
      message: "producto actualizado correctamente",
      data: {
        id,
        Product_name,
        Description,
        Category_Id,
      },
    });
  });
});

app.get("/productos/productos", (req, res) => {
  const stringGetProductos = "SELECT * FROM product";
  db.query(stringGetProductos, (err, result) => {
    if (err) throw err;
    return res.status(200).send(result);
  });
});
app.get("/categorias/categorias", (req, res) => {
  const stringGetCategorias = "SELECT * FROM category";
  db.query(stringGetCategorias, (err, result) => {
    if (err) throw err;
    return res.status(200).send(result);
  });
});
app.get("/productos/categorias", (req, res) => {
  const stringGetProductwithCat = "SELECT Product_name,Category_name FROM product JOIN category ON product.Category_Id = category.Id ";
  db.query(stringGetProductwithCat, (err, result) => {
    if (err) throw err;
    return res.status(200).send(result);
  });
});
app.get("/productos/producto/:id", (req, res) => {
  const { id } = req.params;
  const stringGetProductByID = "SELECT * FROM product WHERE Id = ?";
  db.query(stringGetProductByID, [id], (err, result) => {
    if (err) {
      return res.status(500).json();
    }
    res.status(200).json(result);
  });
});
app.get("/productos/productos/sort", (req, res) => {
  const stringGetProductos = "SELECT * FROM product ORDER BY Product_name DESC";
  db.query(stringGetProductos, (err, result) => {
    if (err) throw err;
    return res.status(200).send(result);
  });
});

app.get("/categorias/categoria/:id", (req, res) => {
  const { id } = req.params;
  const stringGetCategoriasByID = "SELECT * FROM category WHERE Id = ?";
  db.query(stringGetCategoriasByID, [id], (err, result) => {
    if (err) {
      return res.status(500).json();
    }
    res.status(200).json(result);
  });
});
app.get("/productos/productoByName/:name", (req, res) => {
  const { name } = req.params;
  const stringGetProductByName = "SELECT * FROM product WHERE Product_name = ?";
  db.query(stringGetProductByName, [name], (err, result) => {
    if (err) {
      return res.status(500).json();
    }
    res.status(200).json(result);
  });
});
app.delete("/productos/producto/:id", (req, res) => {
  const { id } = req.params;
  const stringDeleteProduct = "DELETE FROM product WHERE Id = ?";
  db.query(stringDeleteProduct, [id], (err, result) => {
    if (err) {
      return res.status(500).json();
    }
    res.status(200).json();
  });
});
app.listen(PORT, () => console.log(`Servidor levantado en el Puerto ${PORT}`));

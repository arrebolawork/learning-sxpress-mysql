const express = require("express");
const app = express();
const PORT = 3000;
const db = require("./config/database.js");
const productosRoutes = require("./routes/productos");
const categoriasRoutes = require("./routes/categorias");

app.use(express.json());

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

// Rutas
app.use("/productos", productosRoutes);

app.use("/categorias", categoriasRoutes);

app.listen(PORT, () => console.log(`Servidor levantado en el Puerto ${PORT}`));

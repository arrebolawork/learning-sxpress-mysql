const express = require("express");
const mysql = require("mysql2");
const app = express();
const dotenv = require("dotenv").config();
app.use(express.json());
const PORT = 3000;

const db = mysql.createConnection({ host: "localhost", user: "root", password: process.env.DB_PASS });
db.connect();

app.get("/createDB", (req, res) => {
  const sqlString = "CREATE DATABASE tiendaTestDb";
  db.query(sqlString, (err, result) => {
    if (err) throw err;
    res.status(201).send("Database created successfully");
  });
});

app.listen(PORT, () => console.log(`Servidor levantado en el Puerto ${PORT}`));

import express from "express";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const urlDB = `process.env.DB_URL`;
const db = mysql.createConnection(urlDB);
app.get("/", (req, res) => {
  res.json("hello This Is The Backend...");
});
app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.post("/books", (req, res) => {
  const q = "INSERT INTO books(`title`,`desc`,`price`,`cover`) VALUES(?) ";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("book has created successfully");
  });
});
app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id=?";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("book has deleted successfully");
  });
});
app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q =
    "UPDATE books SET `title`=?,`desc`=?,`price`=?,`cover`=? WHERE id=?";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];
  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("book has been Update successfully");
  });
});
app.listen(process.env.PORT || 8800, () => {
  console.log("connected to backend...!");
});

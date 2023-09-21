import express from "express";
import mysql2 from "mysql2";
import cors from "cors";

const app = express();

//CONNECT TO MUSQL
const db = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "crud",
});
//
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.json("hello this is the backend");
});

//GET
app.get("/register", (req, res) => {
  const q = "SELECT * FROM register";
  db.query(q, (err, data) => {
    if (err) return res.json | err;
    return res.json(data);
  });
});

//POST
app.post("/register", (req, res) => {
  const q =
    "INSERT INTO register (`name`,`password`,`qualification`) VALUES (?)";
  const values = [req.body.name, req.body.password, req.body.qualification];
  db.query(q, [values], (err, data) => {
    if (err) return res.json | err;
    return res.json("book has been created");
  });
});

//DELETE
app.delete("/register/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM register WHERE id = ?";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.json | err;
    return res.json("regstr has been deleted");
  });
});

//UPDATE
app.put("/register/:id", (req, res) => {
  const bookId = req.params.id;
  const q =
    "UPDATE register SET `name`=?,`password`=?,`qualification`=? WHERE id = ?";

  const values = [req.body.name, req.body.password, req.body.qualification];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.json | err;
    return res.json("regstr has been updated");
  });
});
//PORT
app.listen(8200, () => {
  console.log("connect to backend!");
});

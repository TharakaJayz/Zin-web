import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "4254",
  database: "zinweb",
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/reps", (req, res) => {
  const q = "SELECT * FROM sales_rep_temp";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/reps", (req, res) => {
  const q =
    "INSERT INTO sales_rep_temp (`registration_date` ,`password`,`email`,`full_name`,`RID`,`phone`,`NIC`,`address`) VALUES(?)";

  const values = [
    req.body.date,
    req.body.password,
    req.body.email,
    req.body.RID,
    req.body.full_name,
    req.body.phone,
    req.body.NIC,
    req.body.address,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.delete("/reps/:rid", (req, res) => {
  const rid = req.params.rid;
  const q = "DELETE FROM sales_rep_temp WHERE rid = ?";
  db.query(q, [rid], (errr, data) => {
    if (err) return res.json(err);
    return res.json("Book has been deleted");
  });
});

app.listen(8800, () => {
  console.log("connect backend");
});

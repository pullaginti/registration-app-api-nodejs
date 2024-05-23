const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "root",
  port: 5432
});
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.listen(8000, () => {
  console.log(`Server is running.`);
});
app.post("/api/createUser", (req, res) => {
    const { name, email, pass } = req.body;
  
    pool.query(
      "INSERT INTO rpd.user (id,name, email, password) VALUES (nextval('rpd.idsequence'),$1, $2, $3)",
      [name, email, pass],
      (error, results) => {
        if (error) {
          throw error;
        }
  
        res.sendStatus(201);
      }
    );
  });
app.get("/api/getAllUsers", (req, res) => {
    pool.query(
      "SELECT * FROM rpd.user",
      [],
      (error, results) => {
        if (error) {
          throw error;
        }
  
        res.status(200).json(results.rows);
      }
    );

  });
  app.delete("/api/deleteUser/:id", (req, res) => {
    const { id } = req.params;
  
    pool.query("DELETE FROM rpd.user WHERE id = $1", [id], (error, results) => {
      if (error) {
        throw error;
      }
  
      res.sendStatus(200);
    });
  });
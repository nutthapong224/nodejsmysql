require("dotenv").config();
const express = require("express");
const path = require("path");
const connection = require("./db");

const app = express();
const port = process.env.PORT || 3000;

// Set up EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Route to show data
app.get("/", (req, res) => {
  connection.query("SELECT * FROM nodejsdb", (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).send("Error fetching data");
      return;
    }
    res.render("index", { data: results });
  });
});

// Route to show the form for creating new data
app.get("/create", (req, res) => {
  res.render("create");
});

// Route to handle form submission
app.post("/create", (req, res) => {
  const { name, value } = req.body;

  connection.query(
    "INSERT INTO nodejsdb (name, value) VALUES (?, ?)",
    [name, value],
    (err) => {
      if (err) {
        console.error("Error inserting data:", err);
        res.status(500).send("Error inserting data");
        return;
      }
      res.redirect("/");
    }
  );
});
app.get("/edit/:id", (req, res) => {
  const { id } = req.params;
  connection.query(
    "SELECT * FROM nodejsdb WHERE id = ?",
    [id],
    (err, results) => {
      if (err) {
        console.error("Error fetching data for edit:", err);
        res.status(500).send("Error fetching data");
        return;
      }
      res.render("edit", { item: results[0] });
    }
  );
});

// Route to handle the update form submission
app.post("/edit/:id", (req, res) => {
  const { id } = req.params;
  const { name, value } = req.body;

  connection.query(
    "UPDATE nodejsdb SET name = ?, value = ? WHERE id = ?",
    [name, value, id],
    (err) => {
      if (err) {
        console.error("Error updating data:", err);
        res.status(500).send("Error updating data");
        return;
      }
      res.redirect("/");
    }
  );
});

// Route to handle deletion of data
app.post("/delete/:id", (req, res) => {
  const { id } = req.params;

  connection.query("DELETE FROM nodejsdb WHERE id = ?", [id], (err) => {
    if (err) {
      console.error("Error deleting data:", err);
      res.status(500).send("Error deleting data");
      return;
    }
    res.redirect("/");
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

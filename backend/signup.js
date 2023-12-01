const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const { validationResult, check } = require('express-validator');
const bcrypt = require('bcrypt');
const connection = require("./dbconnection");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// GET all users
app.get("/user", (req, res) => {
  connection.query("SELECT * FROM user", (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.send(rows);
    }
  });
});

// GET user by ID
app.get("/user/:id", (req, res) => {
  connection.query(
    "SELECT * FROM user WHERE userid=?",
    [req.params.id],
    (err, rows) => {
      if (err) {
        console.log(err);
        console.log("result: ", req.body);
        res.status(500).json({ error: "Internal server error" });
      } else {
        if (rows.length === 0) {
          res.status(404).json({ message: "User not found" });
        } else {
          console.log(rows);
          res.send(rows);
        }
      }
    }
  );
});

// // POST method to create a user
// app.post("/", [
//   check('email').isEmail().withMessage('Invalid email address'),
//   check('password').isLength({ min: 8, max: 12 }).withMessage('Password must be 8 to 12 characters long'),
//   check('confirmpassword').custom((value, { req }) => {
//     if (value !== req.body.password) {
//       throw new Error('Passwords do not match');
//     }
//     return true;
//   }),
// ], (req, res) => {
//   const errors = validationResult(req);
//   console.log("result: ", req.body);

//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const { first_name, last_name, email, password, confirmpassword } = req.body;
//   const sql = "INSERT INTO user (first_name, last_name, email, password, confirmpassword) VALUES (?,?,?,?,?)";
//   const values = [first_name, last_name, email, password, confirmpassword];

//   connection.query(sql, values, (error, result) => {
//     if (error) {
//       console.error("Error inserting data into SQL:", error);
//       res.status(500).json({ error: "Internal server error" });
//     } else {
//       res.json({ message: "User registered successfully", userId: result.insertId });
//     }
//   });
// });
// POST method to create a user
app.post("/", [
  check('email').isEmail().withMessage('Invalid email address'),
  check('password').isLength({ min: 8, max: 12 }).withMessage('Password must be 8 to 12 characters long'),
  check('confirmpassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  }),
], async (req, res) => {
  const errors = validationResult(req);
  console.log("result: ", req.body);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { first_name, last_name, email, password, confirmpassword } = req.body;

  try {
    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedconfirmPassword = await bcrypt.hash(confirmpassword, 10);

    const sql = "INSERT INTO user (first_name, last_name, email, password, confirmpassword) VALUES (?,?,?,?,?)";
    const values = [first_name, last_name, email, hashedPassword, hashedconfirmPassword];

    connection.query(sql, values, (error, result) => {
      if (error) {
        console.error("Error inserting data into SQL:", error);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.json({ message: "User registered successfully", userId: result.insertId });
      }
    });
  } catch (error) {
    console.error("Error hashing password:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT method to update a user by ID
app.put("/user/:id", (req, res) => {
  const userId = req.params.id;
  console.log("PUT result: ", req.body);
  const { first_name, last_name, email, password, confirmpassword } = req.body;

  if (!first_name || !last_name || !email || !password || !confirmpassword) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const sql = "UPDATE user SET first_name=?, last_name=?, email=?, password=?, confirmpassword=? WHERE userid=?";
  const values = [first_name, last_name, email, password, confirmpassword, userId];

  connection.query(sql, values, (error) => {
    if (error) {
      console.error("Error updating data in SQL:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.send("User updated successfully");
    }
  });
});

// DELETE method to delete a user by ID
app.delete("/user/:id", (req, res) => {
  const userId = req.params.id;

  const sql = "DELETE FROM user WHERE userid=?";
  const values = [userId];

  connection.query(sql, values, (error) => {
    if (error) {
      console.error("Error deleting data from SQL:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.send("User deleted successfully");
    }
  });
});

const PORT = 7000;
app.listen(PORT, () => console.log(`Express server is running on port ${PORT}`));

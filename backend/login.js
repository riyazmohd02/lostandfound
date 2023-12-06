const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const util = require("util");
const connection = require("./dbconnection");

const app = express();

// Use cors middleware
app.use(cors());

const query = util.promisify(connection.query).bind(connection);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Function to get a user by email from the database
async function getUserByEmail(email) {
  try {
    const sql = "SELECT * FROM user WHERE email = ?";
    const rows = await query(sql, [email]);
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error("Error in getUserByEmail:", error);
    throw error; // Rethrow the error to be caught by the calling function
  }
}

// Define the route for the POST operation
app.post('/login', async (req, res) => {
  try {
    // Check if req.body is defined
    if (!req.body) {
      return res.status(400).json({ error: 'Request body is missing' });
    }

    const { email, password } = req.body;
    console.log('result: ', email, password);

    // Check if the email exists in the database
    const user = await getUserByEmail(email);

    if (!user) {
      console.log('User not found for email:', email);
      return res.status(401).json({ error: 'User not found' });
    }

    // Check if the entered password matches the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      console.log('Incorrect password for email:', email);
      return res.status(401).json({ error: 'Incorrect password' });
    }

    // Successful login
    console.log('Login successful for email:', email);
    res.json({ message: 'Login successful', userId: user.userid });
  } catch (error) {
    console.error('Error in login:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Define your routes and controller functions here
app.get("/", function (req, res) {
  console.log("result: ", error);
  // Render your signup page here
});

module.exports = app;

const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const util = require("util");
const connection = require("./dbconnection");
const pool = require("./dbconnection");

const app = express();

// Use cors middleware
app.use(cors());

const query = util.promisify(pool.query).bind(pool);

// Function to get a user by email from the database
async function getUserByEmail(email) {
  try {
    const sql = "SELECT * FROM users WHERE email = ?";
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
      return res.status(401).json({ userFound: false, error: 'User not found' });
    }


    // Check if the entered password matches the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      console.log('Incorrect password for email:', email);
      return res.status(401).json({ userFound: false, error: 'Incorrect password' });
    }

    // Successful login
    console.log('Login successful for email:', email);
    res.json({ message: 'Login successful', user });
  } 
  catch (error) {
    console.error('Error in login:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// GET method to fetch user details by userid
app.get('/user/:userid', async (req, res) => {
  try {
    const { userid } = req.params;
    const user = await getUserById(userid);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user by userid:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = app;

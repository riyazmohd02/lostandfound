const express = require('express');
const pool = require('./dbconnection');
const app = express();  // Using the app instance directly

// GET method to retrieve all questions
app.get("/questions", async (req, res) => {
  try {
    const sql = "SELECT * FROM questionForm";
    const questions = await pool.query(sql);
    res.json(questions);
  } catch (error) {
    console.error("Error in GET /questions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET method to retrieve questions by itemId
app.get("/quebyItem/:itemId", async (req, res) => {
  try {
    const { itemId } = req.params; // Extracting the itemId from the URL parameter
    console.log("Fetching questions for itemId:", itemId);

    // Query to fetch questions based on itemId
    const sql = "SELECT * FROM questionForm WHERE Itemid = ?";

    const result = await pool.query(sql, [itemId]);
    console.log(result); // This will show the raw result before destructuring
    const [rows] = result;

    res.json(result);

  } catch (error) {
    console.error("Error in GET /questions/byItem/:itemId:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// POST route to add a question
app.post("/questions", async (req, res) => {
  try {
    const {
      question_text,
      options,
      Itemid,
      userid
    } = req.body;
    console.log("POST body ", req.body);

    const sql = "INSERT INTO questionForm (question_text, options, Itemid, userid, created_at) VALUES (?, ?, ?, ?, NOW())";

    const result = await pool.query(sql, [
      question_text,
      options,
      Itemid,
      userid
    ]);

    // console.log("Result:", result); // Log the result to see its structure
    const rows = result;

    // const insertID = result.insertID;

    res.json({ message: "Question added successfully", insertedId: rows.insertId });
  }

  catch (error) {
    console.error("Error in POST /questions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// PUT method to update options for a specific question
app.put("/questions/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extracting the question ID from the URL parameter
    const { options, question_text } = req.body; // Extracting the updated options and question_text from the request body
    console.log("Put Result", req.body);

    // Check if the question exists
    const checkSql = "SELECT * FROM questionForm WHERE question_Id = ?";
    const [rows] = await pool.query(checkSql, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Question not found" });
    }

    // Update the options for the specific question
    const updateSql = "UPDATE questionForm SET question_text = ?, options = ? WHERE question_Id = ?";
    await pool.query(updateSql, [question_text, options, id]);

    res.json({ message: "Options updated successfully", questionId: id });
  } catch (error) {
    console.error("Error in PUT /questions/:id:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE method to remove a question by its ID
app.delete("/dltquestions/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extracting the question ID from the URL parameter

    // Check if the question exists
    const checkSql = "SELECT * FROM questionForm WHERE question_Id = ?";
    const [rows] = await pool.query(checkSql, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Question not found" });
    }

    // Delete the question with the specified ID
    const deleteSql = "DELETE FROM questionForm WHERE question_Id = ?";
    await pool.query(deleteSql, [id]);

    res.json({ message: "Question deleted successfully", questionId: id });
  } catch (error) {
    console.error("Error in DELETE /questions/:id:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



module.exports = app;  // Export the app instance

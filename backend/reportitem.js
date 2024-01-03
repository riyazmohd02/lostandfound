const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const util = require("util");
const connection = require("./dbconnection");

const app = express();

// Use cors middleware
app.use(cors());

const query = util.promisify(connection.query).bind(connection);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// // Multer configuration for handling image uploads
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

//GET method for all posted items
app.get("/found", (req, res) => {
  connection.query("SELECT * FROM items_table", (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      console.log('GET details: ', rows);
      res.send(rows);
    }
  });
});

//GET method by itemtype
app.get("/items/:itemtype", async (req, res) => {
  try {
    const { itemtype } = req.params;

    // Validate that itemtype is either 'lost' or 'found'
    if (itemtype !== "lost" && itemtype !== "found") {
      return res.status(400).json({ error: "Invalid itemtype" });
    }

    const sql = "SELECT * FROM items_table WHERE itemtype = ?";
    const rows = await query(sql, [itemtype]);

    res.json(rows);
  } catch (error) {
    console.error("Error in GET /items/:itemtype:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/items/user/:userid", async (req, res) => {
  try {
    const { userid } = req.params;

    // Validate that userid is a positive integer
    if (!(/^\d+$/.test(userid))) {
      return res.status(400).json({ error: "Invalid userid format" });
    }

    const sql = "SELECT * FROM Items_table WHERE userid = ?";
    const rows = await query(sql, [userid]);

    res.json(rows);
  } catch (error) {
    console.error("Error in GET /items/user/:userid:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



// POST method to insert data into both tables
app.post("/items", async (req, res) => {
  try {
    const {
      userid,
      category_id,
      Item_name,
      color,
      brand,
      location,
      itemtype,
      status,
      date_found,
      first_name,
      last_name,
      description,

    } = req.body;

    console.log("Item data: ", req.body);

    // console.log("Image Buffer: ",req.file);

    // // Check if a file is uploaded
    // const imageBuffer = req.file ? req.file.buffer : null;

    // if (!imageBuffer) {
    //   return res.status(400).json({ error: 'No file uploaded' });
    // }

    try {
      // Start a transaction
      await query("START TRANSACTION");

      // Insert data into Items_table
      const insertItemResult = await query(
        "INSERT INTO Items_table (userid, category_id, Item_name, color, brand, location, itemtype, status, date_found, first_name, last_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)",
        [
          userid,
          category_id,
          Item_name,
          color,
          brand,
          location,
          itemtype,
          status,
          date_found,
          first_name,
          last_name,
        ]
      );

      // Get the auto-generated Itemid from the first insert
      const Itemid = insertItemResult.insertId;

      // Insert data into Item_description
      await query(
        "INSERT INTO Item_description (Itemid, description) VALUES (?, ?)",
        [Itemid, description]
      );

      // Handle image upload (save the imageBuffer to your storage solution)
      // For simplicity, let's assume you save the image to a local file
      // const imageName = `item_${Itemid}.${req.file.mimetype.split('/')[1]}`;
      // require("fs").writeFileSync(imageName, imageBuffer);

      // Commit the transaction
      await query("COMMIT");

      res.json({ message: "Data inserted successfully" });
    } catch (error) {
      // Rollback the transaction in case of an error
      await query("ROLLBACK");

      console.error("Error in POST /items:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } catch (error) {
    console.error("Error in POST /items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// PUT method to update data in both tables
app.put("/itemsupdate/:itemid", async (req, res) => {
  try {
    const { itemid } = req.params;

    // Validate that itemid is a positive integer
    if (!(/^\d+$/.test(itemid))) {
      return res.status(400).json({ error: "Invalid itemid format" });
    }

    const {
      userid,
      category_id,
      Item_name,
      color,
      brand,
      location,
      itemtype,
      status,
      date_found,
      first_name,
      last_name,
      description,
    } = req.body;

    console.log("Updated Item data: ", req.body);

    try {
      // Start a transaction
      await query("START TRANSACTION");

      // Update data in Items_table
      await query(
        "UPDATE Items_table SET userid=?, category_id=?, Item_name=?, color=?, brand=?, location=?, itemtype=?, status=?, date_found=?, first_name=?, last_name=? WHERE Itemid = ?",
        [
          userid,
          category_id,
          Item_name,
          color,
          brand,
          location,
          itemtype,
          status,
          date_found,
          first_name,
          last_name,
          itemid,
        ]
      );

      // Update data in Item_description
      await query(
        "UPDATE Item_description SET description=? WHERE Itemid = ?",
        [description, itemid]
      );

      // Commit the transaction
      await query("COMMIT");

      res.json({ message: "Data updated successfully" });
    } catch (error) {
      // Rollback the transaction in case of an error
      await query("ROLLBACK");

      console.error("Error in PUT /items/:itemid:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } catch (error) {
    console.error("Error in PUT /items/:itemid:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = app;
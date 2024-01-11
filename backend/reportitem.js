const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const util = require("util");
const multer = require('multer');
const path = require('path');
const connection = require("./dbconnection");

const app = express();

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use cors middleware
app.use(cors());

const query = util.promisify(connection.query).bind(connection);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



//GET method for all posted items
app.get("/found", (req, res) => {
  try {
    const searchKeyword = req.query.search;
    let sql = "SELECT * FROM items_table";
    const queryParams = [];

    if (searchKeyword) {
      sql += " WHERE Item_name LIKE ?";
      const queryParam = `%${searchKeyword}%`;
      queryParams.push(queryParam);
    }

    connection.query(sql, queryParams, (err, rows) => {
      if (err) {
        console.error("Error fetching items:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      console.log('GET details:', rows);
      res.send(rows);
    });
  } catch (error) {
    console.error("Error in GET /found:", error);
    res.status(500).json({ error: "Internal server error" });
  }
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



// Define storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'C:/Users/riyaz.M/Desktop/Test_lostandfound/lostandfound/backend/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 8 }, // example limit for file size (5MB)
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "image_url") {  // Ensure the fieldname matches your POST request field
      cb(null, true);
    } else {
      cb(new Error("Invalid file field name"));
    }
  }
});
// const upload = multer({ storage: storage }).single('image'); // Assuming the input name is 'image'
// POST method to insert data into both tables
app.post("/items", upload.array('image_url', 8), async (req, res) => {
  try {
    const {
      userid,
      category_id,
      Item_name,
      color,
      location,
      itemtype,
      date_found,
      first_name,
      last_name,
      description,
    } = req.body;

    const status = 1; // Set default status to 1 for new items
    //Get the array of image urls from req.files
    const image_url = req.files.map(file => file.path).join(', ');

    // Insert the imageUrls into the database or use as required
    console.log("Image URLs:", image_url);

    console.log("Item data:", req.body);

    // Start a transaction
    await query("START TRANSACTION");

    // Insert data into Items_table
    const insertItemResult = await query(
      "INSERT INTO Items_table (userid, category_id, Item_name, color, location, itemtype,  status, date_found, first_name, last_name, image_url,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?, NOW())",
      [
        userid,
        category_id,
        Item_name,
        color,
        location,
        itemtype,
        status,
        date_found,
        first_name,
        last_name,
        image_url,
      ]
    );

    // Get the auto-generated Itemid from the first insert
    const Itemid = insertItemResult.insertId;

    // Insert data into Item_description
    await query(
      "INSERT INTO Item_description (Itemid, description) VALUES (?, ?)",
      [Itemid, description]
    );

    // Commit the transaction
    await query("COMMIT");

    res.json({ message: "Data inserted successfully" });
  } catch (error) {
    // Rollback the transaction in case of an error
    await query("ROLLBACK");

    console.error("Error in POST /items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// PUT method to update data in both tables
app.put("/itemsupdate/:itemid", async (req, res) => {
  try {
    const { itemid } = req.params;
    const { status } = req.body;

    // Validate that itemid is a positive integer
    if (!(/^\d+$/.test(itemid))) {
      return res.status(400).json({ error: "Invalid itemid format" });
    }

    const {
      userid,
      category_id,
      Item_name,
      color,
      location,
      itemtype,
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
        "UPDATE Items_table SET userid=?, category_id=?, Item_name=?, color=?, location=?, itemtype=?, status=?, date_found=?, first_name=?, last_name=? WHERE Itemid = ?",
        [
          userid,
          category_id,
          Item_name,
          color,
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

      await query(
        "UPDATE Items_table SET status = ? WHERE Itemid = ?",
        [status, itemid]
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

// DELETE method to delete data in both tables
app.delete("/dltitems/:itemid", async (req, res) => {
  try {
    const { itemid } = req.params;

    if (!(/^\d+$/.test(itemid))) {
      return res.status(400).json({ error: "Invalid itemid format" });
    }

    try {
      await query("START TRANSACTION");
      await query("DELETE FROM Item_description WHERE Itemid = ?", [itemid]);
      await query("DELETE FROM Items_table WHERE Itemid = ?", [itemid]);
      await query("COMMIT");

      res.json({ message: "Data deleted successfully" });
    } catch (error) {
      await query("ROLLBACK");
      console.error("Error in DELETE /items/:itemid:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } catch (error) {
    console.error("Error in DELETE /items/:itemid:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = app;
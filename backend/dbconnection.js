const util = require('util');
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "lost and found",
});

connection.connect((err) => {
    if(err) {
        console.log('Error in connection: ' + err)
    } else{
        console.log('DB connected')
    }
})

module.exports = connection;


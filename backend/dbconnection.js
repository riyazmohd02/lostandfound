const mysql = require('mysql2');
const util = require('util');

// Create a connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'lostandfound',
});

// Ensure connection is established
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
        return;
    }
    console.log('Connected to the database');
    connection.release();
});

// Promisify pool.query to use async/await
pool.query = util.promisify(pool.query);

module.exports = pool;



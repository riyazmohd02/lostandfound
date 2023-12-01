// // db.js
const mysql = require('mysql2');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'lostandfound'
})
con.connect((err)=>{
    if(err){
        console.log('Error in connection: '+ err)
    } else{
        console.log('DB connected')
    }
})
module.exports=con;
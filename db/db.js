const mysql = require('mysql2');
const pool = mysql.createPool({
    host : 'localhost',
    user : 'root',  
    password : '591006',
    database : 'users'
})

module.exports = pool;
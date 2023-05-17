const mysql = require('mysql2');

const pool = mysql.createPool({
    host:'localhost',
    user:'azzam',
    database: 'node-complete',
    password: 'StrongPassword@123'
})  

module.exports = pool.promise();
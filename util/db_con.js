// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host:'localhost',
//     user:'azzam',
//     database: 'node-complete',
//     password: 'StrongPassword@123'
// })  

// module.exports = pool.promise();
const Sequelize = require('sequelize');
const sequelize = new Sequelize('node-complete','azzam',
    'StrongPassword@123',{
        dialect:'mysql',
        host: 'localhost'
    });

module.exports = sequelize;

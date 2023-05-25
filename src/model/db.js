require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}); 

connection.promise().query('select * from user').then(() => {
    console.log("Can reach database");
  })
  .catch((err) => {
    console.error(err);
  });

module.exports = connection;
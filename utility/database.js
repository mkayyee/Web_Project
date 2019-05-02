'use strict';
const mysql = require('mysql2');

//Function to connect to database
const connect = () => {
  return mysql.createPool({
    connectionLimit: 8,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
  });
};

module.exports = {
  connect: connect,
};
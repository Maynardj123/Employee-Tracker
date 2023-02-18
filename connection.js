const Sequelize = require('sequelize');
const mysql = require('mysql2');

require('dotenv').config();

const sequelize = mysql.createConnection(
    // // Database name
    // process.env.DATABASE,
    // // User
    // process.env.DB_USER,
    // // Password
    // process.env.DB_PASSWORD,
    {
      // Database location
      host: 'localhost',
      user: 'root',
      password: 'ForTheW1n!',
      database: 'employ_db',
      dialect: 'mysql',
      port: 3306
    }
  );
  
  module.exports = sequelize;
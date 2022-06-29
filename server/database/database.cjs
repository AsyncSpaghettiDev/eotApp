const mysql = require('mysql2');
const mysql2 = require('mysql2/promise');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
require('dotenv').config()

const database = {};

const options = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
}

database.db = mysql.createConnection(options);

database.sessionStore = new MySQLStore({}, mysql2.createPool(options));

module.exports = database

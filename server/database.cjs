const mysql = require('mysql2');
const mysql2 = require('mysql2/promise');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const database = {};

const options = {
    host: 'mysql-eatontime.alwaysdata.net',
    user: 'eatontime',
    password: 'Ma-^VdUyZeN$JyW',
    database: 'eatontime_tijuana'
}

database.db = mysql.createConnection(options);

database.pool = mysql.createPool(options);
database.pool2 = mysql2.createPool(options);

database.sessionStore = new MySQLStore({}, database.pool2);

module.exports = database

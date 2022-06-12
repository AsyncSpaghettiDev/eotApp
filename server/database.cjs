const mysql = require('mysql2');
const mysql2 = require('mysql2/promise');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const database = {};

const options = {
    host: 'sql305.epizy.com',
    user: 'epiz_31941033',
    password: 'GWJzEj8LTIMFMw',
    database: 'epiz_31941033_eatontime'
}

database.db = mysql.createConnection(options);

database.pool = mysql.createPool(options);
database.pool2 = mysql2.createPool(options);

database.sessionStore = new MySQLStore({}, database.pool2);

module.exports = database

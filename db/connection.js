//connects to database using mysql
const mysql = require('mysql2')

// connect to db
const db = mysql.createConnection(
    {
    host: 'localhost',

    user: 'root',

    password: 'Tayson123',
    database: 'employee_db'
    },
    console.log('Connected to the employee Database.')
);

module.exports = db;
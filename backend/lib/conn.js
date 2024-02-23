const mysql = require('mysql2'); 

connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'notes',
    password: 'notes123',
    database: 'notes'
})

module.exports = connection;
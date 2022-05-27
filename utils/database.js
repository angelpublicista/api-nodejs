const mysql = require('mysql')
const dbConfig = require('../config/config')


const connection = mysql.createConnection(dbConfig)
const mysqlPoll = mysql.createPool(dbConfig)

module.exports = mysqlPoll
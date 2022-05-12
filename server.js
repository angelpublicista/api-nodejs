const express = require('express')
const mysql = require('mysql')
// const myconn = require('express-myconnection')
// const routes = require('./routes')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const bookRoute = require("./routes/Book")
const userRoute = require("./routes/User")

const app = express()
app.set('port', process.env.PORT || 9000)

/*
********** CONNECT TO MYSQL ************
*/
// const dbOptions = {
//     host: 'localhost',
//     port: 3306,
//     user: 'root',
//     pass: '',
//     database: 'library'
// }

/*
********** CONNECT TO MONGO DB WITH ATLAS ************
*/
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Conectado a la base de datos"))
    .catch((error) => console.error(error))

// Middlewares
app.use(cors())
// app.use(myconn(mysql, dbOptions, 'single'))
app.use(express.json())
app.use(bodyParser.json())
// Routes
app.get('/api', (req, res)=>{
    res.send('Welcome to my app')
})

app.use('/api/books', bookRoute)
app.use('/api/users', userRoute)

// Server running
app.listen(app.get('port'), () => {
    console.log('server running on port', app.get('port'))
})
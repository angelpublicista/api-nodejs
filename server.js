const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const bookRoute = require("./routes/Book")
const userRoute = require("./routes/User")
const authRoute = require("./routes/Auth")
const app = express()
app.set('port', process.env.PORT || 9000)

/*
********** CONNECT TO MONGO DB WITH ATLAS ************
*/
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Conectado a la base de datos"))
    .catch((error) => console.error(error))

// Middlewares
app.use(cors())
app.use(express.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Routes
app.get('/api', (req, res)=>{
    res.send('Welcome to my app')
})

app.use('/api/books', bookRoute)
app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)

// Server running
app.listen(app.get('port'), () => {
    console.log('server running on port', app.get('port'))
})
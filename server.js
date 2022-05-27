const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const userRoute = require("./routes/User")
const authRoute = require("./routes/Auth")
const planRoute = require("./routes/Plan")
const app = express()

app.set('port', process.env.PORT || 9000)

// Middlewares
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Routes
app.get('/api', (req, res)=>{
    res.send('Welcome to my app')
})

app.use('/api/plans', planRoute)
app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)

// Server running
app.listen(app.get('port'), () => {
    console.log('server running on port', app.get('port'))
})
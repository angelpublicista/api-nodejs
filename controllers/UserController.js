const userSchema = require('../models/User')
const jwt = require('jsonwebtoken')

module.exports = {
    get: (req, res) => {
        userSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}))
    },

    post: (req, res) => {
        const user = userSchema(req.body)
        user.save().then((data) => res.json(data)).catch((error) => res.json({message: error}))
    },

    posts: (req, res)=>{
        jwt.verify(req.token, 'secretkey', (error, authData) => {
            if(error){
                res.sendStatus(403)
            } else {
                res.json({
                    message: "Post fue creado",
                    authData
                })
            }
        })
    }
}
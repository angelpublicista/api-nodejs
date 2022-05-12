const userSchema = require('../models/User')

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

    register: (req, res) => {
        const userReg = userSchema(req.body) 
        userReg.save().then((data) => res.json(data)).catch((error) => res.json({message: error}))
    }
}
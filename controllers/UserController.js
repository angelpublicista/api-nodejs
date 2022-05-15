const userSchema = require('../models/User')
const jwt = require('jsonwebtoken')

module.exports = {
    get: (req, res) => {
        userSchema
        .find()
        .then((data) => {
            res.status(200).json({
                success: true,
                message: "Data found",
                data: {
                    users: data
                }
            })
        })
        .catch((error) => {
            res.status(400).json({
                success: false,
                message: "Data not found",
                data: error
            })
        })
    }
}
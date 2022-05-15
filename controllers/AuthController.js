const userSchema = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

module.exports = {
    login: async (req, res)=>{
        // Find the user
        const user = await userSchema.findOne({email: req.body.email})
        if(!user) return res.status(400).json({error: true, message: "User not found"})

        // Validate password
        const passValidate = await bcrypt.compare(req.body.password, user.password)
        if(!passValidate) return res.status(400).json({error: true, message: "Invalid credentials"})
    

        jwt.sign({name: user.userName, id: user._id, role: user.role}, process.env.SECRET_TOKEN, {expiresIn: '4h'} , (err, token) => {
            if(err){
                res.json({
                    message: err
                })
            } else {
                res.json({
                    token: token
                })
            }
        })
    },

    register: (req, res) => {
        const userReg = userSchema(req.body) 
        userReg.save().then((data) => {
            res.status(200).json({
                success: true, 
                message: "User registered successfully", 
                data: {
                    request: data
                }
            })
        }).catch((error) => {
            res.status(500).json({
                success: false,
                message: "Can't create current user",
                data: error
            })
        })
    }
}
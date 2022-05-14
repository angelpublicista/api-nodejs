const userSchema = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

module.exports = {
    login: async (req, res)=>{
        // Find the user
        const user = await userSchema.findOne({email: req.body.email})
        if(!user) return res.status(400).json({error: true, message: "usuario no encontrado"})

        // Validate password
        const passValidate = await bcrypt.compare(req.body.password, user.password)
        if(!passValidate) return res.status(400).json({error: true, message: "credenciales inválidas"})
    

        jwt.sign({name: user.userName, id: user._id, role: user.role}, process.env.SECRET_TOKEN, {expiresIn: '32s'} , (err, token) => {
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
        userReg.save().then((data) => res.json(data)).catch((error) => res.json({message: error}))
    }
}
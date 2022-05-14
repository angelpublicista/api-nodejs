const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const saltRounds = 10

const userSchema = mongoose.Schema({
    userName:{
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true,
        default: Date.now
    },

    role:{
        type: Number,
        required: true,
        default: 2
    },

    active:{
        type: Boolean,
        required: true,
        default: false
    }
})

userSchema.pre('save', function(next){
    bcrypt.hash(this.password, saltRounds , (err, hash) => {
        this.password = hash
        next()
    })
})

userSchema.methods.isValidPassword = function(password, callback){
    bcrypt.compare(password, this.password, (err, same) => {
        if(err){
            callback(err)
        } else {
            callback(err, same)
        }
    })
}

module.exports = mongoose.model('User', userSchema);
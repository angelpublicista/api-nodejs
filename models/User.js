const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const saltRounds = 10

const userSchema = mongoose.Schema({
    userName:{
        type: String,
        unique: true
    },

    firstname:{
        type: String,
        required: true
    },

    lastname:{
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    },

    role:{
        type: Number,
        default: 2
    },

    active:{
        type: Boolean,
        default: false
    }
})

userSchema.pre('save', function(next){
    bcrypt.hash(this.password, saltRounds , (err, hash) => {
        if(!err){
            this.password = hash
            next()
        } else {
            return err
        }
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
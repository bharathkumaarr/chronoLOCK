const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "please enter email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "password"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model("User", userSchema)
module.exports = User

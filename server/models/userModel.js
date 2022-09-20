const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    creature: {
        type: [{name: String, born: Date, fed: Date, mana: Number, hunger: Number, mood: Number, cleanliness: Number}],
        required: true
    }
}, {timestamps: true})

const User = mongoose.model("User", userSchema);

module.exports = User;
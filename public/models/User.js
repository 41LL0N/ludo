const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userModel = new mongoose.Schema({
    id: { type: String, unique: true },
    username: { type: String, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
});

module.exports = mongoose.model("User", userModel);
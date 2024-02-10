const mongoose = require("mongoose");
const CommonSchema = require("../models/common");

const UserSchema = new mongoose.Schema([{
    email: { type: String, unique:true},
    password: String,
    active:Boolean,
    userType:{
        type: String,
        default:"user"
    }

}, CommonSchema]);

module.exports = mongoose.model("User", UserSchema);
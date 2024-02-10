const mongoose = require("mongoose");
const CommonSchema = require("../models/common");

const CarSchema = new mongoose.Schema([{
    matriculation: {
        type: String,
        // required: true
    },
    manufacturer: {
        type: String,
        // required: true,
    },
    enginePower: {
        type: String,
        // required: true,
    },
    msg: {
        type: Object,
        // required: true,
    }
}, CommonSchema]);

module.exports = mongoose.model("Car", CarSchema);
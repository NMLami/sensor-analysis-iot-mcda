const mongoose = require("mongoose");
const CommonSchema = require("../models/common");

const SensorSchema = new mongoose.Schema([{
    rooms: {
        type: Array,
        // required: true
    },
    sensors: {
        type: Number,
        // required: true,
    }
}, CommonSchema]);

module.exports = mongoose.model("Sensor", SensorSchema);
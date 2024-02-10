const mongoose = require("mongoose");

const CommonSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    updatedAt: Date,
 
});

module.exports = CommonSchema;
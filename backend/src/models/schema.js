const mongoose = require("mongoose");

const schematic = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    source: {
        type: String,
        required: true,
    },
    creator: {
        type: String,
        required: true,
    },
    createdBy: {
        type: String,
        required: true,
    }

})

const SchematicMain = mongoose.model("Menu", schematic);

module.exports = SchematicMain;
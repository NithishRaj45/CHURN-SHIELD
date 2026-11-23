const mongoose = require("mongoose");

const predictionSchema = new mongoose.Schema({
    gender: String,
    tenure: Number,
    monthlyCharges: Number,
    prediction: String,
    probability: Number,
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Prediction", predictionSchema);
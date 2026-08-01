const express = require("express");
const router = express.Router();

const {
    predictChurn,
    getHistory
} = require("../controllers/churnController");

// Prediction API
router.post("/predict", predictChurn);

// History API
router.get("/history", getHistory);

module.exports = router;
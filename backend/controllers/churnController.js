const { spawn } = require("child_process");
const path = require("path");

const predictionHistory = [];

exports.predictChurn = (req, res) => {

    const customerData = JSON.stringify(req.body);

    const python = spawn("python", [
        path.join(__dirname, "../../ml-model/predict.py"),
        customerData
    ]);

    let result = "";
    let error = "";

    python.stdout.on("data", (data) => {
        result += data.toString();
    });

    python.stderr.on("data", (data) => {
        error += data.toString();
    });

    python.on("close", (code) => {

        if (code !== 0) {

            return res.status(500).json({
                success: false,
                error: error
            });

        }

        try {

            const response = JSON.parse(result);

           predictionHistory.push({

    gender: req.body.gender,

    tenure: req.body.tenure,

    monthlyCharges: req.body.MonthlyCharges,

    prediction: response.prediction,

    probability: response.probability,

    date: new Date().toLocaleString()

});

           res.json({
    success: true,
    ...response
});

        }

        catch (err) {

            res.status(500).json({
                success: false,
                error: "Invalid Python Response"
            });

        }

    });

};

exports.getHistory = (req, res) => {

    res.json(predictionHistory);

};
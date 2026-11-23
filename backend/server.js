const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/database");

const churnRoutes = require("./routes/churnRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/churn", churnRoutes);

app.get("/", (req, res) => {
    res.send("ChurnShield Backend is Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
import { useState } from "react";
import API from "../services/api";
import "./PredictionForm.css";
import {
    FaCheckCircle,
    FaExclamationTriangle,
    FaChartLine
} from "react-icons/fa";

function PredictionForm() {

    const [formData, setFormData] = useState({

        gender: "Male",
        SeniorCitizen: 0,
        Partner: "No",
        Dependents: "No",
        tenure: "",

        PhoneService: "Yes",
        MultipleLines: "No",
        InternetService: "DSL",
        OnlineSecurity: "No",
        OnlineBackup: "No",
        DeviceProtection: "No",
        TechSupport: "No",
        StreamingTV: "No",
        StreamingMovies: "No",

        Contract: "Month-to-month",
        PaperlessBilling: "Yes",
        PaymentMethod: "Electronic check",

        MonthlyCharges: "",
        TotalCharges: ""
    });

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    //const [prediction, setPrediction] = useState("");

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]:
                name === "SeniorCitizen"
                    ? Number(value)
                    : value
        });
    };

    const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        setLoading(true);

        const response = await API.post(
            "/churn/predict",
            {
                ...formData,
                tenure: Number(formData.tenure),
                MonthlyCharges: Number(formData.MonthlyCharges),
                TotalCharges: Number(formData.TotalCharges)
            }
        );

        setResult(response.data);

    } catch (error) {

        console.log(error);

        alert("Prediction Failed");

    } finally {

        setLoading(false);

    }

};

    return (

        <div className="prediction-container">

            <h2>Customer Churn Prediction</h2>

            <form onSubmit={handleSubmit}>

                <h3>👤 Personal Details</h3>

                <div className="form-group">
                    <label>Gender</label>

                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                    >
                        <option>Male</option>
                        <option>Female</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Senior Citizen</label>

                    <select
                        name="SeniorCitizen"
                        value={formData.SeniorCitizen}
                        onChange={handleChange}
                    >
                        <option value={0}>No</option>
                        <option value={1}>Yes</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Partner</label>

                    <select
                        name="Partner"
                        value={formData.Partner}
                        onChange={handleChange}
                    >
                        <option>No</option>
                        <option>Yes</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Dependents</label>

                    <select
                        name="Dependents"
                        value={formData.Dependents}
                        onChange={handleChange}
                    >
                        <option>No</option>
                        <option>Yes</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Tenure (Months)</label>

                    <input
                        type="number"
                        name="tenure"
                        value={formData.tenure}
                        onChange={handleChange}
                        required
                    />
                </div>

                <hr />

                <h3>📡 Service Details</h3>

                <div className="form-group">
                    <label>Phone Service</label>

                    <select
                        name="PhoneService"
                        value={formData.PhoneService}
                        onChange={handleChange}
                    >
                        <option>Yes</option>
                        <option>No</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Multiple Lines</label>

                    <select
                        name="MultipleLines"
                        value={formData.MultipleLines}
                        onChange={handleChange}
                    >
                        <option>No</option>
                        <option>Yes</option>
                        <option>No phone service</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Internet Service</label>

                    <select
                        name="InternetService"
                        value={formData.InternetService}
                        onChange={handleChange}
                    >
                        <option>DSL</option>
                        <option>Fiber optic</option>
                        <option>No</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Online Security</label>

                    <select
                        name="OnlineSecurity"
                        value={formData.OnlineSecurity}
                        onChange={handleChange}
                    >
                        <option>No</option>
                        <option>Yes</option>
                        <option>No internet service</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Online Backup</label>

                    <select
                        name="OnlineBackup"
                        value={formData.OnlineBackup}
                        onChange={handleChange}
                    >
                        <option>No</option>
                        <option>Yes</option>
                        <option>No internet service</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Device Protection</label>

                    <select
                        name="DeviceProtection"
                        value={formData.DeviceProtection}
                        onChange={handleChange}
                    >
                        <option>No</option>
                        <option>Yes</option>
                        <option>No internet service</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Tech Support</label>

                    <select
                        name="TechSupport"
                        value={formData.TechSupport}
                        onChange={handleChange}
                    >
                        <option>No</option>
                        <option>Yes</option>
                        <option>No internet service</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Streaming TV</label>

                    <select
                        name="StreamingTV"
                        value={formData.StreamingTV}
                        onChange={handleChange}
                    >
                        <option>No</option>
                        <option>Yes</option>
                        <option>No internet service</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Streaming Movies</label>

                    <select
                        name="StreamingMovies"
                        value={formData.StreamingMovies}
                        onChange={handleChange}
                    >
                        <option>No</option>
                        <option>Yes</option>
                        <option>No internet service</option>
                    </select>
                </div>

                <hr />

                <h3>💳 Contract & Billing</h3>

                <div className="form-group">
                    <label>Contract</label>

                    <select
                        name="Contract"
                        value={formData.Contract}
                        onChange={handleChange}
                    >
                        <option>Month-to-month</option>
                        <option>One year</option>
                        <option>Two year</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Paperless Billing</label>

                    <select
                        name="PaperlessBilling"
                        value={formData.PaperlessBilling}
                        onChange={handleChange}
                    >
                        <option>Yes</option>
                        <option>No</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Payment Method</label>

                    <select
                        name="PaymentMethod"
                        value={formData.PaymentMethod}
                        onChange={handleChange}
                    >
                        <option>Electronic check</option>
                        <option>Mailed check</option>
                        <option>Bank transfer (automatic)</option>
                        <option>Credit card (automatic)</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Monthly Charges</label>

                    <input
                        type="number"
                        step="0.01"
                        name="MonthlyCharges"
                        value={formData.MonthlyCharges}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Total Charges</label>

                    <input
                        type="number"
                        step="0.01"
                        name="TotalCharges"
                        value={formData.TotalCharges}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit">
                    Predict Churn
                </button>

            </form>

           {loading && (
    <div className="result-card">
        <h2>Predicting Customer...</h2>
    </div>
)}

{result && (
    <div
        className={
            result.prediction === "Likely to Churn"
                ? "result-card danger"
                : "result-card success"
        }
    >
        <h2>Prediction Result</h2>

        {result.prediction === "Likely to Churn" ? (
            <FaExclamationTriangle size={80} className="icon danger-icon" />
        ) : (
            <FaCheckCircle size={80} className="icon success-icon" />
        )}

        <h1>{result.prediction}</h1>
        <h3>
    Confidence : {result.probability}%
</h3>

<div className="progress">

    <div
        className="progress-fill"
        style={{
            width: `${result.probability}%`
        }}
    ></div>

</div>

        <div className="risk-box">
            <h3>
                <FaChartLine /> Risk Level
            </h3>

            <h2>
                {result.prediction === "Likely to Churn"
                    ? "HIGH"
                    : "LOW"}
            </h2>
        </div>

        <div className="recommendation">
            <h3>Recommendation</h3>

            <p>
                {result.prediction === "Likely to Churn"
                    ? "Offer loyalty discounts and improve customer engagement."
                    : "Customer is satisfied. Continue providing quality service."}
            </p>
        </div>
    </div>
)}

        </div>

    );

}

export default PredictionForm;
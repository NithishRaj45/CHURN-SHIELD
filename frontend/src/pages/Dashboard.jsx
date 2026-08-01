import { useEffect, useState } from "react";
import API from "../services/api";
import "./Dashboard.css";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

function Dashboard() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const res = await API.get("/churn/history");
      setHistory(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const total = history.length;

  const highRisk = history.filter(
    (item) => item.prediction === "Likely to Churn"
  ).length;

  const lowRisk = total - highRisk;

  const avgConfidence =
    total > 0
      ? (
          history.reduce(
            (sum, item) => sum + Number(item.probability || 0),
            0
          ) / total
        ).toFixed(2)
      : 0;

  const churnRate =
    total > 0 ? ((highRisk / total) * 100).toFixed(1) : 0;

  const pieData = {
    labels: ["High Risk", "Low Risk"],
    datasets: [
      {
        data: [highRisk, lowRisk],
        backgroundColor: ["#ef4444", "#22c55e"],
      },
    ],
  };

  const barData = {
    labels: ["High Risk", "Low Risk"],
    datasets: [
      {
        label: "Customers",
        data: [highRisk, lowRisk],
        backgroundColor: ["#ef4444", "#22c55e"],
      },
    ],
  };

  return (
    <div className="dashboard">

      <h1>📊 ChurnShield Dashboard</h1>

      <div className="cards">

        <div className="card">
          <h2>{total}</h2>
          <p>Total Predictions</p>
        </div>

        <div className="card red">
          <h2>{highRisk}</h2>
          <p>High Risk</p>
        </div>

        <div className="card green">
          <h2>{lowRisk}</h2>
          <p>Low Risk</p>
        </div>

        <div className="card blue">
          <h2>{avgConfidence}%</h2>
          <p>Average Confidence</p>
        </div>

        <div className="card orange">
          <h2>{churnRate}%</h2>
          <p>Churn Rate</p>
        </div>

      </div>

      <div className="charts">

        <div className="chart">
          <h3>Risk Distribution</h3>
          <Pie data={pieData} />
        </div>

        <div className="chart">
          <h3>Prediction Summary</h3>
          <Bar data={barData} />
        </div>

      </div>

    </div>
  );
}

export default Dashboard;
import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "100px",
      }}
    >
      <h1>Welcome to ChurnShield</h1>

      <p>
        AI-powered Telecom Customer Churn Prediction System
      </p>

      <Link to="/predict">
        <button
          style={{
            marginTop: "20px",
            padding: "12px 25px",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          Predict Customer
        </button>
      </Link>
    </div>
  );
}

export default Home;
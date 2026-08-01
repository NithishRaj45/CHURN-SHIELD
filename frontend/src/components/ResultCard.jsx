function ResultCard({ prediction }) {

    if (!prediction) return null;

    return (

        <div
            style={{
                marginTop: "30px",
                padding: "20px",
                borderRadius: "10px",
                background: "#ffffff",
                boxShadow: "0px 0px 10px rgba(0,0,0,0.2)"
            }}
        >

            <h2>Prediction Result</h2>

            <h3
                style={{
                    color:
                        prediction === "Likely to Churn"
                            ? "red"
                            : "green"
                }}
            >
                {prediction}
            </h3>

        </div>

    );

}

export default ResultCard;
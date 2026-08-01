import { useEffect, useState } from "react";
import API from "../services/api";
import "./History.css";

function History() {

    const [history, setHistory] = useState([]);

    useEffect(() => {

        fetchHistory();

    }, []);

    const fetchHistory = async () => {

        try {

            const response = await API.get("/churn/history");

            setHistory(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="history-container">

            <h1>Prediction History</h1>

            <table>

                <thead>

                    <tr>

                        <th>Gender</th>
                        <th>Tenure</th>
                        <th>Monthly Charges</th>
                        <th>Prediction</th>
                        <th>Confidence</th>
                        <th>Date</th>

                    </tr>

                </thead>

                <tbody>

                    {history.map((item, index) => (

                        <tr key={index}>

                            <td>{item.gender}</td>

                            <td>{item.tenure}</td>

                            <td>₹ {item.monthlyCharges}</td>

                            <td>

                                <span
                                    className={
                                        item.prediction === "Likely to Churn"
                                            ? "danger"
                                            : "success"
                                    }
                                >
                                    {item.prediction}
                                </span>

                            </td>

                            <td>{Number(item.probability).toFixed(2)}%</td>

                            <td>{item.date}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default History;
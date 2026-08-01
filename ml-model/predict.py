import sys
import json
import os
import joblib
import pandas as pd

# ----------------------------------
# Get Current Folder Path
# ----------------------------------

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# ----------------------------------
# Load Model, Scaler and Features
# ----------------------------------

model = joblib.load(
    os.path.join(BASE_DIR, "churn_model.pkl")
)

scaler = joblib.load(
    os.path.join(BASE_DIR, "scaler.pkl")
)

feature_names = joblib.load(
    os.path.join(BASE_DIR, "feature_names.pkl")
)

# ----------------------------------
# Receive Customer Data from NodeJS
# ----------------------------------



customer_data = json.loads(sys.argv[1])

# ----------------------------------
# Create Empty DataFrame
# ----------------------------------

input_data = pd.DataFrame(
    [[0] * len(feature_names)],
    columns=feature_names
)

# ----------------------------------
# Numerical Features
# ----------------------------------

input_data["SeniorCitizen"] = customer_data["SeniorCitizen"]
input_data["tenure"] = customer_data["tenure"]
input_data["MonthlyCharges"] = customer_data["MonthlyCharges"]
input_data["TotalCharges"] = customer_data["TotalCharges"]

# ----------------------------------
# Gender
# ----------------------------------

if customer_data["gender"] == "Male":
    if "gender_Male" in input_data.columns:
        input_data["gender_Male"] = 1

# ----------------------------------
# Partner
# ----------------------------------

if customer_data["Partner"] == "Yes":
    if "Partner_Yes" in input_data.columns:
        input_data["Partner_Yes"] = 1

# ----------------------------------
# Dependents
# ----------------------------------

if customer_data["Dependents"] == "Yes":
    if "Dependents_Yes" in input_data.columns:
        input_data["Dependents_Yes"] = 1

# ----------------------------------
# Phone Service
# ----------------------------------

if customer_data["PhoneService"] == "Yes":
    if "PhoneService_Yes" in input_data.columns:
        input_data["PhoneService_Yes"] = 1

# ----------------------------------
# Multiple Lines
# ----------------------------------

if customer_data["MultipleLines"] == "Yes":
    if "MultipleLines_Yes" in input_data.columns:
        input_data["MultipleLines_Yes"] = 1

elif customer_data["MultipleLines"] == "No phone service":
    if "MultipleLines_No phone service" in input_data.columns:
        input_data["MultipleLines_No phone service"] = 1

# ----------------------------------
# Internet Service
# ----------------------------------

if customer_data["InternetService"] == "Fiber optic":
    if "InternetService_Fiber optic" in input_data.columns:
        input_data["InternetService_Fiber optic"] = 1

elif customer_data["InternetService"] == "No":
    if "InternetService_No" in input_data.columns:
        input_data["InternetService_No"] = 1

# ----------------------------------
# Online Security
# ----------------------------------

if customer_data["OnlineSecurity"] == "Yes":
    if "OnlineSecurity_Yes" in input_data.columns:
        input_data["OnlineSecurity_Yes"] = 1

elif customer_data["OnlineSecurity"] == "No internet service":
    if "OnlineSecurity_No internet service" in input_data.columns:
        input_data["OnlineSecurity_No internet service"] = 1

# ----------------------------------
# Online Backup
# ----------------------------------

if customer_data["OnlineBackup"] == "Yes":
    if "OnlineBackup_Yes" in input_data.columns:
        input_data["OnlineBackup_Yes"] = 1

elif customer_data["OnlineBackup"] == "No internet service":
    if "OnlineBackup_No internet service" in input_data.columns:
        input_data["OnlineBackup_No internet service"] = 1

# ----------------------------------
# Device Protection
# ----------------------------------

if customer_data["DeviceProtection"] == "Yes":
    if "DeviceProtection_Yes" in input_data.columns:
        input_data["DeviceProtection_Yes"] = 1

elif customer_data["DeviceProtection"] == "No internet service":
    if "DeviceProtection_No internet service" in input_data.columns:
        input_data["DeviceProtection_No internet service"] = 1

# ----------------------------------
# Tech Support
# ----------------------------------

if customer_data["TechSupport"] == "Yes":
    if "TechSupport_Yes" in input_data.columns:
        input_data["TechSupport_Yes"] = 1

elif customer_data["TechSupport"] == "No internet service":
    if "TechSupport_No internet service" in input_data.columns:
        input_data["TechSupport_No internet service"] = 1

# ----------------------------------
# Streaming TV
# ----------------------------------

if customer_data["StreamingTV"] == "Yes":
    if "StreamingTV_Yes" in input_data.columns:
        input_data["StreamingTV_Yes"] = 1

elif customer_data["StreamingTV"] == "No internet service":
    if "StreamingTV_No internet service" in input_data.columns:
        input_data["StreamingTV_No internet service"] = 1

# ----------------------------------
# Streaming Movies
# ----------------------------------

if customer_data["StreamingMovies"] == "Yes":
    if "StreamingMovies_Yes" in input_data.columns:
        input_data["StreamingMovies_Yes"] = 1

elif customer_data["StreamingMovies"] == "No internet service":
    if "StreamingMovies_No internet service" in input_data.columns:
        input_data["StreamingMovies_No internet service"] = 1

# ----------------------------------
# Contract
# ----------------------------------

if customer_data["Contract"] == "One year":
    if "Contract_One year" in input_data.columns:
        input_data["Contract_One year"] = 1

elif customer_data["Contract"] == "Two year":
    if "Contract_Two year" in input_data.columns:
        input_data["Contract_Two year"] = 1

# ----------------------------------
# Paperless Billing
# ----------------------------------

if customer_data["PaperlessBilling"] == "Yes":
    if "PaperlessBilling_Yes" in input_data.columns:
        input_data["PaperlessBilling_Yes"] = 1

# ----------------------------------
# Payment Method
# ----------------------------------

if customer_data["PaymentMethod"] == "Electronic check":
    if "PaymentMethod_Electronic check" in input_data.columns:
        input_data["PaymentMethod_Electronic check"] = 1

elif customer_data["PaymentMethod"] == "Mailed check":
    if "PaymentMethod_Mailed check" in input_data.columns:
        input_data["PaymentMethod_Mailed check"] = 1

elif customer_data["PaymentMethod"] == "Credit card (automatic)":
    if "PaymentMethod_Credit card (automatic)" in input_data.columns:
        input_data["PaymentMethod_Credit card (automatic)"] = 1

# Bank transfer (automatic) is the default category when drop_first=True.

# ----------------------------------
# Scale the Input
# ----------------------------------

scaled_input = scaler.transform(input_data)


# ----------------------------------
# Prediction
# ----------------------------------

prediction = model.predict(scaled_input)

probability = model.predict_proba(scaled_input)

confidence = float(round(probability[0].max() * 100, 2))

# ----------------------------------
# Return JSON Response
# ----------------------------------

result = {
    "prediction": "Likely to Churn" if prediction[0] == 1 else "Not Likely to Churn",
    "probability": confidence
}

print(json.dumps(result))
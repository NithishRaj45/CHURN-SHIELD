import pandas as pd
import numpy as np
import joblib

# Machine Learning Libraries
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBClassifier

# Evaluation Metrics
from sklearn.metrics import accuracy_score
from sklearn.metrics import confusion_matrix
from sklearn.metrics import classification_report


# --------------------------------------------------
# STEP 1 : Load the Dataset
# --------------------------------------------------

data = pd.read_csv("../dataset/Teleco Customer Churn.csv")


# --------------------------------------------------
# STEP 2 : Display First 5 Rows
# --------------------------------------------------

print("First 5 Rows of the Dataset:")
print(data.head())


# --------------------------------------------------
# STEP 3 : Display Dataset Shape
# --------------------------------------------------

print("\nShape of the Dataset:")
print(data.shape)


# --------------------------------------------------
# STEP 4 : Display Column Names
# --------------------------------------------------

print("\nColumn Names:")
print(data.columns)


# --------------------------------------------------
# STEP 5 : Display Dataset Information
# --------------------------------------------------

print("\nDataset Information:")
print(data.info())


# --------------------------------------------------
# STEP 6 : Check Missing Values
# --------------------------------------------------

print("\nMissing Values:")
print(data.isnull().sum())


# --------------------------------------------------
# STEP 7 : Check Unique Values
# --------------------------------------------------

print("\nUnique Values in TotalCharges:")
print(data["TotalCharges"].unique())


# --------------------------------------------------
# STEP 8 : Churn Distribution
# --------------------------------------------------

print("\nChurn Distribution:")
print(data["Churn"].value_counts())


# --------------------------------------------------
# STEP 9 : Count Blank Values
# --------------------------------------------------

blank_values = (data["TotalCharges"] == " ").sum()

print("\nBlank Values in TotalCharges:")
print(blank_values)


# --------------------------------------------------
# STEP 10 : Remove customerID Column
# --------------------------------------------------

data.drop("customerID", axis=1, inplace=True)

print("\nColumns after Removing customerID:")
print(data.columns)


# --------------------------------------------------
# STEP 11 : Replace Blank Spaces with NaN
# --------------------------------------------------

data["TotalCharges"] = data["TotalCharges"].replace(" ", np.nan)


# --------------------------------------------------
# STEP 12 : Check Missing Values Again
# --------------------------------------------------

print("\nMissing Values after Replacing Blank Spaces:")
print(data.isnull().sum())


# --------------------------------------------------
# STEP 13 : Convert TotalCharges to Numeric
# --------------------------------------------------

data["TotalCharges"] = pd.to_numeric(data["TotalCharges"])


# --------------------------------------------------
# STEP 14 : Updated Data Types
# --------------------------------------------------

print("\nUpdated Data Types:")
print(data.dtypes)


# --------------------------------------------------
# STEP 15 : Remove Missing Values
# --------------------------------------------------

data.dropna(inplace=True)


# --------------------------------------------------
# STEP 16 : Dataset Shape After Cleaning
# --------------------------------------------------

print("\nDataset Shape after Cleaning:")
print(data.shape)


# --------------------------------------------------
# STEP 17 : Verify Missing Values
# --------------------------------------------------

print("\nMissing Values after Cleaning:")
print(data.isnull().sum())


# --------------------------------------------------
# STEP 18 : Display Cleaned Dataset
# --------------------------------------------------

print("\nFirst 5 Rows of Cleaned Dataset:")
print(data.head())


# --------------------------------------------------
# STEP 19 : Encode Categorical Columns
# --------------------------------------------------

data = pd.get_dummies(data, drop_first=True)

print("\nDataset after Encoding:")
print(data.head())


# --------------------------------------------------
# STEP 20 : Dataset Shape
# --------------------------------------------------

print("\nDataset Shape after Encoding:")
print(data.shape)


# --------------------------------------------------
# STEP 21 : Features and Target Variable
# --------------------------------------------------

X = data.drop("Churn_Yes", axis=1)
y = data["Churn_Yes"]

print("\nShape of X:")
print(X.shape)

print("\nShape of y:")
print(y.shape)


# --------------------------------------------------
# STEP 22 : Train-Test Split
# --------------------------------------------------

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42
)


# --------------------------------------------------
# STEP 23 : Display Shapes
# --------------------------------------------------

print("\nX_train Shape:")
print(X_train.shape)

print("\nX_test Shape:")
print(X_test.shape)

print("\ny_train Shape:")
print(y_train.shape)

print("\ny_test Shape:")
print(y_test.shape)


# --------------------------------------------------
# STEP 24 : Feature Scaling
# --------------------------------------------------

scaler = StandardScaler()

X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)


# ==================================================
# LOGISTIC REGRESSION
# ==================================================

print("\n========== LOGISTIC REGRESSION ==========\n")

model = LogisticRegression(max_iter=2000)

model.fit(X_train, y_train)

y_pred = model.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)

print("Accuracy Score:")
print(accuracy)

print("\nConfusion Matrix:")
print(confusion_matrix(y_test, y_pred))

print("\nClassification Report:")
print(classification_report(y_test, y_pred))


# ==================================================
# RANDOM FOREST
# ==================================================

print("\n========== RANDOM FOREST ==========\n")

rf_model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

rf_model.fit(X_train, y_train)

rf_y_pred = rf_model.predict(X_test)

rf_accuracy = accuracy_score(y_test, rf_y_pred)

print("Random Forest Accuracy:")
print(rf_accuracy)

print("\nRandom Forest Confusion Matrix:")
print(confusion_matrix(y_test, rf_y_pred))

print("\nRandom Forest Classification Report:")
print(classification_report(y_test, rf_y_pred))


# ==================================================
# XGBOOST
# ==================================================

print("\n========== XGBOOST ==========\n")

xgb_model = XGBClassifier(
    n_estimators=100,
    learning_rate=0.1,
    max_depth=5,
    random_state=42
)

xgb_model.fit(X_train, y_train)

xgb_y_pred = xgb_model.predict(X_test)

xgb_accuracy = accuracy_score(y_test, xgb_y_pred)

print("XGBoost Accuracy:")
print(xgb_accuracy)

print("\nXGBoost Confusion Matrix:")
print(confusion_matrix(y_test, xgb_y_pred))

print("\nXGBoost Classification Report:")
print(classification_report(y_test, xgb_y_pred))


# ==================================================
# MODEL COMPARISON
# ==================================================

print("\n========== MODEL COMPARISON ==========\n")

print("Logistic Regression Accuracy :", accuracy)
print("Random Forest Accuracy       :", rf_accuracy)
print("XGBoost Accuracy             :", xgb_accuracy)


# ==================================================
# BEST MODEL
# ==================================================

if xgb_accuracy >= accuracy and xgb_accuracy >= rf_accuracy:
    print("\nBest Model : XGBoost")

elif accuracy >= rf_accuracy:
    print("\nBest Model : Logistic Regression")

else:
    print("\nBest Model : Random Forest")


   

# Save the XGBoost model
joblib.dump(xgb_model, "churn_model.pkl")

# Save the scaler
joblib.dump(scaler, "scaler.pkl")

joblib.dump(X.columns.tolist(), "feature_names.pkl")

print("\nModel Saved Successfully!")

print(X.columns)
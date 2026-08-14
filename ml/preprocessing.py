from config import *
from utils import *

import pandas as pd
import joblib

from sklearn.preprocessing import LabelEncoder
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split


# ==========================================
# Load Dataset
# ==========================================

print_heading("Loading Dataset")

df = pd.read_csv(DATASET_PATH)

print(df.shape)

# ==========================================
# Encode Target
# ==========================================

print_heading("Encoding Target Variable")

target_encoder = LabelEncoder()

df["Attrition"] = target_encoder.fit_transform(df["Attrition"])

# Save target encoder
joblib.dump(target_encoder, os.path.join(MODELS_DIR, "target_encoder.pkl"))

# ==========================================
# Encode Categorical Features
# ==========================================

categorical_columns = df.select_dtypes(include=["object"]).columns
encoders = {}

for col in categorical_columns:

    encoder = LabelEncoder()

    df[col] = encoder.fit_transform(df[col])

    encoders[col] = encoder

# Save encoders
joblib.dump(encoders, os.path.join(MODELS_DIR, "encoders.pkl"))

print("Categorical Features Encoded Successfully.")

# ==========================================
# Split Features & Target
# ==========================================

X = df.drop("Attrition", axis=1)

y = df["Attrition"]

# ==========================================
# Train Test Split
# ==========================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=RANDOM_STATE,
    stratify=y
)

print_heading("Train Test Split")

print("Training Samples :", X_train.shape)
print("Testing Samples  :", X_test.shape)

# ==========================================
# Feature Scaling
# ==========================================

scaler = StandardScaler()

X_train_scaled = scaler.fit_transform(X_train)

X_test_scaled = scaler.transform(X_test)

joblib.dump(scaler, os.path.join(MODELS_DIR, "scaler.pkl"))

# ==========================================
# Save Processed Data
# ==========================================

joblib.dump(X_train_scaled, os.path.join(MODELS_DIR, "X_train.pkl"))
joblib.dump(X_test_scaled, os.path.join(MODELS_DIR, "X_test.pkl"))
joblib.dump(y_train, os.path.join(MODELS_DIR, "y_train.pkl"))
joblib.dump(y_test, os.path.join(MODELS_DIR, "y_test.pkl"))

print_heading("Preprocessing Completed Successfully")
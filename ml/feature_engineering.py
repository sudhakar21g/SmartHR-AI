from config import *

import os
import joblib
import pandas as pd
import matplotlib.pyplot as plt

from sklearn.ensemble import RandomForestClassifier

print("=" * 60)
print("Feature Importance")
print("=" * 60)

# Load data
X_train = joblib.load(os.path.join(MODELS_DIR, "X_train.pkl"))
y_train = joblib.load(os.path.join(MODELS_DIR, "y_train.pkl"))

# Load original dataset
df = pd.read_csv(DATASET_PATH)

feature_names = df.drop("Attrition", axis=1).columns

# Train Random Forest for feature importance
rf = RandomForestClassifier(
    n_estimators=200,
    random_state=42
)

rf.fit(X_train, y_train)

importance = rf.feature_importances_

feature_df = pd.DataFrame({
    "Feature": feature_names,
    "Importance": importance
})

feature_df = feature_df.sort_values(
    by="Importance",
    ascending=False
)

print(feature_df)

# Save CSV
feature_df.to_csv(
    os.path.join(REPORTS_DIR, "feature_importance.csv"),
    index=False
)

# Plot Top 15 Features
top15 = feature_df.head(15)

plt.figure(figsize=(10,7))

plt.barh(
    top15["Feature"],
    top15["Importance"]
)

plt.xlabel("Importance")
plt.title("Top 15 Important Features")

plt.gca().invert_yaxis()

plt.tight_layout()

plt.savefig(
    os.path.join(
        SCREENSHOTS_DIR,
        "feature_importance.png"
    ),
    dpi=300
)

plt.close()

print("\nFeature Importance Saved Successfully")
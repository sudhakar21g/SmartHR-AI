from config import *

import os
import joblib
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

from sklearn.metrics import (
    confusion_matrix,
    ConfusionMatrixDisplay,
    RocCurveDisplay,
    accuracy_score,
    precision_score,
    recall_score,
    f1_score
)

print("=" * 60)
print("Loading Model")
print("=" * 60)

model = joblib.load(os.path.join(MODELS_DIR, "best_model.pkl"))

X_test = joblib.load(os.path.join(MODELS_DIR, "X_test.pkl"))
y_test = joblib.load(os.path.join(MODELS_DIR, "y_test.pkl"))

predictions = model.predict(X_test)

print("Model Loaded Successfully")

print()

print("=" * 60)
print("Evaluation Metrics")
print("=" * 60)

print("Accuracy :", accuracy_score(y_test, predictions))
print("Precision:", precision_score(y_test, predictions))
print("Recall   :", recall_score(y_test, predictions))
print("F1 Score :", f1_score(y_test, predictions))

# ===================================================
# Confusion Matrix
# ===================================================

cm = confusion_matrix(y_test, predictions)

disp = ConfusionMatrixDisplay(
    confusion_matrix=cm,
    display_labels=["No", "Yes"]
)

disp.plot(cmap="Blues")

plt.title("Confusion Matrix")

plt.savefig(
    os.path.join(
        SCREENSHOTS_DIR,
        "confusion_matrix.png"
    ),
    dpi=300
)

plt.close()

# ===================================================
# ROC Curve
# ===================================================

RocCurveDisplay.from_estimator(
    model,
    X_test,
    y_test
)

plt.title("ROC Curve")

plt.savefig(
    os.path.join(
        SCREENSHOTS_DIR,
        "roc_curve.png"
    ),
    dpi=300
)

plt.close()

print()

print("Evaluation Completed Successfully")
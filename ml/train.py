from config import *
from utils import *

import os
import joblib
import pandas as pd

from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.svm import SVC
from sklearn.naive_bayes import GaussianNB
from sklearn.model_selection import cross_val_score
from sklearn.model_selection import GridSearchCV

from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    roc_auc_score,
    confusion_matrix,
    classification_report
)

# ==========================================
# Load Preprocessed Data
# ==========================================

print_heading("Loading Preprocessed Data")

X_train = joblib.load(os.path.join(MODELS_DIR, "X_train.pkl"))
X_test = joblib.load(os.path.join(MODELS_DIR, "X_test.pkl"))
y_train = joblib.load(os.path.join(MODELS_DIR, "y_train.pkl"))
y_test = joblib.load(os.path.join(MODELS_DIR, "y_test.pkl"))

print("Training Samples :", X_train.shape)
print("Testing Samples  :", X_test.shape)

# ==========================================
# Models
# ==========================================

models = {
    "Logistic Regression": LogisticRegression(
    max_iter=1000,
    class_weight="balanced",
    random_state=RANDOM_STATE
),

    "Decision Tree": DecisionTreeClassifier(
    class_weight="balanced",
    random_state=RANDOM_STATE
),

    "Random Forest": RandomForestClassifier(
    n_estimators=300,
    class_weight="balanced",
    random_state=RANDOM_STATE
),

    "KNN": KNeighborsClassifier(),

    "SVM": SVC(probability=True, random_state=RANDOM_STATE),

    "Naive Bayes": GaussianNB()
}

results = []

best_model = None
best_accuracy = 0

print_heading("Training Models")

for name, model in models.items():

    print(f"Training {name}...")

    model.fit(X_train, y_train)

    predictions = model.predict(X_test)

    accuracy = accuracy_score(y_test, predictions)
    precision = precision_score(y_test, predictions)
    recall = recall_score(y_test, predictions)
    f1 = f1_score(y_test, predictions)
    roc = roc_auc_score(y_test, predictions)

    results.append({
        "Model": name,
        "Accuracy": accuracy,
        "Precision": precision,
        "Recall": recall,
        "F1 Score": f1,
        "ROC AUC": roc
    })

    if accuracy > best_accuracy:
        best_accuracy = accuracy
        best_model = model

# ==========================================
# Results
# ==========================================

results_df = pd.DataFrame(results)

results_df = results_df.sort_values(
    by="Accuracy",
    ascending=False
)

print_heading("Model Comparison")

print(results_df)

# ==========================================
# Save Results
# ==========================================

results_df.to_csv(
    os.path.join(REPORTS_DIR, "model_comparison.csv"),
    index=False
)

joblib.dump(
    best_model,
    os.path.join(MODELS_DIR, "best_model.pkl")
)

print_heading("Best Model Saved Successfully")

print(results_df.iloc[0])

# ==========================================
# Classification Report
# ==========================================

print_heading("Classification Report")

best_predictions = best_model.predict(X_test)

print(classification_report(y_test, best_predictions))

print_heading("Training Completed")

# ==========================================
# Cross Validation
# ==========================================

print_heading("Cross Validation Scores")

cv_results = []

for name, model in models.items():

    scores = cross_val_score(
        model,
        X_train,
        y_train,
        cv=5,
        scoring="accuracy"
    )

    cv_results.append({
        "Model": name,
        "Mean Accuracy": scores.mean(),
        "Std Dev": scores.std()
    })

cv_df = pd.DataFrame(cv_results)

print(cv_df)

cv_df.to_csv(
    os.path.join(REPORTS_DIR, "cross_validation_results.csv"),
    index=False
)

print_heading("Hyperparameter Tuning - Random Forest")

param_grid = {
    "n_estimators": [100, 200, 300],
    "max_depth": [None, 10, 20],
    "min_samples_split": [2, 5, 10],
    "min_samples_leaf": [1, 2, 4]
}

grid_search = GridSearchCV(
    estimator=RandomForestClassifier(
        class_weight="balanced",
        random_state=RANDOM_STATE
    ),
    param_grid=param_grid,
    cv=5,
    scoring="f1",
    n_jobs=-1
)

grid_search.fit(X_train, y_train)

print("\nBest Parameters:")
print(grid_search.best_params_)

print("\nBest Cross Validation Score:")
print(grid_search.best_score_)

best_rf = grid_search.best_estimator_

joblib.dump(
    best_rf,
    os.path.join(MODELS_DIR, "best_random_forest.pkl")
)

print("\nBest Random Forest Model Saved Successfully!")
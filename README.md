# SmartHR-AI

An employee attrition (turnover) prediction system that analyzes HR data with machine learning and exposes predictions through a Spring Boot REST API with a responsive web dashboard. Built with Python (scikit-learn) for the ML pipeline and Java Spring Boot for the backend.

---

## Badges

![Python](https://img.shields.io/badge/Python-3.12-blue)
![scikit-learn](https://img.shields.io/badge/scikit--learn-1.x-orange)
![Java](https://img.shields.io/badge/Java-17-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.16-brightgreen)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue)

---

## Features

- **Attrition Prediction** - Predict whether an employee is likely to leave based on job factors (overtime, satisfaction, income, tenure, etc.)
- **Confidence Scoring** - Each prediction includes a confidence score
- **Prediction History** - Per-user prediction history with timestamps
- **ML Pipeline** - Feature engineering, preprocessing, training, evaluation, and EDA scripts (scikit-learn)
- **Model Artifacts** - Pre-trained models and encoders (`models/`)
- **Dashboard** - Dashboard statistics and employee overview
- **User Accounts** - Register, login, and per-user prediction tracking
- **Reports** - Cross-validation results, feature importance, and model comparison

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Backend** | Java 17, Spring Boot 3.5.16, Spring Data JPA, Spring Validation |
| **ML / Data** | Python, scikit-learn, pandas, NumPy, joblib |
| **Database** | MySQL 8.0 |
| **Build Tools** | Maven (or included `mvnw`), pip |

---

## Project Structure

```
SmartHR-AI/
├── ml/                               # Machine learning pipeline
│   ├── eda.py                        # Exploratory data analysis
│   ├── preprocessing.py              # Data cleaning & preparation
│   ├── feature_engineering.py        # Feature creation
│   ├── train.py                      # Model training
│   ├── evaluation.py                 # Model evaluation
│   └── predict.py                    # Prediction helper
├── backend/                          # Spring Boot REST API
│   └── src/main/java/com/smarthr/smarthr_ai/
│       ├── controller/               # Auth, Prediction, Dashboard controllers
│       ├── dto/                      # Request/Response DTOs
│       ├── entity/                   # User, Employee, PredictionHistory
│       ├── repository/               # Spring Data JPA repositories
│       └── service/                  # Prediction, Dashboard, User services
├── frontend/                         # Web dashboard
│   ├── login.html / register.html    # Authentication
│   ├── dashboard.html                # KPIs & statistics
│   ├── prediction.html               # Attrition prediction form
│   ├── history.html                  # Past predictions
│   ├── reports.html / profile.html   # Reports & profile
│   └── css/, js/                     # Styles and logic
├── dataset/                          # IBM HR Analytics dataset (CSV)
├── models/                           # Trained models, encoders, scalers (.pkl)
├── reports/                          # Model comparison, feature importance CSVs
└── screenshots/                      # EDA and evaluation charts
```

---

## Prerequisites

- **Java 17** (JDK)
- **Maven** (or use the included `mvnw`)
- **MySQL 8.0** (XAMPP works)
- **Python 3.12+** with pip

---

## Setup Instructions

### 1. Database Setup

Start MySQL and create the database:

```sql
CREATE DATABASE smarthr_ai;
```

Tables are auto-created by Hibernate on startup.

### 2. (Optional) Train the ML Models

```bash
pip install -r requirements.txt
cd ml
python train.py
```

This trains models on `dataset/IBM-HR-Analytics.csv` and saves artifacts to `models/`.

### 3. Start the Backend

```bash
cd backend
./mvnw spring-boot:run        # Linux/macOS
.\mvnw.cmd spring-boot:run    # Windows
```

Backend runs at `http://localhost:8080`.

### 4. Open the Frontend

Serve or open the frontend files from `frontend/` (e.g. XAMPP `htdocs` or directly open `index.html`).

### 5. Login

Register a new account from the **Register** page, or use the default credentials if provided in your local database seed.

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and get a token |
| POST | `/api/predictions` | Run an attrition prediction |
| GET | `/api/predictions/history` | Get the user's prediction history |
| GET | `/api/dashboard/stats` | Dashboard statistics |

---

## Reports

- `reports/model_comparison.csv` - accuracy comparison across models
- `reports/feature_importance.csv` - most influential features
- `reports/cross_validation_results.csv` - cross-validation scores
- `screenshots/` - EDA charts and evaluation plots (confusion matrix, ROC curve)

---

## Dataset

[IBM HR Analytics Employee Attrition & Performance](https://www.kaggle.com/datasets/pavansubhasht/ibm-hr-analytics-attrition-dataset) - used for training and evaluation.

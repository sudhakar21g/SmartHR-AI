import warnings
warnings.filterwarnings("ignore")
import os
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

plt.style.use("ggplot")

# Load Dataset
# Get the project root directory
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# Dataset path
DATASET_PATH = os.path.join(BASE_DIR, "dataset", "IBM-HR-Analytics.csv")
print("Dataset Path:", DATASET_PATH)
# Create screenshots folder if it doesn't exist
SCREENSHOT_DIR = os.path.join(BASE_DIR, "screenshots")
os.makedirs(SCREENSHOT_DIR, exist_ok=True)
# Load dataset
df = pd.read_csv(DATASET_PATH)
# Basic Information
print("=" * 60)
print("DATASET SHAPE")
print("=" * 60)
print(df.shape)

print("\n")

print("=" * 60)
print("COLUMN NAMES")
print("=" * 60)
print(df.columns.tolist())

print("\n")

print("=" * 60)
print("DATASET INFO")
print("=" * 60)
print(df.info())

print("\n")

print("=" * 60)
print("STATISTICAL SUMMARY")
print("=" * 60)
print(df.describe())

print("\n")

print("=" * 60)
print("MISSING VALUES")
print("=" * 60)
print(df.isnull().sum())

print("\n")

print("=" * 60)
print("DUPLICATE ROWS")
print("=" * 60)
print(df.duplicated().sum())

# Attrition Distribution

plt.figure(figsize=(6,6))

df["Attrition"].value_counts().plot(
    kind="pie",
    autopct="%1.1f%%",
    explode=[0,0.1]
)

plt.ylabel("")
plt.title("Employee Attrition Distribution")
plt.savefig(
    os.path.join(SCREENSHOT_DIR, "chart_name.png"),
    dpi=300,
    bbox_inches="tight"
)

plt.close()
# ==========================================
# Age Distribution
# ==========================================

plt.figure(figsize=(8,5))

sns.histplot(df["Age"], bins=20, kde=True)

plt.title("Age Distribution")
plt.xlabel("Age")
plt.ylabel("Number of Employees")

plt.tight_layout()
plt.savefig(
    os.path.join(SCREENSHOT_DIR, "age_distribution.png"),
    dpi=300,
    bbox_inches="tight"
)
plt.close()
# ==========================================
# Gender Distribution
# ==========================================

plt.figure(figsize=(6,4))

sns.countplot(data=df, x="Gender")

plt.title("Gender Distribution")

plt.tight_layout()
plt.savefig(
    os.path.join(SCREENSHOT_DIR, "gender_distribution.png"),
    dpi=300,
    bbox_inches="tight"
)
plt.close()

# ==========================================
# Department Distribution
# ==========================================

plt.figure(figsize=(8,5))

sns.countplot(data=df, x="Department")

plt.title("Department Distribution")

plt.xticks(rotation=20)

plt.tight_layout()
plt.savefig(
    os.path.join(SCREENSHOT_DIR, "department_distribution.png"),
    dpi=300,
    bbox_inches="tight"
)
plt.close()

# ==========================================
# Attrition by Department
# ==========================================

plt.figure(figsize=(8,5))

sns.countplot(
    data=df,
    x="Department",
    hue="Attrition"
)

plt.title("Department-wise Attrition")

plt.xticks(rotation=20)

plt.tight_layout()
plt.savefig(
    os.path.join(SCREENSHOT_DIR, "attrition_distribution.png"),
    dpi=300,
    bbox_inches="tight"
)
plt.close()
# ==========================================
# Overtime vs Attrition
# ==========================================

plt.figure(figsize=(6,5))

sns.countplot(
    data=df,
    x="OverTime",
    hue="Attrition"
)

plt.title("Overtime vs Attrition")

plt.tight_layout()
plt.savefig(
    os.path.join(SCREENSHOT_DIR, "overtime_attrition.png"),
    dpi=300,
    bbox_inches="tight"
)
plt.close()

# ==========================================
# Monthly Income
# ==========================================

plt.figure(figsize=(8,5))

sns.histplot(df["MonthlyIncome"], bins=25, kde=True)

plt.title("Monthly Income Distribution")

plt.tight_layout()
plt.savefig(
    os.path.join(SCREENSHOT_DIR, "monthly_income_distribution.png"),
    dpi=300,
    bbox_inches="tight"
)
plt.close()

# ==========================================
# Job Satisfaction
# ==========================================

plt.figure(figsize=(7,5))

sns.countplot(
    data=df,
    x="JobSatisfaction",
    hue="Attrition"
)

plt.title("Job Satisfaction vs Attrition")

plt.tight_layout()
plt.savefig(
    os.path.join(SCREENSHOT_DIR, "job_satisfaction_attrition.png"),
    dpi=300,
    bbox_inches="tight"
)
plt.close()
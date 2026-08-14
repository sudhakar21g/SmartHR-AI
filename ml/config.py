import os

# ==========================================
# Project Paths
# ==========================================

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

DATASET_PATH = os.path.join(BASE_DIR, "dataset", "IBM-HR-Analytics.csv")

MODELS_DIR = os.path.join(BASE_DIR, "models")
REPORTS_DIR = os.path.join(BASE_DIR, "reports")
SCREENSHOTS_DIR = os.path.join(BASE_DIR, "screenshots")

# ==========================================
# Create Required Folders
# ==========================================

for folder in [MODELS_DIR, REPORTS_DIR, SCREENSHOTS_DIR]:
    os.makedirs(folder, exist_ok=True)

# ==========================================
# Random State
# ==========================================

RANDOM_STATE = 42
import csv
import mysql.connector

conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="smarthr_ai"
)
cursor = conn.cursor()

with open("dataset/IBM-HR-Analytics.csv", "r", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    count = 0
    for row in reader:
        cursor.execute("""
            INSERT INTO employees (
                age, attrition, business_travel, daily_rate, department,
                distance_from_home, education, education_field,
                environment_satisfaction, gender, hourly_rate,
                job_involvement, job_level, job_role, job_satisfaction,
                marital_status, monthly_income, monthly_rate,
                num_companies_worked, overtime, percent_salary_hike,
                performance_rating, relationship_satisfaction,
                stock_option_level, total_working_years,
                training_times_last_year, work_life_balance,
                years_at_company, years_in_current_role,
                years_since_last_promotion, years_with_curr_manager
            ) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
        """, (
            int(row['Age']),
            row['Attrition'],
            row['BusinessTravel'],
            float(row['DailyRate']),
            row['Department'],
            int(row['DistanceFromHome']),
            row['Education'],
            row['EducationField'],
            row['EnvironmentSatisfaction'],
            row['Gender'],
            int(row['HourlyRate']),
            row['JobInvolvement'],
            row['JobLevel'],
            row['JobRole'],
            row['JobSatisfaction'],
            row['MaritalStatus'],
            float(row['MonthlyIncome']),
            float(row['MonthlyRate']),
            int(row['NumCompaniesWorked']),
            row['OverTime'],
            int(row['PercentSalaryHike']),
            row['PerformanceRating'],
            row['RelationshipSatisfaction'],
            int(row['StockOptionLevel']),
            int(row['TotalWorkingYears']),
            int(row['TrainingTimesLastYear']),
            row['WorkLifeBalance'],
            int(row['YearsAtCompany']),
            int(row['YearsInCurrentRole']),
            int(row['YearsSinceLastPromotion']),
            int(row['YearsWithCurrManager'])
        ))
        count += 1

conn.commit()
print(f"Imported {count} rows successfully")
cursor.close()
conn.close()

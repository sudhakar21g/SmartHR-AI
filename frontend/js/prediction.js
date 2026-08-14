/*==================================================
SmartHR AI
Prediction Page
Version 1.0
==================================================*/

"use strict";

/*==================================================
DOM Elements
==================================================*/

const predictBtn = document.getElementById("predictBtn");

const predictEmployeeBtn = document.getElementById("predictEmployeeBtn");

const bannerSampleBtn = document.getElementById("bannerSampleBtn");

const bannerClearBtn = document.getElementById("bannerClearBtn");

const formSampleBtn = document.getElementById("formSampleBtn");

const formClearBtn = document.getElementById("formClearBtn");

const predictionTime = document.getElementById("predictionTime");

const predictionId = document.getElementById("predictionId");

const confidenceValue = document.getElementById("confidenceValue");

const confidenceBar = document.getElementById("confidenceBar");

const riskBadge = document.getElementById("riskBadge");

const recommendationAlert = document.getElementById("recommendationAlert");

const recommendationList = document.getElementById("recommendationList");

/*==================================================
Page Load
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    initializePage();

});

/*==================================================
Initialize
==================================================*/

function initializePage() {

    updatePredictionTime();

    generatePredictionId();

    registerEvents();

}

/*==================================================
Event Listeners
==================================================*/

function registerEvents() {

    predictBtn.addEventListener("click", predictEmployee);

    predictEmployeeBtn.addEventListener("click", predictEmployee);

    bannerSampleBtn.addEventListener("click", loadSampleData);

    formSampleBtn.addEventListener("click", loadSampleData);

    bannerClearBtn.addEventListener("click", clearForm);

    formClearBtn.addEventListener("click", clearForm);

}

/*==================================================
Current Time
==================================================*/

function updatePredictionTime() {

    const now = new Date();

    predictionTime.textContent =
        now.toLocaleTimeString([], {

            hour: "2-digit",

            minute: "2-digit"

        });

}

/*==================================================
Prediction ID
==================================================*/

function generatePredictionId() {

    const random = Math.floor(Math.random() * 9000) + 1000;

    predictionId.textContent = "PRD-" + random;

}
/*==================================================
Load Sample Data
==================================================*/

function loadSampleData() {

    document.getElementById("employeeId").value = "EMP001";

    document.getElementById("employeeName").value = "John Smith";

    document.getElementById("age").value = 35;

    document.getElementById("gender").value = "Male";

    document.getElementById("maritalStatus").value = "Married";

    document.getElementById("department").value = "Sales";

    document.getElementById("jobRole").value = "Sales Executive";

    document.getElementById("monthlyIncome").value = 55000;

    document.getElementById("yearsAtCompany").value = 6;

    document.getElementById("businessTravel").value = "Travel Rarely";

    document.getElementById("distanceFromHome").value = 12;

    document.getElementById("jobSatisfaction").value = "3";

    document.getElementById("performanceRating").value = "3";

    document.getElementById("environmentSatisfaction").value = "3";

    document.getElementById("workLifeBalance").value = "3";

    document.getElementById("overTime").value = "No";

    document.getElementById("education").value = "Bachelor";

}

/*==================================================
Clear Form
==================================================*/

function clearForm() {

    document.getElementById("employeeId").value = "";

    document.getElementById("employeeName").value = "";

    document.getElementById("age").value = "";

    document.getElementById("gender").selectedIndex = 0;

    document.getElementById("maritalStatus").selectedIndex = 0;

    document.getElementById("department").selectedIndex = 0;

    document.getElementById("jobRole").value = "";

    document.getElementById("monthlyIncome").value = "";

    document.getElementById("yearsAtCompany").value = "";

    document.getElementById("businessTravel").selectedIndex = 0;

    document.getElementById("distanceFromHome").value = "";

    document.getElementById("jobSatisfaction").selectedIndex = 0;

    document.getElementById("performanceRating").selectedIndex = 0;

    document.getElementById("environmentSatisfaction").selectedIndex = 0;

    document.getElementById("workLifeBalance").selectedIndex = 0;

    document.getElementById("overTime").selectedIndex = 0;

    document.getElementById("education").selectedIndex = 0;

    confidenceValue.textContent = "--";

    confidenceBar.style.width = "0%";

    riskBadge.textContent = "NO RESULT";

    riskBadge.className = "badge bg-secondary fs-6 px-4 py-3 rounded-pill";

    recommendationAlert.className = "alert alert-secondary";

    recommendationAlert.innerHTML = `
        <i class="bi bi-info-circle me-2"></i>
        Fill the employee details and click Predict.
    `;

    recommendationList.innerHTML = "";

    generatePredictionId();

    updatePredictionTime();

}

/*==================================================
Validate Form
==================================================*/

function validateForm() {

    if (employeeName.value.trim() === "") {

        alert("Please enter Employee Name.");

        employeeName.focus();

        return false;

    }

    if (age.value === "") {

        alert("Please enter Age.");

        age.focus();

        return false;

    }

    if (jobRole.value.trim() === "") {

        alert("Please enter Job Role.");

        jobRole.focus();

        return false;

    }

    if (monthlyIncome.value === "") {

        alert("Please enter Monthly Income.");

        monthlyIncome.focus();

        return false;

    }

    if (yearsAtCompany.value === "") {

        alert("Please enter Years at Company.");

        yearsAtCompany.focus();

        return false;

    }

    return true;

}
/*==================================================
Collect Form Data
==================================================*/

function collectFormData() {

    return {

        employeeId:
            document.getElementById("employeeId").value.trim(),

        employeeName:
            document.getElementById("employeeName").value.trim(),

        age:
            Number(document.getElementById("age").value),

        gender:
            document.getElementById("gender").value,

        maritalStatus:
            document.getElementById("maritalStatus").value,

        department:
            document.getElementById("department").value,

        jobRole:
            document.getElementById("jobRole").value,

        monthlyIncome:
            Number(document.getElementById("monthlyIncome").value),

        yearsAtCompany:
            Number(document.getElementById("yearsAtCompany").value),

        businessTravel:
            document.getElementById("businessTravel").value,

        distanceFromHome:
            Number(document.getElementById("distanceFromHome").value),

        jobSatisfaction:
            Number(document.getElementById("jobSatisfaction").value),

        performanceRating:
            Number(document.getElementById("performanceRating").value),

        environmentSatisfaction:
            Number(document.getElementById("environmentSatisfaction").value),

        workLifeBalance:
            Number(document.getElementById("workLifeBalance").value),

        overTime:
            document.getElementById("overTime").value,

        education:
            document.getElementById("education").value

    };

}

/*==================================================
Predict Employee (Backend API)
==================================================*/

async function predictEmployee() {

    if (!validateForm()) {

        return;

    }

    updatePredictionTime();

    generatePredictionId();

    startLoading();

    const employee = collectFormData();

    try {

        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const userId = user.userId || 1;

        const predictionPayload = {
            age: employee.age,
            department: employee.department,
            jobRole: employee.jobRole,
            monthlyIncome: employee.monthlyIncome,
            overtime: employee.overTime,
            totalWorkingYears: null,
            businessTravel: employee.businessTravel,
            distanceFromHome: employee.distanceFromHome,
            gender: employee.gender,
            maritalStatus: employee.maritalStatus,
            jobSatisfaction: String(employee.jobSatisfaction),
            performanceRating: String(employee.performanceRating),
            environmentSatisfaction: String(employee.environmentSatisfaction),
            workLifeBalance: String(employee.workLifeBalance),
            education: employee.education,
            yearsAtCompany: employee.yearsAtCompany
        };

        const response = await fetch(

            `http://localhost:8080/api/predictions/predict?userId=${userId}`,

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(predictionPayload)

            }

        );

        if (!response.ok) {

            throw new Error("Prediction request failed.");

        }

        const result = await response.json();

        if (result.success && result.data) {
            const apiResult = {
                confidence: Math.round(result.data.confidenceScore * 100),
                risk: result.data.attritionPrediction === "Yes" ? "High" : "Low"
            };
            if (apiResult.confidence < 65) apiResult.risk = "High";
            else if (apiResult.confidence < 80) apiResult.risk = "Medium";
            else apiResult.risk = "Low";
            updatePredictionResult(apiResult);
            saveToHistory(result.data.attritionPrediction, apiResult.confidence, predictionId.textContent);
        } else {
            const fallback = simulatePrediction(employee);
            updatePredictionResult(fallback);
            saveToHistory(fallback.risk === "Low" ? "No" : "Yes", fallback.confidence, predictionId.textContent);
        }

        stopLoading();

        showSuccess("Prediction completed successfully.");

    }

    catch (error) {

        console.error(error);

        stopLoading();

        const fallback = simulatePrediction(employee);

        updatePredictionResult(fallback);
        saveToHistory(fallback.risk === "Low" ? "No" : "Yes", fallback.confidence, predictionId.textContent);

        showWarning("Backend offline. Using local prediction.");

    }

}
/*==================================================
Temporary AI Prediction
==================================================*/

function simulatePrediction(employee) {

    let confidence = 90;

    if (employee.overTime === "Yes") {

        confidence -= 15;

    }

    if (employee.jobSatisfaction <= 2) {

        confidence -= 12;

    }

    if (employee.workLifeBalance <= 2) {

        confidence -= 10;

    }

    if (employee.environmentSatisfaction <= 2) {

        confidence -= 10;

    }

    if (employee.yearsAtCompany < 2) {

        confidence -= 8;

    }

    if (employee.monthlyIncome < 30000) {

        confidence -= 8;

    }

    confidence = Math.max(45, Math.min(confidence, 98));

    let risk = "Low";

    if (confidence < 80) {

        risk = "Medium";

    }

    if (confidence < 65) {

        risk = "High";

    }

    return {

        confidence,

        risk

    };

}
/*==================================================
Update Prediction Result
==================================================*/

function updatePredictionResult(result) {

    const confidence = result.confidence;

    confidenceValue.textContent = confidence + "%";

    confidenceBar.style.width = confidence + "%";

    /*==========================================
    Risk Badge
    ==========================================*/

    if (result.risk === "Low") {

        riskBadge.textContent = "LOW RISK";

        riskBadge.className =
            "badge bg-success fs-6 px-4 py-3 rounded-pill";

        confidenceValue.style.color = "#22c55e";

        confidenceBar.className =
            "progress-bar bg-success";

        recommendationAlert.className =
            "alert alert-success";

        recommendationAlert.innerHTML = `
            <i class="bi bi-check-circle-fill me-2"></i>
            Employee is likely to stay with the organization.
        `;

        recommendationList.innerHTML = `
            <li class="list-group-item">
                <i class="bi bi-check2-circle text-success me-2"></i>
                Continue regular performance reviews.
            </li>

            <li class="list-group-item">
                <i class="bi bi-check2-circle text-success me-2"></i>
                Encourage career growth.
            </li>

            <li class="list-group-item">
                <i class="bi bi-check2-circle text-success me-2"></i>
                Maintain work-life balance.
            </li>
        `;

    }

    else if (result.risk === "Medium") {

        riskBadge.textContent = "MEDIUM RISK";

        riskBadge.className =
            "badge bg-warning text-dark fs-6 px-4 py-3 rounded-pill";

        confidenceValue.style.color = "#f59e0b";

        confidenceBar.className =
            "progress-bar bg-warning";

        recommendationAlert.className =
            "alert alert-warning";

        recommendationAlert.innerHTML = `
            <i class="bi bi-exclamation-triangle-fill me-2"></i>
            Employee has a moderate attrition risk.
        `;

        recommendationList.innerHTML = `
            <li class="list-group-item">
                <i class="bi bi-arrow-right-circle me-2 text-warning"></i>
                Schedule one-on-one discussions.
            </li>

            <li class="list-group-item">
                <i class="bi bi-arrow-right-circle me-2 text-warning"></i>
                Review compensation and benefits.
            </li>

            <li class="list-group-item">
                <i class="bi bi-arrow-right-circle me-2 text-warning"></i>
                Improve employee engagement.
            </li>
        `;

    }

    else {

        riskBadge.textContent = "HIGH RISK";

        riskBadge.className =
            "badge bg-danger fs-6 px-4 py-3 rounded-pill";

        confidenceValue.style.color = "#ef4444";

        confidenceBar.className =
            "progress-bar bg-danger";

        recommendationAlert.className =
            "alert alert-danger";

        recommendationAlert.innerHTML = `
            <i class="bi bi-x-circle-fill me-2"></i>
            Employee has a high probability of leaving.
        `;

        recommendationList.innerHTML = `
            <li class="list-group-item">
                <i class="bi bi-exclamation-circle me-2 text-danger"></i>
                Conduct an immediate HR meeting.
            </li>

            <li class="list-group-item">
                <i class="bi bi-exclamation-circle me-2 text-danger"></i>
                Review salary and promotion opportunities.
            </li>

            <li class="list-group-item">
                <i class="bi bi-exclamation-circle me-2 text-danger"></i>
                Create a personalized retention plan.
            </li>
        `;

    }

    /*==========================================
    Animate Prediction Panel
    ==========================================*/

    const panel = document.querySelector(".prediction-circle");

    panel.classList.remove("prediction-success");

    void panel.offsetWidth;

    panel.classList.add("prediction-success");

}
/*==================================================
Show Toast Notification
==================================================*/

function showToast(message, type = "success") {

    const toast = document.createElement("div");

    toast.className =
        `toast align-items-center text-white bg-${type} border-0 position-fixed`;

    toast.style.top = "20px";
    toast.style.right = "20px";
    toast.style.zIndex = "9999";

    toast.innerHTML = `
        <div class="d-flex">

            <div class="toast-body">

                ${message}

            </div>

            <button
                type="button"
                class="btn-close btn-close-white me-2 m-auto"
                data-bs-dismiss="toast">
            </button>

        </div>
    `;

    document.body.appendChild(toast);

    const bsToast = new bootstrap.Toast(toast, {

        delay:3000

    });

    bsToast.show();

    toast.addEventListener("hidden.bs.toast", () => {

        toast.remove();

    });

}

/*==================================================
Show Loading
==================================================*/

function startLoading() {

    predictBtn.disabled = true;

    predictEmployeeBtn.disabled = true;

    predictBtn.innerHTML = `
        <span class="spinner-border spinner-border-sm me-2"></span>
        Predicting...
    `;

    predictEmployeeBtn.innerHTML = `
        <span class="spinner-border spinner-border-sm me-2"></span>
        Predicting...
    `;

}

/*==================================================
Hide Loading
==================================================*/

function stopLoading() {

    predictBtn.disabled = false;

    predictEmployeeBtn.disabled = false;

    predictBtn.innerHTML = `
        <i class="bi bi-cpu-fill me-2"></i>
        Predict Employee
    `;

    predictEmployeeBtn.innerHTML = `
        <i class="bi bi-cpu me-2"></i>
        Predict Now
    `;

}

/*==================================================
Reset Prediction Panel
==================================================*/

function resetPredictionPanel() {

    confidenceValue.textContent = "--";

    confidenceBar.style.width = "0%";

    confidenceBar.className = "progress-bar";

    riskBadge.className =
        "badge bg-secondary fs-6 px-4 py-3 rounded-pill";

    riskBadge.textContent = "NO RESULT";

    recommendationAlert.className = "alert alert-secondary";

    recommendationAlert.innerHTML = `
        <i class="bi bi-info-circle me-2"></i>
        Click Predict to generate AI recommendations.
    `;

    recommendationList.innerHTML = "";

}

/*==================================================
Error Handler
==================================================*/

function showError(message) {

    stopLoading();

    showToast(message, "danger");

}

/*==================================================
Success Handler
==================================================*/

function showSuccess(message) {

    showToast(message, "success");

}

/*==================================================
Warning Handler
==================================================*/

function showWarning(message) {

    showToast(message, "warning");

}

/*==================================================
Random Helper
==================================================*/

function randomBetween(min, max) {

    return Math.floor(

        Math.random() * (max - min + 1)

    ) + min;

}

/*==================================================
Format Currency
==================================================*/

function formatCurrency(value) {

    return new Intl.NumberFormat(

        "en-IN",

        {

            style:"currency",

            currency:"INR",

            maximumFractionDigits:0

        }

    ).format(value);

}

/*==================================================
Save Prediction to Local History
==================================================*/

function saveToHistory(result, confidence, id) {

    const history = JSON.parse(localStorage.getItem("predictionHistory") || "[]");

    history.unshift({

        id: id,

        result: result,

        confidence: confidence,

        time: new Date().toISOString()

    });

    if (history.length > 50) {

        history.pop();

    }

    localStorage.setItem("predictionHistory", JSON.stringify(history));

}

/*==================================================
Console
==================================================*/

console.log(

"SmartHR AI Prediction Module Loaded Successfully"

);
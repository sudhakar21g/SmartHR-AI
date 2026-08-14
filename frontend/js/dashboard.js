/*=========================================
SmartHR AI Dashboard
dashboard.js
Part 1
=========================================*/

/*=========================================
Dashboard Data
=========================================*/
const dashboardData = {
    employees: 1470,
    attritionRate: 16.1,
    predictions: 0,
    highRisk: 0
};

/*=========================================
Greeting
=========================================*/
function updateGreeting() {
    const greeting = document.getElementById("greeting");
    if (!greeting) return;
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const name = user.fullName || "Admin";
    const hour = new Date().getHours();
    let message = "";
    if (hour < 12) {
        message = "Good Morning";
    }
    else if (hour < 17) {
        message = "Good Afternoon";
    }
    else {
        message = "Good Evening";
    }
    greeting.innerHTML = `${message}, ${name} 👋`;

    const navName = document.getElementById("navUserName");
    if (navName) navName.textContent = name;
}

/*=========================================
Live Date & Time
=========================================*/
function updateDateTime() {
    const liveDate = document.getElementById("liveDate");
    if (!liveDate) return;
    const now = new Date();
    const options = {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric"
    };
    const date = now.toLocaleDateString("en-IN", options);
    const time = now.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });
    liveDate.innerHTML = `${date} • ${time}`;
}
setInterval(updateDateTime, 1000);

/*=========================================
Counter Animation
=========================================*/
function animateCounter(id, start, end, duration, suffix = "") {
    const element = document.getElementById(id);
    if (!element) return;
    let startTimestamp = null;
    function step(timestamp) {
        if (!startTimestamp) {
            startTimestamp = timestamp;
        }
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.innerHTML = value.toLocaleString() + suffix;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
        else {
            element.innerHTML = end.toLocaleString() + suffix;
        }
    }
    window.requestAnimationFrame(step);
}

/*=========================================
Percentage Animation
=========================================*/

function animatePercentage(id, target, duration = 1500) {

    const element = document.getElementById(id);

    if (!element) return;

    let startTimestamp = null;

    function step(timestamp) {

        if (!startTimestamp) {

            startTimestamp = timestamp;

        }

        const progress = Math.min(

            (timestamp - startTimestamp) / duration,

            1

        );

        const value = progress * target;

        element.innerHTML = value.toFixed(1) + "%";

        if (progress < 1) {

            window.requestAnimationFrame(step);

        } else {

            element.innerHTML = target.toFixed(1) + "%";

        }

    }

    window.requestAnimationFrame(step);

}
/*=========================================
Load Dashboard Statistics
=========================================*/
function loadDashboardStats() {
    animateCounter("employeeCount", 0, dashboardData.employees, 1500);
    animateCounter("predictionCount", 0, dashboardData.predictions, 1500);
    animateCounter("highRiskCount", 0, dashboardData.highRisk, 1500);
    animatePercentage("attritionRate",dashboardData.attritionRate,1500);
}

/*=========================================
Card Hover Effect
=========================================*/
document.querySelectorAll(".kpi-card").forEach(card => {
    card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-8px)";
    });
    card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0)";
    });
});

/*=========================================
Page Loader
=========================================*/
window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});

/*=========================================
Smooth Scroll
=========================================*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});

/*=========================================
Console Banner
=========================================*/
console.log("%cSmartHR AI Dashboard", "color:#2563eb;font-size:22px;font-weight:bold;");
console.log("%cFrontend Initialized Successfully", "color:green;font-size:14px;");

/*=========================================
Initialize Dashboard
=========================================*/
document.addEventListener("DOMContentLoaded",()=>{

updateGreeting();

updateDateTime();

loadDashboardStats();

updateDepartmentTime();

console.log("Dashboard Ready");

});
/*=========================================
Export Department Chart
=========================================*/

const exportDepartment =
document.getElementById("exportDepartment");

if(exportDepartment){

exportDepartment.addEventListener("click",()=>{

const link=document.createElement("a");

link.download="department-chart.png";

link.href=departmentChart.toBase64Image();

link.click();

});

}

/*=========================================
Chart Colors
=========================================*/
const chartColors = {
    primary: "#2563eb",
    success: "#22c55e",
    warning: "#f59e0b",
    danger: "#ef4444",
    purple: "#7c3aed",
    grid: "#e2e8f0"
};

/*=========================================
Department-wise Attrition
=========================================*/
let departmentChart;

const departmentCanvas = document.getElementById("departmentChart");

if (departmentCanvas) {

    departmentChart = new Chart(departmentCanvas, {

        type: "bar",

        data: {

            labels: [
                "Sales",
                "Research",
                "HR",
                "Finance",
                "Marketing",
                "IT"
            ],

            datasets: [{

                label: "Employees Left",

                data: [
                    92,
                    133,
                    12,
                    34,
                    26,
                    48
                ],

                backgroundColor: [
                    chartColors.primary,
                    chartColors.success,
                    chartColors.warning,
                    chartColors.danger,
                    chartColors.purple,
                    "#06b6d4"
                ],

                borderRadius: 12,

                borderSkipped: false

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {
                    display: false
                },

                tooltip: {
                    backgroundColor: "#0f172a",
                    padding: 12,
                    titleColor: "#fff",
                    bodyColor: "#fff"
                }

            },

            scales: {

                x: {

                    grid: {
                        display: false
                    },

                    ticks: {
                        font: {
                            weight: "600"
                        }
                    }

                },

                y: {

                    beginAtZero: true,

                    grid: {
                        color: chartColors.grid
                    },

                    ticks: {
                        stepSize: 20
                    }

                }

            },

            animation: {

                duration: 1800,

                easing: "easeOutQuart"

            }

        }

    });

}
/*=========================================
Department Chart Controls
=========================================*/

const chartData = {

    weekly:[92,133,12,34,26,48],

    monthly:[80,120,18,28,32,42],

    yearly:[860,1230,180,340,290,470]

};

const departmentFilter =
document.getElementById("departmentFilter");

if(departmentFilter){

departmentFilter.addEventListener("change",function(){

departmentChart.data.datasets[0].data =
chartData[this.value];

departmentChart.update();

updateDepartmentTime();

});

}

const refreshDepartment =
document.getElementById("refreshDepartment");

if(refreshDepartment){

refreshDepartment.addEventListener("click",()=>{

departmentChart.update();

updateDepartmentTime();

});

}

function updateDepartmentTime(){

const time=new Date().toLocaleTimeString([],{

hour:"2-digit",

minute:"2-digit"

});

const label=document.getElementById("departmentUpdated");

if(label){

label.innerHTML="Updated "+time;

}

}

/*=========================================
Attrition Ratio
=========================================*/
const attritionCanvas = document.getElementById("attritionChart");

if (attritionCanvas) {

    new Chart(attritionCanvas, {

        type: "doughnut",

        data: {

            labels: [
                "Stayed",
                "Left"
            ],

            datasets: [{

                data: [
                    1233,
                    237
                ],

                backgroundColor: [
                    chartColors.success,
                    chartColors.danger
                ],

                borderWidth: 0,

                hoverOffset: 18

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            cutout: "70%",

            plugins: {

                legend: {

                    position: "bottom",

                    labels: {

                        padding: 20,

                        usePointStyle: true,

                        font: {

                            size: 13,

                            weight: "600"

                        }

                    }

                },

                tooltip: {

                    backgroundColor: "#0f172a",

                    padding: 12

                }

            },

            animation: {

                animateRotate: true,

                duration: 2000

            }

        }

    });

}

/*=========================================
Prediction Trend
=========================================*/
const predictionCanvas = document.getElementById("predictionChart");

if (predictionCanvas) {

    new Chart(predictionCanvas, {

        type: "line",

        data: {

            labels: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec"
            ],

            datasets: [{

                label: "Predictions",

                data: [
                    45,
                    60,
                    72,
                    88,
                    105,
                    130,
                    150,
                    174,
                    192,
                    218,
                    245,
                    280
                ],

                borderColor: chartColors.primary,

                backgroundColor: "rgba(37,99,235,.12)",

                fill: true,

                tension: .4,

                pointRadius: 5,

                pointHoverRadius: 8,

                pointBackgroundColor: "#2563eb",

                pointBorderColor: "#fff",

                pointBorderWidth: 2

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {

                    display: true,

                    position: "top"

                },

                tooltip: {

                    backgroundColor: "#0f172a",

                    padding: 12,

                    titleColor: "#fff",

                    bodyColor: "#fff"

                }

            },

            scales: {

                x: {

                    grid: {
                        display: false
                    }

                },

                y: {

                    beginAtZero: true,

                    grid: {
                        color: chartColors.grid
                    },

                    ticks: {
                        stepSize: 50
                    }

                }

            },

            animation: {

                duration: 2000,

                easing: "easeInOutQuart"

            }

        }

    });

}

/*=========================================
Global Chart Font
=========================================*/
Chart.defaults.font.family = "Poppins";
Chart.defaults.color = "#64748b";
Chart.defaults.plugins.legend.labels.usePointStyle = true;


/*=========================================
Active Navigation
=========================================*/
const currentPage = window.location.pathname.split("/").pop();

document.querySelectorAll(".sidebar .nav-link").forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
        link.classList.add("active");
    } else {
        link.classList.remove("active");
    }
});

/*=========================================
Notification Badge Animation
=========================================*/
const notificationBadge = document.querySelector(".badge.bg-danger");

if (notificationBadge) {

    setInterval(() => {

        notificationBadge.classList.add("animate__animated", "animate__pulse");

        setTimeout(() => {

            notificationBadge.classList.remove("animate__animated", "animate__pulse");

        }, 1000);

    }, 8000);

}

/*=========================================
Card Entrance Animation
=========================================*/
const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show-card");

        }

    });

}, {
    threshold: .2
});

document.querySelectorAll(".card").forEach(card => {

    observer.observe(card);

});

/*=========================================
Scroll To Top
=========================================*/
const scrollButton = document.createElement("button");

scrollButton.innerHTML = '<i class="bi bi-arrow-up"></i>';

scrollButton.className = "btn btn-primary rounded-circle";

scrollButton.id = "scrollTop";

document.body.appendChild(scrollButton);

scrollButton.style.position = "fixed";
scrollButton.style.bottom = "25px";
scrollButton.style.right = "25px";
scrollButton.style.display = "none";
scrollButton.style.width = "50px";
scrollButton.style.height = "50px";
scrollButton.style.zIndex = "999";

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {

        scrollButton.style.display = "block";

    } else {

        scrollButton.style.display = "none";

    }

});

scrollButton.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


/*=========================================
Employee Search
=========================================*/
const searchInput = document.querySelector("input[type='text']");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        document.querySelectorAll(".employee-card").forEach(card => {

            const text = card.innerText.toLowerCase();

            card.style.display = text.includes(value) ? "block" : "none";

        });

    });

}

/*=========================================
Employee Data
=========================================*/
const employeeData = {

    "John Smith": {
        id: "EMP001",
        department: "Sales",
        risk: "94%",
        email: "john.smith@smarthr.ai"
    },

    "Sarah Johnson": {
        id: "EMP009",
        department: "Research & Development",
        risk: "91%",
        email: "sarah.johnson@smarthr.ai"
    },

    "Emily Davis": {
        id: "EMP014",
        department: "Human Resources",
        risk: "89%",
        email: "emily.davis@smarthr.ai"
    }

};

/*=========================================
Employee Details Modal
=========================================*/
document.querySelectorAll(".employee-card .btn").forEach(button => {

    button.addEventListener("click", function () {

        const card = this.closest(".employee-card");

        const name = card.querySelector("h6").innerText;

        const data = employeeData[name];

        if (!data) return;

        document.getElementById("modalEmployeeName").innerText = name;

        document.getElementById("modalEmployeeId").innerText = data.id;

        document.getElementById("modalDepartment").innerText = data.department;

        document.getElementById("modalRisk").innerText = data.risk;

        document.getElementById("modalEmail").innerText = data.email;

        new bootstrap.Modal(document.getElementById("employeeModal")).show();

    });

});

/*=========================================
Export CSV
=========================================*/
function exportCSV() {

    let csv = "Employee ID,Employee,Risk\n";

    Object.keys(employeeData).forEach(name => {

        const emp = employeeData[name];

        csv += `${emp.id},${name},${emp.risk}\n`;

    });

    const blob = new Blob([csv], { type: "text/csv" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "High_Risk_Employees.csv";

    a.click();

    URL.revokeObjectURL(url);

    showToast("CSV Exported Successfully");

}

/*=========================================
Print Dashboard
=========================================*/
function printDashboard() {

    window.print();

}

/*=========================================
Toast Notification
=========================================*/
function showToast(message) {

    const toast = document.getElementById("liveToast");

    document.getElementById("toastMessage").innerText = message;

    bootstrap.Toast.getOrCreateInstance(toast).show();

}

/*=========================================
Export Button
=========================================*/
const exportButton = document.getElementById("exportDashboard");

if (exportButton) {

    exportButton.addEventListener("click", exportCSV);

}

/*=========================================
Print Button
=========================================*/
const printButton = document.getElementById("printDashboard");

if (printButton) {

    printButton.addEventListener("click", printDashboard);

}

/*=========================================
API Configuration
=========================================*/
const API = {
    springBoot: "http://localhost:8080/api",
    fastAPI: "http://127.0.0.1:8000"
};

/*=========================================
Dashboard API
=========================================*/
async function loadDashboard() {

    try {

        const response = await fetch(`${API.springBoot}/dashboard/stats`);

        if (!response.ok) {
            throw new Error("Dashboard API Error");
        }

        const result = await response.json();

        if (result.success && result.data) {
            const data = result.data;
            if (data.totalEmployees > 0) {
                animateCounter("employeeCount", 0, data.totalEmployees, 1500);
            }
            if (data.totalPredictions > 0) {
                animateCounter("predictionCount", 0, data.totalPredictions, 1500);
            }
        }

        console.log("Dashboard Loaded", result);

    }

    catch (error) {

        console.log("Using Local Dashboard Data");

    }

}

/*=========================================
Prediction History API
=========================================*/
async function loadPredictionHistory() {

    try {

        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const userId = user.userId || 1;
        const response = await fetch(`${API.springBoot}/predictions/history/${userId}`);

        if (!response.ok) {
            throw new Error();
        }

        const result = await response.json();

        if (result.success && result.data) {
            console.log("Prediction History:", result.data);
        }

    }

    catch (error) {

        console.log("History API Offline");

    }

}

/*=========================================
High Risk Employees API
=========================================*/
async function loadHighRiskEmployees() {

    try {

        const response = await fetch(`${API.springBoot}/dashboard/stats`);

        if (!response.ok) {
            throw new Error();
        }

        const result = await response.json();

        if (result.success && result.data) {
            console.log("Dashboard Stats:", result.data);
        }

    }

    catch (error) {

        console.log("Using Static Employee Cards");

    }

}

/*=========================================
FastAPI Health Check
=========================================*/
async function checkAI() {

    try {

        const response = await fetch(`${API.fastAPI}/docs`);

        if (response.ok) {

            console.log("FastAPI Connected");

        }

    }

    catch (error) {

        console.log("FastAPI Offline - Using Spring Boot prediction");

    }

}

/*=========================================
Auto Refresh
=========================================*/
setInterval(() => {

    updateDateTime();

    console.log("Dashboard Refreshed");

}, 300000);

/*=========================================
Dashboard Summary
=========================================*/
function dashboardSummary() {

    console.log("=================================");

    console.log("SmartHR AI Dashboard");

    console.log("Employees :", dashboardData.employees);

    console.log("Predictions :", dashboardData.predictions);

    console.log("High Risk :", dashboardData.highRisk);

    console.log("=================================");

}

/*=========================================
Initialize APIs
=========================================*/
async function initializeAPI() {

    await loadDashboard();

    await loadPredictionHistory();

    await loadHighRiskEmployees();

    await checkAI();

    dashboardSummary();

}

/*=========================================
Window Resize
=========================================*/
window.addEventListener("resize", () => {

    Chart.instances.forEach(chart => {

        chart.resize();

    });

});

/*=========================================
Online / Offline
=========================================*/
window.addEventListener("online", () => {

    showToast("Internet Connected");

});

window.addEventListener("offline", () => {

    showToast("Internet Disconnected");

});

/*=========================================
Dashboard Loaded
=========================================*/
window.addEventListener("load", () => {

    initializeAPI();

});

/*=========================================
Version
=========================================*/
console.log("%cSmartHR AI Dashboard v2.0", "color:#2563eb;font-size:18px;font-weight:bold;");

document.getElementById("predictEmployeeBtn")
    .addEventListener("click", () => {
        window.location.href = "prediction.html";
    });

document.getElementById("generateReportBtn")
    .addEventListener("click", () => {
        window.location.href = "reports.html";
    });

/*=========================================
Notification System
=========================================*/
function loadNotifications() {
    const notifList = document.getElementById("notifList");
    const notifBadge = document.getElementById("notifBadge");
    if (!notifList) return;

    const history = JSON.parse(localStorage.getItem("predictionHistory") || "[]");
    const notifs = [];

    history.slice(0, 5).forEach(p => {
        const isYes = p.result === "Yes";
        notifs.push({
            icon: isYes ? "bi-exclamation-triangle text-danger" : "bi-check-circle text-success",
            title: isYes ? "High Risk Alert" : "Low Risk Prediction",
            desc: `Prediction ${p.id}: ${isYes ? "Employee likely to leave" : "Employee likely to stay"} (${p.confidence}%)`,
            time: p.time
        });
    });

    notifs.unshift({
        icon: "bi-person-check text-primary",
        title: "Welcome Back",
        desc: "Logged in successfully",
        time: new Date().toISOString()
    });

    notifBadge.textContent = notifs.length;

    if (notifs.length === 0) {
        notifBadge.textContent = "0";
        return;
    }

    let html = "";
    notifs.forEach(n => {
        const timeAgo = getTimeAgo(n.time);
        html += `
            <div class="d-flex align-items-start p-2 border-bottom">
                <i class="bi ${n.icon} fs-5 me-3 mt-1"></i>
                <div class="flex-grow-1">
                    <h6 class="mb-0" style="font-size:13px">${n.title}</h6>
                    <small class="text-muted" style="font-size:12px">${n.desc}</small>
                    <br><small class="text-muted" style="font-size:11px">${timeAgo}</small>
                </div>
            </div>
        `;
    });

    notifList.innerHTML = html;
}

function getTimeAgo(timestamp) {
    const diff = Date.now() - new Date(timestamp).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return mins + " min ago";
    const hours = Math.floor(mins / 60);
    if (hours < 24) return hours + " hr ago";
    return Math.floor(hours / 24) + " days ago";
}

/*=========================================
Settings System
=========================================*/
function loadSettings() {
    const settings = JSON.parse(localStorage.getItem("smarthr_settings") || "{}");

    const company = document.getElementById("settingCompany");
    const refresh = document.getElementById("settingRefresh");
    const perPage = document.getElementById("settingPerPage");
    const autoRefresh = document.getElementById("settingAutoRefresh");
    const notifPredictions = document.getElementById("notifPredictions");
    const notifEmail = document.getElementById("notifEmail");
    const notifSound = document.getElementById("notifSound");
    const theme = document.getElementById("settingTheme");
    const sidebarPos = document.getElementById("settingSidebar");
    const color = document.getElementById("settingColor");
    const animations = document.getElementById("settingAnimations");

    if (company) company.value = settings.company || "SmartHR AI";
    if (refresh) refresh.value = settings.refresh || 300;
    if (perPage) perPage.value = settings.perPage || 10;
    if (autoRefresh) autoRefresh.checked = settings.autoRefresh !== false;
    if (notifPredictions) notifPredictions.checked = settings.notifPredictions !== false;
    if (notifEmail) notifEmail.checked = settings.notifEmail === true;
    if (notifSound) notifSound.checked = settings.notifSound === true;
    if (theme) theme.value = settings.theme || "light";
    if (sidebarPos) sidebarPos.value = settings.sidebar || "left";
    if (color) color.value = settings.primaryColor || "#2563eb";
    if (animations) animations.checked = settings.animations !== false;

    applySettings(settings);
}

function saveSettings() {
    const settings = {
        company: document.getElementById("settingCompany").value,
        refresh: parseInt(document.getElementById("settingRefresh").value),
        perPage: parseInt(document.getElementById("settingPerPage").value),
        autoRefresh: document.getElementById("settingAutoRefresh").checked,
        notifPredictions: document.getElementById("notifPredictions").checked,
        notifEmail: document.getElementById("notifEmail").checked,
        notifSound: document.getElementById("notifSound").checked,
        theme: document.getElementById("settingTheme").value,
        sidebar: document.getElementById("settingSidebar").value,
        primaryColor: document.getElementById("settingColor").value,
        animations: document.getElementById("settingAnimations").checked
    };

    localStorage.setItem("smarthr_settings", JSON.stringify(settings));
    applySettings(settings);
    showToast("Settings saved successfully!");

    const modal = bootstrap.Modal.getInstance(document.getElementById("settingsModal"));
    modal.hide();
}

function applySettings(settings) {
    const root = document.documentElement;
    const primary = settings.primaryColor || "#2563eb";

    root.style.setProperty("--primary", primary);

    if (settings.sidebar === "right") {
        const sidebarEl = document.querySelector(".sidebar");
        if (sidebarEl) {
            sidebarEl.style.left = "auto";
            sidebarEl.style.right = "0";
        }
        const mainContent = document.querySelector(".main-content");
        if (mainContent) {
            mainContent.style.marginLeft = "0";
            mainContent.style.marginRight = "var(--sidebar-width)";
        }
    } else {
        const sidebarEl = document.querySelector(".sidebar");
        if (sidebarEl) {
            sidebarEl.style.left = "0";
            sidebarEl.style.right = "auto";
        }
        const mainContent = document.querySelector(".main-content");
        if (mainContent) {
            mainContent.style.marginLeft = "var(--sidebar-width)";
            mainContent.style.marginRight = "0";
        }
    }

    if (settings.theme === "dark") {
        applyDarkTheme(primary);
    } else {
        applyLightTheme();
    }
}

function applyDarkTheme(primary) {
    document.documentElement.style.setProperty("--primary", primary);
    document.body.classList.add("dark-theme");
}

function applyLightTheme() {
    document.body.classList.remove("dark-theme");
    document.documentElement.style.setProperty("--primary", "#2563eb");
}

document.getElementById("saveSettingsBtn").addEventListener("click", saveSettings);

/*=========================================
Load Notifications on Init
=========================================*/
const origInitAPI = initializeAPI;
initializeAPI = async function() {
    await origInitAPI();
    loadNotifications();
    loadSettings();
};
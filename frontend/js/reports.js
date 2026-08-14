document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const nameEl = document.getElementById("navUserName");
    if (nameEl && user.fullName) nameEl.textContent = user.fullName;
    loadCharts();
    loadTable();
});

function loadCharts() {
    const colors = {
        primary: "#2563eb",
        success: "#22c55e",
        danger: "#ef4444",
        warning: "#f59e0b",
        purple: "#7c3aed",
        grid: "#e2e8f0"
    };

    new Chart(document.getElementById("attritionPie"), {
        type: "doughnut",
        data: {
            labels: ["Stayed (1233)", "Left (237)"],
            datasets: [{
                data: [1233, 237],
                backgroundColor: [colors.success, colors.danger],
                borderWidth: 0,
                hoverOffset: 12
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: "65%",
            plugins: {
                legend: { position: "bottom", labels: { padding: 20, usePointStyle: true } }
            }
        }
    });

    new Chart(document.getElementById("departmentBar"), {
        type: "bar",
        data: {
            labels: ["Sales", "Research & Development", "Human Resources"],
            datasets: [
                {
                    label: "Stayed",
                    data: [461, 809, 51],
                    backgroundColor: colors.success,
                    borderRadius: 6
                },
                {
                    label: "Left",
                    data: [92, 133, 12],
                    backgroundColor: colors.danger,
                    borderRadius: 6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: "top" } },
            scales: {
                x: { grid: { display: false } },
                y: { beginAtZero: true, grid: { color: colors.grid } }
            }
        }
    });

    new Chart(document.getElementById("overtimeBar"), {
        type: "bar",
        data: {
            labels: ["No OverTime", "OverTime"],
            datasets: [
                {
                    label: "Stayed",
                    data: [1109, 124],
                    backgroundColor: colors.success,
                    borderRadius: 6
                },
                {
                    label: "Left",
                    data: [110, 127],
                    backgroundColor: colors.danger,
                    borderRadius: 6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: "top" } },
            scales: {
                x: { grid: { display: false } },
                y: { beginAtZero: true, grid: { color: colors.grid } }
            }
        }
    });

    new Chart(document.getElementById("incomeBar"), {
        type: "bar",
        data: {
            labels: ["<3K", "3K-6K", "6K-10K", "10K-15K", "15K+"],
            datasets: [{
                label: "Employees",
                data: [180, 540, 320, 250, 180],
                backgroundColor: [colors.danger, colors.warning, colors.primary, colors.purple, colors.success],
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { display: false } },
                y: { beginAtZero: true, grid: { color: colors.grid } }
            }
        }
    });
}

function loadTable() {
    const highRisk = [
        { age: 28, dept: "Sales", role: "Sales Executive", income: 2800, overtime: "Yes", years: 1, attrition: "Yes" },
        { age: 35, dept: "Research & Development", role: "Laboratory Technician", income: 3500, overtime: "Yes", years: 2, attrition: "Yes" },
        { age: 29, dept: "Sales", role: "Sales Representative", income: 2500, overtime: "Yes", years: 1, attrition: "Yes" },
        { age: 31, dept: "Research & Development", role: "Research Scientist", income: 4200, overtime: "Yes", years: 3, attrition: "Yes" },
        { age: 26, dept: "Human Resources", role: "HR Executive", income: 3100, overtime: "No", years: 1, attrition: "Yes" },
        { age: 33, dept: "Sales", role: "Sales Executive", income: 4800, overtime: "Yes", years: 2, attrition: "Yes" },
        { age: 37, dept: "Research & Development", role: "Research Director", income: 8500, overtime: "No", years: 5, attrition: "No" },
        { age: 42, dept: "Sales", role: "Manager", income: 12000, overtime: "No", years: 10, attrition: "No" }
    ];

    const tbody = document.getElementById("reportTableBody");
    highRisk.forEach(e => {
        const badge = e.attrition === "Yes"
            ? '<span class="badge bg-danger">Yes</span>'
            : '<span class="badge bg-success">No</span>';
        tbody.innerHTML += `
            <tr>
                <td>${e.age}</td>
                <td>${e.dept}</td>
                <td>${e.role}</td>
                <td>₹${e.income.toLocaleString("en-IN")}</td>
                <td><span class="badge ${e.overtime === "Yes" ? "bg-warning text-dark" : "bg-secondary"}">${e.overtime}</span></td>
                <td>${e.years}</td>
                <td>${badge}</td>
            </tr>
        `;
    });
}

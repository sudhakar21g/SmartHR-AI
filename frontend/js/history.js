const API_BASE = "http://localhost:8080/api";

document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const nameEl = document.getElementById("navUserName");
    if (nameEl && user.fullName) nameEl.textContent = user.fullName;
    loadHistory();
});

async function loadHistory() {
    const loading = document.getElementById("historyLoading");
    const empty = document.getElementById("historyEmpty");
    const table = document.getElementById("historyTable");
    const tbody = document.getElementById("historyBody");
    const count = document.getElementById("historyCount");

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userId = user.userId || 1;

    try {
        const response = await fetch(`${API_BASE}/predictions/history/${userId}`);
        const result = await response.json();

        loading.classList.add("d-none");

        if (result.success && result.data && result.data.length > 0) {
            table.classList.remove("d-none");
            count.textContent = result.data.length;
            tbody.innerHTML = "";

            result.data.forEach((p, index) => {
                const isYes = p.attritionPrediction === "Yes";
                const badgeClass = isYes ? "bg-danger" : "bg-success";
                const badgeText = isYes ? "Will Leave" : "Will Stay";
                const conf = Math.round(p.confidenceScore * 100);
                const confClass = conf >= 80 ? "text-success" : conf >= 60 ? "text-warning" : "text-danger";
                const date = new Date(p.predictedAt).toLocaleString("en-IN");

                tbody.innerHTML += `
                    <tr>
                        <td>${index + 1}</td>
                        <td><code>PRD-${String(p.id).padStart(4, '0')}</code></td>
                        <td><span class="badge ${badgeClass} rounded-pill px-3 py-2">${badgeText}</span></td>
                        <td><span class="${confClass} fw-bold">${conf}%</span></td>
                        <td><small class="text-muted">${date}</small></td>
                    </tr>
                `;
            });
        } else {
            empty.classList.remove("d-none");
            count.textContent = "0";
        }
    } catch (error) {
        loading.classList.add("d-none");
        empty.classList.remove("d-none");
        console.log("History API offline, using local storage");
        loadLocalHistory();
    }
}

function loadLocalHistory() {
    const empty = document.getElementById("historyEmpty");
    const table = document.getElementById("historyTable");
    const tbody = document.getElementById("historyBody");
    const count = document.getElementById("historyCount");

    const local = JSON.parse(localStorage.getItem("predictionHistory") || "[]");

    if (local.length > 0) {
        table.classList.remove("d-none");
        count.textContent = local.length;
        tbody.innerHTML = "";

        local.forEach((p, index) => {
            const isYes = p.result === "Yes";
            const badgeClass = isYes ? "bg-danger" : "bg-success";
            const badgeText = isYes ? "Will Leave" : "Will Stay";
            const date = new Date(p.time).toLocaleString("en-IN");

            tbody.innerHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td><code>${p.id}</code></td>
                    <td><span class="badge ${badgeClass} rounded-pill px-3 py-2">${badgeText}</span></td>
                    <td><span class="fw-bold">${p.confidence}%</span></td>
                    <td><small class="text-muted">${date}</small></td>
                </tr>
            `;
        });
    } else {
        empty.classList.remove("d-none");
    }
}

document.getElementById("clearHistoryBtn").addEventListener("click", () => {
    if (confirm("Are you sure you want to clear prediction history?")) {
        localStorage.removeItem("predictionHistory");
        document.getElementById("historyBody").innerHTML = "";
        document.getElementById("historyTable").classList.add("d-none");
        document.getElementById("historyEmpty").classList.remove("d-none");
        document.getElementById("historyCount").textContent = "0";
    }
});

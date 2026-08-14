document.addEventListener("DOMContentLoaded", () => {
    loadProfile();
    loadStats();
});

function loadProfile() {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const name = user.fullName || "Admin";
    const email = user.email || "admin@smarthr.ai";
    const phone = user.phone || "-";
    const role = user.role || "USER";

    document.getElementById("profileName").textContent = name;
    document.getElementById("profileEmail").textContent = email;
    document.getElementById("profileEmailDetail").textContent = email;
    document.getElementById("profilePhone").textContent = phone;
    document.getElementById("profileRole").textContent = role;
    document.getElementById("navUserName").textContent = name;
    document.getElementById("editName").value = name;
    document.getElementById("editEmail").value = email;
    document.getElementById("editPhone").value = phone === "-" ? "" : phone;
    document.getElementById("editRole").value = role;

    const joined = new Date().toLocaleDateString("en-IN", {
        day: "2-digit", month: "long", year: "numeric"
    });
    document.getElementById("profileJoined").textContent = joined;
}

function loadStats() {
    const history = JSON.parse(localStorage.getItem("predictionHistory") || "[]");
    let stay = 0, leave = 0;

    history.forEach(p => {
        if (p.result === "Yes") leave++;
        else stay++;
    });

    document.getElementById("statPredictions").textContent = history.length;
    document.getElementById("statStay").textContent = stay;
    document.getElementById("statLeave").textContent = leave;
}

document.getElementById("profileForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    user.fullName = document.getElementById("editName").value.trim();
    user.phone = document.getElementById("editPhone").value.trim();

    localStorage.setItem("user", JSON.stringify(user));

    document.getElementById("profileName").textContent = user.fullName;
    document.getElementById("navUserName").textContent = user.fullName;

    const toast = document.createElement("div");
    toast.className = "toast align-items-center text-white bg-success border-0 position-fixed";
    toast.style.top = "20px";
    toast.style.right = "20px";
    toast.style.zIndex = "9999";
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">Profile updated successfully!</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    document.body.appendChild(toast);
    const bsToast = new bootstrap.Toast(toast, { delay: 3000 });
    bsToast.show();
    toast.addEventListener("hidden.bs.toast", () => toast.remove());
});

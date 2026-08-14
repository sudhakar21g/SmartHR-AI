const API_BASE = "http://localhost:8080/api";

const password = document.getElementById("password");
const toggle = document.getElementById("togglePassword");

toggle.addEventListener("click", () => {
    if (password.type === "password") {
        password.type = "text";
        toggle.innerHTML = '<i class="bi bi-eye-slash"></i>';
    } else {
        password.type = "password";
        toggle.innerHTML = '<i class="bi bi-eye"></i>';
    }
});

document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const passwordVal = document.getElementById("password").value;

    try {
        const response = await fetch(`${API_BASE}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: username, password: passwordVal })
        });

        const result = await response.json();

        if (result.success) {
            localStorage.setItem("user", JSON.stringify(result.data));
            localStorage.setItem("token", result.data.token);
            window.location.href = "dashboard.html";
        } else {
            alert(result.message || "Login failed. Check your credentials.");
        }
    } catch (error) {
        alert("Cannot connect to server. Make sure Spring Boot is running on port 8080.");
    }
});

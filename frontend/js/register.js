const API_BASE = "http://localhost:8080/api";

const toggle = document.getElementById("togglePassword");
const password = document.getElementById("password");

toggle.addEventListener("click", () => {
    if (password.type === "password") {
        password.type = "text";
        toggle.innerHTML = '<i class="bi bi-eye-slash"></i>';
    } else {
        password.type = "password";
        toggle.innerHTML = '<i class="bi bi-eye"></i>';
    }
});

document.getElementById("registerForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const errorDiv = document.getElementById("registerError");
    const successDiv = document.getElementById("registerSuccess");
    errorDiv.classList.add("d-none");
    successDiv.classList.add("d-none");

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const passwordVal = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (passwordVal !== confirmPassword) {
        errorDiv.textContent = "Passwords do not match";
        errorDiv.classList.remove("d-none");
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fullName, email, password: passwordVal, phone })
        });

        const result = await response.json();

        if (result.success) {
            successDiv.textContent = "Registration successful! Redirecting to login...";
            successDiv.classList.remove("d-none");
            setTimeout(() => {
                window.location.href = "login.html";
            }, 2000);
        } else {
            errorDiv.textContent = result.message || "Registration failed";
            errorDiv.classList.remove("d-none");
        }
    } catch (error) {
        errorDiv.textContent = "Cannot connect to server. Make sure Spring Boot is running.";
        errorDiv.classList.remove("d-none");
    }
});

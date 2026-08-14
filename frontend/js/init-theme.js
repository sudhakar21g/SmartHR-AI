(function() {
    var settings = JSON.parse(localStorage.getItem("smarthr_settings") || "{}");
    if (settings.theme === "dark") {
        document.documentElement.style.setProperty("--primary", settings.primaryColor || "#2563eb");
        document.body.classList.add("dark-theme");
    }
    if (settings.sidebar === "right") {
        document.addEventListener("DOMContentLoaded", function() {
            var sidebar = document.querySelector(".sidebar");
            if (sidebar) {
                sidebar.style.left = "auto";
                sidebar.style.right = "0";
            }
            var mainContent = document.querySelector(".main-content");
            if (mainContent) {
                mainContent.style.marginLeft = "0";
                mainContent.style.marginRight = "var(--sidebar-width)";
            }
        });
    }
})();

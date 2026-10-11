
const themeToggle = document.getElementById("theme-toggle");

function updateThemeIcon() {
    const isDark = document.body.classList.contains("dark-mode");

    themeToggle.innerHTML = isDark
        ? '<i data-lucide="sun"></i>'
        : '<i data-lucide="moon"></i>';

    if (window.lucide) {
        lucide.createIcons();
    }
}

if (themeToggle) {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }

    updateThemeIcon();

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        localStorage.setItem(
            "theme",
            document.body.classList.contains("dark-mode")
                ? "dark"
                : "light"
        );

        updateThemeIcon();
    });
}

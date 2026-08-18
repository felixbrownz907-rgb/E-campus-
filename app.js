document.addEventListener("DOMContentLoaded", () => {

    const loginBtn = document.getElementById("loginBtn");
    const registerBtn = document.getElementById("registerBtn");
    const startLearningBtn = document.getElementById("startLearningBtn");

    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
            alert("Login page coming next.");
        });
    }

    if (registerBtn) {
        registerBtn.addEventListener("click", () => {
            alert("Registration page coming next.");
        });
    }

    if (startLearningBtn) {
        startLearningBtn.addEventListener("click", () => {
            document
                .getElementById("programmes")
                ?.scrollIntoView({
                    behavior: "smooth"
                });
        });
    }

});

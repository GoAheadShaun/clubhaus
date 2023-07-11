document.addEventListener("DOMContentLoaded", function () {
    const logo = document.querySelector(".logo");
    const cancelButton = document.querySelector(".login_rego_button[type='submit']");

    logo.addEventListener("click", function () {
        window.location.href = "index.html";
    });

    cancelButton.addEventListener("click", function () {
        window.location.href = "index.html";
    });
});
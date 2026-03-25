
const form = document.getElementById("regForm");
const successMsg = document.getElementById("successMsg");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const ageInput = document.getElementById("age");

function showError(input, errorId, message) {
    document.getElementById(errorId).textContent = message;
    input.className = "input-error";
}

function showSuccess(input, errorId) {
    document.getElementById(errorId).textContent = "";
    input.className = "input-success";
}

function clearErrors() {
    let errors = document.querySelectorAll(".error-msg");
    for (let i = 0; i < errors.length; i++) {
        errors[i].textContent = "";
    }
    let inputs = document.querySelectorAll("input");
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].className = "";
    }
}

function validateName() {
    let value = nameInput.value.trim();
    if (value === "") {
        showError(nameInput, "nameError", "Name is required");
        return false;
    }
    if (value.length < 3) {
        showError(nameInput, "nameError", "Name must be at least 3 characters");
        return false;
    }
    showSuccess(nameInput, "nameError");
    return true;
}

function validateEmail() {
    let value = emailInput.value.trim();
    if (value === "") {
        showError(emailInput, "emailError", "Email is required");
        return false;
    }
    let atIndex = value.indexOf("@");
    let dotIndex = value.lastIndexOf(".");
    if (atIndex < 1 || dotIndex < atIndex + 2 || dotIndex >= value.length - 1) {
        showError(emailInput, "emailError", "Enter a valid email address");
        return false;
    }
    showSuccess(emailInput, "emailError");
    return true;
}

function validatePhone() {
    let value = phoneInput.value.trim();
    if (value === "") {
        showError(phoneInput, "phoneError", "Phone number is required");
        return false;
    }
    if (value.length !== 10) {
        showError(phoneInput, "phoneError", "Phone number must be 10 digits");
        return false;
    }
    for (let i = 0; i < value.length; i++) {
        if (value[i] < "0" || value[i] > "9") {
            showError(phoneInput, "phoneError", "Phone number must contain only digits");
            return false;
        }
    }
    showSuccess(phoneInput, "phoneError");
    return true;
}

function validatePassword() {
    let value = passwordInput.value;
    if (value === "") {
        showError(passwordInput, "passwordError", "Password is required");
        return false;
    }
    if (value.length < 6) {
        showError(passwordInput, "passwordError", "Password must be at least 6 characters");
        return false;
    }
    showSuccess(passwordInput, "passwordError");
    return true;
}

function validateConfirmPassword() {
    let value = confirmPasswordInput.value;
    if (value === "") {
        showError(confirmPasswordInput, "confirmPasswordError", "Please confirm your password");
        return false;
    }
    if (value !== passwordInput.value) {
        showError(confirmPasswordInput, "confirmPasswordError", "Passwords do not match");
        return false;
    }
    showSuccess(confirmPasswordInput, "confirmPasswordError");
    return true;
}

function validateAge() {
    let value = ageInput.value.trim();
    if (value === "") {
        showError(ageInput, "ageError", "Age is required");
        return false;
    }
    let age = Number(value);
    if (isNaN(age) || age < 1 || age > 120 || age !== Math.floor(age)) {
        showError(ageInput, "ageError", "Enter a valid age (1-120)");
        return false;
    }
    showSuccess(ageInput, "ageError");
    return true;
}

nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);
phoneInput.addEventListener("input", validatePhone);
passwordInput.addEventListener("input", validatePassword);
confirmPasswordInput.addEventListener("input", validateConfirmPassword);
ageInput.addEventListener("input", validateAge);

form.addEventListener("submit", function (e) {
    e.preventDefault();
    successMsg.style.display = "none";

    let isValid = true;

    if (!validateName()) isValid = false;
    if (!validateEmail()) isValid = false;
    if (!validatePhone()) isValid = false;
    if (!validatePassword()) isValid = false;
    if (!validateConfirmPassword()) isValid = false;
    if (!validateAge()) isValid = false;

    if (isValid) {
        successMsg.style.display = "block";
        form.reset();
        clearErrors();
    }
});

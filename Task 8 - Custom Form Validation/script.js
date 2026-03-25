const form = document.getElementById('customForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const phoneError = document.getElementById('phoneError');
const success = document.getElementById('success');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  nameError.textContent = '';
  emailError.textContent = '';
  phoneError.textContent = '';
  success.textContent = '';

  let valid = true;

  if (nameInput.value.trim() === '') {
    nameError.textContent = 'Name is required';
    valid = false;
  }

  if (emailInput.value.indexOf('@') === -1) {
    emailError.textContent = 'Enter a valid email';
    valid = false;
  }

  if (phoneInput.value.length < 10) {
    phoneError.textContent = 'Phone must be at least 10 digits';
    valid = false;
  }

  if (valid) {
    success.textContent = 'Form submitted successfully';
  }
});

const form = document.getElementById('regForm');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  document.getElementById('nameError').textContent = '';
  document.getElementById('emailError').textContent = '';
  document.getElementById('passwordError').textContent = '';
  document.getElementById('confirmError').textContent = '';
  document.getElementById('successText').textContent = '';

  let valid = true;

  if (name === '') {
    document.getElementById('nameError').textContent = 'Name must not be empty';
    valid = false;
  }

  if (email.indexOf('@') === -1) {
    document.getElementById('emailError').textContent = 'Email must contain @';
    valid = false;
  }

  if (password.length < 6) {
    document.getElementById('passwordError').textContent = 'Password length must be >= 6';
    valid = false;
  }

  if (confirmPassword !== password) {
    document.getElementById('confirmError').textContent = 'Passwords must match';
    valid = false;
  }

  if (valid) {
    document.getElementById('successText').textContent = 'Form is valid';
  }
});

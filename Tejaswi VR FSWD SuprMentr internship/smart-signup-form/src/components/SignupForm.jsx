import { useState } from 'react';

function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const [successMessage, setSuccessMessage] = useState('');

  function checkEmail(value) {
    if (value.indexOf('@') === -1) {
      return false;
    }

    if (value.indexOf('.') === -1) {
      return false;
    }

    return true;
  }

  function checkPassword(value) {
    if (value.length < 8) {
      return 'Password must be at least 8 characters';
    }

    if (!/[A-Z]/.test(value)) {
      return 'Password must include one uppercase letter';
    }

    if (!/[a-z]/.test(value)) {
      return 'Password must include one lowercase letter';
    }

    if (!/[0-9]/.test(value)) {
      return 'Password must include one number';
    }

    return '';
  }

  function getPasswordStrength(value) {
    let score = 0;

    if (value.length >= 8) {
      score = score + 1;
    }

    if (/[A-Z]/.test(value)) {
      score = score + 1;
    }

    if (/[a-z]/.test(value)) {
      score = score + 1;
    }

    if (/[0-9]/.test(value)) {
      score = score + 1;
    }

    if (score <= 2) {
      return 'Weak';
    }

    if (score === 3) {
      return 'Medium';
    }

    return 'Strong';
  }

  function handleSubmit(e) {
    e.preventDefault();

    let isValid = true;

    setNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setSuccessMessage('');

    if (name.trim() === '') {
      setNameError('Name is required');
      isValid = false;
    }

    if (!checkEmail(email.trim())) {
      setEmailError('Enter a valid email address');
      isValid = false;
    }

    let passwordCheckMessage = checkPassword(password);
    if (passwordCheckMessage !== '') {
      setPasswordError(passwordCheckMessage);
      isValid = false;
    }

    if (confirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    }

    if (isValid) {
      setSuccessMessage('Signup successful!');
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    }
  }

  return (
    <div className="form-card">
      <h2>Smart Signup Form</h2>
      <p className="subtitle">Fill details and create your account</p>

      <form onSubmit={handleSubmit}>
        <div className="field-group">
          <label>Full Name</label>
          <input
            type="text"
            value={name}
            onChange={function (e) {
              setName(e.target.value);
            }}
            placeholder="Enter your name"
          />
          {nameError !== '' && <p className="error-text">{nameError}</p>}
        </div>

        <div className="field-group">
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={function (e) {
              setEmail(e.target.value);
            }}
            placeholder="Enter your email"
          />
          {emailError !== '' && <p className="error-text">{emailError}</p>}
        </div>

        <div className="field-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={function (e) {
              setPassword(e.target.value);
            }}
            placeholder="Create password"
          />
          {password !== '' && (
            <p className="strength-text">
              Strength: <span>{getPasswordStrength(password)}</span>
            </p>
          )}
          {passwordError !== '' && <p className="error-text">{passwordError}</p>}
        </div>

        <div className="field-group">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={function (e) {
              setConfirmPassword(e.target.value);
            }}
            placeholder="Enter password again"
          />
          {confirmPasswordError !== '' && (
            <p className="error-text">{confirmPasswordError}</p>
          )}
        </div>

        <button type="submit" className="signup-btn">
          Sign Up
        </button>

        {successMessage !== '' && <p className="success-text">{successMessage}</p>}
      </form>
    </div>
  );
}

export default SignupForm;

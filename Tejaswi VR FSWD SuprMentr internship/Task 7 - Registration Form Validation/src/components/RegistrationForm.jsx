import { useState } from 'react';
import StatusMessage from './StatusMessage';

function RegistrationForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  function isValidEmail(value) {
    const text = value.trim().toLowerCase();
    const format = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

    if (!format.test(text)) {
      return false;
    }

    if (text.indexOf('..') !== -1) {
      return false;
    }

    const parts = text.split('@');
    const local = parts[0];
    const domain = parts[1];

    if (local.startsWith('.') || local.endsWith('.')) {
      return false;
    }

    if (domain.startsWith('-') || domain.endsWith('-')) {
      return false;
    }

    return true;
  }

  function isValidAge(value) {
    const numberAge = Number(value);

    if (Number.isNaN(numberAge)) {
      return false;
    }

    if (!Number.isFinite(numberAge)) {
      return false;
    }

    if (numberAge < 18) {
      return false;
    }

    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();

    setMessage('');
    setMessageType('');

    if (name.trim() === '' || email.trim() === '' || age.trim() === '') {
      setMessage('All fields are required');
      setMessageType('error');
      return;
    }

    if (!isValidEmail(email)) {
      setMessage('Email is not valid');
      setMessageType('error');
      return;
    }

    if (!isValidAge(age)) {
      setMessage('Age must be 18 or above');
      setMessageType('error');
      return;
    }

    setMessage('Registration successful');
    setMessageType('success');
  }

  return (
    <form className="form-box" onSubmit={handleSubmit}>
      <label>Name</label>
      <input
        type="text"
        value={name}
        onChange={function (e) { setName(e.target.value); }}
      />

      <label>Email</label>
      <input
        type="text"
        value={email}
        onChange={function (e) { setEmail(e.target.value); }}
      />

      <label>Age</label>
      <input
        type="text"
        value={age}
        onChange={function (e) { setAge(e.target.value); }}
      />

      <button type="submit">Submit</button>

      <StatusMessage type={messageType} text={message} />
    </form>
  );
}

export default RegistrationForm;

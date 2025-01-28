import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Main from './main';
import './login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [dob, setDob] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const formatDate = (date) => {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedDob = formatDate(dob);
    const response = await fetch('http://127.0.0.1:8000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, date_of_birth: formattedDob }),
    });
    const data = await response.json();
    if (data.success) {
      setIsLoggedIn(true);
      setErrorMessage('');
      navigate('/main');
    } else {
      setErrorMessage('Invalid username or date of birth');
    }
  };

  if (isLoggedIn) {
    return <Main />;
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
}

export default Login;
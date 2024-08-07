import React, { useState } from 'react';
import './SignupPage.css';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // useNavigate hook for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setForm({ username: '', email: '', password: '' });
        setSuccessMessage('Signup successful!');
        setTimeout(() => {
          setSuccessMessage('');
          navigate('/'); // Redirect to login after successful signup
        }, 3000); // Clear success message after 3 seconds
      } else {
        const errorData = await response.json();
        setErrorMessage(`Signup failed: ${errorData.message}`);
        setTimeout(() => {
          setErrorMessage('');
        }, 3000); // Clear error message after 3 seconds
      }
    } catch (error) {
      console.error('Registration error: ', error);
      setErrorMessage('Signup failed: Network error');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000); // Clear error message after 3 seconds
    }
  };

  return (
    <div className="signup-form">
      <h2>Sign Up</h2>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
};

export default SignupPage;

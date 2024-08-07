import React, { useState } from 'react';
import './LoginPage.css';
import { useNavigate, Link } from 'react-router-dom'; // Import Link from react-router-dom

const LoginPage = () => {
    const [form, setForm] = useState({
        username: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // useNavigate hook for navigation

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            if (response.ok) {
                const data = await response.json();
                showMessage('Login successful! Redirecting...', 'success');
                localStorage.setItem('token', data.token);
                setTimeout(() => {
                    setMessage('');
                    navigate('/'); // Redirect to homepage after successful login
                }, 2000); // Delay for 2 seconds before redirecting
            } else {
                const errorData = await response.json();
                showMessage(`Login failed: ${errorData.error}`, 'error');
            }
        } catch (error) {
            console.error('Login error:', error);
            showMessage('Error: Unable to login. Please try again later.', 'error');
        }
    };

    const showMessage = (msg, type) => {
        setMessage({ text: msg, type });
        setTimeout(() => {
            setMessage('');
        }, 5000); // Hide after 5 seconds
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {message && (
                <div className={`toast ${message.type}`}>
                    <p>{message.text}</p>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
        </div>
    );
};

export default LoginPage;

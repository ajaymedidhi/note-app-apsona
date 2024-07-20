import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './index.css'; // Make sure to import the CSS

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState(''); // State for greeting message

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://note-app-backend-xrh9.onrender.com/api/auth/register', { name, email, password });
            // Handle successful registration
            setMessage('Welcome to Apsona Note App! Your registration was successful.'); 
            // Clear input fields
            setName('');
            setEmail('');
            setPassword('');
            console.log(response.data);
        } catch (err) {
            setError('Registration failed');
        }
    };

    return ( 
        <div className='login'>
            <div className="register-container">
                <h2>Register</h2>
                <p className="greeting-message">Welcome to Apsona Note App!</p>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p>{error}</p>}
                    <button type="submit">Register</button>
                </form>
                {message && <p className="success-message">{message}</p>}
                <Link to="/login" className="login-link">Already registered? Login here</Link>
            </div>
        </div>
    );
};

export default Register;

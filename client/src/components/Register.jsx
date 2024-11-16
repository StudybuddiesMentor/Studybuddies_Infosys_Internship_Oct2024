import { useState } from 'react';
import './Login.css'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import image from '@/assets/register.png';
import logo from '@/assets/logo1.png'; 

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (name === '' || email === '' || password === '' || confirmPassword === '') {
            setError('Please fill in all fields');
            setSuccess('');
            return;
        } else if (password !== confirmPassword) {
            setError('Passwords do not match');
            setSuccess('');
            return;
        } else {
            setError('');
        }

        try {
            const response = await axios.post('http://localhost:9000/api/users/register', {
                username: name, 
                email,
                password,
            });

            setSuccess('Registered successfully!');
            setError('');
            navigate('/mail-verification');

            // Reset form fields
            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        } catch (err) {
            console.error(err);
            setError(err.response ? err.response.data.message : 'Registration failed');
            setSuccess('');
        }
    };

    return (
        <div className="page">
            {/* Logo container */}
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" />
            </div>

            <div className="login-right">
                <div className="login-container">
                    <h3 className="login-header">Create Your Account</h3>

                    {error && <p className="text-danger text-center">{error}</p>}
                    {success && <p className="text-success text-center">{success}</p>}

                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text"
                                id="name"
                                className="form-control"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                className="form-control"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" id="btn-register" className="btn-submit px-6 py-2 text-base font-semibold transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95">Register</button>

                    </form>
                    <p className="text-center">
                        Already have an account? <button className="btn-links" onClick={() => navigate('/login')}>Login here</button>
                    </p>
                </div>
            </div>
            <div className="fly-img">
                <img src={image} alt="Flying image" />
                <div className="quote-container">
                    <p className="quote-text">"The beautiful thing about learning is that no one can take it away from you. <br /> – B.B. King</p>
                </div>
            </div>
        </div>
    );
}

export default Register;

import React, { useState } from "react";
import { Link } from "react-router-dom"; // ✅ Import Link from react-router-dom
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        console.log("Email:", email);
        console.log("Password:", password);
        alert(`Logged in with Email: ${email}`);
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">Login</h2>
                <p className="login-subtitle">Stay updated on your Fractional Ownership world</p>
                <form onSubmit={handleLoginSubmit} className="login-form">
                    <div>
                        <input
                            type="email"
                            placeholder="Email or Phone"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="login-input"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="login-input"
                        />
                    </div>
                    <p className="forgot-password">Forgot password?</p>
                    <button type="submit" className="sign-in-button">
                        Login
                    </button>
                </form>
                <p className="join-now">
                    New to eliteFraction? <Link to="/User/SignUp" className="join-link">Join now</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
